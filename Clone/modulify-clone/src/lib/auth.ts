import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import {
  verifyCredentials,
  findOrCreateSocialUser,
  findUserById,
  UserRole
} from "@/data/static/users";

// Secret key for JWT
const authSecret = process.env.NEXTAUTH_SECRET || "estate-eminence-ventures-secret-key";

export const authOptions: NextAuthOptions = {
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          const user = verifyCredentials(credentials.email, credentials.password);

          if (!user) {
            console.log("Invalid credentials for:", credentials.email);
          } else {
            console.log("User authenticated:", user.email);
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),

    // Google authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),

    // Facebook authentication
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "mock-client-secret",
    }),

    // Apple authentication
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "mock-client-secret",
    }),
  ],

  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/register-success'
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        console.log("JWT callback - initial sign in:", { provider: account.provider });

        // For social providers
        if (account.provider !== 'credentials') {
          // Find or create a user based on social login
          const socialUser = findOrCreateSocialUser(
            account.provider as 'google' | 'facebook' | 'apple',
            account.providerAccountId,
            (user.email || token.email || '') as string,
            (user.name || token.name || '') as string,
            user.image || undefined
          );

          if (socialUser) {
            return {
              ...token,
              id: socialUser.id,
              role: socialUser.role,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            };
          }
        } else {
          // For credentials provider
          return {
            ...token,
            id: user.id,
            role: user.role,
            provider: 'credentials'
          };
        }
      }

      // On subsequent calls, token already has the data
      return token;
    },

    async session({ session, token }) {
      // Add custom user data to the session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.provider = token.provider as string;

        // Add any additional user info
        const dbUser = findUserById(token.id as string);
        if (dbUser) {
          session.user.preferences = dbUser.preferences;
          session.user.savedProperties = dbUser.savedProperties;
          session.user.phone = dbUser.phone;
        }
      }

      return session;
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },

  secret: authSecret,

  debug: true
};
