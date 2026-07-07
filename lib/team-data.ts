/**
 * Team data — the full roster, browsable by year and organized into sections.
 * Shared by the /team page and the home team-preview section.
 *
 * How it works: the raw per-member objects (name, role, photo, music, links)
 * live in `roster2526Raw`. Their org placement — which section, which subteam,
 * whether they lead it — lives in the `ASSIGNMENTS` table below, keyed by name.
 * This keeps the bulky member data untouched while making the structure a
 * single legible thing to edit. To BACKFILL a past year: add a new roster
 * array + assignment table and push a `{ id, label, members }` entry onto
 * `TEAM_YEARS`.
 */

export type TeamCategory = "core" | "track-leads" | "dev-team" | "specialists";

/** Top-level sections, in display order. */
export type TeamSection = "core" | "tracks" | "dev" | "media" | "events";

export interface TeamMember {
  name: string;
  role: string;
  /** @deprecated legacy grouping — use `section` */
  category?: TeamCategory;
  section?: TeamSection;
  /** Sub-group within a section (track name, "Frontend", "Photographers", …) */
  subteam?: string;
  /** Leads render first, in the first row of their group. */
  isLead?: boolean;
  image: string;
  wordsToLiveBy: string;
  links: {
    twitter: string;
    linkedin: string;
    portfolio: string;
  };
  music: {
    name: string;
    artist: string;
    url: string;
  };
}

