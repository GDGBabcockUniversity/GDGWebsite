import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTrack, COMMUNITY_WHATSAPP_URL } from "@/lib/tracks";

// ─── Config ────────────────────────────────────────────────────────────────

// Lazy-init Resend to avoid build-time crash when RESEND_API_KEY is not set
let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const FROM_EMAIL =
  process.env.WELCOME_EMAIL_FROM || "GDG Babcock <onboarding@resend.dev>";

// WhatsApp links come from lib/tracks.ts — the single source of truth shared
// with the site's onboarding/profile. Returns undefined for unknown/unset links.
function trackWhatsappLink(track?: string): string | undefined {
  const url = getTrack(track)?.whatsappUrl;
  return url && url !== "#" ? url : undefined;
}

const GENERAL_WHATSAPP_LINK: string | undefined =
  COMMUNITY_WHATSAPP_URL.startsWith("http") ? COMMUNITY_WHATSAPP_URL : undefined;

// ─── Email template ────────────────────────────────────────────────────────

function buildWelcomeEmail({
  name,
  primaryTrack,
  secondaryTrack,
}: {
  name: string;
  primaryTrack?: string;
  secondaryTrack?: string;
}) {
  const firstName = name.split(" ")[0];

  // Build track-specific WhatsApp links section
  const trackLinks: string[] = [];
  const primaryLink = trackWhatsappLink(primaryTrack);
  if (primaryTrack && primaryLink) {
    trackLinks.push(
      `<a href="${primaryLink}" style="display:inline-block;padding:12px 24px;background-color:#1a73e8;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;margin:4px 0;">📱 Join ${primaryTrack} Group</a>`
    );
  }
  const secondaryLink = trackWhatsappLink(secondaryTrack);
  if (secondaryTrack && secondaryTrack !== primaryTrack && secondaryLink) {
    trackLinks.push(
      `<a href="${secondaryLink}" style="display:inline-block;padding:12px 24px;background-color:#34a853;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;margin:4px 0;">📱 Join ${secondaryTrack} Group</a>`
    );
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4285F4,#34A853,#FBBC04,#EA4335);padding:3px;border-radius:16px;">
      <div style="background:#ffffff;border-radius:14px;padding:40px 32px;text-align:center;">
        <div style="margin-bottom:24px;">
          <span style="font-size:48px;">🎉</span>
        </div>
        <h1 style="font-size:28px;font-weight:800;color:#1a1a1a;margin:0 0 8px;">
          Welcome to GDG Babcock!
        </h1>
        <p style="font-size:16px;color:#5f6368;margin:0;">
          Hey ${firstName}, you're officially part of the community
        </p>
      </div>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;border-radius:16px;padding:32px;margin-top:16px;">
      <h2 style="font-size:20px;color:#1a1a1a;margin:0 0 16px;">What's next?</h2>
      
      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:flex-start;margin-bottom:16px;">
          <span style="background:#e8f0fe;color:#1a73e8;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;margin-right:12px;line-height:28px;text-align:center;">1</span>
          <div>
            <strong style="color:#1a1a1a;">Join the WhatsApp groups</strong>
            <p style="color:#5f6368;margin:4px 0 0;font-size:14px;">Connect with fellow members in your track and the general community.</p>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;margin-bottom:16px;">
          <span style="background:#e6f4ea;color:#34a853;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;margin-right:12px;line-height:28px;text-align:center;">2</span>
          <div>
            <strong style="color:#1a1a1a;">Attend events & workshops</strong>
            <p style="color:#5f6368;margin:4px 0 0;font-size:14px;">We host regular sessions on development, AI, security, and design.</p>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;margin-bottom:16px;">
          <span style="background:#fef7e0;color:#f9ab00;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;margin-right:12px;line-height:28px;text-align:center;">3</span>
          <div>
            <strong style="color:#1a1a1a;">Build & collaborate</strong>
            <p style="color:#5f6368;margin:4px 0 0;font-size:14px;">Work on projects, contribute to open source, and grow your skills.</p>
          </div>
        </div>
      </div>

      <!-- WhatsApp Links -->
      <div style="background:#f8f9fa;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
        <h3 style="font-size:16px;color:#1a1a1a;margin:0 0 16px;">Join Your WhatsApp Groups</h3>
        
        ${GENERAL_WHATSAPP_LINK ? `<div style="margin-bottom:12px;">
          <a href="${GENERAL_WHATSAPP_LINK}" style="display:inline-block;padding:12px 24px;background-color:#25D366;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">📱 GDG Babcock Community</a>
        </div>` : ""}

        ${trackLinks.length > 0 ? `<div style="margin-top:8px;">${trackLinks.join("\n        ")}</div>` : ""}
      </div>

      <!-- Profile Link -->
      <div style="text-align:center;">
        <a href="https://gdgbabcock.com/profile" style="display:inline-block;padding:14px 32px;background-color:#1a1a1a;color:#ffffff;text-decoration:none;border-radius:50px;font-weight:600;">
          View Your Profile →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0;color:#9aa0a6;font-size:12px;">
      <p style="margin:0 0 8px;">Google Developer Groups on Campus — Babcock University</p>
      <p style="margin:0;">
        <a href="https://gdgbabcock.com" style="color:#1a73e8;text-decoration:none;">gdgbabcock.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── API handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // Validate API key is configured
    const resend = getResend();
    if (!resend) {
      console.warn("RESEND_API_KEY not set — skipping welcome email");
      return NextResponse.json(
        { message: "Email service not configured" },
        { status: 200 }
      );
    }

    const body = await req.json();
    const { name, email, primaryTrack, secondaryTrack } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "name and email are required" },
        { status: 400 }
      );
    }

    const html = buildWelcomeEmail({ name, primaryTrack, secondaryTrack });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to GDG Babcock! 🎉",
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("Welcome email error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
