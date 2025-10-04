"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isTeamPage = pathname === "/team"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (isTeamPage && id !== "team") {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="https://blob.v0.app/w79fI.svg"
              alt="GDG Babcock"
              width={180}
              height={40}
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <button
              onClick={() => scrollToSection("tracks")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Tracks
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Events
            </button>
            <Link href="/team" className="text-sm font-medium hover:text-primary transition-colors">
              Team
            </Link>
            <Button
              onClick={() => scrollToSection("registration")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-blue hover:scale-[1.02] transition-all"
            >
              Join GDG
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-left text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <button
                onClick={() => scrollToSection("tracks")}
                className="text-left text-sm font-medium hover:text-primary transition-colors"
              >
                Tracks
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="text-left text-sm font-medium hover:text-primary transition-colors"
              >
                Events
              </button>
              <Link href="/team" className="text-left text-sm font-medium hover:text-primary transition-colors">
                Team
              </Link>
              <Button
                onClick={() => scrollToSection("registration")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full glow-blue"
              >
                Join GDG
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
