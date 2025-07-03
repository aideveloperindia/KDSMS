import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Sale from '@/models/Sale';
import User from '@/models/User';
import connectDB from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { validateHierarchy } from '@/lib/utils';

type UserRole = 'agent' | 'executive' | 'zm' | 'agm' | 'management';

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
  zone?: number;
  area?: number;
  subArea?: number;
  employeeId?: string;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 });
    }

    const employeeId = (session.user as SessionUser).employeeId;
    if (!employeeId) {
      return NextResponse.json({ error: 'Session data incomplete - Please log in again' }, { status: 401 });
    }

    await connectDB();

    // Get the current user and verify their role
    const user = await User.findOne({ employeeId });
    if (!user) {
      return NextResponse.json({ error: 'User not found - Please log in again' }, { status: 404 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const requestedZone = searchParams.get('zone');
    const requestedArea = searchParams.get('area');
    const requestedSubArea = searchParams.get('subArea');
    const date = searchParams.get('date');

    // Build query based on filters
    const query: any = {
      $or: [
        { agentRemarks: { $exists: true, $ne: '' } },
        { executiveRemarks: { $exists: true, $ne: '' } }
      ]
    };

    // Date filter
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    // Role-based access control
    switch (user.role) {
      case 'zm':
        // ZM can only see their assigned zone
        query.zone = user.zone;
        if (requestedZone && parseInt(requestedZone) !== user.zone) {
          return NextResponse.json({ 
            error: 'Unauthorized - You can only access data from your assigned zone' 
          }, { status: 403 });
        }
        break;

      case 'agm':
        // AGM can see all zones
        if (requestedZone) {
          const zone = parseInt(requestedZone);
          if (zone < 1 || zone > 6) {
            return NextResponse.json({ 
              error: 'Invalid zone number' 
            }, { status: 400 });
          }
          query.zone = zone;
        }
        break;

      case 'management':
        // Management can see all zones or filter by specific zone
        if (requestedZone) {
          const zone = parseInt(requestedZone);
          if (zone < 1 || zone > 6) {
            return NextResponse.json({ 
              error: 'Invalid zone number' 
            }, { status: 400 });
          }
          query.zone = zone;
        }
        break;

      case 'executive':
        // Executive can only see their area
        query.area = user.area;
        query.zone = user.zone;
        break;

      case 'agent':
        // Agent can only see their own sales
        query.agentId = user.employeeId;
        break;

      default:
        return NextResponse.json({ error: 'Invalid role' }, { status: 403 });
    }

    // Additional filters for area and sub-area
    if (requestedArea) {
      const area = parseInt(requestedArea);
      if (!validateHierarchy(query.zone, area)) {
        return NextResponse.json({ error: 'Invalid area for the specified zone' }, { status: 400 });
      }
      query.area = area;
    }

    if (requestedSubArea) {
      const subArea = parseInt(requestedSubArea);
      if (!validateHierarchy(query.zone, query.area, subArea)) {
        return NextResponse.json({ error: 'Invalid sub-area for the specified area' }, { status: 400 });
      }
      query.subArea = subArea;
    }

    // Fetch sales with remarks
    const sales = await Sale.find(query)
      .sort({ date: -1 })
      .limit(50)
      .populate('agentId', 'name employeeId zone area subArea')
      .populate('executiveId', 'name employeeId');

    // Transform the data
    const remarks = sales.map(sale => ({
      id: sale._id.toString(),
      date: sale.date,
      zone: sale.zone,
      area: sale.area,
      subArea: sale.subArea,
      agentName: sale.agentId.name,
      agentId: sale.agentId.employeeId,
      milkType: sale.milkType,
      agentRemarks: sale.agentRemarks,
      executiveRemarks: sale.executiveRemarks,
      executiveName: sale.executiveId?.name,
      executiveId: sale.executiveId?.employeeId
    }));

    return NextResponse.json(remarks);
  } catch (error) {
    console.error('Error fetching remarks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 });
    }

    const employeeId = (session.user as SessionUser).employeeId;
    if (!employeeId) {
      return NextResponse.json({ error: 'Session data incomplete - Please log in again' }, { status: 401 });
    }

    await connectDB();

    // Get the current user and verify their role
    const user = await User.findOne({ employeeId });
    if (!user) {
      return NextResponse.json({ error: 'User not found - Please log in again' }, { status: 404 });
    }

    const body = await request.json();
    const { saleId, remarks } = body;

    if (!saleId || !remarks) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Find the sale
    const sale = await Sale.findById(saleId);
    if (!sale) {
      return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
    }

    // Check permissions based on role
    if (user.role === 'agent') {
      // Agent can only add remarks to their own sales
      if (sale.agentId !== user.employeeId) {
        return NextResponse.json({ error: 'You can only add remarks to your own sales' }, { status: 403 });
      }
      sale.agentRemarks = remarks;
    } else if (user.role === 'executive') {
      // Executive can only add remarks to their area's sales
      if (sale.area !== user.area || sale.zone !== user.zone) {
        return NextResponse.json({ error: 'You can only add remarks to sales in your area' }, { status: 403 });
      }
      sale.executiveRemarks = remarks;
      sale.executiveId = user.employeeId;
    } else {
      return NextResponse.json({ error: 'Only agents and executives can add remarks' }, { status: 403 });
    }

    await sale.save();

    return NextResponse.json({ message: 'Remarks added successfully', data: sale });
  } catch (error) {
    console.error('Error adding remarks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 