const roster2526Raw: TeamMember[] = [
  // Core Team
  {
    name: "Chukwuneku Akpotohwo",
    role: "Organizer",
    category: "core",
    image: "/Chukwuneku Akpotohwo - Organizer.png",
    wordsToLiveBy:
      "Anyone that claims to know anything with 100% certainty is either deluded or lying to you.",
    links: {
      twitter: "https://x.com/nekumartins",
      linkedin: "https://linkedin/in/nekumartins",
      portfolio: "",
    },
    music: {
      name: "Snow On Tha Bluff",
      artist: "J.Cole",
      url: "https://open.spotify.com/embed/track/1oOEkBNp4zWnkD7nWjJdog?utm_source=generator&theme=0",
    },
  },
  {
    name: "Sophia Odiase",
    role: "Co-Organizer",
    category: "core",
    image: "/Sophia Odiase - Co-Organizer.png",
    wordsToLiveBy: "Live life, Love life!",
    links: {
      twitter: "https://x.com/Sophia__Odiase?t=iyafs4z2NCPqDm0G5eibEg&s=09",
      linkedin:
        "https://www.linkedin.com/in/sophia-odiase-649653231?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      portfolio: "",
    },
    music: {
      name: "loved!",
      artist: "nobigdyl.",
      url: "https://open.spotify.com/embed/track/6nwaEDffJjSVxT4fJuJheo?utm_source=generator",
    },
  },
  {
    name: "Victor Ibironke",
    role: "Technical Lead",
    category: "core",
    image: "/Victor Ibironke - Technical Lead.png",
    wordsToLiveBy: "Why worry when you can just not?",
    links: {
      twitter: "https://x.com/victoribironke_",
      linkedin: "https://www.linkedin.com/in/victor-ibironke",
      portfolio: "https://victoribironke.com",
    },
    music: {
      name: "Too Easy",
      artist: "Connor Price, Nic D",
      url: "https://open.spotify.com/embed/track/7EQjPEL70tzjlTgCgU0QrV?utm_source=generator",
    },
  },
  {
    name: "Favour Oluwatunmibi",
    role: "Technical Lead",
    category: "core",
    image: "/Favour Oluwatunmibi - Technical Lead.png",
    wordsToLiveBy:
      "Keep learning, keep building — even when you don't feel the change happening, it is. Growth takes time, but every step counts, so don't give up.",
    links: {
      twitter: "https://x.com/Fav_fantasy_",
      linkedin: "https://linkedin.com/in/favourtunmibi",
      portfolio: "https://favourtunmibi.tech",
    },
    music: {
      name: "Dive",
      artist: "Olivia Dean",
      url: "https://open.spotify.com/embed/track/36vmaZyO0iAE6FZ7287fg2?utm_source=generator",
    },
  },
  {
    name: "Sharon Lawal",
    role: "Operations Lead",
    category: "core",
    image: "/Sharon Lawal - Operations Lead.png",
    wordsToLiveBy:
      "No rush, just vibes and progress. Do what you can, the rest will sort itself out.",
    links: {
      twitter: "https://x.com/thistechbabe",
      linkedin: "https://www.linkedin.com/in/sharon-lawal-9b7289261/",
      portfolio: "https://sharonlawal.tech",
    },
    music: {
      name: "The Prayer",
      artist: "Pentatonix",
      url: "https://open.spotify.com/embed/track/4UcdqtJDDSYToxtsBZzkFX?utm_source=generator",
    },
  },
  {
    name: "Olatilewa Braimah",
    role: "Operations Lead",
    category: "core",
    image: "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Braimah",
    wordsToLiveBy: "Never ever ever cheat anyone in any situation.",
    links: {
      twitter: "https://x.com/Brymarjr?t=vwwS964nSOOi1qDks5cWtw&s=09",
      linkedin:
        "https://www.linkedin.com/in/brymarjr?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      portfolio: "",
    },
    music: {
      name: "Angel Numbers/Ten Toes",
      artist: "Chris Brown",
      url: "https://open.spotify.com/embed/track/3XqM8hLCEYlbnFjoWwqtFv?utm_source=generator",
    },
  },
  {
    name: "Chioma Okoli",
    role: "Media and Marketing Lead",
    category: "core",
    image: "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Chioma",
    wordsToLiveBy: "I'm made for so much more✨!",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Bire",
      artist: "Anendlessocean",
      url: "https://open.spotify.com/embed/track/6PGTBSagHYqLOMbuCjaI6H?utm_source=generator",
    },
  },
  {
    name: "Oghenetejiri Efe",
    role: "Media and Marketing Lead",
    category: "core",
    image: "/Oghenetejiri EFEGHERIMONI  - Media & Marketing Lead_.png",
    wordsToLiveBy:
      "The only thing standing between your dreams and your reality is the effort you're willing to put in.",
    links: {
      twitter: "https://x.com/q_teytey?t=XCtFNSwjDRZ3tKsMCXtYiA&s=09",
      linkedin:
        "https://www.linkedin.com/in/oghenetejiri-efegherimoni?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      portfolio: "",
    },
    music: {
      name: "Who Is Like You - Live",
      artist: "Dunsin Oyekan",
      url: "https://open.spotify.com/embed/track/2gbB7Qux8u6qCZhGxlEKFo?utm_source=generator",
    },
  },
  {
    name: "Habeeb Abayomi",
    role: "Community Manager",
    category: "core",
    image: "/Habeeb Abayomi - COMMUNITY MANAGER.png",
    wordsToLiveBy: "A mistake is proof that you tried.",
    links: {
      twitter: "https://x.com/ycent003?s=21",
      linkedin:
        "https://www.linkedin.com/in/habeeb-muhammed-44715a309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      portfolio: "",
    },
    music: {
      name: "JOY",
      artist: "Pheelz, Olamide",
      url: "https://open.spotify.com/embed/track/1FhSj4rHDBZyiQ1CFTtAM0?utm_source=generator",
    },
  },

  // Track Leads
  {
    name: "Reuben Alabi",
    role: "Backend Systems Specialist (Software Track Lead)",
    category: "track-leads",
    image: "/Reuben Alabi - Backend Systems Specialist.png",
    wordsToLiveBy: "Success is when preparation meets opportunity.",
    links: {
      twitter: "https://x.com/rubydevv",
      linkedin: "https://www.linkedin.com/in/rubytech",
      portfolio: "https://ruby-dev.vercel.app/",
    },
    music: {
      name: "Mona Lisa",
      artist: "Lil Wayne, Kendrick Lamar",
      url: "https://open.spotify.com/embed/track/0dbTQYW3Ad1FTzIA9t90E8?utm_source=generator",
    },
  },
  {
    name: "Timilehin Adedayo",
    role: "Machine Learning Specialist (Data & AI Track Lead)",
    category: "track-leads",
    image: "/Timilehin ADEDAYO - Machine Learning Specialist.png",
    wordsToLiveBy:
      "If you aren't going to aim to be the best at what you do, why do it at all?",
    links: {
      twitter: "https://x.com/kinariasu?s=21",
      linkedin: "https://www.linkedin.com/in/timilehin-adedayo-2697a431a",
      portfolio: "https://timi-portfolio-eight.vercel.app/",
    },
    music: {
      name: "Runaway",
      artist: "Kanye West, Pusha T",
      url: "https://open.spotify.com/embed/track/3DK6m7It6Pw857FcQftMds?utm_source=generator",
    },
  },
  {
    name: "Oluwatomilola Arogundade",
    role: "Cybersecurity Specialist (Infrastructure & Security Track Lead)",
    category: "track-leads",
    image: "/Oluwatomilola Arogundade- Cybersecurity Specialist.png",
    wordsToLiveBy:
      "In a world full of threats, I choose to be the light, securing systems, guiding people, and trusting God.",
    links: {
      twitter: "https://x.com/cyberdove_28?s=21",
      linkedin:
        "https://www.linkedin.com/in/tomilola2728?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      portfolio: "",
    },
    music: {
      name: "Nagode - Live",
      artist: "Dunsin Oyekan, David Dam",
      url: "https://open.spotify.com/embed/track/41sTRe349QgL3eByg0Iqhk?utm_source=generator",
    },
  },
  {
    name: "Oluwadayomisi Osisanya",
    role: "Product Design Specialist (Design & Management Track Lead)",
    category: "track-leads",
    image: "/Oluwadayomisi Osisanya- Product Design specialist_.png",
    wordsToLiveBy: "Don't stop until you get what you want.",
    links: {
      twitter: "https://x.com/Oluwadayomisi_O",
      linkedin: "www.linkedin.com/in/oluwadayomisi",
      portfolio: "oluwadayomisi.vzy.io",
    },
    music: {
      name: "Pidgin & English",
      artist: "BNXN",
      url: "https://open.spotify.com/embed/track/4jcrO2T6XJ1B7hXsAEJ3ve?utm_source=generator",
    },
  },

  // Dev Team
  {
    name: "Oluwatamilore Olugbesan",
    role: "Lead Backend Developer (Dev Team)",
    category: "dev-team",
    image:
      "/Olugbesan,  Oluwatamilore Ayooluwakiitan - Lead Backend Developer.png",
    wordsToLiveBy: "Carpe Diem",
    links: {
      twitter: "https://x.com/tami_cp0",
      linkedin: "https://www.linkedin.com/in/tami-cp0",
      portfolio: "",
    },
    music: {
      name: "7am On Bridle Path",
      artist: "Drake",
      url: "https://open.spotify.com/embed/track/42m3eP1JJhtzffal9B136J?utm_source=generator",
    },
  },
  {
    name: "Ademeso Ademola",
    role: "Lead Frontend Developer (Dev Team)",
    category: "dev-team",
    image: "/Ademeso, Ademola Michael - Lead Frontend Developer.PNG",
    wordsToLiveBy: "Some days you just show up, and that's enough.",
    links: {
      twitter: "https://x.com/kingdez_04",
      linkedin: "https://www.linkedin.com/in/ademola-ademeso",
      portfolio: "https://ademolaademeso.vercel.app/",
    },
    music: {
      name: "Too Many Nights",
      artist: "Metro Boomin, Future, Don Toliver",
      url: "https://open.spotify.com/embed/track/2Hh3ETdQKrmSI3QS0hme7g?utm_source=generator",
    },
  },
  {
    name: "Offor Chidoziem",
    role: "Backend Developer (Dev Team)",
    category: "dev-team",
    image: "/Offor Chidoziem - DSA Specialist.png",
    wordsToLiveBy:
      "Strive not to be a success, but rather to be of value. — Albert Einstein",
    links: {
      twitter: "https://x.com/freshakafrancis",
      linkedin: "https://www.linkedin.com/in/francis-chidoziem/",
      portfolio: "",
    },
    music: {
      name: "Special",
      artist: "Wizkid, Don Toliver",
      url: "https://open.spotify.com/embed/track/6MtFM9kbhhuN04rwDxPvn4?utm_source=generator",
    },
  },
  {
    name: "Divine Athora",
    role: "Lead Product Designer (Dev Team)",
    category: "dev-team",
    image: "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Maro",
    wordsToLiveBy:
      "Psalm 23:4, For even though I walk through the valley of the shadow of death. I will fear no evil.",
    links: {
      twitter: "https://x.com/marluvstare?s=21",
      linkedin: "https://ng.linkedin.com/in/divine-athora-39b9b3360",
      portfolio: "",
    },
    music: {
      name: "Too Good",
      artist: "Drake, Rihanna",
      url: "https://open.spotify.com/embed/track/3BtuIIrQlkujKPuWF2B85z?utm_source=generator",
    },
  },

  // Specialists
  {
    name: "Providence Oduok",
    role: "Front-End Web Specialist",
    category: "specialists",
    image: "/Providence Oduok -  Frontend Web Specialist.png",
    wordsToLiveBy: "You'll never know unless you try.",
    links: {
      twitter: "https://x.com/Pemily_Vianne",
      linkedin: "https://www.linkedin.com/in/providence-oduok/",
      portfolio: "https://portfolio-page-vanilla-providence.vercel.app/",
    },
    music: {
      name: "",
      artist: "",
      url: "",
    },
  },
  {
    name: "Oluwafemi Olatunji",
    role: "Mobile Development Specialist",
    category: "specialists",
    image: "/Olatunji Oluwafemi Temitope - Mobile Development Specialist.jpeg",
    wordsToLiveBy: "Keep going—everything feels impossible until it's done.",
    links: {
      twitter: "https://x.com/codedbyfemi",
      linkedin: "https://www.linkedin.com/in/oluwafemiolatunji",
      portfolio: "",
    },
    music: {
      name: "Anyhow Reprise",
      artist: "Tye Tribbett",
      url: "https://open.spotify.com/embed/track/3DvvqLfDgDnuHhm7NfgcNh?utm_source=generator",
    },
  },
  {
    name: "Daniel Bolujo",
    role: "QA Specialist",
    category: "specialists",
    image: "/Daniel BOLUJO - QA Specialist.png",
    wordsToLiveBy: "",
    links: { twitter: "", linkedin: "", portfolio: "" },
    music: {
      name: "On The Radar Freestyle",
      artist: "Nemzzz",
      url: "https://open.spotify.com/embed/track/3oi79iqWmUfOObQ0MOw3xF?utm_source=generator",
    },
  },
  {
    name: "Obalabi Adepoju",
    role: "Data Science Specialist",
    category: "specialists",
    image: "/David Obalabi - Data Science Specialist.jpeg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin:
        "https://www.linkedin.com/in/adepoju-obalabi-74055b295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      portfolio: "https://www.datascienceportfol.io/obalabiadepoju9",
    },
    music: {
      name: "Give Me Oil",
      artist: "Joe Mettle, Sandra Boakye-Duah",
      url: "https://open.spotify.com/embed/track/2ZMJ3SH0AP6tgHcJStpRvN?utm_source=generator",
    },
  },
  {
    name: "Ifeoma Ezeaka",
    role: "Data Engineering Specialist",
    category: "specialists",
    image: "/Ifeoma Ezeka - Data engineering specialist_.png",
    wordsToLiveBy: "No matter what, God will work it out.",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/ifeomaezeka?trk=contact-info",
      portfolio: "",
    },
    music: {
      name: "From The Start",
      artist: "Laufey",
      url: "https://open.spotify.com/embed/track/43iIQbw5hx986dUEZbr3eN?utm_source=generator",
    },
  },
  {
    name: "Olaoluwa Ajagbe",
    role: "Data Analytics Specialist",
    category: "specialists",
    image: "/Olaoluwa Ajagbe - Data Analytics Specialist.png",
    wordsToLiveBy: "Whatever is worth doing is worth doing well.",
    links: {
      twitter: "https://x.com/olaoluwaaj24377?s=21",
      linkedin:
        "https://www.linkedin.com/in/olaoluwa-ajagbe-6a24a0275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      portfolio: "https://github.com/Ajagbe-olaoluwa/Ola_portfolio",
    },
    music: {
      name: "Good Shepherd",
      artist: "Joe L Barnes",
      url: "https://open.spotify.com/embed/track/0qunForAChEb3cxRJ0KIZK?utm_source=generator",
    },
  },
  {
    name: "Oluwajuwon Otelaja",
    role: "Networking Specialist",
    category: "specialists",
    image: "/Oluwajuwonlo Otelaja-Networking Specialist.jpeg",
    wordsToLiveBy:
      "Do what you're good at. Blood don't make you family, loyalty does and loyalty is not a word, it's a lifestyle.",
    links: {
      twitter: "https://x.com/okashfast?s=21",
      linkedin:
        "https://www.linkedin.com/in/oluwajuwon-otelaja-693060352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      portfolio: "",
    },
    music: {
      name: "Voice of the Street (V.O.T.S)",
      artist: "Olamide",
      url: "https://open.spotify.com/embed/track/56CX3U5uYL5FbEA6NAkvVN?utm_source=generator",
    },
  },
  {
    name: "Emmanuel Ologunagba",
    role: "Web3 & Blockchain Specialist",
    category: "specialists",
    image: "/Emmanuel Ologunagba - Web3 & Blockchain Specialist.png",
    wordsToLiveBy: "Love God With All Your Heart.",
    links: {
      twitter: "https://x.com/citizen01__eth",
      linkedin: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav",
      portfolio: "",
    },
    music: {
      name: "Mercy - Live",
      artist: "Dunsin Oyekan",
      url: "https://open.spotify.com/embed/track/6E9nGrOKDZasHnmBmRQnP2?utm_source=generator",
    },
  },
  {
    name: "Daniel Adedoja",
    role: "Product Management Specialist",
    category: "specialists",
    image: "/Daniel Adedoja - Product Management Specialist.png",
    wordsToLiveBy: "You only live once.",
    links: {
      twitter: "https://x.com/Doja_Demola?t=D_rwOZI7X_LbJ8gfTI1noA&s=09",
      linkedin:
        "https://www.linkedin.com/in/adedoja-daniel-117889229?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      portfolio: "https://bold.pro/my/danielademola-adedoja",
    },
    music: {
      name: "Iyin Ye",
      artist: "Paul Tomisin",
      url: "https://open.spotify.com/embed/track/5z36PAsTmFXGouWKekx1Wm?utm_source=generator",
    },
  },
  {
    name: "Boluwatife Dada",
    role: "Games & Interactive Media Specialist",
    category: "specialists",
    image: "/Boluwatife Dada- Games & Interactive Media Specialist.png",
    wordsToLiveBy: "If I can't climb, I will grow.",
    links: {
      twitter: "",
      linkedin:
        "https://www.linkedin.com/in/boluwatife-dada-a45132334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      portfolio: "",
    },
    music: {
      name: "Somebody To Love",
      artist: "Queen",
      url: "https://open.spotify.com/embed/track/5txoZyuAmtCfmDjUCEphWm?utm_source=generator",
    },
  },
  {
    name: "Xavier Okpalannajiaku",
    role: "2D Animations Specialist",
    category: "specialists",
    image: "/Okpalannajiaku Xavier - 2d Animation Specialist.png",
    wordsToLiveBy: "It all comes down to two words homie... Type shii.",
    links: {
      twitter: "https://x.com/eagolagoon?s=21",
      linkedin:
        "https://www.linkedin.com/in/xavier-okpalannajiaku-8a07812bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      portfolio: "https://inprogress.him",
    },
    music: {
      name: "Sweater Weather",
      artist: "The Neighbourhood",
      url: "https://open.spotify.com/embed/track/2QjOHCTQ1Jl3zawyYOpxh6?utm_source=generator",
    },
  },
  {
    name: "Omobolanle Shaibu",
    role: "Community Manager",
    category: "core",
    image: "/Omobolanle SHAIBU - Community Manager.png",
    wordsToLiveBy: "Enjoy the little things.",
    links: {
      twitter: "https://x.com/lanle_xoxoxo",
      linkedin: "https://www.linkedin.com/in/omobolanleshaibu",
      portfolio: "https://portfolio-lanle05s-projects.vercel.app/",
    },
    music: {
      name: "July",
      artist: "Noah Cyrus",
      url: "https://open.spotify.com/embed/track/6J2LdBN97cDWn0MLxYh9HB?utm_source=generator",
    },
  },
];

