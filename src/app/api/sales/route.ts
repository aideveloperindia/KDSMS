import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Sale from '@/models/Sale';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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

    // Get the current user by phone number from session
    const userPhone = session.user.phone;
    if (!userPhone) {
      console.error('No phone number in session:', session.user);
      return NextResponse.json({ error: 'Session data incomplete - Please log in again' }, { status: 401 });
    }

    const user = await User.findOne({ phone: userPhone });
    if (!user) {
      console.error('User not found for phone:', userPhone);
      return NextResponse.json({ error: 'User account not found - Please contact support' }, { status: 404 });
    }

    // Check if an entry already exists for this date and milk type
    const existingEntry = await Sale.findOne({
      userId: user._id,
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

    // Create new entry
    const sale = new Sale({
      userId: user._id,
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
    if (!session?.user?.phone) {
      return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 });
    }

    // Get the current user and verify their role
    const user = await User.findOne({ phone: session.user.phone });
    if (!user) {
      return NextResponse.json({ error: 'User not found - Please log in again' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const requestedZone = searchParams.get('zone');

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
      case 'ZM':
        // ZM can only see their assigned zone
        query.zone = user.zone;
        if (requestedZone && requestedZone !== user.zone) {
          return NextResponse.json({ 
            error: 'Unauthorized - You can only access data from your assigned zone' 
          }, { status: 403 });
        }
        break;

      case 'AGM':
        // AGM can see specific zones if they have access
        if (requestedZone) {
          if (!user.zones?.includes(requestedZone)) {
            return NextResponse.json({ 
              error: 'Unauthorized - You do not have access to this zone' 
            }, { status: 403 });
          }
          query.zone = requestedZone;
        } else {
          query.zone = { $in: user.zones || [] };
        }
        break;

      case 'Management':
        // Management can see all zones or filter by specific zone
        if (requestedZone) {
          query.zone = requestedZone;
        }
        break;

      case 'Executive':
        // Executive can only see their area
        query.area = user.area;
        query.zone = user.zone;
        break;

      case 'Agent':
        // Agent can only see their own sales
        query.userId = user._id;
        break;

      default:
        return NextResponse.json({ error: 'Invalid role' }, { status: 403 });
    }

    const sales = await Sale.find(query)
      .populate('userId', 'name phone zone role area subArea')
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