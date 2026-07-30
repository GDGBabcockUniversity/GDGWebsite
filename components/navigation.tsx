"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Loader2, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import LoginModal from "@/components/login-modal";
import { NAV_LINKS } from "@/lib/content/site";
import { getInitials } from "@/components/initials-avatar";
import { useMemberCta } from "@/components/use-member-cta";
import { LiquidGlass } from "@/components/liquid-glass";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { becomeMember, isLoginOpen, setIsLoginOpen } = useMemberCta();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-3 transition-all duration-300",
            isScrolled ? "opacity-95" : "opacity-100"
          )}
        >
          {/* Left: pill with nav links (desktop) */}
          <LiquidGlass
            radius={28}
            bevel={18}
            thickness={34}
            blur={8}
            disableRefraction={isScrolled}
            className="hidden lg:block"
            contentClassName="flex items-center gap-1 px-2 py-1.5"
          >
            {NAV_LINKS.filter((l) => l.primary !== false).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
                {link.external && (
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
                )}
              </Link>
            ))}
          </LiquidGlass>

          {/* Center: logo */}
          <Link
            href="/"
            className="rounded-full transition-transform hover:scale-[1.04] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
            aria-label="GDG Babcock — home"
          >
            <LiquidGlass
              radius={999}
              bevel={14}
              thickness={30}
              blur={7}
              disableRefraction={isScrolled}
              className="h-12 w-16"
              contentClassName="flex h-full w-full items-center justify-center p-2"
            >
              <Image
                src="/Sticker Logomark.png"
                alt="GDG Babcock"
                width={50}
                height={34}
                className="h-8 w-auto drop-shadow-[0_2px_10px_rgba(255,255,255,0.22)]"
                priority
              />
            </LiquidGlass>
          </Link>

          {/* Right: auth + member CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            {loading ? (
              <LiquidGlass
                radius={999}
                bevel={14}
                thickness={30}
                blur={7}
                disableRefraction={isScrolled}
                className="h-11 w-24"
                contentClassName="flex h-full w-full items-center justify-center"
              >
                <Loader2 className="h-4 w-4 animate-spin text-white/60" />
              </LiquidGlass>
            ) : isAuthenticated && user ? (
              <div className="relative">
                <LiquidGlass
                  radius={999}
                  bevel={14}
                  thickness={30}
                  blur={7}
                  disableRefraction={isScrolled}
                  className="cursor-pointer"
                  contentClassName="p-1.5"
                >
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex cursor-pointer items-center rounded-full"
                    aria-label="Account menu"
                  >
                    {user.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.avatar_url}
                        alt={user.full_name}
                        className="h-8 w-8 rounded-full border-2 border-gdg-blue object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gdg-blue text-xs font-bold text-white">
                        {user.full_name ? getInitials(user.full_name) : "?"}
                      </div>
                    )}
                  </button>
                </LiquidGlass>
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-56 animate-in rounded-2xl border border-white/15 bg-[#171717] py-2 shadow-xl fade-in slide-in-from-top-2 duration-150">
                      <div className="border-b border-white/10 px-4 py-3">
                        <p className="truncate text-sm font-medium text-white">
                          {user.full_name || "GDG Member"}
                        </p>
                        <p className="truncate text-xs text-white/50">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/5"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gdg-red transition-colors hover:bg-white/5"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <LiquidGlass
                radius={999}
                bevel={14}
                thickness={30}
                blur={7}
                disableRefraction={isScrolled}
                className="cursor-pointer transition-transform hover:scale-[1.03]"
              >
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Sign In
                </button>
              </LiquidGlass>
            )}
            <button
              onClick={becomeMember}
              className="cursor-pointer rounded-full bg-gdg-cream px-5 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
            >
              Become a member
            </button>
          </div>

          {/* Mobile: menu button */}
          <button
            className="rounded-full border border-white/15 bg-[#0f0f0f]/70 p-2.5 text-white shadow-[0_12px_36px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/15 bg-[#0f0f0f]/95 p-4 backdrop-blur-md lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
                >
                  {link.label}
                  {link.external && (
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
                  )}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white/85 hover:bg-white/10"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2 rounded-full px-4 py-3 text-left text-sm font-medium text-gdg-red hover:bg-white/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="rounded-full border border-white/15 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                  >
                    Sign In
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    becomeMember();
                  }}
                  className="rounded-full bg-gdg-cream px-4 py-3 text-sm font-semibold text-[#0f0f0f]"
                >
                  Become a member
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal — outside nav to avoid z-index stacking context */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
