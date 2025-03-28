'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

interface NavBarProps {
  variant?: "light" | "dark";
}

export function NavBar({ variant = "light" }: NavBarProps) {
  const isDark = variant === "dark";
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        setUser(data.user);
      }

      setIsLoading(false);
    };

    fetchUser();

    // Set up auth state change listener
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className={`border-b ${isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'} sticky top-0 z-50`}>
      <div className="container max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <div className="flex items-center">
              <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Estate Eminence Ventures
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/properties"
              className={`${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
            >
              Properties
            </Link>
            <Link
              href="/services"
              className={`${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
            >
              Services
            </Link>
            <Link
              href="/insights"
              className={`${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
            >
              Insights
            </Link>
            <Link
              href="/about"
              className={`${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isLoading ? (
            // Loading state
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-md"></div>
          ) : user ? (
            // Logged in state
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className={`hidden md:inline-block ${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className={`hidden md:inline-block ${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
              >
                Sign out
              </button>
              <Link
                href="/dashboard"
                className="hidden md:flex items-center justify-center rounded-full bg-gray-100 p-1 h-8 w-8 overflow-hidden"
              >
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="User avatar"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-xs font-bold uppercase">
                    {(user.user_metadata?.full_name || user.email || 'U').charAt(0)}
                  </div>
                )}
              </Link>
            </div>
          ) : (
            // Logged out state
            <>
              <Link
                href="/auth/sign-in"
                className={`hidden md:inline-block ${isDark ? 'text-white hover:text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors text-sm`}
              >
                Sign in
              </Link>
              <Link
                href="/auth/sign-up"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
