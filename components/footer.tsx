import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/content/site";
import { PROGRAMS } from "@/lib/content/programs";
import { COMMUNITY_WHATSAPP_URL } from "@/lib/tracks";
import Instagram from "@/components/svgs/instagram";
import XformerlyTwitter from "@/components/svgs/x";
import LinkedIn from "@/components/svgs/linkedin";
import WhatsApp from "@/components/svgs/whatsapp";

const CONNECT_LINKS = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: Instagram },
  { label: "X (Twitter)", href: SOCIAL_LINKS.x, Icon: XformerlyTwitter },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: LinkedIn },
  {
    label: "WhatsApp Community",
    href: COMMUNITY_WHATSAPP_URL,
    Icon: WhatsApp,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b]">
      {/* Google 4-color stripe */}
      <div className="flex h-1" aria-hidden>
        <div className="flex-1 bg-gdg-blue" />
        <div className="flex-1 bg-gdg-red" />
        <div className="flex-1 bg-gdg-yellow" />
        <div className="flex-1 bg-gdg-green" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/gdg-logo.svg"
              alt="GDG Babcock"
              width={160}
              height={36}
              className="h-8 w-auto"
            />
            <p className="mt-4 text-sm font-bold text-gdg-cream">GDG Babcock</p>
            <p className="mt-1 text-sm leading-relaxed text-white/50">
              Google Developer Group
              <br />
              Babcock University
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gdg-yellow">
              Explore
            </p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gdg-green">
              Programs
            </p>
            <ul className="mt-4 space-y-3">
              {PROGRAMS.map((program) => (
                <li key={program.name}>
                  {program.href ? (
                    <a
                      href={program.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {program.name}
                    </a>
                  ) : (
                    <Link
                      href="/#events"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {program.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gdg-blue">
              Connect
            </p>
            <ul className="mt-4 space-y-3">
              {CONNECT_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2026 GDG Babcock. Built by students, for students.
          </p>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-gdg-blue transition-colors hover:text-white"
          >
            @gdgbabcock
          </a>
        </div>
      </div>
    </footer>
  );
}
