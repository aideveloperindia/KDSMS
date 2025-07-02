import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    // Create test users in order (Management first, then AGM, etc.)
    // so we can reference their IDs for supervisor relationships
    await User.deleteMany({}); // Clear existing users

    // 1. Create Management user first
    const managementUser = await User.create({
      name: 'Test Management',
      phone: '9876543213',
      role: 'Management',
      district: 'Test District',
      isActive: true
    });

    // 2. Create AGM user
    const agmUser = await User.create({
      name: 'Test AGM',
      phone: '9876543212',
      role: 'AGM',
      district: 'Test District',
      isActive: true
    });

    // 3. Create ZM user
    const zmUser = await User.create({
      name: 'Test ZM',
      phone: '9876543211',
      role: 'ZM',
      zone: 'Zone 1',
      district: 'Test District',
      isActive: true
    });

    // 4. Create Executive user
    const executiveUser = await User.create({
      name: 'Test Executive',
      phone: '9876543210',
      role: 'Executive',
      area: 'Area 1',
      zone: 'Zone 1',
      district: 'Test District',
      isActive: true
    });

    // 5. Finally create Agent user with supervisor reference
    const agentUser = await User.create({
      name: 'Test Agent',
      phone: '9505009699',
      role: 'Agent',
      area: 'Area 1',
      subArea: 'Sub Area 1',
      zone: 'Zone 1',
      district: 'Test District',
      supervisor: executiveUser._id, // Reference to the executive as supervisor
      isActive: true
    });

    return NextResponse.json({ 
      message: 'Test users created successfully',
      users: [managementUser, agmUser, zmUser, executiveUser, agentUser]
    });
  } catch (error) {
    console.error('Error setting up test users:', error);
    return NextResponse.json(
      { message: 'Failed to set up test users' },
      { status: 500 }
    );
  }
}