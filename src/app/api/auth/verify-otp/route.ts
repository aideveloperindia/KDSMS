import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { phone, otp, jobName } = await request.json();

    if (!phone || !otp || !jobName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (otp !== '123456') {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ phone, role: jobName });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Account is inactive' },
        { status: 403 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // In a real application, you would:
    // 1. Generate a JWT token
    // 2. Set up proper session management
    // 3. Handle secure cookie storage

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        zone: user.zone
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
} 