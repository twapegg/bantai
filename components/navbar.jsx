"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, LogOut, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
];

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status using API route
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/verify");
      const data = await response.json();
      setUser(data.authenticated ? data.user : null);
      setLoading(false);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleSignOut = async () => {
    try {
      // Clear the token cookie by calling logout API
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign out error:", error);
      // Force redirect even if API call fails
      setUser(null);
      router.push("/auth/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Bantai Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#03585F] group-hover:text-[#095c62] transition-colors">
                bant
              </span>
              <span className="text-2xl font-bold text-[#EE9471]">.</span>
              <span className="text-2xl font-bold text-[#EE9471]">ai</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user &&
              navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-[#03585F] hover:bg-gray-50 transition-all duration-300 font-medium group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}

            {/* Conditional Authentication Buttons */}
            {!loading && (
              <>
                {user ? (
                  /* Sign Out Button - when user is logged in */
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#03585F] to-[#095c62] text-white rounded-xl hover:from-[#095c62] hover:to-[#03585F] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  /* Login and Signup Buttons - when user is not logged in */
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/auth/login"
                      className="flex items-center space-x-2 px-4 py-2 text-[#03585F] hover:text-[#095c62] hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium group"
                    >
                      <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#03585F] to-[#095c62] text-white rounded-xl hover:from-[#095c62] hover:to-[#03585F] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-medium"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-[#03585F] hover:bg-gray-50 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {user &&
                navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-[#03585F] hover:bg-gray-50 transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}

              {/* Conditional Mobile Authentication Buttons */}
              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="flex items-center space-x-3 px-4 py-3 text-[#03585F] hover:text-[#095c62] hover:bg-gray-50 rounded-xl transition-all duration-300 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-[#03585F] to-[#095c62] text-white rounded-xl hover:from-[#095c62] hover:to-[#03585F] transition-all duration-300 font-medium mx-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
