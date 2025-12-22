import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

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

export default function RadarPage() {
  const stories = getStories();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            📡 Radar
          </h1>
          <p className="text-xl text-muted-foreground">
            GDG Babcock&apos;s Official Newsletter
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto space-y-16">
          {stories.map((story, index) => (
            <article key={story.slug}>
              {/* Story number indicator */}
              <div className="text-6xl font-bold text-white mb-4 select-none text-center">
                {index + 1}
              </div>

              {/* Story card */}
              <div className="bg-card rounded-lg p-8 border border-border">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
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

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {story.title}
                </h2>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
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
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 my-4 text-muted-foreground italic">
                          {children}
                        </blockquote>
                      ),
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
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      hr: () => <hr className="border-border my-6" />,
                      code: ({ children }) => (
                        <code className="bg-background px-1.5 py-0.5 rounded text-sm text-primary">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {story.content}
                  </ReactMarkdown>
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
