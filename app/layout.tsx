import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GDG Babcock - Google Developer Group at Babcock University",
  description: "Join Babcock University's premier tech community. Building the future, one line of code at a time.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'Google Sans';
              src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GoogleSans-Regular-RKGUTnHEVLBElFc6EZJmFYqNp1q9gr.ttf') format('truetype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Google Sans';
              src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%20GoogleSans-Medium-LPbJxRd8Xoa9mqZf3ztmld6T4BAQHs.ttf') format('truetype');
              font-weight: 500;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Google Sans';
              src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%20GoogleSans-Bold-bqPy2pgqOvmzSbSdeSaGbfMM81aUUG.ttf') format('truetype');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Google Sans';
              src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GoogleSans-Italic-b7REiD45ELVLcjunUkdBshoi3eMUP1.ttf') format('truetype');
              font-weight: 400;
              font-style: italic;
              font-display: swap;
            }
            @font-face {
              font-family: 'Google Sans';
              src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%20GoogleSans-MediumItalic-rJJY9XIUn9pDgYFbWsLZDTqqycGz1D.ttf') format('truetype');
              font-weight: 500;
              font-style: italic;
              font-display: swap;
            }
            @font-face {
              font-family: 'Google Sans';
              src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%20GoogleSans-BoldItalic-xa4j6XhXEnJC3nmNViCduLicmifT8b.ttf') format('truetype');
              font-weight: 700;
              font-style: italic;
              font-display: swap;
            }
            :root {
              --font-google-sans: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
          `,
          }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-google-sans)" }}>{children}</body>
    </html>
  )
}
