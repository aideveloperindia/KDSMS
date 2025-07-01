import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Create management user first
    const management = await User.create({
      name: 'Management User',
      phone: '9876543213',
      role: 'management',
      isActive: true
    });

    // Create AGM
    const agm = await User.create({
      name: 'AGM User',
      phone: '9876543212',
      role: 'agm',
      isActive: true
    });

    // Create Zonal Manager
    const zonalManager = await User.create({
      name: 'Zonal Manager',
      phone: '9876543211',
      role: 'zonal_manager',
      zone: 'Karimnagar',
      isActive: true
    });

    // Create Executive
    const executive = await User.create({
      name: 'Executive User',
      phone: '9876543210',
      role: 'executive',
      zone: 'Karimnagar',
      isActive: true
    });

    // Create Agent (with your phone number)
    const agent = await User.create({
      name: 'Agent User',
      phone: '9505009699',
      role: 'agent',
      zone: 'Karimnagar',
      supervisor: executive._id,
      isActive: true
    });

    return NextResponse.json({
      message: 'Test users created successfully',
      users: [management, agm, zonalManager, executive, agent].map(user => ({
        name: user.name,
        phone: user.phone,
        role: user.role,
        zone: user.zone
      }))
    });
  } catch (error: any) {
    console.error('Error creating test users:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create test users' },
      { status: 500 }
    );
  }
} 