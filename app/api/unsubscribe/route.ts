import { NextRequest, NextResponse } from "next/server";

// The unsubscribe link in an email points at this site, but the opt-out itself
// is recorded by the email service. Proxying it here keeps that service's URL
// off the client and avoids needing CORS on it.
export async function POST(req: NextRequest) {
  const emailServiceUrl = process.env.EMAIL_SERVICE_URL;
  if (!emailServiceUrl) {
    console.warn("EMAIL_SERVICE_URL not set — cannot record unsubscribe");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const token = body?.token;
  if (typeof token !== "string" || !token.trim()) {
    return NextResponse.json({ error: "token is required" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL("/api/unsubscribe", emailServiceUrl);
  } catch {
    console.error("EMAIL_SERVICE_URL is not a valid URL");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 },
    );
  }
  target.searchParams.set("token", token.trim());

  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // An unknown or spent token is the one failure worth reporting verbatim;
    // anything else is ours to own, not the reader's to decipher.
    if (response.status === 404 || response.status === 400) {
      return NextResponse.json(
        { error: "This unsubscribe link is no longer valid" },
        { status: 404 },
      );
    }

    console.error("Unsubscribe failed upstream:", response.status);
    return NextResponse.json(
      { error: "Could not record the unsubscribe just now" },
      { status: 502 },
    );
  } catch (err) {
    console.error("Unsubscribe request failed:", err);
    return NextResponse.json(
      { error: "Could not reach the email service" },
      { status: 502 },
    );
  }
}
