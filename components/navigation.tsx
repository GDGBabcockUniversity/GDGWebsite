"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isTeamPage = pathname === "/team";

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
            <Button
              onClick={() => scrollToSection("registration")}
              className="w-fit bg-white hover:bg-white rounded-full font-semibold cursor-pointer text-black glow-blue hover:scale-[1.02] transition-all"
            >
              Join Us
              <div className="flex items-center justify-center bg-black rounded-full p-1">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </Button>
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
              <Button
                onClick={() => scrollToSection("registration")}
                className="bg-white hover:bg-white rounded-full font-semibold cursor-pointer text-black glow-blue hover:scale-[1.02] transition-all w-full"
              >
                Join Us
                <div className="flex items-center justify-center bg-black rounded-full p-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
