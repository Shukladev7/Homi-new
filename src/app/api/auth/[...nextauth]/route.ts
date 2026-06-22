import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn("Cloudflare Turnstile secret key not configured. Bypassing Turnstile validation in development.");
    return true; // Bypass Turnstile checks if keys are missing (development mode helper)
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await res.json() as any;
    return !!data.success;
  } catch (error) {
    console.error("Turnstile verification connection failed:", error);
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        turnstileToken: { label: "Turnstile Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both your email address and password.");
        }

        // 1. Verify Cloudflare Turnstile CAPTCHA first
        const turnstileToken = credentials.turnstileToken || "";
        const isTurnstileValid = await verifyTurnstile(turnstileToken);
        if (!isTurnstileValid) {
          throw new Error("Turnstile security verification failed. Please try again.");
        }

        // 2. Validate email permissions
        const allowedEmails = (process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || "admin@homilearn.com")
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter((e) => e.length > 0);

        const email = credentials.email.toLowerCase();
        if (!allowedEmails.includes(email)) {
          throw new Error("Access denied. This email is not authorized as an administrator.");
        }

        // 3. Validate password credentials
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // fallback dev password
        if (credentials.password !== adminPassword) {
          throw new Error("Invalid password credentials. Please try again.");
        }

        // Return user session details on successful authorization
        return {
          id: "admin",
          email: credentials.email,
          name: "Admin Editor",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day session persistence
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || "fallback-nextauth-secret-for-build-and-dev-32-chars",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
