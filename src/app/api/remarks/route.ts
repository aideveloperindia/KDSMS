import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Sale from '@/models/Sale';
import ExecutiveRemark from '@/models/ExecutiveRemark';
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
    const authorRole = searchParams.get('authorRole');

    // Build date filter if specified
    const dateFilter = date ? {
      $gte: new Date(date),
      $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
    } : undefined;

    // Build zone filter
    const zoneFilter = zoneId || zone ? { zone: zoneId || zone } : {};

    // Fetch agent remarks (from sales)
    let agentRemarks: any[] = [];
    if (!authorRole || authorRole === 'agent') {
      const salesQuery = {
        remarks: { $exists: true, $ne: '' },
        ...(dateFilter && { date: dateFilter })
      };

      const sales = await Sale.find(salesQuery)
        .sort({ date: -1 })
        .limit(50)
        .populate({
          path: 'userId',
          match: zoneFilter,
          select: 'name zone area role'
        });

      agentRemarks = sales
        .filter(sale => sale.userId) // Filter out sales where user didn't match zone filter
        .map(sale => ({
          id: sale._id.toString(),
          authorName: sale.userId.name,
          authorRole: 'agent',
          zone: sale.userId.zone,
          area: sale.userId.area,
          date: sale.date,
          content: sale.remarks,
          milkType: sale.milkType
        }));
    }

    // Fetch executive remarks
    let executiveRemarks: any[] = [];
    if (!authorRole || authorRole === 'executive') {
      const executiveQuery = {
        ...(dateFilter && { date: dateFilter })
      };

      const remarks = await ExecutiveRemark.find(executiveQuery)
        .sort({ date: -1 })
        .limit(50)
        .populate({
          path: 'executiveId',
          match: zoneFilter,
          select: 'name zone area role'
        });

      executiveRemarks = remarks
        .filter(remark => remark.executiveId) // Filter out remarks where executive didn't match zone filter
        .map(remark => ({
          id: remark._id.toString(),
          authorName: remark.executiveId.name,
          authorRole: 'executive',
          zone: remark.executiveId.zone,
          area: remark.executiveId.area,
          date: remark.date,
          content: remark.content
        }));
    }

    // Combine and sort remarks by date
    const allRemarks = [...agentRemarks, ...executiveRemarks]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 50); // Limit to 50 most recent remarks

    return NextResponse.json(allRemarks);
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
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get the user from the database
    const user = await User.findOne({ email: session.user.email });
    if (!user || user.role !== 'executive') {
      return NextResponse.json({ error: 'Unauthorized - Executive only' }, { status: 403 });
    }

    const { content } = await request.json();
    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Invalid remark content' }, { status: 400 });
    }

    // Create new executive remark
    const remark = new ExecutiveRemark({
      executiveId: user._id,
      content: content.trim(),
      date: new Date()
    });

    await remark.save();

    return NextResponse.json({ message: 'Remark added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating remark:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 