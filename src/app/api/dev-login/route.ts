import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encode } from 'next-auth/jwt';

const roles = ['agent', 'executive', 'zm', 'agm', 'management'] as const;
const secret = process.env.NEXTAUTH_SECRET || 'your-fallback-secret-key-here';

export async function GET(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not allowed in production', { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  
  if (!role || !roles.includes(role as any)) {
    return new NextResponse('Invalid role', { status: 400 });
  }

  // Create a test session token
  const token = await encode({
    token: {
      name: `Test ${role}`,
      email: `test-${role}@example.com`,
      role: role,
      employeeId: `TEST-${role.toUpperCase()}-001`,
      sub: '123',
    },
    secret: secret,
  });

  // Set the session token cookie
  cookies().set('next-auth.session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  // Redirect to appropriate dashboard
  let redirectPath = '/agents';
  switch (role) {
    case 'management':
      redirectPath = '/management';
      break;
    case 'agm':
      redirectPath = '/agm';
      break;
    case 'zm':
      redirectPath = '/zm';
      break;
    case 'executive':
      redirectPath = '/agents';
      break;
    case 'agent':
      redirectPath = '/agents';
      break;
  }

  return NextResponse.redirect(new URL(redirectPath, request.url));
} 