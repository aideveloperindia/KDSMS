import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { parseLoginFile } from './data';

const SETUP_KEY = 'kdsms-setup-2024';

export async function POST(request: Request) {
  try {
    const { setupKey } = await request.json();

    if (setupKey !== SETUP_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid setup key' 
      }, { status: 401 });
    }

    await connectDB();

    // Parse the login file
    const users = parseLoginFile();

    // Clear existing users
    await User.deleteMany({});

    // Create new users
    await User.create(users);

    return NextResponse.json({ 
      success: true, 
      message: 'Users created successfully',
      count: users.length
    });
  } catch (error) {
    console.error('Error setting up users:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to setup users' 
    }, { status: 500 });
  }
}