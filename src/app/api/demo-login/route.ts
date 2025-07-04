import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { employeeId, password } = await request.json();

    // Demo mode - accept any credentials that match the pattern
    const demoUsers: Record<string, { name: string; role: string; zone: number; area: number; subArea: number }> = {
      'MGMT-001': { name: 'Tarun', role: 'Management', zone: 0, area: 0, subArea: 0 },
      'AGM-001': { name: 'Varun', role: 'AGM', zone: 0, area: 0, subArea: 0 },
      'ZM-Z1-001': { name: 'Reddy Rajesh', role: 'Zone Manager', zone: 1, area: 0, subArea: 0 },
      'EXE-Z1A1-001': { name: 'B Anil', role: 'Executive', zone: 1, area: 1, subArea: 0 },
      'AGT-Z1A1-001': { name: 'Ramesh Reddy', role: 'Agent', zone: 1, area: 1, subArea: 1 },
      'AGT-Z5A1-008': { name: 'Shetty Tejaswi', role: 'Agent', zone: 5, area: 17, subArea: 328 }
    };

    // Check if it's a demo user or follows the pattern
    let user = demoUsers[employeeId];
    
    if (!user) {
      // Auto-generate user based on ID pattern for demo
      if (employeeId.startsWith('AGT-')) {
        const match = employeeId.match(/AGT-Z(\d+)A(\d+)-(\d+)/);
        if (match) {
          const zone = parseInt(match[1]);
          const area = parseInt(match[2]);
          const agentNum = parseInt(match[3]);
          const globalArea = (zone - 1) * 4 + area;
          const subArea = (globalArea - 1) * 20 + agentNum;
          
          user = {
            name: `Agent ${zone}-${area}-${agentNum}`,
            role: 'Agent',
            zone: zone,
            area: globalArea,
            subArea: subArea
          };
        }
      } else if (employeeId.startsWith('EXE-')) {
        const match = employeeId.match(/EXE-Z(\d+)A(\d+)-(\d+)/);
        if (match) {
          const zone = parseInt(match[1]);
          const area = parseInt(match[2]);
          const globalArea = (zone - 1) * 4 + area;
          
          user = {
            name: `Executive ${zone}-${area}`,
            role: 'Executive',
            zone: zone,
            area: globalArea,
            subArea: 0
          };
        }
      } else if (employeeId.startsWith('ZM-')) {
        const match = employeeId.match(/ZM-Z(\d+)-(\d+)/);
        if (match) {
          const zone = parseInt(match[1]);
          
          user = {
            name: `Zone Manager ${zone}`,
            role: 'Zone Manager',
            zone: zone,
            area: 0,
            subArea: 0
          };
        }
      }
    }

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid employee ID format'
      }, { status: 401 });
    }

    // Return success with user data
    return NextResponse.json({
      success: true,
      user: {
        employeeId: employeeId,
        name: user.name,
        role: user.role,
        zone: user.zone,
        area: user.area,
        subArea: user.subArea
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Login failed'
    }, { status: 500 });
  }
} 