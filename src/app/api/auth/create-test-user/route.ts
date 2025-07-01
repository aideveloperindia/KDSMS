import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const testUser = {
      name: 'Test User',
      phone: '9505009699', // Using the phone number from the screenshot
      role: 'agent',
      zone: 'Karimnagar',
      isActive: true
    };

    // Check if user already exists
    const existingUser = await User.findOne({ phone: testUser.phone });
    if (existingUser) {
      return NextResponse.json({ message: 'Test user already exists' });
    }

    // Create new user
    const user = await User.create(testUser);

    return NextResponse.json({ 
      message: 'Test user created successfully',
      user: {
        name: user.name,
        phone: user.phone,
        role: user.role,
        zone: user.zone
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    return NextResponse.json(
      { error: 'Failed to create test user' },
      { status: 500 }
    );
  }
} 