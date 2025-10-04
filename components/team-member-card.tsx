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
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-balance">{name}</h3>
            <p className="text-muted-foreground text-lg">{role}</p>
          </div>

          {/* Bio/Quote - Placeholder */}
          <div className="text-muted-foreground text-pretty">
            <p>
              It has been an incredible experience! The team is always pushing everyone to get better and to improve.
              Amazing people every single one of them.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Links</h4>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Music Player - Placeholder */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Victory</p>
              <p className="text-xs text-muted-foreground truncate">Two Steps From Hell</p>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
              <Play className="w-4 h-4" />
            </button>
          </div>

          {/* Words to Live By */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
              Words to Live By
            </h4>
            <p className="text-xl sm:text-2xl font-bold text-balance">
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
