import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    // Get total user count
    const totalUsers = await User.countDocuments();

    // Find users without subArea
    const usersWithoutSubArea = await User.countDocuments({
      $or: [
        { subArea: { $exists: false } },
        { subArea: undefined },
        { subArea: null }
      ]
    });

    // Get sample users to show their current state
    const sampleUsers = await User.find({
      role: { $in: ['Agent', 'Executive'] }
    }).limit(10).select('username role subArea');

    return NextResponse.json({ 
      success: true,
      totalUsers,
      usersWithoutSubArea,
      sampleUsers
    });
  } catch (error) {
    console.error('Error checking users:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to check users' 
    }, { status: 500 });
  }
} 