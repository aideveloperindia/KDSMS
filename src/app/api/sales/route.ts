import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Sale from '@/models/Sale';
import User from '@/models/User';
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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 });
    }

    // Connect to database first
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json({ error: 'Database connection failed - Please try again' }, { status: 500 });
    }

    const body = await req.json();
    const { milkType, quantityReceived, quantitySold, quantityExpired, agentRemarks, date } = body;

    // Get the current user by employeeId from session
    const employeeId = (session.user as SessionUser).employeeId;
    if (!employeeId) {
      console.error('No employee ID in session:', session.user);
      return NextResponse.json({ error: 'Session data incomplete - Please log in again' }, { status: 401 });
    }

    const user = await User.findOne({ employeeId });
    if (!user) {
      console.error('User not found for employee ID:', employeeId);
      return NextResponse.json({ error: 'User account not found - Please contact support' }, { status: 404 });
    }

    // Only agents can submit sales data
    if (user.role !== 'agent') {
      return NextResponse.json({ error: 'Only agents can submit sales data' }, { status: 403 });
    }

    // Check if an entry already exists for this date and milk type
    const existingEntry = await Sale.findOne({
      agentId: employeeId,
      date: {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59, 999))
      },
      milkType
    });

    if (existingEntry) {
      // Update existing entry
      existingEntry.quantityReceived = quantityReceived;
      existingEntry.quantitySold = quantitySold;
      existingEntry.quantityExpired = quantityExpired;
      existingEntry.agentRemarks = agentRemarks;
      await existingEntry.save();

      return NextResponse.json({ message: 'Sales data updated successfully', data: existingEntry });
    }

    // Validate zone, area, and subArea hierarchy
    if (!validateHierarchy(user.zone, user.area, user.subArea)) {
      return NextResponse.json({ error: 'Invalid zone, area, or sub-area assignment' }, { status: 400 });
    }

    // Create new entry
    const sale = new Sale({
      agentId: employeeId,
      date: new Date(date),
      milkType,
      quantityReceived,
      quantitySold,
      quantityExpired,
      agentRemarks,
      zone: user.zone,
      area: user.area,
      subArea: user.subArea
    });

    await sale.save();

    return NextResponse.json({ message: 'Sales data saved successfully', data: sale });
  } catch (error: any) {
    console.error('Error in sales API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save sales data - Please try again' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 });
    }

    const employeeId = (session.user as SessionUser).employeeId;
    if (!employeeId) {
      return NextResponse.json({ error: 'Session data incomplete - Please log in again' }, { status: 401 });
    }

    // Get the current user and verify their role
    const user = await User.findOne({ employeeId });
    if (!user) {
      return NextResponse.json({ error: 'User not found - Please log in again' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const requestedZone = searchParams.get('zone');
    const requestedArea = searchParams.get('area');
    const requestedSubArea = searchParams.get('subArea');

    const query: any = {};

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

    const sales = await Sale.find(query)
      .populate('agentId', 'name employeeId zone role area subArea')
      .sort({ date: -1 });

    return NextResponse.json({ data: sales });
  } catch (error: any) {
    console.error('Error in sales API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
} 