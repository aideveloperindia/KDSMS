import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { parseLoginFile } from './data';
import bcrypt from 'bcryptjs';

const SETUP_KEY = 'kdsms-setup-2024';

export async function POST(request: Request) {
  try {
    const { setupKey, fixSubArea } = await request.json();

    if (setupKey !== SETUP_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid setup key' 
      }, { status: 401 });
    }

    await connectDB();

    // If fixSubArea flag is set, just fix existing users
    if (fixSubArea) {
      console.log('Fixing subArea for existing users...');
      
      // Find all agents and executives (they need subArea)
      const usersWithoutSubArea = await User.find({
        role: { $in: ['Agent', 'Executive'] },
        $or: [
          { subArea: { $exists: false } },
          { subArea: undefined },
          { subArea: null }
        ]
      });
      
      console.log(`Found ${usersWithoutSubArea.length} users without subArea`);
      
      let fixedCount = 0;
      
      // Fix each user
      for (const user of usersWithoutSubArea) {
        console.log(`Fixing user: ${user.username}`);
        
        let subArea = null;
        
        if (user.role === 'Agent' || user.role === 'Executive') {
          // Parse username like AGT-Z5A1-008 or EXE-Z4A3-001
          const match = user.username.match(/([A-Z]+)-Z(\d+)A(\d+)-(\d+)/);
          if (match) {
            const [, role, zone, area, number] = match;
            const currentArea = parseInt(area);
            const agentNum = parseInt(number);
            
            // Calculate subArea: (currentArea - 1) * 20 + agentNum
            subArea = (currentArea - 1) * 20 + agentNum;
            
            console.log(`  Zone: ${zone}, Area: ${area}, Number: ${number} -> subArea: ${subArea}`);
          }
        }
        
        if (subArea !== null) {
          // Update the user
          await User.updateOne(
            { _id: user._id },
            { $set: { subArea: subArea } }
          );
          console.log(`  Updated ${user.username} with subArea: ${subArea}`);
          fixedCount++;
        } else {
          console.log(`  Skipped ${user.username} (not Agent/Executive or couldn't parse)`);
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'SubArea fix completed successfully',
        count: fixedCount
      });
    }

    // Original user setup logic
    // Parse the login file
    const users = parseLoginFile();
    
    console.log(`Parsed ${users.length} users from file`);

    // Clear existing users
    await User.deleteMany({});

    // Hash passwords manually before saving to avoid double hashing
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    // Create new users with insertMany to bypass pre-save hooks
    await User.insertMany(usersWithHashedPasswords);

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