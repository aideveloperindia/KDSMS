import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const SETUP_KEY = 'kdsms-setup-2024';

// Hardcoded user data - all 512 users
const createAllUsers = () => {
  const users: any[] = [];
  
  // Management
  users.push({
    name: 'Tarun',
    employeeId: 'MGMT-001',
    password: 'password123',
    role: 'management'
  });
  
  // AGM
  users.push({
    name: 'Varun',
    employeeId: 'AGM-001',
    password: 'password123',
    role: 'agm'
  });
  
  // Zone Managers
  const zoneManagers = [
    { name: 'Reddy Rajesh', zone: 1, zoneName: 'Karimnagar Central' },
    { name: 'Sharma Suresh', zone: 2, zoneName: 'Karimnagar East' },
    { name: 'Shetty Ramesh', zone: 3, zoneName: 'Karimnagar West' },
    { name: 'Shetty Sharma', zone: 4, zoneName: 'Karimnagar Rural' },
    { name: 'Chary Mahesh', zone: 5, zoneName: 'Karimnagar South' },
    { name: 'Sai Dinesh', zone: 6, zoneName: 'Karimnagar North' }
  ];
  
  zoneManagers.forEach((zm, index) => {
    users.push({
      name: zm.name,
      employeeId: `ZM-Z${zm.zone}-001`,
      password: 'password123',
      role: 'zm',
      zone: zm.zone,
      zoneName: zm.zoneName
    });
  });
  
  // Executives and Agents for each area
  const areas = [
    // Zone 1 areas (1-4)
    { area: 1, zone: 1, zoneName: 'Karimnagar Central', areaName: 'Kothirampur Colony' },
    { area: 2, zone: 1, zoneName: 'Karimnagar Central', areaName: 'Vavilalapalli' },
    { area: 3, zone: 1, zoneName: 'Karimnagar Central', areaName: 'Gopalapuram' },
    { area: 4, zone: 1, zoneName: 'Karimnagar Central', areaName: 'Rampur' },
    
    // Zone 2 areas (5-8)
    { area: 5, zone: 2, zoneName: 'Karimnagar East', areaName: 'Choppadandi Road' },
    { area: 6, zone: 2, zoneName: 'Karimnagar East', areaName: 'Mankamma Thota' },
    { area: 7, zone: 2, zoneName: 'Karimnagar East', areaName: 'Ujwala Nagar' },
    { area: 8, zone: 2, zoneName: 'Karimnagar East', areaName: 'Deshrajpally' },
    
    // Zone 3 areas (9-12)
    { area: 9, zone: 3, zoneName: 'Karimnagar West', areaName: 'Ramnagar' },
    { area: 10, zone: 3, zoneName: 'Karimnagar West', areaName: 'Sapthagiri Colony' },
    { area: 11, zone: 3, zoneName: 'Karimnagar West', areaName: 'Rekurthi' },
    { area: 12, zone: 3, zoneName: 'Karimnagar West', areaName: 'Bommakal' },
    
    // Zone 4 areas (13-16)
    { area: 13, zone: 4, zoneName: 'Karimnagar Rural', areaName: 'Kothapalli' },
    { area: 14, zone: 4, zoneName: 'Karimnagar Rural', areaName: 'Laxmipur' },
    { area: 15, zone: 4, zoneName: 'Karimnagar Rural', areaName: 'Manakondur' },
    { area: 16, zone: 4, zoneName: 'Karimnagar Rural', areaName: 'Thimmapur' },
    
    // Zone 5 areas (17-20)
    { area: 17, zone: 5, zoneName: 'Karimnagar South', areaName: 'Alugunur' },
    { area: 18, zone: 5, zoneName: 'Karimnagar South', areaName: 'Chintakunta' },
    { area: 19, zone: 5, zoneName: 'Karimnagar South', areaName: 'Kothapalli' },
    { area: 20, zone: 5, zoneName: 'Karimnagar South', areaName: 'Ramnagar' },
    
    // Zone 6 areas (21-24)
    { area: 21, zone: 6, zoneName: 'Karimnagar North', areaName: 'Manakondur' },
    { area: 22, zone: 6, zoneName: 'Karimnagar North', areaName: 'Sultanabad' },
    { area: 23, zone: 6, zoneName: 'Karimnagar North', areaName: 'Boinpally' },
    { area: 24, zone: 6, zoneName: 'Karimnagar North', areaName: 'Kataram' }
  ];
  
  // Sample names for variety
  const executiveNames = [
    'Reddy Suresh', 'Sharma Mahesh', 'Shetty Rajesh', 'Chary Ramesh', 'Sai Kumar',
    'Patel Dinesh', 'Reddy Naresh', 'Sharma Ganesh', 'Shetty Venkat', 'Chary Anil',
    'Sai Prakash', 'Patel Ravi', 'Reddy Kiran', 'Sharma Mohan', 'Shetty Arjun',
    'Chary Deepak', 'Sai Vikram', 'Patel Ashok', 'Reddy Srinu', 'Sharma Balu',
    'Shetty Chandu', 'Chary Hari', 'Sai Raju', 'Patel Mani'
  ];
  
  const agentNames = [
    'Reddy Santosh', 'Sharma Vamshi', 'Shetty Divya', 'Chary Soumya', 'Sai Sneha',
    'Patel Srinivas', 'Reddy Harsha', 'Sharma Bhavana', 'Shetty Lavanya', 'Chary Tejaswi',
    'Sai Harika', 'Patel Swathi', 'Reddy Anusha', 'Sharma Nikhil', 'Shetty Tarun',
    'Chary Arun', 'Sai Anil', 'Patel Manoj', 'Reddy Ramesh', 'Sharma Kiran'
  ];
  
  areas.forEach((areaInfo, areaIndex) => {
    // Add Executive for this area
    users.push({
      name: executiveNames[areaIndex % executiveNames.length],
      employeeId: `EXE-Z${areaInfo.zone}A${areaIndex + 1}-001`,
      password: 'password123',
      role: 'executive',
      zone: areaInfo.zone,
      zoneName: areaInfo.zoneName,
      area: areaInfo.area,
      areaName: areaInfo.areaName
    });
    
    // Add 20 Agents for this area
    for (let agentNum = 1; agentNum <= 20; agentNum++) {
      const subArea = (areaInfo.area - 1) * 20 + agentNum;
      const subAreaName = `Sub Area ${subArea}`;
      
      users.push({
        name: agentNames[(agentNum - 1) % agentNames.length],
        employeeId: `AGT-Z${areaInfo.zone}A${areaIndex + 1}-${agentNum.toString().padStart(3, '0')}`,
        password: 'password123',
        role: 'agent',
        zone: areaInfo.zone,
        zoneName: areaInfo.zoneName,
        area: areaInfo.area,
        areaName: areaInfo.areaName,
        subArea: subArea,
        subAreaName: subAreaName
      });
    }
  });
  
  return users;
};

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
    console.log('Connected to database for direct setup');

    // Create all users
    const users = createAllUsers();
    console.log(`Generated ${users.length} users`);

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    await User.insertMany(usersWithHashedPasswords);
    console.log(`Created ${users.length} users successfully`);

    return NextResponse.json({ 
      success: true, 
      message: 'All users created successfully',
      count: users.length
    });
  } catch (error) {
    console.error('Error in direct setup:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to setup users' 
    }, { status: 500 });
  }
} 