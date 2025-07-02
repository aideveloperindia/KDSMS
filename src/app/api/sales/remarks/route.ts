import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Sale from '@/models/Sale';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const zoneId = searchParams.get('zoneId');
    const zone = searchParams.get('zone');
    const date = searchParams.get('date');

    // Build query based on filters
    const query: any = {
      remarks: { $exists: true, $ne: '' }
    };

    if (zoneId) {
      // For ZM role - only show remarks from their zone
      query['userId'] = { $in: await getUsersByZone(zoneId) };
    }

    if (zone) {
      // For AGM/Management filtering
      query['userId'] = { $in: await getUsersByZone(zone) };
    }

    if (date) {
      // Filter by date if specified
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = {
        $gte: startDate,
        $lt: endDate
      };
    }

    // Fetch sales with remarks
    const sales = await Sale.find(query)
      .sort({ date: -1 })
      .limit(50)
      .populate('userId', 'name zone area');

    // Transform the data
    const remarks = await Promise.all(sales.map(async (sale) => ({
      id: sale._id.toString(),
      agentName: sale.userId.name,
      zone: sale.userId.zone,
      area: sale.userId.area,
      date: sale.date,
      content: sale.remarks,
      milkType: sale.milkType
    })));

    return NextResponse.json(remarks);
  } catch (error) {
    console.error('Error fetching remarks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to get user IDs by zone
async function getUsersByZone(zone: string) {
  const users = await User.find({ zone, role: 'agent' });
  return users.map(user => user._id);
} 