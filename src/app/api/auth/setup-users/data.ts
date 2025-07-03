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
  subArea?: number;
  subAreaName?: string;
  subAreaCode?: string;
}

export function parseLoginFile(): UserData[] {
  const filePath = path.join(process.cwd(), 'NEW LOGINS.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');
  const users: UserData[] = [];
  let currentZone = 0;
  let currentZoneName = '';
  let currentArea = 0;
  let currentAreaName = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and the header
    if (!line || line.startsWith('=') || line.startsWith('Default password')) continue;

    // Parse Management
    if (line === 'Top Management') {
      const mgmtData = parseManagement(lines.slice(i + 1));
      users.push(...mgmtData);
      continue;
    }

    // Parse Zone
    if (line.startsWith('Zone')) {
      const zoneMatch = line.match(/Zone (\d+): (.+)/);
      if (zoneMatch) {
        currentZone = parseInt(zoneMatch[1]);
        currentZoneName = zoneMatch[2];
        
        // Parse Zone Manager
        const zmData = parseZoneManager(lines.slice(i + 2), currentZone, currentZoneName);
        if (zmData) users.push(zmData);
      }
      continue;
    }

    // Parse Area
    if (line.startsWith('Area')) {
      const areaMatch = line.match(/Area (\d+): (.+)/);
      if (areaMatch) {
        currentArea = parseInt(areaMatch[1]);
        currentAreaName = areaMatch[2];
        
        // Parse Executive
        const execData = parseExecutive(lines.slice(i + 1), currentZone, currentZoneName, currentArea, currentAreaName);
        if (execData) users.push(execData);
        
        // Parse Agents
        const agentsData = parseAgents(lines.slice(i + 5), currentZone, currentZoneName, currentArea, currentAreaName);
        users.push(...agentsData);
      }
    }
  }

  return users;
}

function parseManagement(lines: string[]): UserData[] {
  const users: UserData[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line === 'Zone 1: Karimnagar Central') break;

    if (line.startsWith('1. Management') || line.startsWith('2. AGM')) {
      const role = line.includes('Management') ? 'management' : 'agm';
      const name = lines[i + 1].split(':')[1].trim();
      const employeeId = lines[i + 2].split(':')[1].trim();

      users.push({
        name,
        employeeId,
        password: 'password123',
        role
      });

      i += 4;
    } else {
      i++;
    }
  }

  return users;
}

function parseZoneManager(lines: string[], zone: number, zoneName: string): UserData | null {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('- Name:')) {
      const name = line.split(':')[1].trim();
      const employeeId = lines[i + 1].split(':')[1].trim();
      
      return {
        name,
        employeeId,
        password: 'password123',
        role: 'zm',
        zone,
        zoneName
      };
    }
  }
  return null;
}

function parseExecutive(lines: string[], zone: number, zoneName: string, area: number, areaName: string): UserData | null {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('- Name:')) {
      const name = line.split(':')[1].trim();
      const employeeId = lines[i + 1].split(':')[1].trim();
      
      return {
        name,
        employeeId,
        password: 'password123',
        role: 'executive',
        zone,
        zoneName,
        area,
        areaName
      };
    }
  }
  return null;
}

