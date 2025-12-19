"use client";

import { ModeToggle } from "@/components/theme/theme-toggle";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio } from "lucide-react";

type Session = typeof auth.$Infer.Session;

export default function Navigation({ session }: { session: Session | null }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="backdrop-blur-sm sticky top-0 z-50">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${
          session ? "w-full" : "max-w-7xl"
        }`}
      >
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold ">My SiTO</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <ModeToggle />
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") ? "text-white bg-primary" : "hover:text-primary"
              }`}
            >
              Home
            </Link>

            {session && (
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "text-white bg-primary"
                    : "hover:text-primary"
                }`}
              >
                Dashboard
              </Link>
            )}

            {!session && (
              <Link
                href="/auth/sign-in"
                className={`hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/auth/sign-in")
                    ? "text-white bg-primary"
                    : "hover:text-primary"
                }`}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
