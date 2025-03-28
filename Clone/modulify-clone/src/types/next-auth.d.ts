import { DefaultSession } from "next-auth";
import { UserPreferences, UserRole } from "@/data/static/users";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      provider: string;
      preferences?: UserPreferences;
      savedProperties?: string[];
      phone?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
    provider?: string;
    providerAccountId?: string;
    preferences?: UserPreferences;
    savedProperties?: string[];
    phone?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    provider: string;
    providerAccountId?: string;
  }
}
