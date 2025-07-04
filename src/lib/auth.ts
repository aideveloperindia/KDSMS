import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import connectDB from '@/lib/db';
import { AuthOptions } from 'next-auth';
import { Document } from 'mongoose';

type UserRole = 'agent' | 'executive' | 'zm' | 'agm' | 'management';

interface IUserDocument extends Document {
  _id: string;
  name: string;
  employeeId: string;
  role: UserRole;
  zone?: number;
  zoneName?: string;
  area?: number;
  areaName?: string;
  subArea?: number;
  subAreaName?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      role?: UserRole;
      zone?: number;
      zoneName?: string;
      area?: number;
      areaName?: string;
      subArea?: number;
      subAreaName?: string;
      employeeId?: string;
    } & DefaultSession['user']
  }

  interface User {
    role?: UserRole;
    zone?: number;
    zoneName?: string;
    area?: number;
    areaName?: string;
    subArea?: number;
    subAreaName?: string;
    employeeId?: string;
  }
}

const isDevelopment = process.env.NODE_ENV === 'development';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        employeeId: { label: "Employee ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.employeeId || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        try {
          await connectDB();
          console.log('Attempting login for:', credentials.employeeId);

          // Get user from database
          const user = await User.findOne({ employeeId: credentials.employeeId }) as IUserDocument | null;
          
          if (!user) {
            console.log('User not found:', credentials.employeeId);
            return null;
          }

          // Verify password
          const isValid = await user.comparePassword(credentials.password);
          
          if (!isValid) {
            console.log('Invalid password for:', credentials.employeeId);
            return null;
          }

          console.log('Login successful for:', credentials.employeeId);

          // Update last login
          await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

          return {
            id: user._id.toString(),
            name: user.name,
            employeeId: user.employeeId,
            role: user.role,
            zone: user.zone,
            zoneName: user.zoneName,
            area: user.area,
            areaName: user.areaName,
            subArea: (user as any).subArea,
            subAreaName: user.subAreaName
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.zone = user.zone;
        token.zoneName = user.zoneName;
        token.area = user.area;
        token.areaName = user.areaName;
        token.subAreaName = user.subAreaName;
        token.subArea = user.subArea;
        token.employeeId = user.employeeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as UserRole;
        session.user.zone = token.zone as number;
        session.user.zoneName = token.zoneName as string;
        session.user.area = token.area as number;
        session.user.areaName = token.areaName as string;
        session.user.subAreaName = token.subAreaName as string;
        session.user.subArea = token.subArea as number;
        session.user.employeeId = token.employeeId as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  },
  debug: isDevelopment,
  secret: process.env.NEXTAUTH_SECRET || 'your-fallback-secret-key-here'
}; 