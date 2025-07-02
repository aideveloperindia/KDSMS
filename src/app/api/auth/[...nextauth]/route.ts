import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyOTP } from '@/lib/utils';
import User from '@/models/User';
import connectDB from '@/lib/db';
import { AuthOptions } from 'next-auth';

type UserRole = 'Agent' | 'Executive' | 'ZM' | 'AGM' | 'Management';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      role?: UserRole;
      zone?: string;
      area?: string;
      subArea?: string;
      phone?: string;
    } & DefaultSession['user']
  }

  interface User {
    role?: UserRole;
    zone?: string;
    area?: string;
    subArea?: string;
    phone?: string;
  }

  interface JWT {
    role?: UserRole;
    zone?: string;
    area?: string;
    subArea?: string;
    phone?: string;
  }
}

const isDevelopment = process.env.NODE_ENV === 'development';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) {
          throw new Error('Missing credentials');
        }

        await connectDB();

        // Verify OTP
        const isValid = await verifyOTP(credentials.phone, credentials.otp);
        if (!isValid) {
          throw new Error('Invalid OTP');
        }

        // Get user from database
        const user = await User.findOne({ phone: credentials.phone });
        if (!user) {
          throw new Error('User not found');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.phone, // Use phone as email since we don't have email
          phone: user.phone, // Add phone to the user object
          role: user.role as UserRole,
          zone: user.zone,
          area: user.area,
          subArea: user.subArea
        };
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
        token.area = user.area;
        token.subArea = user.subArea;
        token.phone = user.phone; // Add phone to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as UserRole;
        session.user.zone = token.zone as string;
        session.user.area = token.area as string;
        session.user.subArea = token.subArea as string;
        session.user.phone = token.phone as string; // Add phone to the session
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: !isDevelopment,
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevelopment
      }
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 