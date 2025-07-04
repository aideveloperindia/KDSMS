import fs from 'fs';
import path from 'path';

interface UserData {
  name: string;
  employeeId: string;
  password: string;
  role: 'agent' | 'executive' | 'zm' | 'agm' | 'management';
  zone?: number;
  zoneName?: string;
  area?: number;
  areaName?: string;
  subAreaName?: string;
}

export function parseLoginFile(): UserData[] {
  const filePath = path.join(process.cwd(), 'NEW LOGINS.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').map(line => line.trim());
  const users: UserData[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Skip empty lines and headers
    if (!line || line.startsWith('=') || line.startsWith('Default password') || line.startsWith('KDSMS Employee')) {
      i++;
      continue;
    }

    // Parse Management
    if (line === 'Top Management') {
      i++;
      while (i < lines.length && !lines[i].startsWith('Zone')) {
        if (lines[i].includes('Management') || lines[i].includes('AGM')) {
          const mgmtData = parseManagementBlock(lines, i);
          if (mgmtData.user) {
            users.push(mgmtData.user);
          }
          i = mgmtData.nextIndex;
        } else {
          i++;
        }
      }
      continue;
    }

    // Parse Zone
    if (line.startsWith('Zone')) {
      const zoneMatch = line.match(/Zone (\d+): (.+)/);
      if (zoneMatch) {
        const currentZone = parseInt(zoneMatch[1]);
        const currentZoneName = zoneMatch[2];
        
        i++; // Move past zone line
        
        // Parse Zone Manager
        if (i < lines.length && lines[i].includes('Zone Manager:')) {
          i++; // Move to ZM data
          const zmData = parseZoneManagerBlock(lines, i, currentZone, currentZoneName);
          if (zmData.user) {
            users.push(zmData.user);
          }
          i = zmData.nextIndex;
        }
        
        // Parse Areas in this zone
        while (i < lines.length && !lines[i].startsWith('Zone')) {
          if (lines[i].startsWith('Area')) {
            const areaMatch = lines[i].match(/Area (\d+): (.+)/);
            if (areaMatch) {
              const currentArea = parseInt(areaMatch[1]);
              const currentAreaName = areaMatch[2];
              
              i++; // Move past area line
              
              // Parse Executive
              if (i < lines.length && lines[i].includes('Executive:')) {
                i++; // Move to executive data
                const execData = parseExecutiveBlock(lines, i, currentZone, currentZoneName, currentArea, currentAreaName);
                if (execData.user) {
                  users.push(execData.user);
                }
                i = execData.nextIndex;
              }
              
              // Parse Agents
              if (i < lines.length && lines[i].includes('Agents:')) {
                i++; // Move past "Agents:" line
                const agentsData = parseAgentsBlock(lines, i, currentZone, currentZoneName, currentArea, currentAreaName);
                users.push(...agentsData.users);
                i = agentsData.nextIndex;
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
  return users;
}

function parseManagementBlock(lines: string[], startIndex: number): { user: UserData | null, nextIndex: number } {
  let i = startIndex;
  
  // Look for name and ID
  while (i < lines.length && !lines[i].startsWith('Zone')) {
    if (lines[i].includes('- Name:')) {
      const name = lines[i].split(':')[1].trim();
      i++;
      if (i < lines.length && lines[i].includes('- ID:')) {
        const employeeId = lines[i].split(':')[1].trim();
        i++;
        if (i < lines.length && lines[i].includes('- Role:')) {
          const roleText = lines[i].split(':')[1].trim();
          const role = roleText.includes('Management') ? 'management' : 'agm';
          
          return {
            user: {
              name,
              employeeId,
              password: 'password123',
              role
            },
            nextIndex: i + 1
          };
        }
      }
    }
    i++;
  }
  
  return { user: null, nextIndex: i };
}

function parseZoneManagerBlock(lines: string[], startIndex: number, zone: number, zoneName: string): { user: UserData | null, nextIndex: number } {
  let i = startIndex;
  
  while (i < lines.length && !lines[i].startsWith('Area') && !lines[i].startsWith('Zone')) {
    if (lines[i].includes('- Name:')) {
      const name = lines[i].split(':')[1].trim();
      i++;
      if (i < lines.length && lines[i].includes('- ID:')) {
        const employeeId = lines[i].split(':')[1].trim();
        
        return {
          user: {
            name,
            employeeId,
            password: 'password123',
            role: 'zm',
            zone,
            zoneName
          },
          nextIndex: i + 1
        };
      }
    }
    i++;
  }
  
  return { user: null, nextIndex: i };
}

function parseExecutiveBlock(lines: string[], startIndex: number, zone: number, zoneName: string, area: number, areaName: string): { user: UserData | null, nextIndex: number } {
  let i = startIndex;
  
  while (i < lines.length && !lines[i].includes('Agents:') && !lines[i].startsWith('Area') && !lines[i].startsWith('Zone')) {
    if (lines[i].includes('- Name:')) {
      const name = lines[i].split(':')[1].trim();
      i++;
      if (i < lines.length && lines[i].includes('- ID:')) {
        const employeeId = lines[i].split(':')[1].trim();
        
        return {
          user: {
            name,
            employeeId,
            password: 'password123',
            role: 'executive',
            zone,
            zoneName,
            area,
            areaName
          },
          nextIndex: i + 1
        };
      }
    }
    i++;
  }
  
  return { user: null, nextIndex: i };
}

function parseAgentsBlock(lines: string[], startIndex: number, zone: number, zoneName: string, area: number, areaName: string): { users: UserData[], nextIndex: number } {
  const agents: UserData[] = [];
  let i = startIndex;

  while (i < lines.length && !lines[i].startsWith('Area') && !lines[i].startsWith('Zone')) {
    if (lines[i].match(/^\d+\.\s*Name:/)) {
      const name = lines[i].split(':')[1].trim();
      i++;
      if (i < lines.length && lines[i].includes('ID:')) {
        const employeeId = lines[i].split(':')[1].trim();
        i++;
        if (i < lines.length && lines[i].includes('Sub Area:')) {
          const subAreaName = lines[i].split(':')[1].trim();
          
          agents.push({
            name,
            employeeId,
            password: 'password123',
            role: 'agent',
            zone,
            zoneName,
            area,
            areaName,
            subAreaName
          });
          
          i++;
        } else {
          i++;
        }
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  return { users: agents, nextIndex: i };
}

export const zoneData = [
  {
    name: "Karimnagar Central",
    zm: "Reddy Rajesh",
    areas: [
      {
        name: "Kothirampur Colony",
        executive: "B Anil",
        subAreas: [
          { name: "Vinayaka Nagar (76)", agent: "Ramesh Reddy" },
          { name: "Hanuman Nagar (30)", agent: "Reddy Manoj" },
          { name: "Vani Nagar (92)", agent: "Sai Harika" },
          { name: "Krishna Nagar (58)", agent: "Reddy Pavan" },
          { name: "Nehrunagar (44)", agent: "Kiran Shetty" },
          { name: "Jyothi Nagar (12)", agent: "Rajesh Prasad" },
          { name: "Sharada Nagar (6)", agent: "Sai Ajay" },
          { name: "Bhagya Nagar (11)", agent: "Mouli Nikhil" },
          { name: "Vani Nagar (91)", agent: "S Ramesh" },
          { name: "Vinayaka Nagar (30)", agent: "N Arun" },
          { name: "Chaitanya Nagar (21)", agent: "Sunil Shetty" },
          { name: "Geetha Nagar (90)", agent: "Patel Sneha" },
          { name: "Lakshmi Nagar (69)", agent: "Yadav Anil" },
          { name: "Bhagya Nagar (35)", agent: "Goud Harsha" },
          { name: "Prashanth Nagar (41)", agent: "Pavan Patel" },
          { name: "Mahalaxmi Nagar (28)", agent: "Joshi Tarun" },
          { name: "Doctors Colony (19)", agent: "Kiran Sharma" },
          { name: "Sharada Nagar (96)", agent: "Lal Chaitanya" },
          { name: "Chaitanya Nagar (29)", agent: "B Vamshi" },
          { name: "Vivekananda Nagar (15)", agent: "T Sneha" }
        ]
      },
      {
        name: "Vavilalapalli",
        executive: "Manoj Patel",
        subAreas: [
          { name: "Bhagya Nagar (77)", agent: "Vamshi Verma" },
          { name: "Bhavani Nagar (88)", agent: "Sai Rajesh" },
          { name: "Raghavendra Colony (15)", agent: "Chaitanya Yadav" },
          { name: "Bhavani Nagar (93)", agent: "Kiran Pavan" },
          { name: "Jyothi Nagar (81)", agent: "Tejaswi Kiran" },
          { name: "Vani Nagar (20)", agent: "Priyanka Yadav" },
          { name: "Bhavani Nagar (77)", agent: "Tarun Reddy" },
          { name: "Chaitanya Nagar (40)", agent: "M Ramesh" },
          { name: "Vinayaka Nagar (11)", agent: "Patel Tarun" },
          { name: "Sai Nagar (17)", agent: "Sai Tarun" },
          { name: "Sharada Nagar (68)", agent: "Shetty Chaitanya" },
          { name: "Vijaya Nagar (52)", agent: "Prasad Sneha" },
          { name: "Teachers Colony (16)", agent: "V Anil" },
          { name: "SR Nagar Colony (76)", agent: "Lal Anil" },
          { name: "Bhavani Nagar (10)", agent: "Goud Sneha" },
          { name: "Shivaji Nagar (5)", agent: "Srinivas Kiran" },
          { name: "Geetha Nagar (86)", agent: "Venkatesh Sai" },
          { name: "Bank Colony (32)", agent: "Lavanya Iyer" },
          { name: "Jyothi Nagar (13)", agent: "Prasad Chaitanya" },
          { name: "Rajeev Nagar (60)", agent: "Naik Ramesh" }
        ]
      },
      {
        name: "Gopalapuram",
        executive: "Bhavana Raj",
        subAreas: [
          { name: "Tulasi Nagar (25)", agent: "C Naveen" },
          { name: "Nehrunagar (24)", agent: "Ajay Sharma" },
          { name: "Teachers Colony (71)", agent: "A Ramesh" },
          { name: "Vinayaka Nagar (97)", agent: "N Sandeep" },
          { name: "Bank Colony (28)", agent: "Divya Goud" },
          { name: "Bhagya Nagar (1)", agent: "Pavan Singh" },
          { name: "Nehrunagar (90)", agent: "Sai Lavanya" },
          { name: "Police Colony (20)", agent: "A Nikhil" },
          { name: "Vivekananda Nagar (96)", agent: "Ramesh Goud" },
          { name: "Bank Colony (65)", agent: "Goud Sandeep" },
          { name: "Vinayaka Nagar (24)", agent: "T Manoj" },
          { name: "Tulasi Nagar (52)", agent: "D Divya" },
          { name: "Prashanth Nagar (80)", agent: "M Chaitanya" },
          { name: "Mahalaxmi Nagar (34)", agent: "D Swathi" },
          { name: "Sharada Nagar (51)", agent: "N Swathi" },
          { name: "Mahalaxmi Nagar (97)", agent: "M Mahesh" },
          { name: "Jyothi Nagar (10)", agent: "Kiran Venkatesh" },
          { name: "Sai Nagar (45)", agent: "V Divya" },
          { name: "Indira Nagar (21)", agent: "Tejaswi Sai" },
          { name: "Bhavani Nagar (86)", agent: "Naik Nikhil" }
        ]
      },
      {
        name: "Rampur",
        executive: "Rajesh Naik",
        subAreas: [
          { name: "Sri Rama Nagar (35)", agent: "Manoj Shetty" },
          { name: "Hanuman Nagar (88)", agent: "Verma Soumya" },
          { name: "Police Colony (33)", agent: "S Srinivas" },
          { name: "Prashanth Nagar (1)", agent: "Priyanka Chary" },
          { name: "Sharada Nagar (21)", agent: "Naik Mahesh" },
          { name: "Sri Rama Nagar (70)", agent: "M Tejaswi" },
          { name: "Sri Rama Nagar (56)", agent: "V Ramesh" },
          { name: "Prashanth Nagar (46)", agent: "T Swathi" },
          { name: "Jyothi Nagar (46)", agent: "Iyer Divya" },
          { name: "Sri Rama Nagar (31)", agent: "K Lavanya" },
          { name: "SR Nagar Colony (23)", agent: "Raj Anusha" },
          { name: "Tulasi Nagar (35)", agent: "D Soumya" },
          { name: "Vani Nagar (59)", agent: "Nikhil Sharma" },
          { name: "SR Nagar Colony (85)", agent: "S Arun" },
          { name: "Shivaji Nagar (99)", agent: "Sunil Kiran" },
          { name: "Raghavendra Colony (4)", agent: "C Divya" },
          { name: "Sharada Nagar (5)", agent: "V Manoj" },
          { name: "Mahalaxmi Nagar (56)", agent: "Naik Vamshi" },
          { name: "Vani Nagar (33)", agent: "A Harika" },
          { name: "Vani Nagar (47)", agent: "Srinivas Raj" }
        ]
      }
    ]
  },
  {
    name: "Karimnagar East",
    zm: "Naik Soumya",
    areas: [
      {
        name: "Choppadandi Road",
        executive: "Iyer Nikhil",
        subAreas: [
          { name: "Padmavathi Nagar (90)", agent: "Naveen Chary" },
          { name: "Rajeev Nagar (86)", agent: "Swathi Yadav" },
          { name: "Vijaya Nagar (52)", agent: "Reddy Tejaswi" },
          { name: "Indira Nagar (27)", agent: "Lavanya Lal" },
          { name: "Mahalaxmi Nagar (60)", agent: "Ajay Shetty" },
          { name: "Bank Colony (95)", agent: "S Swathi" },
          { name: "Raghavendra Colony (12)", agent: "A Kiran" },
          { name: "Tulasi Nagar (61)", agent: "Patel Soumya" },
          { name: "Rajeev Nagar (81)", agent: "Joshi Venkatesh" },
          { name: "Padmavathi Nagar (32)", agent: "B Sneha" },
          { name: "Nehrunagar (29)", agent: "N Lavanya" },
          { name: "Vivekananda Nagar (72)", agent: "N Anusha" },
          { name: "Sai Nagar (60)", agent: "Sai Vamshi" },
          { name: "Mahalaxmi Nagar (97)", agent: "Manoj Kiran" },
          { name: "Teachers Colony (21)", agent: "Das Soumya" },
          { name: "Sharada Nagar (97)", agent: "R Tejaswi" },
          { name: "Police Colony (81)", agent: "B Pavan" },
          { name: "Indira Nagar (31)", agent: "Harsha Raj" },
          { name: "Vinayaka Nagar (18)", agent: "C Anil" },
          { name: "Hanuman Nagar (9)", agent: "Chaitanya Raj" }
        ]
      }
    ]
  },
  {
    name: "Karimnagar North",
    zm: "Yadav Kiran",
    areas: [
      {
        name: "Rekurthi",
        executive: "Reddy Sandeep",
        subAreas: [
          { name: "Hanuman Nagar (93)", agent: "Reddy Lavanya" },
          { name: "Vivekananda Nagar (24)", agent: "Patel Manoj" },
          { name: "Sai Nagar (45)", agent: "Shetty Soumya" },
          { name: "Rajeev Nagar (66)", agent: "Goud Pavan" },
          { name: "Hanuman Nagar (87)", agent: "Lal Anusha" },
          { name: "Vivekananda Nagar (18)", agent: "Verma Chaitanya" },
          { name: "Sai Nagar (39)", agent: "Joshi Harika" },
          { name: "Rajeev Nagar (60)", agent: "Naik Ramesh" },
          { name: "Hanuman Nagar (81)", agent: "Raj Tarun" },
          { name: "Vivekananda Nagar (12)", agent: "Sharma Kiran" },
          { name: "Sai Nagar (33)", agent: "Das Mahesh" },
          { name: "Rajeev Nagar (54)", agent: "Chary Swathi" },
          { name: "Hanuman Nagar (75)", agent: "Iyer Tejaswi" },
          { name: "Vivekananda Nagar (96)", agent: "Singh Divya" },
          { name: "Sai Nagar (27)", agent: "Yadav Vamshi" },
          { name: "Rajeev Nagar (48)", agent: "Reddy Anil" },
          { name: "Hanuman Nagar (69)", agent: "Patel Sandeep" },
          { name: "Vivekananda Nagar (90)", agent: "Shetty Lavanya" },
          { name: "Sai Nagar (21)", agent: "Goud Manoj" },
          { name: "Rajeev Nagar (42)", agent: "Lal Soumya" }
        ]
      },
      {
        name: "Bommakal",
        executive: "Verma Pavan",
        subAreas: [
          { name: "Lakshmi Nagar (63)", agent: "Joshi Anusha" },
          { name: "Bhagya Nagar (84)", agent: "Naik Chaitanya" },
          { name: "Lakshmi Nagar (15)", agent: "Raj Harika" },
          { name: "Bhagya Nagar (36)", agent: "Sharma Ramesh" },
          { name: "Lakshmi Nagar (57)", agent: "Das Tarun" },
          { name: "Bhagya Nagar (78)", agent: "Chary Kiran" },
          { name: "Lakshmi Nagar (99)", agent: "Iyer Mahesh" },
          { name: "Bhagya Nagar (30)", agent: "Singh Swathi" },
          { name: "Lakshmi Nagar (51)", agent: "Yadav Tejaswi" },
          { name: "Bhagya Nagar (72)", agent: "Reddy Divya" },
          { name: "Lakshmi Nagar (93)", agent: "Patel Vamshi" },
          { name: "Bhagya Nagar (24)", agent: "Shetty Anil" },
          { name: "Lakshmi Nagar (45)", agent: "Goud Sandeep" },
          { name: "Bhagya Nagar (66)", agent: "Lal Lavanya" },
          { name: "Lakshmi Nagar (87)", agent: "Verma Manoj" },
          { name: "Bhagya Nagar (18)", agent: "Joshi Soumya" },
          { name: "Lakshmi Nagar (39)", agent: "Naik Pavan" },
          { name: "Bhagya Nagar (60)", agent: "Raj Anusha" },
          { name: "Lakshmi Nagar (81)", agent: "Sharma Chaitanya" },
          { name: "Bhagya Nagar (12)", agent: "Das Harika" }
        ]
      },
      {
        name: "Kothapalli",
        executive: "Joshi Ramesh",
        subAreas: [
          { name: "Geetha Nagar (33)", agent: "Chary Tarun" },
          { name: "Vani Nagar (54)", agent: "Iyer Kiran" },
          { name: "Geetha Nagar (75)", agent: "Singh Mahesh" },
          { name: "Vani Nagar (96)", agent: "Yadav Swathi" },
          { name: "Geetha Nagar (27)", agent: "Reddy Tejaswi" },
          { name: "Vani Nagar (48)", agent: "Patel Divya" },
          { name: "Geetha Nagar (69)", agent: "Shetty Vamshi" },
          { name: "Vani Nagar (90)", agent: "Goud Anil" },
          { name: "Geetha Nagar (21)", agent: "Lal Sandeep" },
          { name: "Vani Nagar (42)", agent: "Verma Lavanya" },
          { name: "Geetha Nagar (63)", agent: "Joshi Manoj" },
          { name: "Vani Nagar (84)", agent: "Naik Soumya" },
          { name: "Geetha Nagar (15)", agent: "Raj Pavan" },
          { name: "Vani Nagar (36)", agent: "Sharma Anusha" },
          { name: "Geetha Nagar (57)", agent: "Das Chaitanya" },
          { name: "Vani Nagar (78)", agent: "Chary Harika" },
          { name: "Geetha Nagar (99)", agent: "Iyer Ramesh" },
          { name: "Vani Nagar (30)", agent: "Singh Tarun" },
          { name: "Geetha Nagar (51)", agent: "Yadav Kiran" },
          { name: "Vani Nagar (72)", agent: "Reddy Mahesh" }
        ]
      },
      {
        name: "Alugunur",
        executive: "Naik Swathi",
        subAreas: [
          { name: "Sharada Nagar (93)", agent: "Patel Swathi" },
          { name: "Indira Nagar (24)", agent: "Shetty Tejaswi" },
          { name: "Sharada Nagar (45)", agent: "Goud Divya" },
          { name: "Indira Nagar (66)", agent: "Lal Vamshi" },
          { name: "Sharada Nagar (87)", agent: "Verma Anil" },
          { name: "Indira Nagar (18)", agent: "Joshi Sandeep" },
          { name: "Sharada Nagar (39)", agent: "Naik Lavanya" },
          { name: "Indira Nagar (60)", agent: "Raj Manoj" },
          { name: "Sharada Nagar (81)", agent: "Sharma Soumya" },
          { name: "Indira Nagar (12)", agent: "Das Pavan" },
          { name: "Sharada Nagar (33)", agent: "Chary Anusha" },
          { name: "Indira Nagar (54)", agent: "Iyer Chaitanya" },
          { name: "Sharada Nagar (75)", agent: "Singh Harika" },
          { name: "Indira Nagar (96)", agent: "Yadav Ramesh" },
          { name: "Sharada Nagar (27)", agent: "Reddy Tarun" },
          { name: "Indira Nagar (48)", agent: "Patel Kiran" },
          { name: "Sharada Nagar (69)", agent: "Shetty Mahesh" },
          { name: "Indira Nagar (90)", agent: "Goud Swathi" },
          { name: "Sharada Nagar (21)", agent: "Lal Tejaswi" },
          { name: "Indira Nagar (42)", agent: "Verma Divya" }
        ]
      }
    ]
  },
  {
    name: "Karimnagar South",
    zm: "Raj Tejaswi",
    areas: [
      {
        name: "Mankammathota",
        executive: "Sharma Vamshi",
        subAreas: [
          { name: "Chaitanya Nagar (93)", agent: "Joshi Anil" },
          { name: "Prashanth Nagar (24)", agent: "Naik Sandeep" },
          { name: "Chaitanya Nagar (45)", agent: "Raj Lavanya" },
          { name: "Prashanth Nagar (66)", agent: "Sharma Manoj" },
          { name: "Chaitanya Nagar (87)", agent: "Das Soumya" },
          { name: "Prashanth Nagar (18)", agent: "Chary Pavan" },
          { name: "Chaitanya Nagar (39)", agent: "Iyer Anusha" },
          { name: "Prashanth Nagar (60)", agent: "Singh Chaitanya" },
          { name: "Chaitanya Nagar (81)", agent: "Yadav Harika" },
          { name: "Prashanth Nagar (12)", agent: "Reddy Ramesh" },
          { name: "Chaitanya Nagar (33)", agent: "Patel Tarun" },
          { name: "Prashanth Nagar (54)", agent: "Shetty Kiran" },
          { name: "Chaitanya Nagar (75)", agent: "Goud Mahesh" },
          { name: "Prashanth Nagar (96)", agent: "Lal Swathi" },
          { name: "Chaitanya Nagar (27)", agent: "Verma Tejaswi" },
          { name: "Prashanth Nagar (48)", agent: "Joshi Divya" },
          { name: "Chaitanya Nagar (69)", agent: "Naik Vamshi" },
          { name: "Prashanth Nagar (90)", agent: "Raj Anil" },
          { name: "Chaitanya Nagar (21)", agent: "Sharma Sandeep" },
          { name: "Prashanth Nagar (42)", agent: "Das Lavanya" }
        ]
      },
      {
        name: "Sapthagiri Colony",
        executive: "Das Anil",
        subAreas: [
          { name: "Mahalaxmi Nagar (63)", agent: "Chary Manoj" },
          { name: "Doctors Colony (84)", agent: "Iyer Soumya" },
          { name: "Mahalaxmi Nagar (15)", agent: "Singh Pavan" },
          { name: "Doctors Colony (36)", agent: "Yadav Anusha" },
          { name: "Mahalaxmi Nagar (57)", agent: "Reddy Chaitanya" },
          { name: "Doctors Colony (78)", agent: "Patel Harika" },
          { name: "Mahalaxmi Nagar (99)", agent: "Shetty Ramesh" },
          { name: "Doctors Colony (30)", agent: "Goud Tarun" },
          { name: "Mahalaxmi Nagar (51)", agent: "Lal Kiran" },
          { name: "Doctors Colony (72)", agent: "Verma Mahesh" },
          { name: "Mahalaxmi Nagar (93)", agent: "Joshi Swathi" },
          { name: "Doctors Colony (24)", agent: "Naik Tejaswi" },
          { name: "Mahalaxmi Nagar (45)", agent: "Raj Divya" },
          { name: "Doctors Colony (66)", agent: "Sharma Vamshi" },
          { name: "Mahalaxmi Nagar (87)", agent: "Das Anil" },
          { name: "Doctors Colony (18)", agent: "Chary Sandeep" },
          { name: "Mahalaxmi Nagar (39)", agent: "Iyer Lavanya" },
          { name: "Doctors Colony (60)", agent: "Singh Manoj" },
          { name: "Mahalaxmi Nagar (81)", agent: "Yadav Soumya" },
          { name: "Doctors Colony (12)", agent: "Reddy Pavan" }
        ]
      },
      {
        name: "Ramnagar",
        executive: "Chary Sandeep",
        subAreas: [
          { name: "Police Colony (33)", agent: "Patel Anusha" },
          { name: "Teachers Colony (54)", agent: "Shetty Chaitanya" },
          { name: "Police Colony (75)", agent: "Goud Harika" },
          { name: "Teachers Colony (96)", agent: "Lal Ramesh" },
          { name: "Police Colony (27)", agent: "Verma Tarun" },
          { name: "Teachers Colony (48)", agent: "Joshi Kiran" },
          { name: "Police Colony (69)", agent: "Naik Mahesh" },
          { name: "Teachers Colony (90)", agent: "Raj Swathi" },
          { name: "Police Colony (21)", agent: "Sharma Tejaswi" },
          { name: "Teachers Colony (42)", agent: "Das Divya" },
          { name: "Police Colony (63)", agent: "Chary Vamshi" },
          { name: "Teachers Colony (84)", agent: "Iyer Anil" },
          { name: "Police Colony (15)", agent: "Singh Sandeep" },
          { name: "Teachers Colony (36)", agent: "Yadav Lavanya" },
          { name: "Police Colony (57)", agent: "Reddy Manoj" },
          { name: "Teachers Colony (78)", agent: "Patel Soumya" },
          { name: "Police Colony (99)", agent: "Shetty Pavan" },
          { name: "Teachers Colony (30)", agent: "Goud Anusha" },
          { name: "Police Colony (51)", agent: "Lal Chaitanya" },
          { name: "Teachers Colony (72)", agent: "Verma Harika" }
        ]
      },
      {
        name: "Vidyanagar",
        executive: "Iyer Lavanya",
        subAreas: [
          { name: "Bank Colony (93)", agent: "Joshi Ramesh" },
          { name: "SR Nagar Colony (24)", agent: "Naik Tarun" },
          { name: "Bank Colony (45)", agent: "Raj Kiran" },
          { name: "SR Nagar Colony (66)", agent: "Sharma Mahesh" },
          { name: "Bank Colony (87)", agent: "Das Swathi" },
          { name: "SR Nagar Colony (18)", agent: "Chary Tejaswi" },
          { name: "Bank Colony (39)", agent: "Iyer Divya" },
          { name: "SR Nagar Colony (60)", agent: "Singh Vamshi" },
          { name: "Bank Colony (81)", agent: "Yadav Anil" },
          { name: "SR Nagar Colony (12)", agent: "Reddy Sandeep" },
          { name: "Bank Colony (33)", agent: "Patel Lavanya" },
          { name: "SR Nagar Colony (54)", agent: "Shetty Manoj" },
          { name: "Bank Colony (75)", agent: "Goud Soumya" },
          { name: "SR Nagar Colony (96)", agent: "Lal Pavan" },
          { name: "Bank Colony (27)", agent: "Verma Anusha" },
          { name: "SR Nagar Colony (48)", agent: "Joshi Chaitanya" },
          { name: "Bank Colony (69)", agent: "Naik Harika" },
          { name: "SR Nagar Colony (90)", agent: "Raj Ramesh" },
          { name: "Bank Colony (21)", agent: "Sharma Tarun" },
          { name: "SR Nagar Colony (42)", agent: "Das Kiran" }
        ]
      }
    ]
  },
  {
    name: "Karimnagar West",
    zm: "Singh Mahesh",
    areas: [
      {
        name: "Sircilla Road",
        executive: "Yadav Swathi",
        subAreas: [
          { name: "Tulasi Nagar (93)", agent: "Joshi Tejaswi" },
          { name: "Raghavendra Colony (24)", agent: "Naik Divya" },
          { name: "Tulasi Nagar (45)", agent: "Raj Vamshi" },
          { name: "Raghavendra Colony (66)", agent: "Sharma Anil" },
          { name: "Tulasi Nagar (87)", agent: "Das Sandeep" },
          { name: "Raghavendra Colony (18)", agent: "Chary Lavanya" },
          { name: "Tulasi Nagar (39)", agent: "Iyer Manoj" },
          { name: "Raghavendra Colony (60)", agent: "Singh Soumya" },
          { name: "Tulasi Nagar (81)", agent: "Yadav Pavan" },
          { name: "Raghavendra Colony (12)", agent: "Reddy Anusha" },
          { name: "Tulasi Nagar (33)", agent: "Patel Chaitanya" },
          { name: "Raghavendra Colony (54)", agent: "Shetty Harika" },
          { name: "Tulasi Nagar (75)", agent: "Goud Ramesh" },
          { name: "Raghavendra Colony (96)", agent: "Lal Tarun" },
          { name: "Tulasi Nagar (27)", agent: "Verma Kiran" },
          { name: "Raghavendra Colony (48)", agent: "Joshi Mahesh" },
          { name: "Tulasi Nagar (69)", agent: "Naik Swathi" },
          { name: "Raghavendra Colony (90)", agent: "Raj Tejaswi" },
          { name: "Tulasi Nagar (21)", agent: "Sharma Divya" },
          { name: "Raghavendra Colony (42)", agent: "Das Vamshi" }
        ]
      },
      {
        name: "Padmanagar",
        executive: "Reddy Tejaswi",
        subAreas: [
          { name: "Padmavathi Nagar (63)", agent: "Chary Anil" },
          { name: "Vijaya Nagar (84)", agent: "Iyer Sandeep" },
          { name: "Padmavathi Nagar (15)", agent: "Singh Lavanya" },
          { name: "Vijaya Nagar (36)", agent: "Yadav Manoj" },
          { name: "Padmavathi Nagar (57)", agent: "Reddy Soumya" },
          { name: "Vijaya Nagar (78)", agent: "Patel Pavan" },
          { name: "Padmavathi Nagar (99)", agent: "Shetty Anusha" },
          { name: "Vijaya Nagar (30)", agent: "Goud Chaitanya" },
          { name: "Padmavathi Nagar (51)", agent: "Lal Harika" },
          { name: "Vijaya Nagar (72)", agent: "Verma Ramesh" },
          { name: "Padmavathi Nagar (93)", agent: "Joshi Tarun" },
          { name: "Vijaya Nagar (24)", agent: "Naik Kiran" },
          { name: "Padmavathi Nagar (45)", agent: "Raj Mahesh" },
          { name: "Vijaya Nagar (66)", agent: "Sharma Swathi" },
          { name: "Padmavathi Nagar (87)", agent: "Das Tejaswi" },
          { name: "Vijaya Nagar (18)", agent: "Chary Divya" },
          { name: "Padmavathi Nagar (39)", agent: "Iyer Vamshi" },
          { name: "Vijaya Nagar (60)", agent: "Singh Anil" },
          { name: "Padmavathi Nagar (81)", agent: "Yadav Sandeep" },
          { name: "Vijaya Nagar (12)", agent: "Reddy Lavanya" }
        ]
      },
      {
        name: "Laxmipur",
        executive: "Patel Divya",
        subAreas: [
          { name: "Krishna Nagar (33)", agent: "Shetty Manoj" },
          { name: "Nehrunagar (54)", agent: "Goud Soumya" },
          { name: "Krishna Nagar (75)", agent: "Lal Pavan" },
          { name: "Nehrunagar (96)", agent: "Verma Anusha" },
          { name: "Krishna Nagar (27)", agent: "Joshi Chaitanya" },
          { name: "Nehrunagar (48)", agent: "Naik Harika" },
          { name: "Krishna Nagar (69)", agent: "Raj Ramesh" },
          { name: "Nehrunagar (90)", agent: "Sharma Tarun" },
          { name: "Krishna Nagar (21)", agent: "Das Kiran" },
          { name: "Nehrunagar (42)", agent: "Chary Mahesh" },
          { name: "Krishna Nagar (63)", agent: "Iyer Swathi" },
          { name: "Nehrunagar (84)", agent: "Singh Tejaswi" },
          { name: "Krishna Nagar (15)", agent: "Yadav Divya" },
          { name: "Nehrunagar (36)", agent: "Reddy Vamshi" },
          { name: "Krishna Nagar (57)", agent: "Patel Anil" },
          { name: "Nehrunagar (78)", agent: "Shetty Sandeep" },
          { name: "Krishna Nagar (99)", agent: "Goud Lavanya" },
          { name: "Nehrunagar (30)", agent: "Lal Manoj" },
          { name: "Krishna Nagar (51)", agent: "Verma Soumya" },
          { name: "Nehrunagar (72)", agent: "Joshi Pavan" }
        ]
      },
      {
        name: "Subhashnagar",
        executive: "Shetty Vamshi",
        subAreas: [
          { name: "Bhavani Nagar (93)", agent: "Naik Anusha" },
          { name: "Shivaji Nagar (24)", agent: "Raj Chaitanya" },
          { name: "Bhavani Nagar (45)", agent: "Sharma Harika" },
          { name: "Shivaji Nagar (66)", agent: "Das Ramesh" },
          { name: "Bhavani Nagar (87)", agent: "Chary Tarun" },
          { name: "Shivaji Nagar (18)", agent: "Iyer Kiran" },
          { name: "Bhavani Nagar (39)", agent: "Singh Mahesh" },
          { name: "Shivaji Nagar (60)", agent: "Yadav Swathi" },
          { name: "Bhavani Nagar (81)", agent: "Reddy Tejaswi" },
          { name: "Shivaji Nagar (12)", agent: "Patel Divya" },
          { name: "Bhavani Nagar (33)", agent: "Shetty Vamshi" },
          { name: "Shivaji Nagar (54)", agent: "Goud Anil" },
          { name: "Bhavani Nagar (75)", agent: "Lal Sandeep" },
          { name: "Shivaji Nagar (96)", agent: "Verma Lavanya" },
          { name: "Bhavani Nagar (27)", agent: "Joshi Manoj" },
          { name: "Shivaji Nagar (48)", agent: "Naik Soumya" },
          { name: "Bhavani Nagar (69)", agent: "Raj Pavan" },
          { name: "Shivaji Nagar (90)", agent: "Sharma Anusha" },
          { name: "Bhavani Nagar (21)", agent: "Das Chaitanya" },
          { name: "Shivaji Nagar (42)", agent: "Chary Harika" }
        ]
      }
    ]
  },
  {
    name: "Karimnagar Rural",
    zm: "Goud Tejaswi",
    areas: [
      {
        name: "Manakondur",
        executive: "Lal Divya",
        subAreas: [
          { name: "Hanuman Nagar (93)", agent: "Verma Vamshi" },
          { name: "Vivekananda Nagar (24)", agent: "Joshi Anil" },
          { name: "Hanuman Nagar (45)", agent: "Naik Sandeep" },
          { name: "Vivekananda Nagar (66)", agent: "Raj Lavanya" },
          { name: "Hanuman Nagar (87)", agent: "Sharma Manoj" },
          { name: "Vivekananda Nagar (18)", agent: "Das Soumya" },
          { name: "Hanuman Nagar (39)", agent: "Chary Pavan" },
          { name: "Vivekananda Nagar (60)", agent: "Iyer Anusha" },
          { name: "Hanuman Nagar (81)", agent: "Singh Chaitanya" },
          { name: "Vivekananda Nagar (12)", agent: "Yadav Harika" },
          { name: "Hanuman Nagar (33)", agent: "Reddy Ramesh" },
          { name: "Vivekananda Nagar (54)", agent: "Patel Tarun" },
          { name: "Hanuman Nagar (75)", agent: "Shetty Kiran" },
          { name: "Vivekananda Nagar (96)", agent: "Goud Mahesh" },
          { name: "Hanuman Nagar (27)", agent: "Lal Swathi" },
          { name: "Vivekananda Nagar (48)", agent: "Verma Tejaswi" },
          { name: "Hanuman Nagar (69)", agent: "Joshi Divya" },
          { name: "Vivekananda Nagar (90)", agent: "Naik Vamshi" },
          { name: "Hanuman Nagar (21)", agent: "Raj Anil" },
          { name: "Vivekananda Nagar (42)", agent: "Sharma Sandeep" }
        ]
      },
      {
        name: "Thimmapur",
        executive: "Verma Anil",
        subAreas: [
          { name: "Sai Nagar (63)", agent: "Das Lavanya" },
          { name: "Rajeev Nagar (84)", agent: "Chary Manoj" },
          { name: "Sai Nagar (15)", agent: "Iyer Soumya" },
          { name: "Rajeev Nagar (36)", agent: "Singh Pavan" },
          { name: "Sai Nagar (57)", agent: "Yadav Anusha" },
          { name: "Rajeev Nagar (78)", agent: "Reddy Chaitanya" },
          { name: "Sai Nagar (99)", agent: "Patel Harika" },
          { name: "Rajeev Nagar (30)", agent: "Shetty Ramesh" },
          { name: "Sai Nagar (51)", agent: "Goud Tarun" },
          { name: "Rajeev Nagar (72)", agent: "Lal Kiran" },
          { name: "Sai Nagar (93)", agent: "Verma Mahesh" },
          { name: "Rajeev Nagar (24)", agent: "Joshi Swathi" },
          { name: "Sai Nagar (45)", agent: "Naik Tejaswi" },
          { name: "Rajeev Nagar (66)", agent: "Raj Divya" },
          { name: "Sai Nagar (87)", agent: "Sharma Vamshi" },
          { name: "Rajeev Nagar (18)", agent: "Das Anil" },
          { name: "Sai Nagar (39)", agent: "Chary Sandeep" },
          { name: "Rajeev Nagar (60)", agent: "Iyer Lavanya" },
          { name: "Sai Nagar (81)", agent: "Singh Manoj" },
          { name: "Rajeev Nagar (12)", agent: "Yadav Soumya" }
        ]
      },
      {
        name: "Choppadandi",
        executive: "Joshi Sandeep",
        subAreas: [
          { name: "Lakshmi Nagar (33)", agent: "Reddy Pavan" },
          { name: "Bhagya Nagar (54)", agent: "Patel Anusha" },
          { name: "Lakshmi Nagar (75)", agent: "Shetty Chaitanya" },
          { name: "Bhagya Nagar (96)", agent: "Goud Harika" },
          { name: "Lakshmi Nagar (27)", agent: "Lal Ramesh" },
          { name: "Bhagya Nagar (48)", agent: "Verma Tarun" },
          { name: "Lakshmi Nagar (69)", agent: "Joshi Kiran" },
          { name: "Bhagya Nagar (90)", agent: "Naik Mahesh" },
          { name: "Lakshmi Nagar (21)", agent: "Raj Swathi" },
          { name: "Bhagya Nagar (42)", agent: "Sharma Tejaswi" },
          { name: "Lakshmi Nagar (63)", agent: "Das Divya" },
          { name: "Bhagya Nagar (84)", agent: "Chary Vamshi" },
          { name: "Lakshmi Nagar (15)", agent: "Iyer Anil" },
          { name: "Bhagya Nagar (36)", agent: "Singh Sandeep" },
          { name: "Lakshmi Nagar (57)", agent: "Yadav Lavanya" },
          { name: "Bhagya Nagar (78)", agent: "Reddy Manoj" },
          { name: "Lakshmi Nagar (99)", agent: "Patel Soumya" },
          { name: "Bhagya Nagar (30)", agent: "Shetty Pavan" },
          { name: "Lakshmi Nagar (51)", agent: "Goud Anusha" },
          { name: "Bhagya Nagar (72)", agent: "Lal Chaitanya" }
        ]
      },
      {
        name: "Gangadhara",
        executive: "Naik Lavanya",
        subAreas: [
          { name: "Geetha Nagar (93)", agent: "Verma Harika" },
          { name: "Vani Nagar (24)", agent: "Joshi Ramesh" },
          { name: "Geetha Nagar (45)", agent: "Naik Tarun" },
          { name: "Vani Nagar (66)", agent: "Raj Kiran" },
          { name: "Geetha Nagar (87)", agent: "Sharma Mahesh" },
          { name: "Vani Nagar (18)", agent: "Das Swathi" },
          { name: "Geetha Nagar (39)", agent: "Chary Tejaswi" },
          { name: "Vani Nagar (60)", agent: "Iyer Divya" },
          { name: "Geetha Nagar (81)", agent: "Singh Vamshi" },
          { name: "Vani Nagar (12)", agent: "Yadav Anil" },
          { name: "Geetha Nagar (33)", agent: "Reddy Sandeep" },
          { name: "Vani Nagar (54)", agent: "Patel Lavanya" },
          { name: "Geetha Nagar (75)", agent: "Shetty Manoj" },
          { name: "Vani Nagar (96)", agent: "Goud Soumya" },
          { name: "Geetha Nagar (27)", agent: "Lal Pavan" },
          { name: "Vani Nagar (48)", agent: "Verma Anusha" },
          { name: "Geetha Nagar (69)", agent: "Joshi Chaitanya" },
          { name: "Vani Nagar (90)", agent: "Naik Harika" },
          { name: "Geetha Nagar (21)", agent: "Raj Ramesh" },
          { name: "Vani Nagar (42)", agent: "Sharma Tarun" }
        ]
      }
    ]
  },
  {
    name: "Karimnagar Outer",
    zm: "Das Kiran",
    areas: [
      {
        name: "Kothapalli",
        executive: "Chary Mahesh",
        subAreas: [
          { name: "Chaitanya Nagar (93)", agent: "Iyer Swathi" },
          { name: "Prashanth Nagar (24)", agent: "Singh Tejaswi" },
          { name: "Chaitanya Nagar (45)", agent: "Yadav Divya" },
          { name: "Prashanth Nagar (66)", agent: "Reddy Vamshi" },
          { name: "Chaitanya Nagar (87)", agent: "Patel Anil" },
          { name: "Prashanth Nagar (18)", agent: "Shetty Sandeep" },
          { name: "Chaitanya Nagar (39)", agent: "Goud Lavanya" },
          { name: "Prashanth Nagar (60)", agent: "Lal Manoj" },
          { name: "Chaitanya Nagar (81)", agent: "Verma Soumya" },
          { name: "Prashanth Nagar (12)", agent: "Joshi Pavan" },
          { name: "Chaitanya Nagar (33)", agent: "Naik Anusha" },
          { name: "Prashanth Nagar (54)", agent: "Raj Chaitanya" },
          { name: "Chaitanya Nagar (75)", agent: "Sharma Harika" },
          { name: "Prashanth Nagar (96)", agent: "Das Ramesh" },
          { name: "Chaitanya Nagar (27)", agent: "Chary Tarun" },
          { name: "Prashanth Nagar (48)", agent: "Iyer Kiran" },
          { name: "Chaitanya Nagar (69)", agent: "Singh Mahesh" },
          { name: "Prashanth Nagar (90)", agent: "Yadav Swathi" },
          { name: "Chaitanya Nagar (21)", agent: "Reddy Tejaswi" },
          { name: "Prashanth Nagar (42)", agent: "Patel Divya" }
        ]
      },
      {
        name: "Bommakal",
        executive: "Iyer Swathi",
        subAreas: [
          { name: "Mahalaxmi Nagar (63)", agent: "Shetty Vamshi" },
          { name: "Doctors Colony (84)", agent: "Goud Anil" },
          { name: "Mahalaxmi Nagar (15)", agent: "Lal Sandeep" },
          { name: "Doctors Colony (36)", agent: "Verma Lavanya" },
          { name: "Mahalaxmi Nagar (57)", agent: "Joshi Manoj" },
          { name: "Doctors Colony (78)", agent: "Naik Soumya" },
          { name: "Mahalaxmi Nagar (99)", agent: "Raj Pavan" },
          { name: "Doctors Colony (30)", agent: "Sharma Anusha" },
          { name: "Mahalaxmi Nagar (51)", agent: "Das Chaitanya" },
          { name: "Doctors Colony (72)", agent: "Chary Harika" },
          { name: "Mahalaxmi Nagar (93)", agent: "Iyer Ramesh" },
          { name: "Doctors Colony (24)", agent: "Singh Tarun" },
          { name: "Mahalaxmi Nagar (45)", agent: "Yadav Kiran" },
          { name: "Doctors Colony (66)", agent: "Reddy Mahesh" },
          { name: "Mahalaxmi Nagar (87)", agent: "Patel Swathi" },
          { name: "Doctors Colony (18)", agent: "Shetty Tejaswi" },
          { name: "Mahalaxmi Nagar (39)", agent: "Goud Divya" },
          { name: "Doctors Colony (60)", agent: "Lal Vamshi" },
          { name: "Mahalaxmi Nagar (81)", agent: "Verma Anil" },
          { name: "Doctors Colony (12)", agent: "Joshi Sandeep" }
        ]
      },
      {
        name: "Alugunur",
        executive: "Singh Tejaswi",
        subAreas: [
          { name: "Police Colony (33)", agent: "Naik Lavanya" },
          { name: "Teachers Colony (54)", agent: "Raj Manoj" },
          { name: "Police Colony (75)", agent: "Sharma Soumya" },
          { name: "Teachers Colony (96)", agent: "Das Pavan" },
          { name: "Police Colony (27)", agent: "Chary Anusha" },
          { name: "Teachers Colony (48)", agent: "Iyer Chaitanya" },
          { name: "Police Colony (69)", agent: "Singh Harika" },
          { name: "Teachers Colony (90)", agent: "Yadav Ramesh" },
          { name: "Police Colony (21)", agent: "Reddy Tarun" },
          { name: "Teachers Colony (42)", agent: "Patel Kiran" },
          { name: "Police Colony (63)", agent: "Shetty Mahesh" },
          { name: "Teachers Colony (84)", agent: "Goud Swathi" },
          { name: "Police Colony (15)", agent: "Lal Tejaswi" },
          { name: "Teachers Colony (36)", agent: "Verma Divya" },
          { name: "Police Colony (57)", agent: "Joshi Vamshi" },
          { name: "Teachers Colony (78)", agent: "Naik Anil" },
          { name: "Police Colony (99)", agent: "Raj Sandeep" },
          { name: "Teachers Colony (30)", agent: "Sharma Lavanya" },
          { name: "Police Colony (51)", agent: "Das Manoj" },
          { name: "Teachers Colony (72)", agent: "Chary Soumya" }
        ]
      },
      {
        name: "Rekurthi",
        executive: "Yadav Divya",
        subAreas: [
          { name: "Bank Colony (93)", agent: "Iyer Pavan" },
          { name: "SR Nagar Colony (24)", agent: "Singh Anusha" },
          { name: "Bank Colony (45)", agent: "Yadav Chaitanya" },
          { name: "SR Nagar Colony (66)", agent: "Reddy Harika" },
          { name: "Bank Colony (87)", agent: "Patel Ramesh" },
          { name: "SR Nagar Colony (18)", agent: "Shetty Tarun" },
          { name: "Bank Colony (39)", agent: "Goud Kiran" },
          { name: "SR Nagar Colony (60)", agent: "Lal Mahesh" },
          { name: "Bank Colony (81)", agent: "Verma Swathi" },
          { name: "SR Nagar Colony (12)", agent: "Joshi Tejaswi" },
          { name: "Bank Colony (33)", agent: "Naik Divya" },
          { name: "SR Nagar Colony (54)", agent: "Raj Vamshi" },
          { name: "Bank Colony (75)", agent: "Sharma Anil" },
          { name: "SR Nagar Colony (96)", agent: "Das Sandeep" },
          { name: "Bank Colony (27)", agent: "Chary Lavanya" },
          { name: "SR Nagar Colony (48)", agent: "Iyer Manoj" },
          { name: "Bank Colony (69)", agent: "Singh Soumya" },
          { name: "SR Nagar Colony (90)", agent: "Yadav Pavan" },
          { name: "Bank Colony (21)", agent: "Reddy Anusha" },
          { name: "SR Nagar Colony (42)", agent: "Patel Chaitanya" }
        ]
      }
    ]
  }
]; 