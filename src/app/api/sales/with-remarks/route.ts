import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Sale from '@/models/Sale';
import User from '@/models/User';
import connectDB from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.phone) {
      return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const zone = searchParams.get('zone');
    const area = searchParams.get('area');
    const subArea = searchParams.get('subArea');
    const viewMode = searchParams.get('viewMode') || 'subArea';

    // Get the user's role and permissions
    const user = await User.findOne({ phone: session.user.phone });
    if (!user) {
      return NextResponse.json({ error: 'User not found - Please log in again' }, { status: 404 });
    }

    // Build query based on user role and filters
    const query: any = {};

    // Date filter
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    // Access control and filters based on role
    switch (user.role) {
      case 'ZM':
        query.zone = user.zone;
        if (area) query.area = area;
        if (subArea) query.subArea = subArea;
        break;

      case 'AGM':
        if (zone) {
          // AGM can only access their assigned zones
          if (!user.zones?.includes(zone)) {
            return NextResponse.json({ error: 'Unauthorized zone access' }, { status: 403 });
          }
          query.zone = zone;
        } else {
          query.zone = { $in: user.zones || [] };
        }
        if (area) query.area = area;
        if (subArea) query.subArea = subArea;
        break;

      case 'Management':
        if (zone) query.zone = zone;
        if (area) query.area = area;
        if (subArea) query.subArea = subArea;
        break;

      default:
        return NextResponse.json({ error: 'Unauthorized role' }, { status: 403 });
    }

    // Fetch sales with populated executive details
    const sales = await Sale.find(query)
      .sort({ date: -1, subArea: 1 })
      .populate('userId', 'name subArea area zone')
      .populate('executiveId', 'name')
      .limit(100);

    // Transform the data
    const transformedSales = sales.map(sale => ({
      id: sale._id.toString(),
      date: sale.date,
      agentName: sale.userId.name,
      subArea: sale.userId.subArea,
      area: sale.userId.area,
      zone: sale.userId.zone,
      milkType: sale.milkType,
      quantityReceived: sale.quantityReceived,
      quantitySold: sale.quantitySold,
      quantityExpired: sale.quantityExpired,
      unsoldQuantity: sale.unsoldQuantity,
      agentRemarks: sale.agentRemarks,
      executiveRemarks: sale.executiveRemarks,
      executiveId: sale.executiveId ? {
        name: sale.executiveId.name
      } : undefined,
      executiveRemarkTime: sale.executiveRemarkTime
    }));

    return NextResponse.json(transformedSales);
  } catch (error) {
    console.error('Error fetching sales with remarks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales data - Please try again' },
      { status: 500 }
    );
  }
} 