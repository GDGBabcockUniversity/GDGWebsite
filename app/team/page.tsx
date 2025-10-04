"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import TeamMemberCard from "@/components/team-member-card"

const teamMembers = [
  { name: "Chukwuneku Akpotohwo", role: "Organizer", category: "leads" },
  { name: "Sophia Odiase", role: "Co-Organizer", category: "leads" },
  { name: "Habeeb Abayomi", role: "Community Manager", category: "manage" },
  { name: "Omobolanle Shaibu", role: "Community Manager", category: "manage" },
  { name: "Victor Ibironke", role: "Technical Lead", category: "leads" },
  { name: "Favour Oluwatunmibi", role: "Technical Lead", category: "leads" },
  { name: "Sharon Lawal", role: "Operations Lead", category: "leads" },
  { name: "Olatilewa Braimah", role: "Operations Lead", category: "leads" },
  { name: "Chioma Okoli", role: "Media and Marketing Lead", category: "leads" },
  { name: "Oghenetejiri Efe", role: "Media and Marketing Lead", category: "leads" },
  { name: "Providence Oduok", role: "Front-End Web Specialist", category: "dev" },
  { name: "Reuben Alabi", role: "Backend Systems Specialist (Software Track Lead)", category: "dev" },
  { name: "Oluwafemi Olatunji", role: "Mobile Development Specialist", category: "dev" },
  { name: "Daniel Bolujo", role: "QA Specialist", category: "dev" },
  { name: "David Obalabi", role: "Data Science Specialist", category: "dev" },
  { name: "Ifeoma Ezeaka", role: "Data Engineering Specialist", category: "dev" },
  { name: "Olaoluwa Ajagbe", role: "Data Analytics Specialist", category: "dev" },
  { name: "Timilehin Adedayo", role: "Machine Learning Specialist (Data & AI Track Lead)", category: "dev" },
  {
    name: "Oluwatomilola Arogundade",
    role: "Cybersecurity Specialist (Infrastructure & Security Track Lead)",
    category: "dev",
  },
  { name: "Oluwajuwon Otelaja", role: "Networking Specialist", category: "dev" },
  { name: "Emmanuel Ologunagba", role: "Web3 & Blockchain Specialist", category: "dev" },
  {
    name: "Oluwadayomisi Osisanya",
    role: "Product Design Specialist (Design & Management Track Lead)",
    category: "design",
  },
  { name: "Daniel Adedoja", role: "Product Management Specialist", category: "manage" },
  { name: "Boluwatife Dada", role: "Games & Interactive Media Specialist", category: "design" },
  { name: "Xavier Okpalannajiaku", role: "2D Animations Specialist", category: "design" },
  { name: "Oluwatamilore Olugbesan", role: "Lead Backend Developer (Dev Team)", category: "dev" },
  { name: "Ademeso Ademola", role: "Lead Frontend Developer (Dev Team)", category: "dev" },
  { name: "Offor Chidoziem", role: "Backend Developer (Dev Team)", category: "dev" },
  { name: "Divine Athora", role: "Lead Product Designer (Dev Team)", category: "design" },
]

type FilterType = "all" | "leads" | "dev" | "design" | "content" | "manage"

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredMembers =
    activeFilter === "all" ? teamMembers : teamMembers.filter((member) => member.category === activeFilter)

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Leads", value: "leads" },
    { label: "Dev", value: "dev" },
    { label: "Design", value: "design" },
    { label: "Content", value: "content" },
    { label: "Manage", value: "manage" },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-5xl">⭐</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">The Dream Team</h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl text-pretty">
            We even added some songs for you to listen to. And you are very free to judge our exquisite taste in music
            😶
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mt-12 border-b border-border">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`pb-4 px-2 text-sm sm:text-base font-medium transition-colors relative ${
                  activeFilter === filter.value ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {filter.label}
                {activeFilter === filter.value && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMembers.map((member, index) => (
              <TeamMemberCard key={index} name={member.name} role={member.role} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
