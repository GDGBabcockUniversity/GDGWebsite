import type { Metadata } from "next";
import UnsubscribeConfirm from "@/components/unsubscribe-confirm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving emails from GDG Babcock.",
  // A one-off link from an email, tied to a single recipient's token.
  robots: { index: false, follow: false },
};

// The token rides in the path rather than the query string because an ESP's
// click tracking rewrites the link and can drop the query string with it,
// leaving the reader here with nothing to identify their subscription.
// /unsubscribe?token=... still works for links already sitting in inboxes.
export default function UnsubscribeTokenPage({
  params,
}: {
  params: { token?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6 pb-20 pt-36">
      <UnsubscribeConfirm token={decodeURIComponent(params.token ?? "")} />
    </main>
  );
}
