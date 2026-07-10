"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f]">
        <p className="text-sm text-white/50">Loading…</p>
      </main>
    );
  }

  if (!isAuthenticated || !user?.roles?.includes("admin")) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6">
        <div className="max-w-md rounded-3xl border border-white/12 bg-[#161616] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
            Admin only
          </p>
          <h1 className="mt-4 text-2xl font-bold text-gdg-cream">
            You don't have access to this page
          </h1>
          <p className="mt-3 text-sm text-white/55">
            This area is restricted to admins. If you believe this is a
            mistake, contact a team lead.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f]"
          >
            Back home
          </Link>
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
