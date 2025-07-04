import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Read the NEW LOGINS.txt file
    const filePath = path.join(process.cwd(), 'NEW LOGINS.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the file content
    const users = parseUsersFromFile(fileContent);
    
    // Clear existing users
    await User.deleteMany({});
    
    // Create all users
    const createdUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const user = new User({
        employeeId: userData.username,
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
      users: createdUsers.map(u => ({
        username: u.employeeId,
        name: u.name,
        role: u.role,
        zone: u.zone,
        area: u.area,
        subArea: u.subArea,
        subAreaName: u.subAreaName
      }))
    });

  } catch (error) {
    console.error('Setup users error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function parseUsersFromFile(content: string) {
  const users = [];
  const lines = content.split('\n');
  
  let currentZone = 0;
  let currentArea = 0;
  let globalAreaCounter = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Parse Management
    if (line.includes('Name: Tarun') && lines[i+1]?.includes('ID: MGMT-001')) {
      users.push({
        username: 'MGMT-001',
        name: 'Tarun',
        role: 'Management',
        zone: 0,
        area: 0,
        subArea: 0,
        subAreaName: 'Management Office'
      });
    }
    
    // Parse AGM
    if (line.includes('Name: Varun') && lines[i+1]?.includes('ID: AGM-001')) {
      users.push({
        username: 'AGM-001',
        name: 'Varun',
        role: 'AGM',
        zone: 0,
        area: 0,
        subArea: 0,
        subAreaName: 'AGM Office'
      });
    }
    
    // Parse Zone headers
    if (line.startsWith('Zone ') && line.includes(':')) {
      const zoneMatch = line.match(/Zone (\d+):/);
      if (zoneMatch) {
        currentZone = parseInt(zoneMatch[1]);
      }
    }
    
    // Parse Zone Managers
    if (line.includes('Zone Manager:')) {
      const nameMatch = lines[i+1]?.match(/Name: (.+)/);
      const idMatch = lines[i+2]?.match(/ID: (.+)/);
      
      if (nameMatch && idMatch) {
        users.push({
          username: idMatch[1].trim(),
          name: nameMatch[1].trim(),
          role: 'Zone Manager',
          zone: currentZone,
          area: 0,
          subArea: 0,
          subAreaName: `Zone ${currentZone} Office`
        });
      }
    }
    
    // Parse Area headers
    if (line.startsWith('Area ') && line.includes(':')) {
      const areaMatch = line.match(/Area (\d+):/);
      if (areaMatch) {
        currentArea = parseInt(areaMatch[1]);
        globalAreaCounter++;
      }
    }
    
    // Parse Executives
    if (line.includes('Executive:')) {
      const nameMatch = lines[i+1]?.match(/Name: (.+)/);
      const idMatch = lines[i+2]?.match(/ID: (.+)/);
      
      if (nameMatch && idMatch) {
        users.push({
          username: idMatch[1].trim(),
          name: nameMatch[1].trim(),
          role: 'Executive',
          zone: currentZone,
          area: globalAreaCounter,
          subArea: 0,
          subAreaName: `Area ${currentArea} Office`
        });
      }
    }
    
    // Parse Agents
    if (line.match(/^\d+\. Name: /)) {
      const nameMatch = line.match(/Name: (.+)/);
      const idMatch = lines[i+1]?.match(/ID: (.+)/);
      const subAreaMatch = lines[i+2]?.match(/Sub Area: "(.+) \((\d+)\)"/);
      
      if (nameMatch && idMatch && subAreaMatch) {
        const agentNum = parseInt(idMatch[1].split('-').pop() || '0');
        const subArea = (globalAreaCounter - 1) * 20 + agentNum;
        
        users.push({
          username: idMatch[1].trim(),
          name: nameMatch[1].trim(),
          role: 'Agent',
          zone: currentZone,
          area: globalAreaCounter,
          subArea: subArea,
          subAreaName: subAreaMatch[1].trim()
        });
      }
    }
  }
  
  return users;
}