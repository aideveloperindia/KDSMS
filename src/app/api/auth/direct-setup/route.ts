import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Create all users with hardcoded data
    const createdUsers = [];
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Management and AGM
    const managementUsers = [
      { employeeId: 'MGMT-001', name: 'Tarun', role: 'Management', zone: 0, area: 0, subArea: 0, subAreaName: 'Management Office' },
      { employeeId: 'AGM-001', name: 'Varun', role: 'AGM', zone: 0, area: 0, subArea: 0, subAreaName: 'AGM Office' }
    ];

    // Zone Managers
    const zoneManagers = [
      { employeeId: 'ZM-Z1-001', name: 'Reddy Rajesh', role: 'Zone Manager', zone: 1, area: 0, subArea: 0, subAreaName: 'Zone 1 Office' },
      { employeeId: 'ZM-Z2-001', name: 'Patel Suresh', role: 'Zone Manager', zone: 2, area: 0, subArea: 0, subAreaName: 'Zone 2 Office' },
      { employeeId: 'ZM-Z3-001', name: 'Sharma Vikram', role: 'Zone Manager', zone: 3, area: 0, subArea: 0, subAreaName: 'Zone 3 Office' },
      { employeeId: 'ZM-Z4-001', name: 'Yadav Ramesh', role: 'Zone Manager', zone: 4, area: 0, subArea: 0, subAreaName: 'Zone 4 Office' },
      { employeeId: 'ZM-Z5-001', name: 'Goud Prasad', role: 'Zone Manager', zone: 5, area: 0, subArea: 0, subAreaName: 'Zone 5 Office' },
      { employeeId: 'ZM-Z6-001', name: 'Shetty Kiran', role: 'Zone Manager', zone: 6, area: 0, subArea: 0, subAreaName: 'Zone 6 Office' }
    ];

    // Sample Executives and Agents (I'll create a representative set)
    const executives = [];
    const agents = [];

    // Create 24 executives (4 per zone)
    for (let zone = 1; zone <= 6; zone++) {
      for (let area = 1; area <= 4; area++) {
        const globalArea = (zone - 1) * 4 + area;
        executives.push({
          employeeId: `EXE-Z${zone}A${area}-001`,
          name: `Executive ${zone}-${area}`,
          role: 'Executive',
          zone: zone,
          area: globalArea,
          subArea: 0,
          subAreaName: `Area ${area} Office`
        });
      }
    }

    // Create 480 agents (20 per area)
    for (let zone = 1; zone <= 6; zone++) {
      for (let area = 1; area <= 4; area++) {
        const globalArea = (zone - 1) * 4 + area;
        for (let agent = 1; agent <= 20; agent++) {
          const subArea = (globalArea - 1) * 20 + agent;
          agents.push({
            employeeId: `AGT-Z${zone}A${area}-${agent.toString().padStart(3, '0')}`,
            name: `Agent ${zone}-${area}-${agent}`,
            role: 'Agent',
            zone: zone,
            area: globalArea,
            subArea: subArea,
            subAreaName: `Sub Area ${subArea}`
          });
        }
      }
    }

    // Combine all users
    const allUsers = [...managementUsers, ...zoneManagers, ...executives, ...agents];

    // Create users in database
    for (const userData of allUsers) {
      const user = new User({
        employeeId: userData.employeeId,
        name: userData.name,
        role: userData.role,
        zone: userData.zone,
        area: userData.area,
        subArea: userData.subArea,
        subAreaName: userData.subAreaName,
        password: hashedPassword
      });
      
      await user.save();
      createdUsers.push(user);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdUsers.length} users`,
      breakdown: {
        management: managementUsers.length,
        agm: 1,
        zoneManagers: zoneManagers.length,
        executives: executives.length,
        agents: agents.length
      },
      sampleUsers: [
        { username: 'MGMT-001', password: 'password123', role: 'Management' },
        { username: 'AGM-001', password: 'password123', role: 'AGM' },
        { username: 'ZM-Z1-001', password: 'password123', role: 'Zone Manager' },
        { username: 'EXE-Z1A1-001', password: 'password123', role: 'Executive' },
        { username: 'AGT-Z1A1-001', password: 'password123', role: 'Agent' },
        { username: 'AGT-Z5A1-008', password: 'password123', role: 'Agent' }
      ]
    });

  } catch (error) {
    console.error('Direct setup error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 