function parseAgents(lines: string[], zone: number, zoneName: string, area: number, areaName: string): UserData[] {
  const agents: UserData[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line.startsWith('Area') || line === 'Zone') break;

    const nameMatch = line.match(/Name: (.+)/);
    if (nameMatch) {
      const name = nameMatch[1];
      const employeeId = lines[i + 1].split(':')[1].trim();
      const areaInfo = lines[i + 2].split(':')[1].trim();
      const [subAreaName, subAreaCode] = areaInfo.split('(');
      const subArea = parseInt(subAreaCode.replace(')', ''));

      agents.push({
        name,
        employeeId,
        password: 'password123',
        role: 'agent',
        zone,
        zoneName,
        area,
        areaName,
        subArea,
        subAreaName: subAreaName.trim(),
        subAreaCode: subAreaCode.replace(')', '')
      });

      i += 3;
    } else {
      i++;
    }
  }

  return agents;
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
          { name: "Vinayaka Nagar", code: "76", agent: "Ramesh Reddy" },
          { name: "Hanuman Nagar", code: "30", agent: "Reddy Manoj" },
          { name: "Vani Nagar", code: "92", agent: "Sai Harika" },
          { name: "Krishna Nagar", code: "58", agent: "Reddy Pavan" },
          { name: "Nehrunagar", code: "44", agent: "Kiran Shetty" },
          { name: "Jyothi Nagar", code: "12", agent: "Rajesh Prasad" },
          { name: "Sharada Nagar", code: "6", agent: "Sai Ajay" },
          { name: "Bhagya Nagar", code: "11", agent: "Mouli Nikhil" },
          { name: "Vani Nagar", code: "91", agent: "S Ramesh" },
          { name: "Vinayaka Nagar", code: "30", agent: "N Arun" },
          { name: "Chaitanya Nagar", code: "21", agent: "Sunil Shetty" },
          { name: "Geetha Nagar", code: "90", agent: "Patel Sneha" },
          { name: "Lakshmi Nagar", code: "69", agent: "Yadav Anil" },
          { name: "Bhagya Nagar", code: "35", agent: "Goud Harsha" },
          { name: "Prashanth Nagar", code: "41", agent: "Pavan Patel" },
          { name: "Mahalaxmi Nagar", code: "28", agent: "Joshi Tarun" },
          { name: "Doctors Colony", code: "19", agent: "Kiran Sharma" },
          { name: "Sharada Nagar", code: "96", agent: "Lal Chaitanya" },
          { name: "Chaitanya Nagar", code: "29", agent: "B Vamshi" },
          { name: "Vivekananda Nagar", code: "15", agent: "T Sneha" }
        ]
      },
      {
        name: "Vavilalapalli",
        executive: "Manoj Patel",
        subAreas: [
          { name: "Bhagya Nagar", code: "77", agent: "Vamshi Verma" },
          { name: "Bhavani Nagar", code: "88", agent: "Sai Rajesh" },
          { name: "Raghavendra Colony", code: "15", agent: "Chaitanya Yadav" },
          { name: "Bhavani Nagar", code: "93", agent: "Kiran Pavan" },
          { name: "Jyothi Nagar", code: "81", agent: "Tejaswi Kiran" },
          { name: "Vani Nagar", code: "20", agent: "Priyanka Yadav" },
          { name: "Bhavani Nagar", code: "77", agent: "Tarun Reddy" },
          { name: "Chaitanya Nagar", code: "40", agent: "M Ramesh" },
          { name: "Vinayaka Nagar", code: "11", agent: "Patel Tarun" },
          { name: "Sai Nagar", code: "17", agent: "Sai Tarun" },
          { name: "Sharada Nagar", code: "68", agent: "Shetty Chaitanya" },
          { name: "Vijaya Nagar", code: "52", agent: "Prasad Sneha" },
          { name: "Teachers Colony", code: "16", agent: "V Anil" },
          { name: "SR Nagar Colony", code: "76", agent: "Lal Anil" },
          { name: "Bhavani Nagar", code: "10", agent: "Goud Sneha" },
          { name: "Shivaji Nagar", code: "5", agent: "Srinivas Kiran" },
          { name: "Geetha Nagar", code: "86", agent: "Venkatesh Sai" },
          { name: "Bank Colony", code: "32", agent: "Lavanya Iyer" },
          { name: "Jyothi Nagar", code: "13", agent: "Prasad Chaitanya" },
          { name: "Rajeev Nagar", code: "60", agent: "Naik Ramesh" }
        ]
      },
      {
        name: "Gopalapuram",
        executive: "Bhavana Raj",
        subAreas: [
          { name: "Tulasi Nagar", code: "25", agent: "C Naveen" },
          { name: "Nehrunagar", code: "24", agent: "Ajay Sharma" },
          { name: "Teachers Colony", code: "71", agent: "A Ramesh" },
          { name: "Vinayaka Nagar", code: "97", agent: "N Sandeep" },
          { name: "Bank Colony", code: "28", agent: "Divya Goud" },
          { name: "Bhagya Nagar", code: "1", agent: "Pavan Singh" },
          { name: "Nehrunagar", code: "90", agent: "Sai Lavanya" },
          { name: "Police Colony", code: "20", agent: "A Nikhil" },
          { name: "Vivekananda Nagar", code: "96", agent: "Ramesh Goud" },
          { name: "Bank Colony", code: "65", agent: "Goud Sandeep" },
          { name: "Vinayaka Nagar", code: "24", agent: "T Manoj" },
          { name: "Tulasi Nagar", code: "52", agent: "D Divya" },
          { name: "Prashanth Nagar", code: "80", agent: "M Chaitanya" },
          { name: "Mahalaxmi Nagar", code: "34", agent: "D Swathi" },
          { name: "Sharada Nagar", code: "51", agent: "N Swathi" },
          { name: "Mahalaxmi Nagar", code: "97", agent: "M Mahesh" },
          { name: "Jyothi Nagar", code: "10", agent: "Kiran Venkatesh" },
          { name: "Sai Nagar", code: "45", agent: "V Divya" },
          { name: "Indira Nagar", code: "21", agent: "Tejaswi Sai" },
          { name: "Bhavani Nagar", code: "86", agent: "Naik Nikhil" }
        ]
      },
      {
        name: "Rampur",
        executive: "Rajesh Naik",
        subAreas: [
          { name: "Sri Rama Nagar", code: "35", agent: "Manoj Shetty" },
          { name: "Hanuman Nagar", code: "88", agent: "Verma Soumya" },
          { name: "Police Colony", code: "33", agent: "S Srinivas" },
          { name: "Prashanth Nagar", code: "1", agent: "Priyanka Chary" },
          { name: "Sharada Nagar", code: "21", agent: "Naik Mahesh" },
          { name: "Sri Rama Nagar", code: "70", agent: "M Tejaswi" },
          { name: "Sri Rama Nagar", code: "56", agent: "V Ramesh" },
          { name: "Prashanth Nagar", code: "46", agent: "T Swathi" },
          { name: "Jyothi Nagar", code: "46", agent: "Iyer Divya" },
          { name: "Sri Rama Nagar", code: "31", agent: "K Lavanya" },
          { name: "SR Nagar Colony", code: "23", agent: "Raj Anusha" },
          { name: "Tulasi Nagar", code: "35", agent: "D Soumya" },
          { name: "Vani Nagar", code: "59", agent: "Nikhil Sharma" },
          { name: "SR Nagar Colony", code: "85", agent: "S Arun" },
          { name: "Shivaji Nagar", code: "99", agent: "Sunil Kiran" },
          { name: "Raghavendra Colony", code: "4", agent: "C Divya" },
          { name: "Sharada Nagar", code: "5", agent: "V Manoj" },
          { name: "Mahalaxmi Nagar", code: "56", agent: "Naik Vamshi" },
          { name: "Vani Nagar", code: "33", agent: "A Harika" },
          { name: "Vani Nagar", code: "47", agent: "Srinivas Raj" }
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
          { name: "Padmavathi Nagar", code: "90", agent: "Naveen Chary" },
          { name: "Rajeev Nagar", code: "86", agent: "Swathi Yadav" },
          { name: "Vijaya Nagar", code: "52", agent: "Reddy Tejaswi" },
          { name: "Indira Nagar", code: "27", agent: "Lavanya Lal" },
          { name: "Mahalaxmi Nagar", code: "60", agent: "Ajay Shetty" },
          { name: "Bank Colony", code: "95", agent: "S Swathi" },
          { name: "Raghavendra Colony", code: "12", agent: "A Kiran" },
          { name: "Tulasi Nagar", code: "61", agent: "Patel Soumya" },
          { name: "Rajeev Nagar", code: "81", agent: "Joshi Venkatesh" },
          { name: "Padmavathi Nagar", code: "32", agent: "B Sneha" },
          { name: "Nehrunagar", code: "29", agent: "N Lavanya" },
          { name: "Vivekananda Nagar", code: "72", agent: "N Anusha" },
          { name: "Sai Nagar", code: "60", agent: "Sai Vamshi" },
          { name: "Mahalaxmi Nagar", code: "97", agent: "Manoj Kiran" },
          { name: "Teachers Colony", code: "21", agent: "Das Soumya" },
          { name: "Sharada Nagar", code: "97", agent: "R Tejaswi" },
          { name: "Police Colony", code: "81", agent: "B Pavan" },
          { name: "Indira Nagar", code: "31", agent: "Harsha Raj" },
          { name: "Vinayaka Nagar", code: "18", agent: "C Anil" },
          { name: "Hanuman Nagar", code: "9", agent: "Chaitanya Raj" }
        ]
      },
      {
        name: "Ramnagar",
        executive: "Sharma Divya",
        subAreas: [
          { name: "Geetha Nagar", code: "73", agent: "Reddy Sneha" },
          { name: "Vivekananda Nagar", code: "44", agent: "Patel Rajesh" },
          { name: "Indira Nagar", code: "95", agent: "Shetty Vamshi" },
          { name: "Vani Nagar", code: "66", agent: "Goud Tejaswi" },
          { name: "Vivekananda Nagar", code: "38", agent: "Lal Swathi" },
          { name: "Vani Nagar", code: "7", agent: "Verma Nikhil" },
          { name: "Vivekananda Nagar", code: "50", agent: "Joshi Divya" },
          { name: "Vani Nagar", code: "82", agent: "Naik Anil" },
          { name: "Vivekananda Nagar", code: "25", agent: "Raj Sandeep" },
          { name: "Vani Nagar", code: "94", agent: "Sharma Lavanya" },
          { name: "Vivekananda Nagar", code: "17", agent: "Das Manoj" },
          { name: "Vani Nagar", code: "39", agent: "Chary Soumya" },
          { name: "Vivekananda Nagar", code: "62", agent: "Iyer Pavan" },
          { name: "Vani Nagar", code: "83", agent: "Singh Anusha" },
          { name: "Vivekananda Nagar", code: "36", agent: "Yadav Chaitanya" },
          { name: "Vani Nagar", code: "55", agent: "Reddy Harika" },
          { name: "Vivekananda Nagar", code: "78", agent: "Patel Ramesh" },
          { name: "Vani Nagar", code: "91", agent: "Shetty Tarun" },
          { name: "Vivekananda Nagar", code: "14", agent: "Goud Kiran" },
          { name: "Vani Nagar", code: "67", agent: "Lal Mahesh" }
        ]
      },
      {
        name: "Manakondur",
        executive: "Chary Sneha",
        subAreas: [
          { name: "Lakshmi Nagar", code: "42", agent: "Verma Swathi" },
          { name: "Bhagya Nagar", code: "63", agent: "Joshi Tejaswi" },
          { name: "Lakshmi Nagar", code: "84", agent: "Naik Divya" },
          { name: "Bhagya Nagar", code: "15", agent: "Raj Vamshi" },
          { name: "Lakshmi Nagar", code: "37", agent: "Sharma Anil" },
          { name: "Bhagya Nagar", code: "58", agent: "Das Sandeep" },
          { name: "Lakshmi Nagar", code: "79", agent: "Chary Lavanya" },
          { name: "Bhagya Nagar", code: "10", agent: "Iyer Manoj" },
          { name: "Lakshmi Nagar", code: "31", agent: "Singh Soumya" },
          { name: "Bhagya Nagar", code: "52", agent: "Yadav Pavan" },
          { name: "Lakshmi Nagar", code: "73", agent: "Reddy Anusha" },
          { name: "Bhagya Nagar", code: "94", agent: "Patel Chaitanya" },
          { name: "Lakshmi Nagar", code: "25", agent: "Shetty Harika" },
          { name: "Bhagya Nagar", code: "46", agent: "Goud Ramesh" },
          { name: "Lakshmi Nagar", code: "67", agent: "Lal Tarun" },
          { name: "Bhagya Nagar", code: "88", agent: "Verma Kiran" },
          { name: "Lakshmi Nagar", code: "19", agent: "Joshi Mahesh" },
          { name: "Bhagya Nagar", code: "40", agent: "Naik Swathi" },
          { name: "Lakshmi Nagar", code: "61", agent: "Raj Tejaswi" },
          { name: "Bhagya Nagar", code: "82", agent: "Sharma Divya" }
        ]
      },
      {
        name: "Thimmapur",
        executive: "Singh Vamshi",
        subAreas: [
          { name: "Sai Nagar", code: "33", agent: "Das Anil" },
          { name: "Rajeev Nagar", code: "54", agent: "Chary Sandeep" },
          { name: "Sai Nagar", code: "75", agent: "Iyer Lavanya" },
          { name: "Rajeev Nagar", code: "96", agent: "Singh Manoj" },
          { name: "Sai Nagar", code: "27", agent: "Yadav Soumya" },
          { name: "Rajeev Nagar", code: "48", agent: "Reddy Pavan" },
          { name: "Sai Nagar", code: "69", agent: "Patel Anusha" },
          { name: "Rajeev Nagar", code: "90", agent: "Shetty Chaitanya" },
          { name: "Sai Nagar", code: "21", agent: "Goud Harika" },
          { name: "Rajeev Nagar", code: "42", agent: "Lal Ramesh" },
          { name: "Sai Nagar", code: "63", agent: "Verma Tarun" },
          { name: "Rajeev Nagar", code: "84", agent: "Joshi Kiran" },
          { name: "Sai Nagar", code: "15", agent: "Naik Mahesh" },
          { name: "Rajeev Nagar", code: "36", agent: "Raj Swathi" },
          { name: "Sai Nagar", code: "57", agent: "Sharma Tejaswi" },
          { name: "Rajeev Nagar", code: "78", agent: "Das Divya" },
          { name: "Sai Nagar", code: "99", agent: "Chary Vamshi" },
          { name: "Rajeev Nagar", code: "30", agent: "Iyer Anil" },
          { name: "Sai Nagar", code: "51", agent: "Singh Sandeep" },
          { name: "Rajeev Nagar", code: "72", agent: "Yadav Lavanya" }
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
          { name: "Hanuman Nagar", code: "93", agent: "Reddy Lavanya" },
          { name: "Vivekananda Nagar", code: "24", agent: "Patel Manoj" },
          { name: "Sai Nagar", code: "45", agent: "Shetty Soumya" },
          { name: "Rajeev Nagar", code: "66", agent: "Goud Pavan" },
          { name: "Hanuman Nagar", code: "87", agent: "Lal Anusha" },
          { name: "Vivekananda Nagar", code: "18", agent: "Verma Chaitanya" },
          { name: "Sai Nagar", code: "39", agent: "Joshi Harika" },
          { name: "Rajeev Nagar", code: "60", agent: "Naik Ramesh" },
          { name: "Hanuman Nagar", code: "81", agent: "Raj Tarun" },
          { name: "Vivekananda Nagar", code: "12", agent: "Sharma Kiran" },
          { name: "Sai Nagar", code: "33", agent: "Das Mahesh" },
          { name: "Rajeev Nagar", code: "54", agent: "Chary Swathi" },
          { name: "Hanuman Nagar", code: "75", agent: "Iyer Tejaswi" },
          { name: "Vivekananda Nagar", code: "96", agent: "Singh Divya" },
          { name: "Sai Nagar", code: "27", agent: "Yadav Vamshi" },
          { name: "Rajeev Nagar", code: "48", agent: "Reddy Anil" },
          { name: "Hanuman Nagar", code: "69", agent: "Patel Sandeep" },
          { name: "Vivekananda Nagar", code: "90", agent: "Shetty Lavanya" },
          { name: "Sai Nagar", code: "21", agent: "Goud Manoj" },
          { name: "Rajeev Nagar", code: "42", agent: "Lal Soumya" }
        ]
      },
      {
        name: "Bommakal",
        executive: "Verma Pavan",
        subAreas: [
          { name: "Lakshmi Nagar", code: "63", agent: "Joshi Anusha" },
          { name: "Bhagya Nagar", code: "84", agent: "Naik Chaitanya" },
          { name: "Lakshmi Nagar", code: "15", agent: "Raj Harika" },
          { name: "Bhagya Nagar", code: "36", agent: "Sharma Ramesh" },
          { name: "Lakshmi Nagar", code: "57", agent: "Das Tarun" },
          { name: "Bhagya Nagar", code: "78", agent: "Chary Kiran" },
          { name: "Lakshmi Nagar", code: "99", agent: "Iyer Mahesh" },
          { name: "Bhagya Nagar", code: "30", agent: "Singh Swathi" },
          { name: "Lakshmi Nagar", code: "51", agent: "Yadav Tejaswi" },
          { name: "Bhagya Nagar", code: "72", agent: "Reddy Divya" },
          { name: "Lakshmi Nagar", code: "93", agent: "Patel Vamshi" },
          { name: "Bhagya Nagar", code: "24", agent: "Shetty Anil" },
          { name: "Lakshmi Nagar", code: "45", agent: "Goud Sandeep" },
          { name: "Bhagya Nagar", code: "66", agent: "Lal Lavanya" },
          { name: "Lakshmi Nagar", code: "87", agent: "Verma Manoj" },
          { name: "Bhagya Nagar", code: "18", agent: "Joshi Soumya" },
          { name: "Lakshmi Nagar", code: "39", agent: "Naik Pavan" },
          { name: "Bhagya Nagar", code: "60", agent: "Raj Anusha" },
          { name: "Lakshmi Nagar", code: "81", agent: "Sharma Chaitanya" },
          { name: "Bhagya Nagar", code: "12", agent: "Das Harika" }
        ]
      },
      {
        name: "Kothapalli",
        executive: "Joshi Ramesh",
        subAreas: [
          { name: "Geetha Nagar", code: "33", agent: "Chary Tarun" },
          { name: "Vani Nagar", code: "54", agent: "Iyer Kiran" },
          { name: "Geetha Nagar", code: "75", agent: "Singh Mahesh" },
          { name: "Vani Nagar", code: "96", agent: "Yadav Swathi" },
          { name: "Geetha Nagar", code: "27", agent: "Reddy Tejaswi" },
          { name: "Vani Nagar", code: "48", agent: "Patel Divya" },
          { name: "Geetha Nagar", code: "69", agent: "Shetty Vamshi" },
          { name: "Vani Nagar", code: "90", agent: "Goud Anil" },
          { name: "Geetha Nagar", code: "21", agent: "Lal Sandeep" },
          { name: "Vani Nagar", code: "42", agent: "Verma Lavanya" },
          { name: "Geetha Nagar", code: "63", agent: "Joshi Manoj" },
          { name: "Vani Nagar", code: "84", agent: "Naik Soumya" },
          { name: "Geetha Nagar", code: "15", agent: "Raj Pavan" },
          { name: "Vani Nagar", code: "36", agent: "Sharma Anusha" },
          { name: "Geetha Nagar", code: "57", agent: "Das Chaitanya" },
          { name: "Vani Nagar", code: "78", agent: "Chary Harika" },
          { name: "Geetha Nagar", code: "99", agent: "Iyer Ramesh" },
          { name: "Vani Nagar", code: "30", agent: "Singh Tarun" },
          { name: "Geetha Nagar", code: "51", agent: "Yadav Kiran" },
          { name: "Vani Nagar", code: "72", agent: "Reddy Mahesh" }
        ]
      },
      {
        name: "Alugunur",
        executive: "Naik Swathi",
        subAreas: [
          { name: "Sharada Nagar", code: "93", agent: "Patel Swathi" },
          { name: "Indira Nagar", code: "24", agent: "Shetty Tejaswi" },
          { name: "Sharada Nagar", code: "45", agent: "Goud Divya" },
          { name: "Indira Nagar", code: "66", agent: "Lal Vamshi" },
          { name: "Sharada Nagar", code: "87", agent: "Verma Anil" },
          { name: "Indira Nagar", code: "18", agent: "Joshi Sandeep" },
          { name: "Sharada Nagar", code: "39", agent: "Naik Lavanya" },
          { name: "Indira Nagar", code: "60", agent: "Raj Manoj" },
          { name: "Sharada Nagar", code: "81", agent: "Sharma Soumya" },
          { name: "Indira Nagar", code: "12", agent: "Das Pavan" },
          { name: "Sharada Nagar", code: "33", agent: "Chary Anusha" },
          { name: "Indira Nagar", code: "54", agent: "Iyer Chaitanya" },
          { name: "Sharada Nagar", code: "75", agent: "Singh Harika" },
          { name: "Indira Nagar", code: "96", agent: "Yadav Ramesh" },
          { name: "Sharada Nagar", code: "27", agent: "Reddy Tarun" },
          { name: "Indira Nagar", code: "48", agent: "Patel Kiran" },
          { name: "Sharada Nagar", code: "69", agent: "Shetty Mahesh" },
          { name: "Indira Nagar", code: "90", agent: "Goud Swathi" },
          { name: "Sharada Nagar", code: "21", agent: "Lal Tejaswi" },
          { name: "Indira Nagar", code: "42", agent: "Verma Divya" }
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
          { name: "Chaitanya Nagar", code: "93", agent: "Joshi Anil" },
          { name: "Prashanth Nagar", code: "24", agent: "Naik Sandeep" },
          { name: "Chaitanya Nagar", code: "45", agent: "Raj Lavanya" },
          { name: "Prashanth Nagar", code: "66", agent: "Sharma Manoj" },
          { name: "Chaitanya Nagar", code: "87", agent: "Das Soumya" },
          { name: "Prashanth Nagar", code: "18", agent: "Chary Pavan" },
          { name: "Chaitanya Nagar", code: "39", agent: "Iyer Anusha" },
          { name: "Prashanth Nagar", code: "60", agent: "Singh Chaitanya" },
          { name: "Chaitanya Nagar", code: "81", agent: "Yadav Harika" },
          { name: "Prashanth Nagar", code: "12", agent: "Reddy Ramesh" },
          { name: "Chaitanya Nagar", code: "33", agent: "Patel Tarun" },
          { name: "Prashanth Nagar", code: "54", agent: "Shetty Kiran" },
          { name: "Chaitanya Nagar", code: "75", agent: "Goud Mahesh" },
          { name: "Prashanth Nagar", code: "96", agent: "Lal Swathi" },
          { name: "Chaitanya Nagar", code: "27", agent: "Verma Tejaswi" },
          { name: "Prashanth Nagar", code: "48", agent: "Joshi Divya" },
          { name: "Chaitanya Nagar", code: "69", agent: "Naik Vamshi" },
          { name: "Prashanth Nagar", code: "90", agent: "Raj Anil" },
          { name: "Chaitanya Nagar", code: "21", agent: "Sharma Sandeep" },
          { name: "Prashanth Nagar", code: "42", agent: "Das Lavanya" }
        ]
      },
      {
        name: "Sapthagiri Colony",
        executive: "Das Anil",
        subAreas: [
          { name: "Mahalaxmi Nagar", code: "63", agent: "Chary Manoj" },
          { name: "Doctors Colony", code: "84", agent: "Iyer Soumya" },
          { name: "Mahalaxmi Nagar", code: "15", agent: "Singh Pavan" },
          { name: "Doctors Colony", code: "36", agent: "Yadav Anusha" },
          { name: "Mahalaxmi Nagar", code: "57", agent: "Reddy Chaitanya" },
          { name: "Doctors Colony", code: "78", agent: "Patel Harika" },
          { name: "Mahalaxmi Nagar", code: "99", agent: "Shetty Ramesh" },
          { name: "Doctors Colony", code: "30", agent: "Goud Tarun" },
          { name: "Mahalaxmi Nagar", code: "51", agent: "Lal Kiran" },
          { name: "Doctors Colony", code: "72", agent: "Verma Mahesh" },
          { name: "Mahalaxmi Nagar", code: "93", agent: "Joshi Swathi" },
          { name: "Doctors Colony", code: "24", agent: "Naik Tejaswi" },
          { name: "Mahalaxmi Nagar", code: "45", agent: "Raj Divya" },
          { name: "Doctors Colony", code: "66", agent: "Sharma Vamshi" },
          { name: "Mahalaxmi Nagar", code: "87", agent: "Das Anil" },
          { name: "Doctors Colony", code: "18", agent: "Chary Sandeep" },
          { name: "Mahalaxmi Nagar", code: "39", agent: "Iyer Lavanya" },
          { name: "Doctors Colony", code: "60", agent: "Singh Manoj" },
          { name: "Mahalaxmi Nagar", code: "81", agent: "Yadav Soumya" },
          { name: "Doctors Colony", code: "12", agent: "Reddy Pavan" }
        ]
      },
      {
        name: "Ramnagar",
        executive: "Chary Sandeep",
        subAreas: [
          { name: "Police Colony", code: "33", agent: "Patel Anusha" },
          { name: "Teachers Colony", code: "54", agent: "Shetty Chaitanya" },
          { name: "Police Colony", code: "75", agent: "Goud Harika" },
          { name: "Teachers Colony", code: "96", agent: "Lal Ramesh" },
          { name: "Police Colony", code: "27", agent: "Verma Tarun" },
          { name: "Teachers Colony", code: "48", agent: "Joshi Kiran" },
          { name: "Police Colony", code: "69", agent: "Naik Mahesh" },
          { name: "Teachers Colony", code: "90", agent: "Raj Swathi" },
          { name: "Police Colony", code: "21", agent: "Sharma Tejaswi" },
          { name: "Teachers Colony", code: "42", agent: "Das Divya" },
          { name: "Police Colony", code: "63", agent: "Chary Vamshi" },
          { name: "Teachers Colony", code: "84", agent: "Iyer Anil" },
          { name: "Police Colony", code: "15", agent: "Singh Sandeep" },
          { name: "Teachers Colony", code: "36", agent: "Yadav Lavanya" },
          { name: "Police Colony", code: "57", agent: "Reddy Manoj" },
          { name: "Teachers Colony", code: "78", agent: "Patel Soumya" },
          { name: "Police Colony", code: "99", agent: "Shetty Pavan" },
          { name: "Teachers Colony", code: "30", agent: "Goud Anusha" },
          { name: "Police Colony", code: "51", agent: "Lal Chaitanya" },
          { name: "Teachers Colony", code: "72", agent: "Verma Harika" }
        ]
      },
      {
        name: "Vidyanagar",
        executive: "Iyer Lavanya",
        subAreas: [
          { name: "Bank Colony", code: "93", agent: "Joshi Ramesh" },
          { name: "SR Nagar Colony", code: "24", agent: "Naik Tarun" },
          { name: "Bank Colony", code: "45", agent: "Raj Kiran" },
          { name: "SR Nagar Colony", code: "66", agent: "Sharma Mahesh" },
          { name: "Bank Colony", code: "87", agent: "Das Swathi" },
          { name: "SR Nagar Colony", code: "18", agent: "Chary Tejaswi" },
          { name: "Bank Colony", code: "39", agent: "Iyer Divya" },
          { name: "SR Nagar Colony", code: "60", agent: "Singh Vamshi" },
          { name: "Bank Colony", code: "81", agent: "Yadav Anil" },
          { name: "SR Nagar Colony", code: "12", agent: "Reddy Sandeep" },
          { name: "Bank Colony", code: "33", agent: "Patel Lavanya" },
          { name: "SR Nagar Colony", code: "54", agent: "Shetty Manoj" },
          { name: "Bank Colony", code: "75", agent: "Goud Soumya" },
          { name: "SR Nagar Colony", code: "96", agent: "Lal Pavan" },
          { name: "Bank Colony", code: "27", agent: "Verma Anusha" },
          { name: "SR Nagar Colony", code: "48", agent: "Joshi Chaitanya" },
          { name: "Bank Colony", code: "69", agent: "Naik Harika" },
          { name: "SR Nagar Colony", code: "90", agent: "Raj Ramesh" },
          { name: "Bank Colony", code: "21", agent: "Sharma Tarun" },
          { name: "SR Nagar Colony", code: "42", agent: "Das Kiran" }
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
          { name: "Tulasi Nagar", code: "93", agent: "Joshi Tejaswi" },
          { name: "Raghavendra Colony", code: "24", agent: "Naik Divya" },
          { name: "Tulasi Nagar", code: "45", agent: "Raj Vamshi" },
          { name: "Raghavendra Colony", code: "66", agent: "Sharma Anil" },
          { name: "Tulasi Nagar", code: "87", agent: "Das Sandeep" },
          { name: "Raghavendra Colony", code: "18", agent: "Chary Lavanya" },
          { name: "Tulasi Nagar", code: "39", agent: "Iyer Manoj" },
          { name: "Raghavendra Colony", code: "60", agent: "Singh Soumya" },
          { name: "Tulasi Nagar", code: "81", agent: "Yadav Pavan" },
          { name: "Raghavendra Colony", code: "12", agent: "Reddy Anusha" },
          { name: "Tulasi Nagar", code: "33", agent: "Patel Chaitanya" },
          { name: "Raghavendra Colony", code: "54", agent: "Shetty Harika" },
          { name: "Tulasi Nagar", code: "75", agent: "Goud Ramesh" },
          { name: "Raghavendra Colony", code: "96", agent: "Lal Tarun" },
          { name: "Tulasi Nagar", code: "27", agent: "Verma Kiran" },
          { name: "Raghavendra Colony", code: "48", agent: "Joshi Mahesh" },
          { name: "Tulasi Nagar", code: "69", agent: "Naik Swathi" },
          { name: "Raghavendra Colony", code: "90", agent: "Raj Tejaswi" },
          { name: "Tulasi Nagar", code: "21", agent: "Sharma Divya" },
          { name: "Raghavendra Colony", code: "42", agent: "Das Vamshi" }
        ]
      },
      {
        name: "Padmanagar",
        executive: "Reddy Tejaswi",
        subAreas: [
          { name: "Padmavathi Nagar", code: "63", agent: "Chary Anil" },
          { name: "Vijaya Nagar", code: "84", agent: "Iyer Sandeep" },
          { name: "Padmavathi Nagar", code: "15", agent: "Singh Lavanya" },
          { name: "Vijaya Nagar", code: "36", agent: "Yadav Manoj" },
          { name: "Padmavathi Nagar", code: "57", agent: "Reddy Soumya" },
          { name: "Vijaya Nagar", code: "78", agent: "Patel Pavan" },
          { name: "Padmavathi Nagar", code: "99", agent: "Shetty Anusha" },
          { name: "Vijaya Nagar", code: "30", agent: "Goud Chaitanya" },
          { name: "Padmavathi Nagar", code: "51", agent: "Lal Harika" },
          { name: "Vijaya Nagar", code: "72", agent: "Verma Ramesh" },
          { name: "Padmavathi Nagar", code: "93", agent: "Joshi Tarun" },
          { name: "Vijaya Nagar", code: "24", agent: "Naik Kiran" },
          { name: "Padmavathi Nagar", code: "45", agent: "Raj Mahesh" },
          { name: "Vijaya Nagar", code: "66", agent: "Sharma Swathi" },
          { name: "Padmavathi Nagar", code: "87", agent: "Das Tejaswi" },
          { name: "Vijaya Nagar", code: "18", agent: "Chary Divya" },
          { name: "Padmavathi Nagar", code: "39", agent: "Iyer Vamshi" },
          { name: "Vijaya Nagar", code: "60", agent: "Singh Anil" },
          { name: "Padmavathi Nagar", code: "81", agent: "Yadav Sandeep" },
          { name: "Vijaya Nagar", code: "12", agent: "Reddy Lavanya" }
        ]
      },
      {
        name: "Laxmipur",
        executive: "Patel Divya",
        subAreas: [
          { name: "Krishna Nagar", code: "33", agent: "Shetty Manoj" },
          { name: "Nehrunagar", code: "54", agent: "Goud Soumya" },
          { name: "Krishna Nagar", code: "75", agent: "Lal Pavan" },
          { name: "Nehrunagar", code: "96", agent: "Verma Anusha" },
          { name: "Krishna Nagar", code: "27", agent: "Joshi Chaitanya" },
          { name: "Nehrunagar", code: "48", agent: "Naik Harika" },
          { name: "Krishna Nagar", code: "69", agent: "Raj Ramesh" },
          { name: "Nehrunagar", code: "90", agent: "Sharma Tarun" },
          { name: "Krishna Nagar", code: "21", agent: "Das Kiran" },
          { name: "Nehrunagar", code: "42", agent: "Chary Mahesh" },
          { name: "Krishna Nagar", code: "63", agent: "Iyer Swathi" },
          { name: "Nehrunagar", code: "84", agent: "Singh Tejaswi" },
          { name: "Krishna Nagar", code: "15", agent: "Yadav Divya" },
          { name: "Nehrunagar", code: "36", agent: "Reddy Vamshi" },
          { name: "Krishna Nagar", code: "57", agent: "Patel Anil" },
          { name: "Nehrunagar", code: "78", agent: "Shetty Sandeep" },
          { name: "Krishna Nagar", code: "99", agent: "Goud Lavanya" },
          { name: "Nehrunagar", code: "30", agent: "Lal Manoj" },
          { name: "Krishna Nagar", code: "51", agent: "Verma Soumya" },
          { name: "Nehrunagar", code: "72", agent: "Joshi Pavan" }
        ]
      },
      {
        name: "Subhashnagar",
        executive: "Shetty Vamshi",
        subAreas: [
          { name: "Bhavani Nagar", code: "93", agent: "Naik Anusha" },
          { name: "Shivaji Nagar", code: "24", agent: "Raj Chaitanya" },
          { name: "Bhavani Nagar", code: "45", agent: "Sharma Harika" },
          { name: "Shivaji Nagar", code: "66", agent: "Das Ramesh" },
          { name: "Bhavani Nagar", code: "87", agent: "Chary Tarun" },
          { name: "Shivaji Nagar", code: "18", agent: "Iyer Kiran" },
          { name: "Bhavani Nagar", code: "39", agent: "Singh Mahesh" },
          { name: "Shivaji Nagar", code: "60", agent: "Yadav Swathi" },
          { name: "Bhavani Nagar", code: "81", agent: "Reddy Tejaswi" },
          { name: "Shivaji Nagar", code: "12", agent: "Patel Divya" },
          { name: "Bhavani Nagar", code: "33", agent: "Shetty Vamshi" },
          { name: "Shivaji Nagar", code: "54", agent: "Goud Anil" },
          { name: "Bhavani Nagar", code: "75", agent: "Lal Sandeep" },
          { name: "Shivaji Nagar", code: "96", agent: "Verma Lavanya" },
          { name: "Bhavani Nagar", code: "27", agent: "Joshi Manoj" },
          { name: "Shivaji Nagar", code: "48", agent: "Naik Soumya" },
          { name: "Bhavani Nagar", code: "69", agent: "Raj Pavan" },
          { name: "Shivaji Nagar", code: "90", agent: "Sharma Anusha" },
          { name: "Bhavani Nagar", code: "21", agent: "Das Chaitanya" },
          { name: "Shivaji Nagar", code: "42", agent: "Chary Harika" }
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
          { name: "Hanuman Nagar", code: "93", agent: "Verma Vamshi" },
          { name: "Vivekananda Nagar", code: "24", agent: "Joshi Anil" },
          { name: "Hanuman Nagar", code: "45", agent: "Naik Sandeep" },
          { name: "Vivekananda Nagar", code: "66", agent: "Raj Lavanya" },
          { name: "Hanuman Nagar", code: "87", agent: "Sharma Manoj" },
          { name: "Vivekananda Nagar", code: "18", agent: "Das Soumya" },
          { name: "Hanuman Nagar", code: "39", agent: "Chary Pavan" },
          { name: "Vivekananda Nagar", code: "60", agent: "Iyer Anusha" },
          { name: "Hanuman Nagar", code: "81", agent: "Singh Chaitanya" },
          { name: "Vivekananda Nagar", code: "12", agent: "Yadav Harika" },
          { name: "Hanuman Nagar", code: "33", agent: "Reddy Ramesh" },
          { name: "Vivekananda Nagar", code: "54", agent: "Patel Tarun" },
          { name: "Hanuman Nagar", code: "75", agent: "Shetty Kiran" },
          { name: "Vivekananda Nagar", code: "96", agent: "Goud Mahesh" },
          { name: "Hanuman Nagar", code: "27", agent: "Lal Swathi" },
          { name: "Vivekananda Nagar", code: "48", agent: "Verma Tejaswi" },
          { name: "Hanuman Nagar", code: "69", agent: "Joshi Divya" },
          { name: "Vivekananda Nagar", code: "90", agent: "Naik Vamshi" },
          { name: "Hanuman Nagar", code: "21", agent: "Raj Anil" },
          { name: "Vivekananda Nagar", code: "42", agent: "Sharma Sandeep" }
        ]
      },
      {
        name: "Thimmapur",
        executive: "Verma Anil",
        subAreas: [
          { name: "Sai Nagar", code: "63", agent: "Das Lavanya" },
          { name: "Rajeev Nagar", code: "84", agent: "Chary Manoj" },
          { name: "Sai Nagar", code: "15", agent: "Iyer Soumya" },
          { name: "Rajeev Nagar", code: "36", agent: "Singh Pavan" },
          { name: "Sai Nagar", code: "57", agent: "Yadav Anusha" },
          { name: "Rajeev Nagar", code: "78", agent: "Reddy Chaitanya" },
          { name: "Sai Nagar", code: "99", agent: "Patel Harika" },
          { name: "Rajeev Nagar", code: "30", agent: "Shetty Ramesh" },
          { name: "Sai Nagar", code: "51", agent: "Goud Tarun" },
          { name: "Rajeev Nagar", code: "72", agent: "Lal Kiran" },
          { name: "Sai Nagar", code: "93", agent: "Verma Mahesh" },
          { name: "Rajeev Nagar", code: "24", agent: "Joshi Swathi" },
          { name: "Sai Nagar", code: "45", agent: "Naik Tejaswi" },
          { name: "Rajeev Nagar", code: "66", agent: "Raj Divya" },
          { name: "Sai Nagar", code: "87", agent: "Sharma Vamshi" },
          { name: "Rajeev Nagar", code: "18", agent: "Das Anil" },
          { name: "Sai Nagar", code: "39", agent: "Chary Sandeep" },
          { name: "Rajeev Nagar", code: "60", agent: "Iyer Lavanya" },
          { name: "Sai Nagar", code: "81", agent: "Singh Manoj" },
          { name: "Rajeev Nagar", code: "12", agent: "Yadav Soumya" }
        ]
      },
      {
        name: "Choppadandi",
        executive: "Joshi Sandeep",
        subAreas: [
          { name: "Lakshmi Nagar", code: "33", agent: "Reddy Pavan" },
          { name: "Bhagya Nagar", code: "54", agent: "Patel Anusha" },
          { name: "Lakshmi Nagar", code: "75", agent: "Shetty Chaitanya" },
          { name: "Bhagya Nagar", code: "96", agent: "Goud Harika" },
          { name: "Lakshmi Nagar", code: "27", agent: "Lal Ramesh" },
          { name: "Bhagya Nagar", code: "48", agent: "Verma Tarun" },
          { name: "Lakshmi Nagar", code: "69", agent: "Joshi Kiran" },
          { name: "Bhagya Nagar", code: "90", agent: "Naik Mahesh" },
          { name: "Lakshmi Nagar", code: "21", agent: "Raj Swathi" },
          { name: "Bhagya Nagar", code: "42", agent: "Sharma Tejaswi" },
          { name: "Lakshmi Nagar", code: "63", agent: "Das Divya" },
          { name: "Bhagya Nagar", code: "84", agent: "Chary Vamshi" },
          { name: "Lakshmi Nagar", code: "15", agent: "Iyer Anil" },
          { name: "Bhagya Nagar", code: "36", agent: "Singh Sandeep" },
          { name: "Lakshmi Nagar", code: "57", agent: "Yadav Lavanya" },
          { name: "Bhagya Nagar", code: "78", agent: "Reddy Manoj" },
          { name: "Lakshmi Nagar", code: "99", agent: "Patel Soumya" },
          { name: "Bhagya Nagar", code: "30", agent: "Shetty Pavan" },
          { name: "Lakshmi Nagar", code: "51", agent: "Goud Anusha" },
          { name: "Bhagya Nagar", code: "72", agent: "Lal Chaitanya" }
        ]
      },
      {
        name: "Gangadhara",
        executive: "Naik Lavanya",
        subAreas: [
          { name: "Geetha Nagar", code: "93", agent: "Verma Harika" },
          { name: "Vani Nagar", code: "24", agent: "Joshi Ramesh" },
          { name: "Geetha Nagar", code: "45", agent: "Naik Tarun" },
          { name: "Vani Nagar", code: "66", agent: "Raj Kiran" },
          { name: "Geetha Nagar", code: "87", agent: "Sharma Mahesh" },
          { name: "Vani Nagar", code: "18", agent: "Das Swathi" },
          { name: "Geetha Nagar", code: "39", agent: "Chary Tejaswi" },
          { name: "Vani Nagar", code: "60", agent: "Iyer Divya" },
          { name: "Geetha Nagar", code: "81", agent: "Singh Vamshi" },
          { name: "Vani Nagar", code: "12", agent: "Yadav Anil" },
          { name: "Geetha Nagar", code: "33", agent: "Reddy Sandeep" },
          { name: "Vani Nagar", code: "54", agent: "Patel Lavanya" },
          { name: "Geetha Nagar", code: "75", agent: "Shetty Manoj" },
          { name: "Vani Nagar", code: "96", agent: "Goud Soumya" },
          { name: "Geetha Nagar", code: "27", agent: "Lal Pavan" },
          { name: "Vani Nagar", code: "48", agent: "Verma Anusha" },
          { name: "Geetha Nagar", code: "69", agent: "Joshi Chaitanya" },
          { name: "Vani Nagar", code: "90", agent: "Naik Harika" },
          { name: "Geetha Nagar", code: "21", agent: "Raj Ramesh" },
          { name: "Vani Nagar", code: "42", agent: "Sharma Tarun" }
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
          { name: "Chaitanya Nagar", code: "93", agent: "Iyer Swathi" },
          { name: "Prashanth Nagar", code: "24", agent: "Singh Tejaswi" },
          { name: "Chaitanya Nagar", code: "45", agent: "Yadav Divya" },
          { name: "Prashanth Nagar", code: "66", agent: "Reddy Vamshi" },
          { name: "Chaitanya Nagar", code: "87", agent: "Patel Anil" },
          { name: "Prashanth Nagar", code: "18", agent: "Shetty Sandeep" },
          { name: "Chaitanya Nagar", code: "39", agent: "Goud Lavanya" },
          { name: "Prashanth Nagar", code: "60", agent: "Lal Manoj" },
          { name: "Chaitanya Nagar", code: "81", agent: "Verma Soumya" },
          { name: "Prashanth Nagar", code: "12", agent: "Joshi Pavan" },
          { name: "Chaitanya Nagar", code: "33", agent: "Naik Anusha" },
          { name: "Prashanth Nagar", code: "54", agent: "Raj Chaitanya" },
          { name: "Chaitanya Nagar", code: "75", agent: "Sharma Harika" },
          { name: "Prashanth Nagar", code: "96", agent: "Das Ramesh" },
          { name: "Chaitanya Nagar", code: "27", agent: "Chary Tarun" },
          { name: "Prashanth Nagar", code: "48", agent: "Iyer Kiran" },
          { name: "Chaitanya Nagar", code: "69", agent: "Singh Mahesh" },
          { name: "Prashanth Nagar", code: "90", agent: "Yadav Swathi" },
          { name: "Chaitanya Nagar", code: "21", agent: "Reddy Tejaswi" },
          { name: "Prashanth Nagar", code: "42", agent: "Patel Divya" }
        ]
      },
      {
        name: "Bommakal",
        executive: "Iyer Swathi",
        subAreas: [
          { name: "Mahalaxmi Nagar", code: "63", agent: "Shetty Vamshi" },
          { name: "Doctors Colony", code: "84", agent: "Goud Anil" },
          { name: "Mahalaxmi Nagar", code: "15", agent: "Lal Sandeep" },
          { name: "Doctors Colony", code: "36", agent: "Verma Lavanya" },
          { name: "Mahalaxmi Nagar", code: "57", agent: "Joshi Manoj" },
          { name: "Doctors Colony", code: "78", agent: "Naik Soumya" },
          { name: "Mahalaxmi Nagar", code: "99", agent: "Raj Pavan" },
          { name: "Doctors Colony", code: "30", agent: "Sharma Anusha" },
          { name: "Mahalaxmi Nagar", code: "51", agent: "Das Chaitanya" },
          { name: "Doctors Colony", code: "72", agent: "Chary Harika" },
          { name: "Mahalaxmi Nagar", code: "93", agent: "Iyer Ramesh" },
          { name: "Doctors Colony", code: "24", agent: "Singh Tarun" },
          { name: "Mahalaxmi Nagar", code: "45", agent: "Yadav Kiran" },
          { name: "Doctors Colony", code: "66", agent: "Reddy Mahesh" },
          { name: "Mahalaxmi Nagar", code: "87", agent: "Patel Swathi" },
          { name: "Doctors Colony", code: "18", agent: "Shetty Tejaswi" },
          { name: "Mahalaxmi Nagar", code: "39", agent: "Goud Divya" },
          { name: "Doctors Colony", code: "60", agent: "Lal Vamshi" },
          { name: "Mahalaxmi Nagar", code: "81", agent: "Verma Anil" },
          { name: "Doctors Colony", code: "12", agent: "Joshi Sandeep" }
        ]
      },
      {
        name: "Alugunur",
        executive: "Singh Tejaswi",
        subAreas: [
          { name: "Police Colony", code: "33", agent: "Naik Lavanya" },
          { name: "Teachers Colony", code: "54", agent: "Raj Manoj" },
          { name: "Police Colony", code: "75", agent: "Sharma Soumya" },
          { name: "Teachers Colony", code: "96", agent: "Das Pavan" },
          { name: "Police Colony", code: "27", agent: "Chary Anusha" },
          { name: "Teachers Colony", code: "48", agent: "Iyer Chaitanya" },
          { name: "Police Colony", code: "69", agent: "Singh Harika" },
          { name: "Teachers Colony", code: "90", agent: "Yadav Ramesh" },
          { name: "Police Colony", code: "21", agent: "Reddy Tarun" },
          { name: "Teachers Colony", code: "42", agent: "Patel Kiran" },
          { name: "Police Colony", code: "63", agent: "Shetty Mahesh" },
          { name: "Teachers Colony", code: "84", agent: "Goud Swathi" },
          { name: "Police Colony", code: "15", agent: "Lal Tejaswi" },
          { name: "Teachers Colony", code: "36", agent: "Verma Divya" },
          { name: "Police Colony", code: "57", agent: "Joshi Vamshi" },
          { name: "Teachers Colony", code: "78", agent: "Naik Anil" },
          { name: "Police Colony", code: "99", agent: "Raj Sandeep" },
          { name: "Teachers Colony", code: "30", agent: "Sharma Lavanya" },
          { name: "Police Colony", code: "51", agent: "Das Manoj" },
          { name: "Teachers Colony", code: "72", agent: "Chary Soumya" }
        ]
      },
      {
        name: "Rekurthi",
        executive: "Yadav Divya",
        subAreas: [
          { name: "Bank Colony", code: "93", agent: "Iyer Pavan" },
          { name: "SR Nagar Colony", code: "24", agent: "Singh Anusha" },
          { name: "Bank Colony", code: "45", agent: "Yadav Chaitanya" },
          { name: "SR Nagar Colony", code: "66", agent: "Reddy Harika" },
          { name: "Bank Colony", code: "87", agent: "Patel Ramesh" },
          { name: "SR Nagar Colony", code: "18", agent: "Shetty Tarun" },
          { name: "Bank Colony", code: "39", agent: "Goud Kiran" },
          { name: "SR Nagar Colony", code: "60", agent: "Lal Mahesh" },
          { name: "Bank Colony", code: "81", agent: "Verma Swathi" },
          { name: "SR Nagar Colony", code: "12", agent: "Joshi Tejaswi" },
          { name: "Bank Colony", code: "33", agent: "Naik Divya" },
          { name: "SR Nagar Colony", code: "54", agent: "Raj Vamshi" },
          { name: "Bank Colony", code: "75", agent: "Sharma Anil" },
          { name: "SR Nagar Colony", code: "96", agent: "Das Sandeep" },
          { name: "Bank Colony", code: "27", agent: "Chary Lavanya" },
          { name: "SR Nagar Colony", code: "48", agent: "Iyer Manoj" },
          { name: "Bank Colony", code: "69", agent: "Singh Soumya" },
          { name: "SR Nagar Colony", code: "90", agent: "Yadav Pavan" },
          { name: "Bank Colony", code: "21", agent: "Reddy Anusha" },
          { name: "SR Nagar Colony", code: "42", agent: "Patel Chaitanya" }
        ]
      }
    ]
  }
]; 