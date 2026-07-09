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
  {
    name: "Chukwuneku Akpotohwo",
    role: "Organizer",
    image: "/team/core-team/chukwuneku-akpotohwo-organizer.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Sophia Osariemen Odiase",
    role: "Co-Organizer",
    image: "/team/core-team/sophia-osariemen-odiase- corganizer.jpg",
    wordsToLiveBy: "Where there\u2019s life, there\u2019s Hope!",
    links: {
      twitter: "https://x.com/sophia__odiase",
      linkedin: "https://ng.linkedin.com/in/sophia-odiase-649653231",
      portfolio: "",
    },
    music: {
      name: "Rest II",
      artist: "Limoblaze and Reggie Dartey",
      url: "https://open.spotify.com/embed/track/68wMgpA5SOUrxgPxYDLmdm?utm_source=generator",
    },
  },
  {
    name: "Habeeb Abayomi",
    role: "Member",
    image: "/team/core-team/habeeb-abayomi.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Oluwatomilola Arogundade",
    role: "Cybersecurity Specialist",
    image: "/team/tracks/infrastructure-and-security/oluwatomilola-arogundade-lead.jpeg",
    wordsToLiveBy: "Grace fuels the grind.",
    links: {
      twitter: "https://x.com/cyberdove_28",
      linkedin: "https://www.linkedin.com/in/tomilola2728",
      portfolio: "",
    },
    music: {
      name: "Alleluia",
      artist: "Elevation worship",
      url: "https://open.spotify.com/embed/track/5DcfS4kk1fIYNCvuspcMic?utm_source=generator",
    },
  },
  {
    name: "Ifeoma Ezeka",
    role: "Data engineering specialist",
    image: "/team/tracks/data-and-ai/ifeoma-ezeka.jpeg",
    wordsToLiveBy: "Life is simply GIGO",
    links: {
      twitter: "https://x.com/ezekaifeoma",
      linkedin: "https://www.linkedin.com/in/ifeomaezeka",
      portfolio: "",
    },
    music: {
      name: "RAYE",
      artist: "Joy",
      url: "https://open.spotify.com/embed/track/5CKbUv7zkOdf8X2602qgei?utm_source=generator",
    },
  },
  {
    name: "Itamah Osedebame Ehigie",
    role: "Lead",
    image: "/team/media-and-marketing/radar/itamah-osedebame-ehigie-lead.jpg",
    wordsToLiveBy: "To Infinity and Beyond",
    links: {
      twitter: "https://x.com/Debah_",
      linkedin: "https://linkedin.com/in/osedebameitamah",
      portfolio: "",
    },
    music: {
      name: "Get the time back",
      artist: "mustbejohn",
      url: "https://open.spotify.com/embed/track/3Ic2K44CMzlcJT7NKSCV3M?utm_source=generator",
    },
  },
  {
    name: "Atolagbe Precious Olawole",
    role: "Member",
    image: "/team/events-logistics/atolagbe-precious-olawole.jpg",
    wordsToLiveBy: "Rather die trying than live wondering what if",
    links: {
      twitter: "https://x.com/oladdev",
      linkedin: "https://www.linkedin.com/in/atolagbe-olawole",
      portfolio: "https://ola-portfolio-jet.vercel.app/",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/4rnyUV17cSZGsz18xJNdjL?utm_source=generator",
    },
  },
  {
    name: "Braimah Olatilewa Eyituoyo Brymar",
    role: "Operations Lead",
    image: "/team/core-team/braimah-olatilewa-eyituoyo-brymar.jpg",
    wordsToLiveBy: "It's not who I am underneath but what I do defines me",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/brymarjr",
      portfolio: "https://portfolio-six-khaki-z2kpdfut8a.vercel.app/",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/1ZTHWXvZPL0oNZGVFrG8z3?utm_source=generator",
    },
  },
  {
    name: "Adedoja Daniel Ademola",
    role: "Product Management Specialist",
    image: "/team/tracks/design-and-management/adedoja-daniel-ademola.jpg",
    wordsToLiveBy: "Whatever is worth doing, is worth doing well.",
    links: {
      twitter: "https://x.com/Doja_Demola",
      linkedin: "https://www.linkedin.com/in/adedoja-daniel-ademola",
      portfolio: "https://my-portfolio-adedoja-daniel-ademolas-projects.vercel.app/",
    },
    music: {
      name: "Balogun",
      artist: "Pelumi Deborah and Ib Quake",
      url: "https://open.spotify.com/embed/track/5vkJqTq7fFd2fchzQL4LuB?utm_source=generator",
    },
  },
  {
    name: "Agunbiade Ayomide Obanijesu",
    role: "Member",
    image: "/team/media-and-marketing/radar/agunbiade-ayomide-obanijesu.jpeg",
    wordsToLiveBy: "The goal is to build something greater than self.",
    links: {
      twitter: "https://x.com/iam_aesir",
      linkedin: "https://www.linkedin.com/in/agunbiade-ayomide",
      portfolio: "",
    },
    music: {
      name: "You\u2019re Never Fully Dressed Without a Smile",
      artist: "Sia (",
      url: "https://open.spotify.com/embed/track/6x0v6SaLC9E4XY39efEeCs?utm_source=generator",
    },
  },
  {
    name: "Umaru Victor Oshioke",
    role: "Lead",
    image: "/team/media-and-marketing/graphics-design/umaru-victor-oshioke-lead.jpeg",
    wordsToLiveBy: "\u201cIf you can believe, all things are possible to him who believes.\u201d\n- Jesus Christ",
    links: {
      twitter: "https://x.com/UmaruJr",
      linkedin: "https://www.linkedin.com/in/victor-umaru-jr",
      portfolio: "http://behance.net/victorumarujr",
    },
    music: {
      name: "Only You",
      artist: "1Spirit & Theophilus Sunday",
      url: "https://open.spotify.com/embed/track/6dairkRMlu1rEv68D1Q9SO?utm_source=generator",
    },
  },
  {
    name: "Bisong Best Ebu-Obasi",
    role: "Member",
    image: "/team/media-and-marketing/video-editing/bisong-best-ebu-obasi.jpeg",
    wordsToLiveBy: "The best way to predict the future is to build it execution is everything",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/best-bisong-a80b7b366",
      portfolio: "",
    },
    music: {
      name: "Champagne Poetry",
      artist: "Drake",
      url: "https://open.spotify.com/embed/track/2HSmyk2qMN8WQjuGhaQgCk?utm_source=generator",
    },
  },
  {
    name: "Ademola Ademeso",
    role: "Lead",
    image: "/team/development/frontend/ademola-ademeso-lead.jpeg",
    wordsToLiveBy: "Some days you just show up, and that's enough.",
    links: {
      twitter: "https://x.com/kingdez_04",
      linkedin: "https://www.linkedin.com/in/ademola-ademeso",
      portfolio: "https://ademolaademeso.vercel.app/",
    },
    music: {
      name: "Too Many Nights",
      artist: "Don Toliver",
      url: "https://open.spotify.com/embed/track/2Hh3ETdQKrmSI3QS0hme7g?utm_source=generator",
    },
  },
  {
    name: "Ojekemi Ayotomiwa",
    role: "Member",
    image: "/team/media-and-marketing/video-editing/ojekemi-ayotomiwa.jpeg",
    wordsToLiveBy: "there\u2019s really nothing that can impress people. just make sure YOU are impressed.",
    links: {
      twitter: "https://x.com/obviouslyayo",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Riptide",
      artist: "Vance Joy",
      url: "https://open.spotify.com/embed/track/7yq4Qj7cqayVTp3FF9CWbm?utm_source=generator",
    },
  },
  {
    name: "Oseni David",
    role: "Member",
    image: "/team/events-logistics/oseni-david.jpeg",
    wordsToLiveBy: "It\u2019s not about who finishes first, it\u2019s about who finishes best",
    links: {
      twitter: "https://x.com/ozedikuss?s=11",
      linkedin: "https://www.linkedin.com/in/david-oseni-8398b8291?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      portfolio: "",
    },
    music: {
      name: "don\u2019t stop till you get enough",
      artist: "michael jackson",
      url: "https://open.spotify.com/embed/track/46eu3SBuFCXWsPT39Yg3tJ?utm_source=generator",
    },
  },
  {
    name: "Oghojafor Oghenemaro Esther.O",
    role: "Member",
    image: "/team/media-and-marketing/radar/adefila-olutayo-esther.jpeg",
    wordsToLiveBy: "\"What would Jesus do in this situation \"",
    links: {
      twitter: "https://x.com/Alphamaro",
      linkedin: "https://www.linkedin.com/in/oghenemaro-oghojafor-12bb25402?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      portfolio: "",
    },
    music: {
      name: "Doors",
      artist: "Noah kahan (",
      url: "https://open.spotify.com/embed/track/3iU2qsthCTo5EeTE03l3Si?utm_source=generator",
    },
  },
  {
    name: "Azubuike Chimamanda Favour",
    role: "Media and Marketing Co-Lead",
    image: "/team/core-team/azubuike-chimamanda-favour.jpg",
    wordsToLiveBy: "Delay is not denial",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Barch Hashem Adonia",
      artist: "Dusin Oyekan.",
      url: "https://open.spotify.com/embed/track/1VEagF1oSqLgm5Y6lH32mS?utm_source=generator",
    },
  },
  {
    name: "Adeniran Oluwatamilore Janella",
    role: "Member",
    image: "/team/media-and-marketing/radar/adeniran-oluwatamilore-janella.jpeg",
    wordsToLiveBy: "The pain you\u2019re feeling now does not compare to the joy that is coming",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/oluwatamiloreadeniran",
      portfolio: "",
    },
    music: {
      name: "The Hardest Part Olivia Dean",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3Z19t8pNaAHqlLmz2LuwNa?utm_source=generator",
    },
  },
  {
    name: "NELSON-NWANONEZE DAVID",
    role: "Member",
    image: "/team/events-logistics/nelson-nwanoneze-david.png",
    wordsToLiveBy: "Build things that outlast your involvement in them.",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/david-nelson-nwanoneze-9386b0295",
      portfolio: "",
    },
    music: {
      name: "There is prophecy over me Theophilus Sunday",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/2AgdXw0t0pEh3FS5gALxRJ?utm_source=generator",
    },
  },
  {
    name: "NELSON-NWANONEZE SAMUEL",
    role: "Member",
    image: "/team/events-logistics/nelson-nwanoneze-samuel.jpeg",
    wordsToLiveBy: "If I'm going to die one day then let's me do it doing what I love",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "can you hear me",
      artist: "Munn",
      url: "https://open.spotify.com/embed/track/2OZNEa3tW5HKAaAQqnJope?utm_source=generator",
    },
  },
  {
    name: "Harrison Tifeoluwanimi Dorcas",
    role: "Member",
    image: "/team/media-and-marketing/radar/harrison-tifeoluwanimi-dorcas.jpg",
    wordsToLiveBy: "Knowing what you want to do in life is amazing but not knowing is an adventure, at the end of the day we live one life so satisfy yourself not others",
    links: {
      twitter: "https://x.com/Harry33222427",
      linkedin: "https://www.linkedin.com/in/tifeoluwanimi-harrison-93600a420?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      portfolio: "",
    },
    music: {
      name: "Ladies room",
      artist: "Olivia Dean for now",
      url: "https://open.spotify.com/embed/track/0M7oki70AV10Ztt3HyUd8Z?utm_source=generator",
    },
  },
  {
    name: "Favour Oluwatunmibi",
    role: "Technical Lead",
    image: "/team/core-team/favour-oluwatunmibi.jpg",
    wordsToLiveBy: "Whatever is worth doing at all, is worth doing well.",
    links: {
      twitter: "https://x.com/Fav_fantasy_",
      linkedin: "https://linkedin.com/in/favourtunmibi",
      portfolio: "https://favourtunmibi.dev",
    },
    music: {
      name: "You Stole The Show",
      artist: "Sienna Spiro (",
      url: "https://open.spotify.com/embed/track/23ZdNaFSfH7VdSVU4U0Agb?utm_source=generator",
    },
  },
  {
    name: "Oyebajo Olaimide",
    role: "Member",
    image: "/team/media-and-marketing/video-editing/oyebajo-olaimide.jpg",
    wordsToLiveBy: "Don\u2019t spend your life worrying about what a good man should be. Be one.",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/48RKc1nauDnXRBMOuvjxFy?utm_source=generator",
    },
  },
  {
    name: "Otelaja Oluwajuwonlo Okikiola",
    role: "Networking specialist",
    image: "/team/tracks/infrastructure-and-security/oluwajuwon-otelaja.jpeg",
    wordsToLiveBy: "Do what you're good at. Blood doesn't make you family, loyalty does and loyalty is not a word, it's a lifestyle.",
    links: {
      twitter: "https://x.com/Oluwajuwon Kashfast",
      linkedin: "https://Oluwajuwon Otelaja",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Ajagbe Olaoluwa",
    role: "Data Analytics Specialist",
    image: "/team/tracks/data-and-ai/ajagbe-olaoluwa.jpg",
    wordsToLiveBy: "Hardwork and Jesus is all you need",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/olaoluwa-ajagbe-6a24a0275?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      portfolio: "https://ajagbe-olaoluwa.github.io/Portfolio/#projects",
    },
    music: {
      name: "Touch of Heaven",
      artist: "Bethel Music",
      url: "https://open.spotify.com/embed/track/5YlH7CeaNAoRKsaSzTXojM?utm_source=generator",
    },
  },
  {
    name: "Alabo Treasure Sowari",
    role: "Member",
    image: "/team/events-logistics/alabo-treasure-sowari.jpg",
    wordsToLiveBy: "Those who cannot remember the past are condemned to repeat it - George Santayana",
    links: {
      twitter: "https://x.com/_aunty_mommy",
      linkedin: "https://Ms. Treasure Alabo",
      portfolio: "",
    },
    music: {
      name: "Primavera",
      artist: "Ludovico Einaudi",
      url: "https://open.spotify.com/embed/track/4BMHp3DkI8VLsuB9Kr0pzu?utm_source=generator",
    },
  },
  {
    name: "Emmanuel Ekundayo",
    role: "Cloud Specialist",
    image: "/team/tracks/infrastructure-and-security/emmanuel-ekundayo.jpg",
    wordsToLiveBy: "Do it for the plot",
    links: {
      twitter: "https://x.com/ekunday00",
      linkedin: "https://www.linkedin.com/in/Emmanuelekundayo",
      portfolio: "https://www.Emmanuelekundayo.com",
    },
    music: {
      name: "Everything I wanted",
      artist: "Billie Eilish",
      url: "https://open.spotify.com/embed/track/18STeHCPngK3bx4yO55etx?utm_source=generator",
    },
  },
  {
    name: "Oba odumeru",
    role: "Member",
    image: "/team/events-logistics/oba-odumeru.jpeg",
    wordsToLiveBy: "Be good",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/mubarak-odumeru-0273aa306?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      portfolio: "",
    },
    music: {
      name: "Oba",
      artist: "asake",
      url: "https://open.spotify.com/embed/track/59zlaPDhvE414BZ82AFjH5?utm_source=generator",
    },
  },
  {
    name: "Balogun Eniola",
    role: "Core Team Member",
    image: "/team/tracks/software-development/balogun-eniola.jpg",
    wordsToLiveBy: "I don\u2019t get",
    links: {
      twitter: "https://x.com/Ennysticks",
      linkedin: "https://Balogun Eniola",
      portfolio: "https://ennyportfolio-phi.vercel.app/",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Akande Kehinde Gladys",
    role: "Member",
    image: "/team/events-logistics/akande-kehinde-gladys.jpg",
    wordsToLiveBy: "A negative mind will never give you a positive life.",
    links: {
      twitter: "https://x.com/darkangel",
      linkedin: "https://Akande Kehinde",
      portfolio: "",
    },
    music: {
      name: "End of day",
      artist: "AEO",
      url: "https://open.spotify.com/embed/track/7CnvEGDZnHL8X3DD4zHplz?utm_source=generator",
    },
  },
  {
    name: "Olubowale Oluwatunmininu Temitope",
    role: "Member",
    image: "/team/development/project-managers/olubowale-oluwatunmininu-temitope.jpeg",
    wordsToLiveBy: "Just do it",
    links: {
      twitter: "https://x.com/tunmininu_OT",
      linkedin: "https://Oluwatunmininu Olubowale -",
      portfolio: "",
    },
    music: {
      name: "Odudu",
      artist: "Theophulus Sunday",
      url: "https://open.spotify.com/embed/track/1eAaujnEdoKSpTDFs9ifwV?utm_source=generator",
    },
  },
  {
    name: "Divine Athora",
    role: "Member",
    image: "/team/development/product-designers/divine-athora.jpeg",
    wordsToLiveBy: "Psalm 23:4, For even though I walk through the valley of the shadow of death. I will fear no evil.",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/divine-athora-39b9b3360?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      portfolio: "https://dribbble.com/maro-athora",
    },
    music: {
      name: "Fortworth",
      artist: "Drake (",
      url: "https://open.spotify.com/embed/track/0F1rlXkOcI1Iqfz9Y3BdO4?utm_source=generator",
    },
  },
  {
    name: "Alabi Reuben",
    role: "Software Development Track Lead",
    image: "/team/tracks/software-development/alabi-reuben-lead.jpg",
    wordsToLiveBy: "We are what we repeatedly do. Excellence, then, is not an act, but a habit",
    links: {
      twitter: "https://x.com/rubydevv",
      linkedin: "https://www.linkedin.com/in/rubytech/",
      portfolio: "https://reubenalabi.tech",
    },
    music: {
      name: "Mona Lisa \u00b7 Lil Wayne",
      artist: "Kendrick Lamar \u00b7",
      url: "https://open.spotify.com/embed/track/0dbTQYW3Ad1FTzIA9t90E8?utm_source=generator",
    },
  },
  {
    name: "Ebosetaleh Andrea Andrew",
    role: "Member",
    image: "/team/media-and-marketing/radar/ebosetaleh-andrea-andrew.jpeg",
    wordsToLiveBy: "GIGO TITO (Garbage in Garbage Out, Treasure in Treasure Out) \nYou are a product of what you consume.",
    links: {
      twitter: "https://x.com/talehandrea?s=11&t=QkYPxkJMzzrmqirdfDggzQ",
      linkedin: "https://www.linkedin.com/in/ebosetaleh-andrew-b3b216251?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      portfolio: "",
    },
    music: {
      name: "My 24th Birthday",
      artist: "Dave",
      url: "https://open.spotify.com/album/0zFeoJMAriaiLtmU62nXtR?utm_source=generator",
    },
  },
  {
    name: "Okon Onono Ene",
    role: "Core Team Member",
    image: "/team/tracks/data-and-ai/okon-onono-ene.jpeg",
    wordsToLiveBy: "Consistency beats motivation",
    links: {
      twitter: "https://x.com/_nonnyy_",
      linkedin: "https://Onono Okon",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Akanni Temitope",
    role: "Member",
    image: "/team/events-logistics/akanni-temitope.jpg",
    wordsToLiveBy: "When you think of giving up remember why you held on for so long",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/akanni-temitope-425725279/",
      portfolio: "",
    },
    music: {
      name: "Way Maker",
      artist: "Christ Church Choir link:",
      url: "https://open.spotify.com/embed/track/30qYNY9Q4GPYxxmH5GJC8C?utm_source=generator",
    },
  },
  {
    name: "Oluwafemi Temitope Olatunji",
    role: "Mobile specialist",
    image: "/team/tracks/software-development/oluwafemi-temitope-olatunji.jpeg",
    wordsToLiveBy: "He who knows not, and knows not that he knows not, is a fool \u2014 shun him.\nHe who knows not, and knows that he knows not, is simple \u2014 teach him.\nHe who knows, and knows not that he knows, is asleep \u2014 wake him.\nHe who knows, and knows that he knows, is wise \u2014 follow him.",
    links: {
      twitter: "https://x.com/codedbyfemi",
      linkedin: "https://www.linkedin.com/in/oluwafemiolatunji",
      portfolio: "",
    },
    music: {
      name: "Odudu",
      artist: "Theophilus Sunday",
      url: "https://open.spotify.com/embed/track/6jNX98b2AHs0kONUOm6mgf?utm_source=generator",
    },
  },
  {
    name: "Eromoigbe Agbonikpeya",
    role: "Core Team Member",
    image: "/team/tracks/software-development/eromoigbe-agbonikpeya.jpg",
    wordsToLiveBy: "Stay curious, stay sharp",
    links: {
      twitter: "https://x.com/winnerx0",
      linkedin: "https://www.linkedin.com/in/eromoigbe-agbonikpeya/",
      portfolio: "https://winnerx0.dev",
    },
    music: {
      name: "Rendezvous",
      artist: "Don Toliver & Yeat",
      url: "https://open.spotify.com/embed/track/2Ejyg4CavumEr7lFUkk9aF?utm_source=generator",
    },
  },
  {
    name: "Praise Akenroye",
    role: "Core Team Member",
    image: "/team/tracks/infrastructure-and-security/praise-akenroye.jpg",
    wordsToLiveBy: "Learn Continuously",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/praise-akenroye",
      portfolio: "",
    },
    music: {
      name: "Alone",
      artist: "Anendlessocean",
      url: "https://open.spotify.com/embed/track/2Im4gW7xrTDqQFOIjxkb7j?utm_source=generator",
    },
  },
  {
    name: "Iretomiwa Akande",
    role: "Member",
    image: "/team/events-logistics/iretomiwa-akande.jpeg",
    wordsToLiveBy: "At the end the of the day We will be fine",
    links: {
      twitter: "https://x.com/IretomiwaAkande.versel.app",
      linkedin: "https://www.linkedin.com/in/iretomiwa-akande-317116283?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      portfolio: "",
    },
    music: {
      name: "Light By Rotimikeys",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/4rN4PprdOYJQKaPp4HXVgz?utm_source=generator",
    },
  },
  {
    name: "Daniel Alexander Odulate",
    role: "Core Team Member",
    image: "/team/tracks/software-development/daniel-alexander-odulate.jpg",
    wordsToLiveBy: "Humans were designed to create - that's why you get depressed when all you do is consume; so create and build that thing, you can make it better later.",
    links: {
      twitter: "https://x.com/Xander_danny229",
      linkedin: "https://www.linkedin.com/in/danielodulate",
      portfolio: "https://danielodulate.vercel.app",
    },
    music: {
      name: "World's smallest violin",
      artist: "AJR",
      url: "https://open.spotify.com/embed/track/68EkhVWIeULhHxcbi1QhzK?utm_source=generator",
    },
  },
  {
    name: "Adefila Olutayo Esther",
    role: "Technical Writer",
    image: "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=AdefilaOlutayoEsther",
    wordsToLiveBy: "Seek first the Kingdom \u2728",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Doo Wop (That Thing)",
      artist: "Lauryn Hill",
      url: "https://open.spotify.com/embed/track/0uEp9E98JB5awlA084uaIg?utm_source=generator",
    },
  },
  {
    name: "Nafarnda Marilyn",
    role: "Member",
    image: "/team/media-and-marketing/content-creation/nafarnda-marilyn.jpeg",
    wordsToLiveBy: "Enjoy your life!",
    links: {
      twitter: "https://x.com/lynncoppedit",
      linkedin: "https://Marilyn Nafarnda",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Mokwunye Ogochukwu Asha",
    role: "Member",
    image: "/team/media-and-marketing/video-editing/mokwunye-ogochukwu-asha.jpeg",
    wordsToLiveBy: "\u201cDon\u2019t let your past convince you that change isn\u2019t possible\u201d",
    links: {
      twitter: "https://x.com/OG_i4nni",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "\u201cA Couple Minutes \u201d",
      artist: "Olivia Dean",
      url: "https://open.spotify.com/embed/track/312z6PZ8wwREck8613PkJk?utm_source=generator",
    },
  },
  {
    name: "Lawal Sharon",
    role: "Operations Lead",
    image: "/team/core-team/sharon-lawal.jpg",
    wordsToLiveBy: "Do it properly or don't do it at all",
    links: {
      twitter: "https://x.com/x.com/thistechbabe",
      linkedin: "https://www.linkedin.com/in/sharon-lawal-9b7289261/",
      portfolio: "https://sharonlawal.vercel.app",
    },
    music: {
      name: "Undignified (Excuse Me)",
      artist: "Dunsin Oyekan;",
      url: "https://open.spotify.com/embed/track/3aSBRG5HYyEgWyuUgrRJLE?utm_source=generator",
    },
  },
  {
    name: "Olugbesan Ayooluwakiitan Oluwatamilore",
    role: "Lead",
    image: "/team/development/backend/olugbesan-ayooluwakiitan-oluwatamilore-lead.jpg",
    wordsToLiveBy: "Remember to live",
    links: {
      twitter: "https://x.com/tami_cp0",
      linkedin: "https://www.linkedin.com/in/tami-cp0",
      portfolio: "",
    },
    music: {
      name: "Master of None",
      artist: "Beach House",
      url: "https://open.spotify.com/embed/track/3stWWPN41byqp8loPdy92u?utm_source=generator",
    },
  },
  {
    name: "Olamide Fatunase",
    role: "Lead",
    image: "/team/media-and-marketing/video-editing/olamide-fatunase-lead.jpeg",
    wordsToLiveBy: "Youre always made for more, do no let anyone underestimate you.",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/olamide-fatunase-271a5727a",
      portfolio: "",
    },
    music: {
      name: "Too many to choose from.",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/2dmBAIjIfisvCG7G9YEh0g?utm_source=generator",
    },
  },
  {
    name: "Daniel Fagbohunlu",
    role: "GDG Developer",
    image: "/team/tracks/software-development/bolujo-daniel.jpg",
    wordsToLiveBy: "\"We are pliable. Love need not be a command nor faith a dictum. I am my own god. We are here to unlearn the teachings of the church, state, and our educational system. We are here to drink beer. We are here to kill war. We are here to laugh at the odds and live our lives so well that Death will tremble to take us.\" - Charles Bukowski",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "N.Y. State of Mind",
      artist: "Nas",
      url: "https://open.spotify.com/embed/track/0trHOzAhNpGCsGBEu7dOJo?utm_source=generator",
    },
  },
  {
    name: "Onyelukachukwu M. O. Obata",
    role: "Member",
    image: "/team/development/project-managers/onyelukachukwu-m-o-obata.jpeg",
    wordsToLiveBy: "If it sounds insane, good. Sanity rarely changes history. Go until physics, not people, stop you.",
    links: {
      twitter: "https://x.com/KachiObata",
      linkedin: "https://www.linkedin.com/in/onyelukachukwu-obata",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Efegherimoni Oghenetejiri",
    role: "Media & Marketing Lead",
    image: "/team/core-team/efegherimoni-oghenetejiri.jpeg",
    wordsToLiveBy: "\u201cAnd we know that all things work together for good to them that love God, and to them who are the called according to his purpose.\u201d Romans\u202c \u202d8\u202c:\u202d28\u202c \u202d",
    links: {
      twitter: "https://x.com/q_teytey?s=11",
      linkedin: "https://www.linkedin.com/in/oghenetejiri-efegherimoni?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      portfolio: "https://Nil",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "SHAIBU, Omobolanle Oluwademiladeogo",
    role: "Community Manager",
    image: "/team/core-team/omobolanle-shaibu.jpeg",
    wordsToLiveBy: "The purpose of life is to experience",
    links: {
      twitter: "https://x.com/x.com/lanle_xoxoxo",
      linkedin: "https://www.linkedin.com/in/omobolanleshaibu",
      portfolio: "",
    },
    music: {
      name: "Wa",
      artist: "Asake",
      url: "https://open.spotify.com/embed/track/5KX0YeCNKaOc3XhhDHi3mI?utm_source=generator",
    },
  },
  {
    name: "Timilehin Adedayo",
    role: "Data and AI Track lead || Machine Learnimg Specialist",
    image: "/team/tracks/data-and-ai/timilehin-adedayo-lead.jpg",
    wordsToLiveBy: "Everything i can made me everything i am",
    links: {
      twitter: "https://x.com/kinariasu?s=11",
      linkedin: "https://www.linkedin.com/in/timilehin-adedayo-2697a431a/",
      portfolio: "https://www.timilehinadedayo.dev/",
    },
    music: {
      name: "Runaway",
      artist: "Kanye west",
      url: "https://open.spotify.com/embed/track/3DK6m7It6Pw857FcQftMds?utm_source=generator",
    },
  },
  {
    name: "Bolujo Daniel",
    role: "Quality Assurance Specialist",
    image: "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=BolujoDaniel",
    wordsToLiveBy: "The person who knows how will always have a job. The person who knows why will always be their boss.",
    links: {
      twitter: "",
      linkedin: "https://www.linkedin.com/in/dbolujo",
      portfolio: "",
    },
    music: {
      name: "AWKWARD FREESTYLE",
      artist: "Eem triplin",
      url: "https://open.spotify.com/embed/track/5covx4W77ZCuXI0ejgoZh0?utm_source=generator",
    },
  },
  {
    name: "Wosu-Ezi Kamdirichukwu Blossom",
    role: "Member",
    image: "/team/media-and-marketing/radar/wosu-ezi-kamdirichukwu-blossom.jpg",
    wordsToLiveBy: "Deo Floret Consilium",
    links: {
      twitter: "https://x.com/dfw_kamdy",
      linkedin: "https://www.linkedin.com/in/kamdirichukwu-wosu-ezi-850b15380utm_source=share_via&utm_content=profile&utm_medium=member_android",
      portfolio: "https://kamdyb.github.io/blossom-s-portfolio/",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Xavier Okpalannajiaku",
    role: "Member",
    image: "/team/media-and-marketing/graphics-design/xavier-okpalannajiaku.png",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Uchenna Akubuiro",
    role: "Lead",
    image: "/team/media-and-marketing/photography/uchenna-akubuiro-lead.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Victor Ibironke",
    role: "Member",
    image: "/team/core-team/victor-ibironke.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Offiog Ryan",
    role: "Lead",
    image: "/team/events-logistics/offiog-ryan-lead.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "David Obalabi",
    role: "Data Science Specialist",
    image: "/team/tracks/data-and-ai/david-obalabi.jpeg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Boluwatife Dada",
    role: "Member (Design & Management)",
    image: "/team/tracks/design-and-management/boluwatife-dada.png",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Oluwadayomisi Osisanya",
    role: "Lead (Design & Management)",
    image: "/team/tracks/design-and-management/oluwadayomisi-osisanya-lead.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Chidoziem Offor",
    role: "Data Science and Algorithms Specialist",
    image: "/team/tracks/software-development/chidoziem-offor.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
    },
  },
  {
    name: "Providence Oduok",
    role: "Front End Web Specialist",
    image: "/team/tracks/software-development/providence-oduok.jpg",
    wordsToLiveBy: "",
    links: {
      twitter: "",
      linkedin: "",
      portfolio: "",
    },
    music: {
      name: "Generic",
      artist: "Unknown",
      url: "https://open.spotify.com/embed/track/3n3Ppam7vgaBgKOUw2bJj?utm_source=generator",
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
  "Oluwatomilola Arogundade": { section: "tracks", subteam: "Infrastructure & Security", isLead: true },
  "Ifeoma Ezeka": { section: "tracks", subteam: "Data & AI" },
  "Itamah Osedebame Ehigie": { section: "media", subteam: "RADAR", isLead: true },
  "Atolagbe Precious Olawole": { section: "events" },
  "Braimah Olatilewa Eyituoyo Brymar": { section: "core" },
  "Adedoja Daniel Ademola": { section: "tracks", subteam: "Design & Management" },
  "Agunbiade Ayomide Obanijesu": { section: "media", subteam: "RADAR" },
  "Umaru Victor Oshioke": { section: "media", subteam: "Graphic Designers", isLead: true },
  "Bisong Best Ebu-Obasi": { section: "media", subteam: "Video Editors" },
  "Ademola Ademeso": { section: "dev", subteam: "Frontend", isLead: true },
  "Ojekemi Ayotomiwa": { section: "media", subteam: "Video Editors" },
  "Oseni David": { section: "events" },
  "Oghojafor Oghenemaro Esther.O": { section: "media", subteam: "RADAR" },
  "Azubuike Chimamanda Favour": { section: "core" },
  "Adeniran Oluwatamilore Janella": { section: "media", subteam: "RADAR" },
  "NELSON-NWANONEZE DAVID": { section: "events" },
  "NELSON-NWANONEZE SAMUEL": { section: "events" },
  "Harrison Tifeoluwanimi Dorcas": { section: "media", subteam: "RADAR" },
  "Favour Oluwatunmibi": { section: "core" },
  "Oyebajo Olaimide": { section: "media", subteam: "Video Editors" },
  "Otelaja Oluwajuwonlo Okikiola": { section: "tracks", subteam: "Infrastructure & Security" },
  "Ajagbe Olaoluwa": { section: "tracks", subteam: "Data & AI" },
  "Alabo Treasure Sowari": { section: "events" },
  "Emmanuel Ekundayo": { section: "tracks", subteam: "Infrastructure & Security" },
  "Oba odumeru": { section: "events" },
  "Balogun Eniola": { section: "tracks", subteam: "Software Development & Engineering" },
  "Akande Kehinde Gladys": { section: "events" },
  "Olubowale Oluwatunmininu Temitope": { section: "dev", subteam: "Project Management" },
  "Divine Athora": { section: "dev", subteam: "Product Design" },
  "Alabi Reuben": { section: "tracks", subteam: "Software Development & Engineering", isLead: true },
  "Ebosetaleh Andrea Andrew": { section: "media", subteam: "RADAR" },
  "Okon Onono Ene": { section: "tracks", subteam: "Data & AI" },
  "Akanni Temitope": { section: "events" },
  "Oluwafemi Temitope Olatunji": { section: "tracks", subteam: "Software Development & Engineering" },
  "Eromoigbe Agbonikpeya": { section: "tracks", subteam: "Software Development & Engineering" },
  "Praise Akenroye": { section: "tracks", subteam: "Infrastructure & Security" },
  "Iretomiwa Akande": { section: "events" },
  "Daniel Alexander Odulate": { section: "tracks", subteam: "Software Development & Engineering" },
  "Adefila Olutayo Esther": { section: "core" },
  "Nafarnda Marilyn": { section: "media", subteam: "Content Creators" },
  "Mokwunye Ogochukwu Asha": { section: "media", subteam: "Video Editors" },
  "Sophia Osariemen Odiase": { section: "core", isLead: true },
  "Lawal Sharon": { section: "core" },
  "Olugbesan Ayooluwakiitan Oluwatamilore": { section: "dev", subteam: "Backend", isLead: true },
  "Olamide Fatunase": { section: "media", subteam: "Video Editors", isLead: true },
  "Daniel Fagbohunlu": { section: "tracks", subteam: "Software Development & Engineering" },
  "Onyelukachukwu M. O. Obata": { section: "dev", subteam: "Project Management" },
  "Efegherimoni Oghenetejiri": { section: "core" },
  "SHAIBU, Omobolanle Oluwademiladeogo": { section: "core" },
  "Timilehin Adedayo": { section: "tracks", subteam: "Data & AI", isLead: true },
  "Bolujo Daniel": { section: "core" },
  "Wosu-Ezi Kamdirichukwu Blossom": { section: "media", subteam: "RADAR" },
  "Xavier Okpalannajiaku": { section: "media", subteam: "Graphic Designers" },
  "Uchenna Akubuiro": { section: "media", subteam: "Photographers", isLead: true },
  "Habeeb Abayomi": { section: "core" },
  "Chukwuneku Akpotohwo": { section: "core", isLead: true },
  "Victor Ibironke": { section: "core" },
  "Offiog Ryan": { section: "events", isLead: true },
  "David Obalabi": { section: "tracks", subteam: "Data & AI" },
  "Boluwatife Dada": { section: "tracks", subteam: "Design & Management" },
  "Oluwadayomisi Osisanya": { section: "tracks", subteam: "Design & Management", isLead: true },
  "Chidoziem Offor": { section: "tracks", subteam: "Software Development & Engineering" },
  "Providence Oduok": { section: "tracks", subteam: "Software Development & Engineering" },
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
