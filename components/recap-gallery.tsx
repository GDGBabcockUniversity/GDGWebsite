"use client";

import Image from "next/image";

interface EventGallery {
  eventName: string;
  images: string[];
}

const eventGalleries: EventGallery[] = [
  {
    eventName: "Info Session",
    images: ["info-session-1.jpeg", "info-session-2.jpeg"],
  },
  {
    eventName: "The DNA of Data",
    images: ["dna-of-data-1.jpeg", "dna-of-data-2.jpeg", "dna-of-data-3.jpeg"],
  },
  {
    eventName: "Monthly Meetup",
    images: ["monthly-meetup-1.jpeg", "monthly-meetup-2.jpeg"],
  },
  {
    eventName: "KAGAN",
    images: ["kagan.jpeg"],
  },
  {
    eventName: "Allstars NG",
    images: ["all-stars-1.jpeg", "all-stars-2.jpeg", "all-stars-3.jpeg"],
  },
  {
    eventName: "DevFest Lagos",
    images: ["devfest-1.jpeg", "devfest-2.jpeg", "devfest-3.jpeg"],
  },
];

// Different grid layouts based on number of images
function ImageGrid({ images, eventName }: { images: string[]; eventName: string }) {
  const basePath = "/radar/images/recap";

  if (images.length === 1) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={`${basePath}/${images[0]}`}
            alt={`${eventName} photo`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {images.map((img, idx) => (
          <div
            key={img}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
              idx === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
            } hover:rotate-0 transition-transform duration-300`}
          >
            <Image
              src={`${basePath}/${img}`}
              alt={`${eventName} photo ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="space-y-3">
        {/* First image - large on top */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
          <Image
            src={`${basePath}/${images[0]}`}
            alt={`${eventName} photo 1`}
            fill
            className="object-cover"
          />
        </div>
        {/* Two images below */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
            <Image
              src={`${basePath}/${images[1]}`}
              alt={`${eventName} photo 2`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden rotate-[1deg] hover:rotate-0 transition-transform duration-300">
            <Image
              src={`${basePath}/${images[2]}`}
              alt={`${eventName} photo 3`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // Fallback for 4+ images
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((img, idx) => (
        <div
          key={img}
          className={`relative aspect-square rounded-lg overflow-hidden ${
            idx % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
          } hover:rotate-0 transition-transform duration-300`}
        >
          <Image
            src={`${basePath}/${img}`}
            alt={`${eventName} photo ${idx + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// Get gallery for a specific event
export function getEventGallery(eventName: string): EventGallery | undefined {
  return eventGalleries.find(
    (g) => g.eventName.toLowerCase() === eventName.toLowerCase()
  );
}

// Component to render a gallery inline
export function EventGalleryBlock({ eventName }: { eventName: string }) {
  const gallery = getEventGallery(eventName);
  if (!gallery) return null;

  return (
    <div className="my-6">
      <ImageGrid images={gallery.images} eventName={gallery.eventName} />
    </div>
  );
}

// Full recap section component
export default function RecapGallery() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Alright, you have arrived at one of the many highlights of this newsletter, the recap!
        </p>
        <p>
          Through this section, you can relive some of your favorite moments or have a taste of the fun you might have missed out on. (Don&apos;t worry, we&apos;re involving you).
        </p>
        <p className="text-white font-semibold">
          Okay, let&apos;s get right into it!
        </p>
      </div>

      {/* Hacktoberfest */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Hacktoberfest</h3>
        <p className="text-muted-foreground leading-relaxed">
          The semester kicked off with our own spin on <strong className="text-white">Hacktoberfest</strong>, an open call for all GDG Babcock members to contribute to open-source projects, track their progress on a leaderboard and then get recognized.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          It ran through the month of October (I mean, duh) and it&apos;s safe to say that everyone pulled up with some of their best work. There were also two sessions that held on the first two days of the event, as a primer on what to do and expect from the program. The topics spoken on were open source contributions, what Hacktoberfest is, how to get involved, the methods to source for projects and a rundown on how exactly to contribute.
        </p>
      </div>

      {/* Info Session */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Info Session (October 5th)</h3>
        <p className="text-muted-foreground leading-relaxed">
          The info session followed right after on the 5th of October, where we came together for insights into the semester, along with the plans and goals our able organizers had in mind (Someone give a cheer for our organizers.)
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The new and shiny <strong className="text-white">four-track structure</strong> was also introduced at the session, namely:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Software Development and Engineering</li>
          <li>Infrastructure and Security</li>
          <li>Data & AI</li>
          <li>Design & Management</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          Each of the four mentioned have a lead, who all gave a description of the track they headed and in turn, introduced their specialists.
        </p>
        <EventGalleryBlock eventName="Info Session" />
      </div>

      {/* DNA of Data */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">The DNA of Data (October 19th)</h3>
        <p className="text-muted-foreground leading-relaxed">
          Soon after, the Data & AI track held <strong className="text-white">&apos;The DNA of Data: Understanding How Data Powers Intelligence&apos;</strong> - an event that sought to teach and explain how data works, and how it fuels the next big innovations. The speakers were our Data Engineering, Data Science, Data Analytics and Machine Learning specialists, respectively. It held on the 19th of October and delivered on everything it promised and more.
        </p>
        <EventGalleryBlock eventName="The DNA of Data" />
      </div>

      {/* Monthly Meetup */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Monthly Meetup (November 2nd)</h3>
        <p className="text-muted-foreground leading-relaxed">
          On the 2nd of November we held our monthly meetup, a way for us to just take a break from the academic grind. It featured a very interesting interactive quiz and debate session, giveaways, a showcase of the projects that were built during Hacktoberfest, and rewards for the top contributors and of course, refreshments.
        </p>
        <EventGalleryBlock eventName="Monthly Meetup" />
      </div>

      {/* Track Intros & KAGAN */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Track Intros & KAGAN (November 9th)</h3>
        <p className="text-muted-foreground leading-relaxed">
          Following right after on the 9th, the Software Development and Design & Management tracks held events to introduce their newly joined members to the inner workings of their respective tracks.
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li><strong className="text-white">Software Development Track:</strong> Frontend Web, Mobile Development, QA, Backend Systems, and Data Structures & Algorithms.</li>
          <li><strong className="text-white">Design & Management Track:</strong> Product Design, 2D Animation, Product Management, and Games & Interactive Media.</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          On the same day, we hosted the much anticipated <strong className="text-white">X space with KAGAN</strong> (Yes, the one and only!), who spoke on the topic <em>&apos;From Idea to Impact: Building Brands and Products That Actually Matter&apos;</em>. Questions were answered, doubts were resolved, amazing insights were shared, and all who attended were both challenged and motivated.
        </p>
        <EventGalleryBlock eventName="KAGAN" />
      </div>

      {/* Allstars NG */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Campus Meetup with Allstars NG (November 16th)</h3>
        <p className="text-muted-foreground leading-relaxed">
          One of the highlights was the Campus Meetup, held in partnership with the <strong className="text-white">Allstars NG</strong> team on the 16th of November. Our host was none other than the Regional Manager, Tonbra – a web3 marketer who made it his mission to make crypto education accessible to everyone. Several clips came out of the event and the timeline was buzzing. The Allstars team has since closed up that chapter and moved on to other things, but their impact remains indelible.
        </p>
        <EventGalleryBlock eventName="Allstars NG" />
      </div>

      {/* DevFest Lagos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">DevFest Lagos</h3>
        <p className="text-muted-foreground leading-relaxed">
          Woohoo, it&apos;s coming to an end! Oh no, it&apos;s coming to an end.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Pick whatever works for you, but to sunset this particular recap is our presence at <strong className="text-white">DevFest Lagos!</strong> (yes, we were there). Don&apos;t have to tell you that the energy was infectious, and it was an absolute blast.
        </p>
        <EventGalleryBlock eventName="DevFest Lagos" />
      </div>

      {/* Outro */}
      <div className="space-y-4 text-muted-foreground leading-relaxed pt-4">
        <p>
          You can tell we&apos;ve had a very eventful semester and honestly we&apos;re only just getting started, so stick with us because next year, <strong className="text-white">GDG Babcock</strong> is bringing bigger, better things to you.
        </p>
        <p className="text-white font-semibold">
          Till then!
        </p>
      </div>
    </div>
  );
}

