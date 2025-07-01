import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Sale from '@/models/Sale';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // TODO: Get actual user ID from session
    const userId = '507f1f77bcf86cd799439011'; // Temporary mock user ID

    const sale = new Sale({
      ...body,
      userId,
      date: new Date(body.date || Date.now())
    });

    await sale.save();

    return NextResponse.json(sale, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'An entry for this milk type already exists for today' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create sale entry' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const milkType = searchParams.get('milkType');
    
    // TODO: Get actual user ID from session
    const userId = '507f1f77bcf86cd799439011'; // Temporary mock user ID

    const query: any = { userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (milkType && milkType !== 'all') {
      query.milkType = milkType;
    }

    const sales = await Sale.find(query)
      .sort({ date: -1 })
      .limit(100);

    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
} 