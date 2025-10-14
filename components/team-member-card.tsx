"use client";

import { Twitter, Linkedin, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamMemberCardProps {
  name: string;
  role: string;
  wordsToLiveBy: string;
  image: string;
  music: {
    name: string;
    artist: string;
    url: string;
  };
  links: {
    twitter: string;
    linkedin: string;
    portfolio: string;
  };
}

export default function TeamMemberCard({
  name,
  role,
  wordsToLiveBy,
  links,
  music,
  image,
}: TeamMemberCardProps) {
  return (
    <div>
      <div className="bg-black rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-2xl">
        {/* Spotify Header */}
        {music.name && music.artist && (
          <div className="px-4 pt-4 pb-2 flex items-center gap-3">
            <svg
              className="w-10 h-10 text-green-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <div className="flex items-start flex-col gap-1">
              <p className="text-white text-sm font-medium">{music.name}</p>
              <p className="text-gray-300 text-xs">{music.artist}</p>
            </div>
          </div>
        )}

        {/* Main Photo with Overlay */}
        <div className="relative p-2">
          <div className="aspect-square rounded-2xl overflow-hidden relative">
            <Image
              src={image}
              alt={name}
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />

            {/* Social Media Overlay Buttons */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {links.twitter && (
                <Link href={links.twitter}>
                  <button className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-300 shadow-lg">
                    <svg
                      className="w-5 h-5 text-black"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                </Link>
              )}
              {links.linkedin && (
                <Link href={links.linkedin}>
                  <button className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-300 shadow-lg">
                    <Linkedin className="w-5 h-5 text-black" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Role and Motto */}
      </div>

      <div className="mt-2">
        <h3 className="text-black text-lg md:text-xl font-semibold mb-1">
          {name}
        </h3>
        <h3 className="text-muted-foreground text-lg font-medium mb-1">
          {role}
        </h3>
        <p className="text-muted-foreground text-sm italic">{wordsToLiveBy}</p>
      </div>
    </div>
  );
}
