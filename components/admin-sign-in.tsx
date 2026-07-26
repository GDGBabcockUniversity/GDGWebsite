"use client";

import SignInForm from "@/components/sign-in-form";

/**
 * Sign-in rendered in place of the admin area, so hitting a gated /admin URL
 * offers a way in rather than a dead end.
 *
 * There's no redirect and no ?next= param: the admin layout is a client
 * component, so once the provider sets `user` it re-renders and mounts the
 * page that was originally requested. Signing in from /admin/team leaves you
 * on /admin/team.
 *
 * Sign-up is off — nobody creates an account to get into the admin area.
 */
export default function AdminSignIn() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6 py-24">
      <div className="w-full max-w-md rounded-3xl border border-white/12 bg-[#161616] p-8">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
          Admin
        </p>
        <SignInForm
          allowSignUp={false}
          title="Sign in to continue"
          subtitle="This area is for GDG Babcock admins."
        />
      </div>
    </main>
  );
}
