import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

type UserRole = 'agent' | 'executive' | 'zm' | 'agm' | 'management';

interface CreateUserRequest {
  name: string;
  employeeId: string;
  password: string;
  role: UserRole;
  zone?: number;
  area?: number;
  subArea?: number;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json() as CreateUserRequest;
    const { name, employeeId, password, role, zone, area, subArea } = body;

    // Validate required fields
    if (!name || !employeeId || !password || !role) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ employeeId });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this employee ID already exists' },
        { status: 400 }
      );
    }

    // Validate zone, area, and subArea based on role
    if (['agent', 'executive', 'zm'].includes(role) && !zone) {
      return NextResponse.json(
        { message: 'Zone is required for this role' },
        { status: 400 }
      );
    }

    if (['agent', 'executive'].includes(role) && !area) {
      return NextResponse.json(
        { message: 'Area is required for this role' },
        { status: 400 }
      );
    }

    if (role === 'agent' && !subArea) {
      return NextResponse.json(
        { message: 'Sub-area is required for agents' },
        { status: 400 }
      );
    }

    // Validate zone numbers (1-6)
    if (zone && (zone < 1 || zone > 6)) {
      return NextResponse.json(
        { message: 'Zone number must be between 1 and 6' },
        { status: 400 }
      );
    }

    // Validate area numbers (1-24, 4 areas per zone)
    if (area) {
      if (area < 1 || area > 24) {
        return NextResponse.json(
          { message: 'Area number must be between 1 and 24' },
          { status: 400 }
        );
      }
      const expectedZone = Math.ceil(area / 4);
      if (zone !== expectedZone) {
        return NextResponse.json(
          { message: `Area ${area} must belong to zone ${expectedZone}` },
          { status: 400 }
        );
      }
    }

    // Validate sub-area numbers (1-480, 20 sub-areas per area)
    if (subArea) {
      if (subArea < 1 || subArea > 480) {
        return NextResponse.json(
          { message: 'Sub-area number must be between 1 and 480' },
          { status: 400 }
        );
      }
      const expectedArea = Math.ceil(subArea / 20);
      if (area !== expectedArea) {
        return NextResponse.json(
          { message: `Sub-area ${subArea} must belong to area ${expectedArea}` },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      employeeId,
      password: hashedPassword,
      role,
      zone,
      area,
      subArea,
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
      { message: 'Failed to create user', error: (error as Error).message },
      { status: 500 }
    );
  }
} 