// ─── Section / subteam structure ─────────────────────────────────────────────

/** Track subteam names (color-coded to the four brand tracks). */
export const TRACK_SUBTEAMS = [
  "Software Development & Engineering",
  "Data & AI",
  "Infrastructure & Security",
  "Design & Management",
] as const;

export interface SectionDef {
  id: TeamSection;
  label: string;
  /** Ordered subteams; members outside these render under "" (no header). */
  subteams: string[];
}

export const TEAM_SECTIONS: SectionDef[] = [
  { id: "core", label: "Core Team", subteams: [] },
  { id: "tracks", label: "Tracks", subteams: [...TRACK_SUBTEAMS] },
  { id: "dev", label: "Dev Team", subteams: ["Frontend", "Backend", "Product Design"] },
  {
    id: "media",
    label: "Media Team",
    subteams: ["Photographers", "Content Creators", "Graphic Designers", "Video Editors", "RADAR"],
  },
  { id: "events", label: "Events Planning Team", subteams: [] },
];

/**
 * Org placement per member, inferred from their role strings.
 * `// ?` marks a best-effort guess worth confirming.
 */
type Assignment = { section: TeamSection; subteam?: string; isLead?: boolean };

const ASSIGNMENTS: Record<string, Assignment> = {
  // Core leadership
  "Chukwuneku Akpotohwo": { section: "core", isLead: true }, // Organizer
  "Sophia Odiase": { section: "core", isLead: true }, // Co-Organizer
  "Victor Ibironke": { section: "core" }, // Technical Lead
  "Favour Oluwatunmibi": { section: "core" }, // Technical Lead
  "Sharon Lawal": { section: "core" }, // Operations Lead
  "Olatilewa Braimah": { section: "core" }, // Operations Lead
  "Habeeb Abayomi": { section: "core" }, // Community Manager
  "Omobolanle Shaibu": { section: "core" }, // Community Manager

  // Tracks — leads first, specialists under their track
  "Reuben Alabi": { section: "tracks", subteam: "Software Development & Engineering", isLead: true },
  "Timilehin Adedayo": { section: "tracks", subteam: "Data & AI", isLead: true },
  "Oluwatomilola Arogundade": { section: "tracks", subteam: "Infrastructure & Security", isLead: true },
  "Oluwadayomisi Osisanya": { section: "tracks", subteam: "Design & Management", isLead: true },
  "Providence Oduok": { section: "tracks", subteam: "Software Development & Engineering" },
  "Oluwafemi Olatunji": { section: "tracks", subteam: "Software Development & Engineering" },
  "Daniel Bolujo": { section: "tracks", subteam: "Software Development & Engineering" }, // ? QA
  "Emmanuel Ologunagba": { section: "tracks", subteam: "Software Development & Engineering" }, // ? Web3
  "Boluwatife Dada": { section: "tracks", subteam: "Software Development & Engineering" }, // ? Games
  "Obalabi Adepoju": { section: "tracks", subteam: "Data & AI" },
  "Ifeoma Ezeaka": { section: "tracks", subteam: "Data & AI" },
  "Olaoluwa Ajagbe": { section: "tracks", subteam: "Data & AI" },
  "Oluwajuwon Otelaja": { section: "tracks", subteam: "Infrastructure & Security" }, // ? Networking
  "Daniel Adedoja": { section: "tracks", subteam: "Design & Management" }, // Product Management
  "Xavier Okpalannajiaku": { section: "tracks", subteam: "Design & Management" }, // ? 2D Animation → maybe Media

  // Dev Team — leads first
  "Ademeso Ademola": { section: "dev", subteam: "Frontend", isLead: true },
  "Oluwatamilore Olugbesan": { section: "dev", subteam: "Backend", isLead: true },
  "Offor Chidoziem": { section: "dev", subteam: "Backend" },
  "Divine Athora": { section: "dev", subteam: "Product Design", isLead: true },

  // Media Team — leads
  "Chioma Okoli": { section: "media", isLead: true }, // Media & Marketing Lead
  "Oghenetejiri Efe": { section: "media", isLead: true }, // Media & Marketing Lead
};

/** Default placement for any member missing from ASSIGNMENTS. */
const DEFAULT_ASSIGNMENT: Assignment = { section: "core" };

function enrich(roster: TeamMember[]): TeamMember[] {
  return roster.map((m) => ({ ...m, ...(ASSIGNMENTS[m.name] ?? DEFAULT_ASSIGNMENT) }));
}

/** Current-year roster with section/subteam/isLead applied. */
export const teamMembers: TeamMember[] = enrich(roster2526Raw);

export interface TeamYear {
  id: string;
  label: string;
  members: TeamMember[];
}

/**
 * Rosters by year, newest first. Past years are empty until backfilled —
 * add `{ id, label, members: enrich(rosterYYYYRaw) }` to fill one in.
 */
export const TEAM_YEARS: TeamYear[] = [
  { id: "current", label: "Current Team", members: teamMembers },
  { id: "2024", label: "2024/25", members: [] },
  { id: "2023", label: "2023/24", members: [] },
  { id: "2022", label: "2022/23", members: [] },
];

/** Slice shown in the home page "The people behind the pixels." section */
export const TEAM_PREVIEW: TeamMember[] = teamMembers.slice(0, 10);
