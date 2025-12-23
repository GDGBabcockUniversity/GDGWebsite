import Image from "next/image";

// Custom SVG icons
import Instagram from "@/components/svgs/instagram";
import XTwitter from "@/components/svgs/x";
import Substack from "@/components/svgs/substack";
import Snapchat from "@/components/svgs/snapchat";
import Medium from "@/components/svgs/medium";
import Mail from "@/components/svgs/mail";

interface SocialLink {
  platform: "instagram" | "x" | "substack" | "snapchat" | "medium" | "email";
  handle: string;
  url: string;
}

interface TeamMember {
  name: string;
  displayName: string; // For the HTML tag style
  role: string;
  department: string;
  songObsession: string;
  favoriteColor: string;
  colorMeaning: string;
  favoriteBook: string;
  managePressure: string;
  socials: SocialLink[];
  photoFile: string | null; // null if missing
  signatureFile: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Itamah Osedebame",
    displayName: "Deba",
    role: "RADAR Team Lead",
    department: "Computer Science",
    songObsession: "D.T.M.M.B by Indi",
    favoriteColor: "Blue, Black and Brown",
    colorMeaning: "Younger me was interested in lots",
    favoriteBook: "Harry Potter by J.K Rowling",
    managePressure: "Music and sleep",
    socials: [
      { platform: "substack", handle: "@debaitamah", url: "https://substack.com/@debaitamah" },
    ],
    photoFile: "deba.jpeg",
    signatureFile: "deba-signature.jpeg",
  },
  {
    name: "Efegherimoni Oghenetejiri",
    displayName: "Tejiri",
    role: "Editor, GDG Babcock Media & Marketing Lead",
    department: "Software Engineering",
    songObsession: "ONLY WHAT GOD CAN GIVE by Sondae",
    favoriteColor: "Pink, Black and White",
    colorMeaning: "Pink is such a feminine and soft color; anytime I see it, I feel warmth. I saw a question somewhere that asked, 'Is black a color or just the absence of it?' and ever since then, I've been very intrigued by the color Black. And then white is just such a peaceful color.",
    favoriteBook: "Burn for Burn by Jenny Han and Siobhan Vivian",
    managePressure: "Honestly, I feel like I've become accustomed to it, but when it becomes more than I can handle, I blast some worship music and talk to God about it.",
    socials: [
      { platform: "instagram", handle: "@q_.teytey", url: "https://www.instagram.com/q_.teytey" },
      { platform: "x", handle: "@q_teytey", url: "https://x.com/q_teytey" },
    ],
    photoFile: "tejiri.jpeg",
    signatureFile: "tejiri-signature.jpeg",
  },
  {
    name: "Habeeb Muhammed",
    displayName: "Habeeb",
    role: "GDG Babcock Community Manager",
    department: "Computer Science",
    songObsession: "Can't Fake this by 255",
    favoriteColor: "White",
    colorMeaning: "Peace",
    favoriteBook: "Art of Seduction by Robert Greene",
    managePressure: "Sleep",
    socials: [
      { platform: "x", handle: "@ycent003", url: "https://x.com/ycent003" },
    ],
    photoFile: "habeeb.jpeg", // Missing - placeholder will be used
    signatureFile: "habeeb-signature.jpeg",
  },
  {
    name: "Dosunmu Hafeez",
    displayName: "Hafeez",
    role: "Writer",
    department: "Accounting",
    songObsession: "Sacrifice by Mariah The Scientist",
    favoriteColor: "Blue",
    colorMeaning: "The color to me means peace, calm and being in control",
    favoriteBook: "Nearly All The Men In Lagos Are Mad by Damilare Kuku",
    managePressure: "Sleep",
    socials: [
      { platform: "medium", handle: "@haffydos18", url: "https://medium.com/@haffydos18" },
      { platform: "x", handle: "@haf33zzz", url: "https://x.com/haf33zzz" },
    ],
    photoFile: "hafeez.jpeg", // Missing - placeholder will be used
    signatureFile: "hafeez-signature.jpeg",
  },
  {
    name: "Freda",
    displayName: "Freda",
    role: "Writer",
    department: "Information Technology",
    songObsession: "Davido's songs",
    favoriteColor: "Black, white and gold",
    colorMeaning: "They make me feel special, unique, and full of wisdom and self-worth",
    favoriteBook: "Anything comedic and/or tech-related",
    managePressure: "Being calm, relaxation techniques and music",
    socials: [
      { platform: "email", handle: "fredaosadolor@gmail.com", url: "mailto:fredaosadolor@gmail.com" },
      { platform: "instagram", handle: "@fr.eda4779", url: "https://www.instagram.com/fr.eda4779" },
    ],
    photoFile: "freda.jpeg", // Missing - placeholder will be used
    signatureFile: "freda-signature.jpeg",
  },
  {
    name: "Tayo Adefila",
    displayName: "Tayo",
    role: "Writer",
    department: "Computer Science",
    songObsession: "So Easy (To Fall In Love) by Olivia Dean",
    favoriteColor: "Every color",
    colorMeaning: "There's beauty in everything.",
    favoriteBook: "Pride and Prejudice",
    managePressure: "I do not",
    socials: [
      { platform: "substack", handle: "@tayoadefila", url: "https://substack.com/@tayoadefila" },
    ],
    photoFile: "tayo.jpeg", // Missing - placeholder will be used
    signatureFile: "tayo-signature.jpeg",
  },
  {
    name: "Agunbiade Ayomide",
    displayName: "Ayomide",
    role: "Writer",
    department: "Software Engineering",
    songObsession: "May I Have This Dance by Francis and the Lights",
    favoriteColor: "Gold",
    colorMeaning: "Always wanted to be the golden power ranger.",
    favoriteBook: "Darkest Minds by Alexandra Bracken",
    managePressure: "Music, Gaming and the Subtle Art of Not Giving a…",
    socials: [
      { platform: "substack", handle: "@18aesir", url: "https://substack.com/@18aesir" },
      { platform: "x", handle: "@iam_aesir", url: "https://x.com/iam_aesir" },
    ],
    photoFile: "ayomide.jpeg",
    signatureFile: "ayo-signature.jpeg",
  },
  {
    name: "Andrea Andy",
    displayName: "Andrea",
    role: "Writer",
    department: "Software Engineering",
    songObsession: "1sa l0t by Zayleveltn",
    favoriteColor: "Black",
    colorMeaning: "It is expressive. It literally screams to me. It's daring. It's safe.",
    favoriteBook: "How to sell to Nigerians by Akinola Alabi",
    managePressure: "Music and scrolling through tiktok.",
    socials: [
      { platform: "snapchat", handle: "@theandreaandy", url: "https://snapchat.com/t/JbWR1kwC" },
      { platform: "x", handle: "@talehAndrea", url: "https://x.com/talehandrea" },
      { platform: "substack", handle: "@talehandy", url: "https://substack.com/@talehandy" },
    ],
    photoFile: "andrea.jpeg",
    signatureFile: "andrea-signature.jpeg",
  },
];

