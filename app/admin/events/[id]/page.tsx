"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  checkInAttendee,
  fetchAttendees,
  type EventAttendee,
} from "@/lib/events-service";

interface AdminEventRosterPageProps {
  params: { id: string };
}

function formatDateTime(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-NG", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function CertPill({ status }: { status?: EventAttendee["certificate_status"] }) {
  if (!status) return <span className="text-white/30">—</span>;
  const styles: Record<string, string> = {
    issued: "bg-green-500/15 text-green-400",
    pending: "bg-yellow-500/15 text-yellow-400",
    failed: "bg-red-500/15 text-red-400",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] || ""}`}
    >
      {status}
    </span>
  );
}

export default function AdminEventRosterPage({
  params,
}: AdminEventRosterPageProps) {
  const [attendees, setAttendees] = useState<EventAttendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingInUserId, setCheckingInUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAttendees = async () => {
    setLoading(true);
    const list = await fetchAttendees(params.id);
    setAttendees(list);
    setLoading(false);
  };

  useEffect(() => {
    loadAttendees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleCheckIn = async (userId: string) => {
    setCheckingInUserId(userId);
    setError(null);
    try {
      await checkInAttendee(params.id, userId);
      await loadAttendees();
    } catch (err: any) {
      setError(err?.message || "Failed to check in attendee");
    } finally {
      setCheckingInUserId(null);
    }
  };

  return (
    <>
      <div className="mt-4">
        <Link href="/admin" className="text-sm text-white/50 hover:text-white">
          ← Back to events
        </Link>
      </div>
      <h1 className="mt-4 text-3xl font-bold text-gdg-cream">Attendee roster</h1>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/12">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/12 text-xs uppercase tracking-wide text-white/40">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Matric no.</th>
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3">Checked in</th>
              <th className="px-4 py-3">Certificate</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-white/50" colSpan={7}>
                  Loading…
                </td>
              </tr>
            ) : attendees.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-white/50" colSpan={7}>
                  No registrations yet.
                </td>
              </tr>
            ) : (
              attendees.map((attendee) => {
                const isCheckedIn = !!attendee.checked_in_at;
                const certIssued = attendee.certificate_status === "issued";
                const busy = checkingInUserId === attendee.user_id;
                return (
                  <tr key={attendee.user_id} className="border-b border-white/6">
                    <td className="px-4 py-3 font-medium text-gdg-cream">
                      {attendee.full_name}
                    </td>
                    <td className="px-4 py-3 text-white/70">{attendee.email}</td>
                    <td className="px-4 py-3 text-white/70">
                      {attendee.matric_no || "—"}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {formatDateTime(attendee.registered_at)}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {formatDateTime(attendee.checked_in_at)}
                    </td>
                    <td className="px-4 py-3">
                      <CertPill status={attendee.certificate_status} />
                      {attendee.certificate_url && (
                        <a
                          href={attendee.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-xs text-white/50 hover:text-white hover:underline"
                        >
                          Download
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleCheckIn(attendee.user_id)}
                        disabled={busy || (isCheckedIn && certIssued)}
                        className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {busy
                          ? "Working…"
                          : isCheckedIn && !certIssued
                            ? "Retry cert"
                            : isCheckedIn
                              ? "Checked in"
                              : "Check in"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
