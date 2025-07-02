import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { phone, name, jobName, area, subArea, zone, district } = await request.json();

    // Validate required fields
    if (!phone || !name || !jobName || !district) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number format
    if (!/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json(
        { message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this phone number already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      phone,
      name,
      role: jobName,
      area,
      subArea,
      zone,
      district,
      isActive: true
    });

    await user.save();

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
} 