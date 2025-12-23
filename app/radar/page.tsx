import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Link as LinkIcon } from "lucide-react";

// Custom SVG icons
import Instagram from "@/components/svgs/instagram";
import XTwitter from "@/components/svgs/x";
import Substack from "@/components/svgs/substack";
import Snapchat from "@/components/svgs/snapchat";
import Medium from "@/components/svgs/medium";
import Mail from "@/components/svgs/mail";
import ShareButton from "@/components/share-button";
import MeetTheTeam from "@/components/meet-the-team";

// GDG colors for rotating through elements
const gdgColors = ["#4285F4", "#EA4335", "#FAAB00", "#34A853"];

// Get icon for social links based on URL with brand colors
function getSocialIcon(href: string) {
  if (href.includes("instagram.com"))
    return (
      <span style={{ color: "#E4405F" }}>
        <Instagram className="w-4 h-4" />
      </span>
    );
  if (href.includes("x.com") || href.includes("twitter.com"))
    return (
      <span style={{ color: "#FFFFFF" }}>
        <XTwitter className="w-4 h-4" />
      </span>
    );
  if (href.includes("substack.com"))
    return (
      <span style={{ color: "#FF6719" }}>
        <Substack className="w-4 h-4" />
      </span>
    );
  if (href.includes("snapchat.com"))
    return (
      <span style={{ color: "#FFFC00" }}>
        <Snapchat className="w-4 h-4" />
      </span>
    );
  if (href.includes("medium.com"))
    return (
      <span style={{ color: "#FFFFFF" }}>
        <Medium className="w-4 h-4" />
      </span>
    );
  if (href.startsWith("mailto:")) return <Mail className="w-5 h-5" />;
  return <LinkIcon className="w-4 h-4" />;
}

// Extract handle from link text like "Instagram: @username" or just show icon
function extractHandle(text: string): string {
  const match = text.match(/@[\w._-]+/);
  return match ? match[0] : "";
}

// Format date to short format like "Dec 24, 2025"
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Order mapping for word-named files
const orderMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
};

interface Story {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  order: number;
}

function getStories(): Story[] {
  const radarDir = path.join(process.cwd(), "content", "radar");
  const files = fs.readdirSync(radarDir).filter((f) => f.endsWith(".md"));

  const stories = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(radarDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      author: data.author || "Anonymous",
      content,
      order: orderMap[slug] ?? 999,
    };
  });

  // Sort by order
  return stories.sort((a, b) => a.order - b.order);
}

// Track blockquote index for color rotation
let blockquoteIndex = 0;

