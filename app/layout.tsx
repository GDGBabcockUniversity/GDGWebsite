import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDG Babcock - Google Developer Groups at Babcock University",
  description:
    "Join Babcock University's premier tech community. Building the future, one line of code at a time.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        > */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
