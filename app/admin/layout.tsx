"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import AdminSignIn from "@/components/admin-sign-in";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f]">
        <p className="text-sm text-white/50">Loading…</p>
      </main>
    );
  }

  // Signed out is not the same as not allowed. Offer a way in rather than a
  // dead end — signing in here re-renders this layout and mounts whichever
  // /admin page was originally requested.
  if (!isAuthenticated) {
    return <AdminSignIn />;
  }

  // Signed in, but without the role. Name the account: the usual cause is a
  // lead signed into the wrong Google account, or one whose admin role simply
  // hasn't been granted yet, and neither is helped by "you don't have access".
  if (!user?.roles?.includes("admin")) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6">
        <div className="max-w-md rounded-3xl border border-white/12 bg-[#161616] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
            Admin only
          </p>
          <h1 className="mt-4 text-2xl font-bold text-gdg-cream">
            This account isn&apos;t an admin
          </h1>
          <p className="mt-3 text-sm text-white/55">
            You&apos;re signed in as{" "}
            <span className="font-medium text-gdg-cream">{user?.email}</span>,
            which doesn&apos;t have admin access. Ask a team lead to grant it,
            or sign in with a different account.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => logout()}
              className="rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f]"
            >
              Sign in as someone else
            </button>
            <Link
              href="/"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-gdg-cream hover:bg-white/5"
            >
              Back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
          Admin
        </p>
        <nav className="mt-4 flex flex-wrap gap-5 text-sm font-medium text-white/50">
          <Link href="/admin" className="hover:text-white">
            Events
          </Link>
          <Link href="/admin/users" className="hover:text-white">
            Users
          </Link>
          <Link href="/admin/team" className="hover:text-white">
            Team
          </Link>
          <Link href="/admin/analytics" className="hover:text-white">
            Analytics
          </Link>
        </nav>
        {children}
      </div>
    </main>
  );
}
