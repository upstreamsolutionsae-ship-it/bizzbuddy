import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Demo accounts — no DB required
const DEMO: Record<string, { id: string; name: string; role: string; password: string }> = {
  "sme@demo.com":      { id: "demo-sme",      name: "Rahul Kumar (Demo)",   role: "SME",             password: "demo123" },
  "partner@demo.com":  { id: "demo-partner",   name: "Rajesh DSA (Demo)",    role: "CHANNEL_PARTNER", password: "demo123" },
  "investor@demo.com": { id: "demo-investor",  name: "Ramesh Gupta (Demo)",  role: "INVESTOR",        password: "demo123" },
  "admin@demo.com":    { id: "demo-admin",     name: "Admin (Demo)",         role: "ADMIN",           password: "admin123" },
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Check demo accounts first
        const demo = DEMO[credentials.email.toLowerCase()];
        if (demo && credentials.password === demo.password) {
          return { id: demo.id, email: credentials.email, name: demo.name, role: demo.role } as any;
        }

        // DB lookup (skipped if DB not configured)
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { PrismaClient } = require("@prisma/client");
          const prisma = new PrismaClient();
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          await prisma.$disconnect();
          if (!user) return null;
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;
          return { id: user.id, email: user.email, name: user.name, role: user.role } as any;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.role = (user as any).role; token.id = user.id; }
      return token;
    },
    async session({ session, token }) {
      if (token) { (session.user as any).role = token.role; (session.user as any).id = token.id; }
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "bizzbuddy-secret-key-change-in-production",
};