export default function RadarPage() {
  const stories = getStories();
  // Reset blockquote index on each render
  blockquoteIndex = 0;

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Christmas decorations - subtle floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Left side decorations */}
        <div className="absolute top-[5%] left-[3%] text-2xl opacity-20 animate-pulse">
          ❄
        </div>
        <div
          className="absolute top-[12%] left-[8%] text-lg opacity-15 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute top-[20%] left-[2%] text-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1.2s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[28%] left-[6%] text-2xl opacity-15 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          🎄
        </div>
        <div
          className="absolute top-[38%] left-[4%] text-lg opacity-20 animate-pulse"
          style={{ animationDelay: "0.8s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[48%] left-[7%] text-xl opacity-15 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          ⭐
        </div>
        <div
          className="absolute top-[58%] left-[3%] text-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "2.3s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[68%] left-[5%] text-lg opacity-15 animate-pulse"
          style={{ animationDelay: "0.3s" }}
        >
          🎁
        </div>
        <div
          className="absolute top-[78%] left-[8%] text-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1.8s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[88%] left-[4%] text-2xl opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>

        {/* Right side decorations */}
        <div
          className="absolute top-[8%] right-[4%] text-xl opacity-15 animate-pulse"
          style={{ animationDelay: "1.3s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[15%] right-[7%] text-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "0.7s" }}
        >
          ⭐
        </div>
        <div
          className="absolute top-[25%] right-[3%] text-lg opacity-15 animate-pulse"
          style={{ animationDelay: "2.1s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[33%] right-[6%] text-xl opacity-20 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        >
          🎄
        </div>
        <div
          className="absolute top-[43%] right-[4%] text-2xl opacity-15 animate-pulse"
          style={{ animationDelay: "1.6s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[53%] right-[8%] text-lg opacity-20 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute top-[63%] right-[3%] text-xl opacity-15 animate-pulse"
          style={{ animationDelay: "0.9s" }}
        >
          🎁
        </div>
        <div
          className="absolute top-[73%] right-[6%] text-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "1.1s" }}
        >
          ❄
        </div>
        <div
          className="absolute top-[83%] right-[5%] text-lg opacity-15 animate-pulse"
          style={{ animationDelay: "2.2s" }}
        >
          ⭐
        </div>
        <div
          className="absolute top-[93%] right-[7%] text-xl opacity-20 animate-pulse"
          style={{ animationDelay: "0.6s" }}
        >
          ❄
        </div>

        {/* Additional scattered elements */}
        <div
          className="absolute top-[18%] left-[15%] text-lg opacity-10 animate-pulse"
          style={{ animationDelay: "1.4s" }}
        >
          🔔
        </div>
        <div
          className="absolute top-[35%] right-[12%] text-xl opacity-10 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        >
          🎅
        </div>
        <div
          className="absolute top-[55%] left-[18%] text-lg opacity-10 animate-pulse"
          style={{ animationDelay: "2.4s" }}
        >
          🦌
        </div>
        <div
          className="absolute top-[75%] right-[15%] text-xl opacity-10 animate-pulse"
          style={{ animationDelay: "1.7s" }}
        >
          🍪
        </div>
      </div>

      {/* Header */}
      <section className="pt-28 pb-16 px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-2">
            <span className="text-3xl">📡</span>
            <span>
              <span style={{ color: "#EA4335" }}>R</span>
              <span style={{ color: "#FAAB00" }}>A</span>
              <span style={{ color: "#34A853" }}>D</span>
              <span style={{ color: "#4285F4" }}>A</span>
              <span style={{ color: "#EA4335" }}>R</span>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            GDG Babcock&apos;s Official Newsletter • 🎄 Christmas Edition
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="pb-20 px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-16">
          {stories.map((story, index) => (
            <article key={story.slug} id={story.slug} className="scroll-mt-24">
              {/* Story number indicator */}
              <div className="text-6xl font-bold text-white mb-4 select-none text-center">
                {index + 1}
              </div>

              {/* Story card */}
              <div
                className="rounded-lg p-8 border border-border"
                style={{ backgroundColor: "#242424" }}
              >
                {/* Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-primary font-medium">
                      {story.author}
                    </span>
                    {story.date && (
                      <>
                        <span>•</span>
                        <span>{formatDate(story.date)}</span>
                      </>
                    )}
                  </div>
                  <ShareButton sectionId={story.slug} />
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {story.title}
                </h2>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  {story.slug === "two" ? (
                    <MeetTheTeam />
                  ) : (
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold text-white mt-8 mb-4">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-bold text-white mt-6 mb-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold text-white mt-5 mb-2">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-muted-foreground italic">
                            {children}
                          </em>
                        ),
                        blockquote: ({ children }) => {
                          const color =
                            gdgColors[blockquoteIndex % gdgColors.length];
                          blockquoteIndex++;
                          return (
                            <blockquote
                              className="border-l-4 pl-4 my-4 text-muted-foreground italic"
                              style={{ borderColor: color }}
                            >
                              {children}
                            </blockquote>
                          );
                        },
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-muted-foreground">{children}</li>
                        ),
                        a: ({ href, children }) => {
                          const text = String(children);
                          const isSocialLink =
                            href &&
                            (href.includes("instagram.com") ||
                              href.includes("x.com") ||
                              href.includes("twitter.com") ||
                              href.includes("substack.com") ||
                              href.includes("snapchat.com") ||
                              href.includes("medium.com"));
                          const isEmailLink = href?.startsWith("mailto:");

                          if (isSocialLink && href) {
                            const handle = extractHandle(text);
                            return (
                              <a
                                href={href}
                                className="inline-flex items-center gap-1.5 text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {getSocialIcon(href)}
                                {handle && <span>{handle}</span>}
                              </a>
                            );
                          }

                          if (isEmailLink && href) {
                            const email = href.replace("mailto:", "");
                            return (
                              <a
                                href={href}
                                className="inline-flex items-center gap-1.5 text-primary hover:underline"
                              >
                                {getSocialIcon(href)}
                                <span>{email}</span>
                              </a>
                            );
                          }

                          return (
                            <a
                              href={href}
                              className="text-primary hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          );
                        },
                        hr: () => <hr className="border-border my-6" />,
                        code: ({ children }) => (
                          <code className="bg-background px-1.5 py-0.5 rounded text-sm text-primary">
                            {children}
                          </code>
                        ),
                        img: ({ src, alt }) => (
                          <figure className="my-6">
                            <img
                              src={src}
                              alt={alt || ""}
                              className="rounded-lg w-full max-w-md mx-auto"
                            />
                            {alt && (
                              <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                                {alt}
                              </figcaption>
                            )}
                          </figure>
                        ),
                      }}
                    >
                      {story.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>

              {/* Divider between stories */}
              {index < stories.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-gdg-blue"></span>
                    <span className="w-2 h-2 rounded-full bg-gdg-red"></span>
                    <span className="w-2 h-2 rounded-full bg-gdg-yellow"></span>
                    <span className="w-2 h-2 rounded-full bg-gdg-green"></span>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
