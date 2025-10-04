"use client"

import { useState } from "react"
import { Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const filters = ["All", "Core Leadership", "Track Leads", "Specialists"]

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Lead",
    category: "Core Leadership",
    image: "/professional-woman-smiling.png",
    bio: "Passionate about building inclusive tech communities",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Michael Chen",
    role: "Co-Lead",
    category: "Core Leadership",
    image: "/professional-man-smiling.png",
    bio: "Full-stack developer and open source enthusiast",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Aisha Okafor",
    role: "Community Manager",
    category: "Core Leadership",
    image: "/professional-woman-glasses.png",
    bio: "Connecting people through technology",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "David Martinez",
    role: "Technical Lead",
    category: "Core Leadership",
    image: "/professional-bearded-man.png",
    bio: "Building scalable systems and mentoring developers",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Emily Zhang",
    role: "Software Dev Track Lead",
    category: "Track Leads",
    image: "/young-woman-developer.jpg",
    bio: "Teaching the next generation of software engineers",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "James Wilson",
    role: "Infrastructure Track Lead",
    category: "Track Leads",
    image: "/man-with-laptop.png",
    bio: "Cloud architecture and DevOps expert",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Priya Patel",
    role: "Data & AI Track Lead",
    category: "Track Leads",
    image: "/woman-data-scientist.jpg",
    bio: "Making AI accessible to everyone",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Alex Thompson",
    role: "Design Track Lead",
    category: "Track Leads",
    image: "/designer-with-tablet.jpg",
    bio: "Creating delightful user experiences",
    social: { twitter: "#", linkedin: "#", instagram: "#" },
  },
]

export default function Team() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredMembers =
    activeFilter === "All" ? teamMembers : teamMembers.filter((member) => member.category === activeFilter)

  return (
    <section id="team" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">⭐ Meet Our Leadership Team</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Here are profiles of the amazing people leading GDG Babcock
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "bg-primary text-primary-foreground glow-blue hover:scale-[1.02] transition-all"
                  : "hover:scale-[1.02] transition-all"
              }
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden group card-glow-blue transition-all duration-300"
            >
              {/* Photo */}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={member.social.twitter}
                    className="p-2 rounded-full bg-muted hover:bg-[#4285F4] hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="p-2 rounded-full bg-muted hover:bg-[#4285F4] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.instagram}
                    className="p-2 rounded-full bg-muted hover:bg-[#EA4335] hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground text-sm sm:text-base">
          Full specialist team profiles coming soon! 🚀
        </p>
      </div>
    </section>
  )
}
