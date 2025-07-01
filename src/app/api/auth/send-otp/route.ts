import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { phone } = await request.json();

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is inactive' },
        { status: 403 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // TODO: Integrate with actual SMS service
    console.log(`OTP for ${phone}: ${otp}`);

    // Store OTP in session or cache with expiration
    // For now, we'll just return it (NOT FOR PRODUCTION)
    return NextResponse.json({ otp });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
} 