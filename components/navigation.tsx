"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, User, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import LoginModal from "@/components/login-modal";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isTeamPage = pathname === "/team";
  const { user, isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isTeamPage && id !== "team") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black backdrop-blur-lg border-b border-border">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/gdg-logo.svg"
              alt="GDG Babcock"
              width={180}
              height={40}
              className="w-64"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("tracks")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Tracks
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Events
            </button>
            <Link
              href="/team"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Team
            </Link>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gdg-blue"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gdg-blue flex items-center justify-center text-white text-xs font-bold">
                      {user.full_name
                        ? user.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "?"}
                    </div>
                  )}
                </button>
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.full_name || "GDG Member"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-white/5 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-white/5 transition-colors w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="w-fit bg-white hover:bg-white rounded-full font-semibold cursor-pointer text-black glow-blue hover:scale-[1.02] transition-all"
              >
                Sign In
                <div className="flex items-center justify-center bg-black rounded-full p-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection("tracks")}
                className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Tracks
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Events
              </button>
              <Link
                href="/team"
                className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Team
              </Link>
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    variant="outline"
                    className="rounded-full text-destructive border-destructive/30 hover:bg-destructive/10 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="bg-white hover:bg-white rounded-full font-semibold cursor-pointer text-black glow-blue hover:scale-[1.02] transition-all w-full"
                >
                  Sign In
                  <div className="flex items-center justify-center bg-black rounded-full p-1">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>

    {/* Login Modal - rendered outside nav to avoid z-index stacking context */}
    <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
