import { Twitter, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Image
              src="/gdg-logo.svg"
              alt="GDG Babcock"
              width={180}
              height={40}
              className="w-64 mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building the future, one line of code at a time. Join Babcock
              University's premier tech community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#hero"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tracks
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Team
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4 text-white">Connect</h3>

            {/* Social Media */}
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-[#4285F4] hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-[#4285F4] hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-[#EA4335] hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-[#34A853] hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-medium mb-2 text-white">
                Subscribe to TechPulse Babcock
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-background border-border"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} GDG Babcock. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="inline-block w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="inline-block w-2 h-2 rounded-full bg-[#FBBC04]" />
              <span className="inline-block w-2 h-2 rounded-full bg-[#34A853]" />
              <span className="ml-2">
                Part of Google Developer Groups Program
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