function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  const iconClass = "w-4 h-4";
  switch (platform) {
    case "instagram":
      return <span style={{ color: "#E4405F" }}><Instagram className={iconClass} /></span>;
    case "x":
      return <span style={{ color: "#FFFFFF" }}><XTwitter className={iconClass} /></span>;
    case "substack":
      return <span style={{ color: "#FF6719" }}><Substack className={iconClass} /></span>;
    case "snapchat":
      return <span style={{ color: "#FFFC00" }}><Snapchat className={iconClass} /></span>;
    case "medium":
      return <span style={{ color: "#FFFFFF" }}><Medium className={iconClass} /></span>;
    case "email":
      return <Mail className="w-5 h-5" />;
    default:
      return null;
  }
}

function PolaroidCard({ member }: { member: TeamMember }) {
  const imagePath = `/radar/images/meet-the-team/${member.photoFile}`;
  const signaturePath = `/radar/images/meet-the-team/${member.signatureFile}`;
  const hasPhoto = member.photoFile !== null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Polaroid Frame */}
      <div className="flex-shrink-0 mx-auto lg:mx-0 self-start">
        <div 
          className="p-3 pb-4 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300 w-fit"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          {/* Photo */}
          <div className="w-48 h-48 relative overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
            {hasPhoto ? (
              <Image
                src={imagePath}
                alt={member.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
                📷
              </div>
            )}
          </div>
          
          {/* Name tag and signature area */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <span 
              className="text-lg font-bold"
              style={{ 
                color: "#E91E8C",
                fontFamily: "cursive",
              }}
            >
              &lt;/{member.displayName}&gt;
            </span>
            {/* Signature - 3:1 aspect ratio */}
            <div className="w-20 h-7 relative flex-shrink-0">
              <Image
                src={signaturePath}
                alt={`${member.displayName}'s signature`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <p className="text-primary font-medium">{member.role}</p>
          <p className="text-muted-foreground text-sm">{member.department}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            <span className="text-white">🎵 Song obsession:</span> {member.songObsession}
          </p>
          <p className="text-muted-foreground">
            <span className="text-white">🎨 Favorite color:</span> {member.favoriteColor}
          </p>
          <p className="text-muted-foreground italic text-xs">
            &ldquo;{member.colorMeaning}&rdquo;
          </p>
          <p className="text-muted-foreground">
            <span className="text-white">📚 Favorite book:</span> {member.favoriteBook}
          </p>
          <p className="text-muted-foreground">
            <span className="text-white">💪 Managing pressure:</span> {member.managePressure}
          </p>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {member.socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm"
            >
              <SocialIcon platform={social.platform} />
              <span>{social.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MeetTheTeam() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Behind every word, line of statement and piece, there&apos;s a voice — a person.
        </p>
        <p>
          This season, as we slow down for Christmas and look ahead to a new year, we wanted to introduce you to the people who make up our creative writing community beyond screens, submissions, and stand-ups.
        </p>
        <p>
          A team of thinkers, dreamers, music lovers, night sleepers (or chronic sleepers), and individuals navigating school, life, and growth in their own way.
        </p>
        <p>
          This is us — unfiltered, human, and learning as we go.
        </p>
        <p className="text-white font-semibold">
          Welcome to the faces behind RADAR.
        </p>
      </div>

      {/* Team Grid */}
      <div className="space-y-12 pt-4">
        {teamMembers.map((member, index) => (
          <div key={member.displayName}>
            <PolaroidCard member={member} />
            {index < teamMembers.length - 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gdg-blue"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gdg-red"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gdg-yellow"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gdg-green"></span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Outro */}
      <div className="space-y-4 text-muted-foreground leading-relaxed pt-8">
        <p>
          And that&apos;s our team — different tastes, different stories, different coping mechanisms, but one shared journey.
        </p>
        <p>
          What stands out isn&apos;t just what we study or what we build, but <span className="text-white font-semibold">who we are while doing it</span>.
        </p>
        <p>
          We manage pressure differently. We find meaning in different things. We recharge in our own ways.
        </p>
        <p>
          And yet, we come together as a community driven by curiosity, growth, and the desire to build something meaningful and we hope that you enjoy this RADAR issue as much as we do!
        </p>
      </div>
    </div>
  );
}

