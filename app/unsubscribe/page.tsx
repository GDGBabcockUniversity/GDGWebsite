import type { Metadata } from "next";
import UnsubscribeConfirm from "@/components/unsubscribe-confirm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving emails from GDG Babcock.",
  // A one-off link from an email, tied to a single recipient's token.
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { token?: string | string[] };
}) {
  const token = Array.isArray(searchParams.token)
    ? searchParams.token[0]
    : searchParams.token;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6 pb-20 pt-36">
      <UnsubscribeConfirm token={token ?? ""} />
    </main>
  );
}
