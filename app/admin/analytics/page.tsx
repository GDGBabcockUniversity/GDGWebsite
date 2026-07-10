"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchAnalyticsOverview, type AnalyticsOverview } from "@/lib/admin-service";
import { GDG_HEX, colorByIndex } from "@/lib/colors";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-[#161616] p-6">
      <h2 className="text-sm font-bold uppercase tracking-wide text-white/50">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-white/40">No data yet.</p>;
}

function BarPanel({
  data,
  dataKey,
  labelKey,
}: {
  data: Record<string, any>[];
  dataKey: string;
  labelKey: string;
}) {
  if (data.length === 0) return <Empty />;
  return (
    <ResponsiveContainer width="100%" height={Math.max(120, data.length * 40)}>
      <BarChart data={data} layout="vertical" margin={{ left: 12, right: 24 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey={labelKey}
          width={140}
          tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#161616",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
          }}
          labelStyle={{ color: "#f5f0e6" }}
        />
        <Bar dataKey={dataKey} radius={[0, 6, 6, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={GDG_HEX[colorByIndex(i)]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsOverview()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-gdg-cream">Analytics</h1>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-white/50">Loading…</p>
      ) : !data ? (
        <p className="mt-8 text-sm text-white/50">Failed to load analytics.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Panel title="Top scorers">
            <BarPanel
              data={data.top_scorers.map((s) => ({
                label: s.full_name || "Anonymous",
                score: s.best_score,
              }))}
              dataKey="score"
              labelKey="label"
            />
          </Panel>

          <Panel title="Most-played games">
            <BarPanel
              data={data.most_played_games.map((g) => ({
                label: g.game,
                plays: g.play_count,
              }))}
              dataKey="plays"
              labelKey="label"
            />
          </Panel>

          <Panel title="Most-read articles">
            <BarPanel
              data={data.most_read_articles.map((a) => ({
                label: a.slug,
                readers: a.reader_count,
              }))}
              dataKey="readers"
              labelKey="label"
            />
          </Panel>

          <Panel title="Track participation">
            <BarPanel
              data={data.track_participation.map((t) => ({
                label: t.primary_track,
                members: t.member_count,
              }))}
              dataKey="members"
              labelKey="label"
            />
          </Panel>

          <div className="sm:col-span-2">
            <Panel title="Event attendance">
              {data.event_attendance.length === 0 ? (
                <Empty />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="border-b border-white/12 text-xs uppercase tracking-wide text-white/40">
                      <tr>
                        <th className="px-3 py-2">Event</th>
                        <th className="px-3 py-2">Registrations</th>
                        <th className="px-3 py-2">Check-ins</th>
                        <th className="px-3 py-2">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.event_attendance.map((e) => (
                        <tr key={e.event_id} className="border-b border-white/6">
                          <td className="px-3 py-2 font-medium text-gdg-cream">
                            {e.title}
                          </td>
                          <td className="px-3 py-2 text-white/70">
                            {e.registrations}
                          </td>
                          <td className="px-3 py-2 text-white/70">{e.checkins}</td>
                          <td className="px-3 py-2 text-white/70">
                            {e.registrations > 0
                              ? `${Math.round((e.checkins / e.registrations) * 100)}%`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          </div>
        </div>
      )}
    </>
  );
}
