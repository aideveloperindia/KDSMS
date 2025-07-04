import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://KDSMS:1Aditya1@kdsms.pqvq4xf.mongodb.net/?retryWrites=true&w=majority&appName=KDSMS';

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  employeeId: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['agent', 'executive', 'zm', 'agm', 'management'] 
  },
  zone: Number,
  zoneName: String,
  area: Number,
  areaName: String,
  subAreaName: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Parse login file function
function parseLoginFile() {
  const filePath = path.join(process.cwd(), 'NEW LOGINS.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').map(line => line.trim());
  const users = [];
  
  console.log(`Reading file with ${lines.length} lines`);
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Skip empty lines and headers
    if (!line || line.startsWith('=') || line.startsWith('Default password') || line.startsWith('KDSMS Employee')) {
      i++;
      continue;
    }

    // Parse Management Section
    if (line === 'Top Management') {
      console.log('Found Top Management section at line', i);
      i++; // Skip "Top Management"
      
      // Skip the dashes line
      if (i < lines.length && lines[i].startsWith('-')) {
        i++;
      }
      
      // Parse Management user
      if (i < lines.length && lines[i].match(/^1\.\s*Management/)) {
        console.log('Parsing Management user at line', i);
        i++; // Skip "1. Management"
        
        let name = '', employeeId = '';
        while (i < lines.length && !lines[i].match(/^2\.\s*AGM/) && !lines[i].startsWith('Zone')) {
          if (lines[i].includes('- Name:')) {
            name = lines[i].split(':')[1].trim();
          } else if (lines[i].includes('- ID:')) {
            employeeId = lines[i].split(':')[1].trim();
          }
          i++;
        }
        
        if (name && employeeId) {
          users.push({ name, employeeId, password: 'password123', role: 'management' });
          console.log('Added Management user:', employeeId);
        }
      }
      
      // Parse AGM user
      if (i < lines.length && lines[i].match(/^2\.\s*AGM/)) {
        console.log('Parsing AGM user at line', i);
        i++; // Skip "2. AGM"
        
        let name = '', employeeId = '';
        while (i < lines.length && !lines[i].startsWith('Zone')) {
          if (lines[i].includes('- Name:')) {
            name = lines[i].split(':')[1].trim();
          } else if (lines[i].includes('- ID:')) {
            employeeId = lines[i].split(':')[1].trim();
          }
          i++;
        }
        
        if (name && employeeId) {
          users.push({ name, employeeId, password: 'password123', role: 'agm' });
          console.log('Added AGM user:', employeeId);
        }
      }
      continue;
    }

    // Parse Zone sections
    if (line.startsWith('Zone')) {
      const zoneMatch = line.match(/Zone (\d+): (.+)/);
      if (zoneMatch) {
        const currentZone = parseInt(zoneMatch[1]);
        const currentZoneName = zoneMatch[2];
        console.log(`Found Zone ${currentZone}: ${currentZoneName} at line ${i}`);
        
        i++; // Move past zone line
        
        // Skip dashes line
        if (i < lines.length && lines[i].startsWith('-')) {
          i++;
        }
        
        // Parse Zone Manager
        if (i < lines.length && lines[i] === 'Zone Manager:') {
          i++; // Skip "Zone Manager:"
          
          let zmName = '', zmEmployeeId = '';
          while (i < lines.length && !lines[i].startsWith('Area') && !lines[i].startsWith('Zone')) {
            if (lines[i].includes('- Name:')) {
              zmName = lines[i].split(':')[1].trim();
            } else if (lines[i].includes('- ID:')) {
              zmEmployeeId = lines[i].split(':')[1].trim();
            }
            i++;
          }
          
          if (zmName && zmEmployeeId) {
            users.push({ 
              name: zmName, 
              employeeId: zmEmployeeId, 
              password: 'password123', 
              role: 'zm', 
              zone: currentZone, 
              zoneName: currentZoneName 
            });
            console.log(`Added ZM: ${zmEmployeeId}`);
          }
        }
        
        // Parse Areas in this zone
        while (i < lines.length && !lines[i].startsWith('Zone')) {
          if (lines[i].startsWith('Area')) {
            const areaMatch = lines[i].match(/Area (\d+): (.+)/);
            if (areaMatch) {
              const currentArea = parseInt(areaMatch[1]);
              const currentAreaName = areaMatch[2];
              
              // Handle Zone 4 areas (13-16) that don't have a zone header
              let actualZone = currentZone;
              let actualZoneName = currentZoneName;
              if (currentArea >= 13 && currentArea <= 16) {
                actualZone = 4;
                actualZoneName = 'Karimnagar Rural';
                
                // Add Zone 4 Manager if this is the first Zone 4 area we encounter
                if (currentArea === 13) {
                  users.push({
                    name: 'Shetty Sharma',
                    employeeId: 'ZM-Z4-001',
                    password: 'password123',
                    role: 'zm',
                    zone: 4,
                    zoneName: 'Karimnagar Rural'
                  });
                  console.log('Added missing ZM for Zone 4: ZM-Z4-001');
                }
              }
              
              console.log(`  Found Area ${currentArea}: ${currentAreaName} at line ${i} (Zone ${actualZone})`);
              
              i++; // Move past area line
              
              // Parse Executive
              if (i < lines.length && lines[i] === 'Executive:') {
                i++; // Skip "Executive:"
                
                let execName = '', execEmployeeId = '';
                while (i < lines.length && !lines[i].includes('Agents:') && !lines[i].startsWith('Area') && !lines[i].startsWith('Zone')) {
                  if (lines[i].includes('- Name:')) {
                    execName = lines[i].split(':')[1].trim();
                  } else if (lines[i].includes('- ID:')) {
                    execEmployeeId = lines[i].split(':')[1].trim();
                  }
                  i++;
                }
                
                if (execName && execEmployeeId) {
                  users.push({ 
                    name: execName, 
                    employeeId: execEmployeeId, 
                    password: 'password123', 
                    role: 'executive', 
                    zone: actualZone, 
                    zoneName: actualZoneName,
                    area: currentArea,
                    areaName: currentAreaName
                  });
                  console.log(`    Added Executive: ${execEmployeeId} (Zone ${actualZone})`);
                }
              }
              
              // Parse Agents
              if (i < lines.length && lines[i] === 'Agents:') {
                i++; // Skip "Agents:"
                
                let agentCount = 0;
                while (i < lines.length && !lines[i].startsWith('Area') && !lines[i].startsWith('Zone')) {
                  if (lines[i].match(/^\d+\.\s*Name:/)) {
                    const agentName = lines[i].split(':')[1].trim();
                    i++;
                    
                    let agentEmployeeId = '', agentSubArea = '';
                    if (i < lines.length && lines[i].includes('ID:')) {
                      agentEmployeeId = lines[i].split(':')[1].trim();
                      i++;
                    }
                    if (i < lines.length && lines[i].includes('Sub Area:')) {
                      agentSubArea = lines[i].split(':')[1].trim().replace(/"/g, '');
                      i++;
                    }
                    
                    if (agentName && agentEmployeeId && agentSubArea) {
                      // Extract sub-area number using the global area number (currentArea)
                      const subAreaMatch = agentEmployeeId.match(/AGT-Z(\d+)A(\d+)-(\d+)/);
                      let subAreaNumber = null;
                      if (subAreaMatch) {
                        const agentNum = parseInt(subAreaMatch[3]);
                        // Calculate sub-area number using global area: (currentArea-1)*20 + agentNum
                        subAreaNumber = (currentArea - 1) * 20 + agentNum;
                      }
                      
                      users.push({
                        name: agentName,
                        employeeId: agentEmployeeId,
                        password: 'password123',
                        role: 'agent',
                        zone: actualZone,
                        zoneName: actualZoneName,
                        area: currentArea,
                        areaName: currentAreaName,
                        subArea: subAreaNumber,
                        subAreaName: agentSubArea
                      });
                      agentCount++;
                    }
                  } else {
                    i++;
                  }
                }
                console.log(`    Added ${agentCount} agents for Area ${currentArea} (Zone ${actualZone})`);
              } else {
                // Handle case where there's no "Agents:" section (like Area 20)
                console.log(`    No agents found for Area ${currentArea} (Zone ${actualZone})`);
                
                // Generate missing agents for Area 20
                if (currentArea === 20) {
                  console.log(`    Generating 20 agents for Area 20...`);
                  const agentNames = [
                    'Reddy Santosh', 'Sharma Vamshi', 'Shetty Divya', 'Chary Soumya', 'Sai Sneha',
                    'Patel Srinivas', 'Reddy Harsha', 'Sharma Bhavana', 'Shetty Lavanya', 'Chary Tejaswi',
                    'Sai Harika', 'Patel Swathi', 'Reddy Anusha', 'Sharma Nikhil', 'Shetty Tarun',
                    'Chary Arun', 'Sai Anil', 'Patel Manoj', 'Reddy Ramesh', 'Sharma Kiran'
                  ];
                  const subAreas = [
                    'Ramnagar Colony (41)', 'Ambedkar Nagar (73)', 'Gandhi Nagar (93)', 'Indira Nagar (26)', 'Shastri Nagar (66)',
                    'Subhash Nagar (89)', 'Tilak Nagar (39)', 'Azad Nagar (72)', 'Ramnagar Colony (92)', 'Ambedkar Nagar (35)',
                    'Gandhi Nagar (75)', 'Indira Nagar (48)', 'Shastri Nagar (88)', 'Subhash Nagar (21)', 'Tilak Nagar (61)',
                    'Azad Nagar (84)', 'Ramnagar Colony (34)', 'Ambedkar Nagar (67)', 'Gandhi Nagar (97)', 'Indira Nagar (30)'
                  ];
                  
                  for (let j = 0; j < 20; j++) {
                    const agentNum = j + 1;
                    const subAreaNumber = (currentArea - 1) * 20 + agentNum;
                    
                    users.push({
                      name: agentNames[j],
                      employeeId: `AGT-Z5A4-${agentNum.toString().padStart(3, '0')}`,
                      password: 'password123',
                      role: 'agent',
                      zone: actualZone,
                      zoneName: actualZoneName,
                      area: currentArea,
                      areaName: currentAreaName,
                      subArea: subAreaNumber,
                      subAreaName: subAreas[j]
                    });
                  }
                  console.log(`    Generated 20 agents for Area 20 (Zone ${actualZone})`);
                }
              }
            } else {
              i++;
            }
          } else {
            i++;
          }
        }
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  console.log(`Total users parsed: ${users.length}`);
  
  // Log summary by role
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  console.log('Role counts:', roleCounts);
  
  return users;
}

async function setupUsers() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    console.log('Parsing user data...');
    const users = parseLoginFile();
    console.log(`Parsed ${users.length} users`);

    console.log('Clearing existing users...');
    await User.deleteMany({});

    console.log('Hashing passwords and creating users...');
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    await User.insertMany(usersWithHashedPasswords);
    
    console.log(`✅ Successfully created ${users.length} users!`);
    
    // Verify counts
    const counts = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    console.log('\n📊 User counts by role:');
    counts.forEach(count => {
      console.log(`  ${count._id}: ${count.count}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up users:', error);
    process.exit(1);
  }
}

setupUsers(); 