import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Sale from '@/models/Sale';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { saleId: string } }
) {
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

    const { remarks } = await request.json();
    if (!remarks || typeof remarks !== 'string' || !remarks.trim()) {
      return NextResponse.json({ error: 'Invalid remarks' }, { status: 400 });
    }

    // Find the sale and update executive remarks
    const sale = await Sale.findById(params.saleId);
    if (!sale) {
      return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
    }

    // Verify executive has access to this agent's area
    if (sale.area !== user.area) {
      return NextResponse.json({ error: 'Unauthorized - Wrong area' }, { status: 403 });
    }

    // Update the sale with executive remarks
    sale.executiveRemarks = remarks.trim();
    sale.executiveId = user._id;
    sale.executiveRemarkTime = new Date();
    await sale.save();

    return NextResponse.json({ message: 'Remarks added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding executive remarks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 