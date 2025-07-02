import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { phone, role } = await request.json();

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json(
        { message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (!role) {
      return NextResponse.json(
        { message: 'Role is required' },
        { status: 400 }
      );
    }

    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
      );
    }

    try {
      // Find or create user with the given role
      let user = await User.findOne({ phone });
      if (!user) {
        user = await User.create({
          phone,
          role,
          name: `${role} ${phone.slice(-4)}`, // Temporary name based on role and last 4 digits
          district: 'Test District', // Adding required field
          isActive: true
        });
      } else {
        // Update user's role if it has changed
        if (user.role !== role) {
          user.role = role;
          await user.save();
        }
      }

      // In a real application, you would send an actual OTP via SMS
      // For this demo, we're using a static OTP: 123456
      console.log(`OTP for ${phone}: 123456`); // Log the OTP for testing

      return NextResponse.json(
        { message: 'OTP sent successfully' },
        { status: 200 }
      );
    } catch (userError) {
      console.error('User operation error:', userError);
      return NextResponse.json(
        { message: 'Failed to process user' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
} 