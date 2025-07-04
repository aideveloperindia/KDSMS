import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Sale from '@/models/Sale';
import User from '@/models/User';

type UserRole = 'agent' | 'executive' | 'zm' | 'agm' | 'management';

export async function POST(req: Request) {
  try {
    // For demo purposes, we'll accept sales data without authentication
    // In production, you would check authentication here
    
    // Connect to database first
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json({ error: 'Database connection failed - Please try again' }, { status: 500 });
    }

    const body = await req.json();
    const { milkType, quantityReceived, quantitySold, quantityExpired, agentRemarks, date, employeeId } = body;

    // For demo purposes, use a default agent if no employeeId provided
    const defaultEmployeeId = employeeId || 'AGT-Z1A1-001';

    // Create demo sale entry
    const sale = {
      agentId: defaultEmployeeId,
      date: new Date(date || new Date()),
      milkType: milkType || 'full_cream',
      quantityReceived: quantityReceived || 0,
      quantitySold: quantitySold || 0,
      quantityExpired: quantityExpired || 0,
      agentRemarks: agentRemarks || '',
      zone: 1,
      area: 1,
      subArea: 1
    };

    // For demo purposes, just return success without actually saving to database
    return NextResponse.json({ 
      message: 'Sales data saved successfully (Demo Mode)', 
      data: sale 
    });

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
    // For demo purposes, return sample sales data
    const sampleSales = [
      {
        _id: '1',
        agentId: 'AGT-Z1A1-001',
        date: new Date(),
        milkType: 'full_cream',
        quantityReceived: 50,
        quantitySold: 48,
        quantityExpired: 2,
        agentRemarks: 'Good sales today',
        zone: 1,
        area: 1,
        subArea: 1
      },
      {
        _id: '2',
        agentId: 'AGT-Z1A1-001',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        milkType: 'full_cream',
        quantityReceived: 52,
        quantitySold: 50,
        quantityExpired: 2,
        agentRemarks: 'Regular sales',
        zone: 1,
        area: 1,
        subArea: 1
      }
    ];

    return NextResponse.json({ 
      message: 'Sales data retrieved successfully (Demo Mode)', 
      data: sampleSales 
    });

  } catch (error: any) {
    console.error('Error in sales API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve sales data' },
      { status: 500 }
    );
  }
} 