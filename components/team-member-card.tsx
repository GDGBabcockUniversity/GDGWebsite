"use client"

import { Twitter, Linkedin, Globe, Play } from "lucide-react"
import Image from "next/image"

interface TeamMemberCardProps {
  name: string
  role: string
}

export default function TeamMemberCard({ name, role }: TeamMemberCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 glow-card">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-6">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Name and Role */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-balance text-foreground">{name}</h3>
            <div className="inline-block">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">{role}</span>
            </div>
          </div>

          {/* Bio/Quote - Placeholder */}
          <div className="text-foreground/80 text-pretty">
            <p>
              It has been an incredible experience! The team is always pushing everyone to get better and to improve.
              Amazing people every single one of them.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-foreground/60">Links</h4>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all duration-300 text-foreground">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all duration-300 text-foreground">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all duration-300 text-foreground">
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Music Player - Placeholder */}
          <div className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 rounded-xl p-4 hover:border-green-500/40 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base truncate text-foreground">Victory</p>
                <p className="text-sm text-foreground/60 truncate">Two Steps From Hell</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 hover:scale-105 flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-lg shadow-green-500/20">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </button>
            </div>
          </div>

          {/* Words to Live By */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-foreground/60">Words to Live By</h4>
            <p className="text-xl sm:text-2xl font-bold text-balance text-foreground">
              When you are at your weakest, and fear, and doubt...
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-first sm:order-last">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <Image
              src="/professional-portrait.png"
              alt={name}
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
