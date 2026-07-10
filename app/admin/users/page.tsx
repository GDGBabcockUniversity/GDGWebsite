"use client";

import { useEffect, useState } from "react";
import {
  fetchAdminUsers,
  updateUserRoles,
  type AdminUser,
} from "@/lib/admin-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ALL_ROLES = ["user", "admin"];
const PAGE_SIZE = 20;

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [editTeams, setEditTeams] = useState("");
  const [editActive, setEditActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    const result = await fetchAdminUsers({
      search: search || undefined,
      role: roleFilter || undefined,
      page,
      limit: PAGE_SIZE,
    });
    setUsers(result.users);
    setTotal(result.total);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  };

  const openEdit = (user: AdminUser) => {
    setEditingId(user.id);
    setEditRoles(user.roles || []);
    setEditTeams((user.teams || []).join(", "));
    setEditActive(user.is_active);
    setError(null);
  };

  const toggleRole = (role: string) => {
    setEditRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSave = async (userId: string) => {
    setSaving(true);
    setError(null);
    try {
      await updateUserRoles(userId, {
        roles: editRoles,
        teams: editTeams
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        is_active: editActive,
      });
      setEditingId(null);
      await loadUsers();
    } catch (err: any) {
      setError(err?.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gdg-cream">Users</h1>
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className="mt-6 flex flex-wrap items-center gap-3"
      >
        <Input
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="h-9 rounded-md border border-white/15 bg-transparent px-3 text-sm text-white"
        >
          <option value="">All roles</option>
          {ALL_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-3xl border border-white/12">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/12 text-xs uppercase tracking-wide text-white/40">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Roles</th>
              <th className="px-4 py-3">Teams</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Last login</th>
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
            ) : users.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-white/50" colSpan={7}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <>
                  <tr key={user.id} className="border-b border-white/6">
                    <td className="px-4 py-3 font-medium text-gdg-cream">
                      {user.full_name || "—"}
                    </td>
                    <td className="px-4 py-3 text-white/70">{user.email}</td>
                    <td className="px-4 py-3 text-white/70">
                      {(user.roles || []).join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {(user.teams || []).join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {user.is_active ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {formatDate(user.last_login_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          editingId === user.id ? setEditingId(null) : openEdit(user)
                        }
                        className="text-xs font-semibold text-white/60 hover:text-white"
                      >
                        {editingId === user.id ? "Close" : "Edit"}
                      </button>
                    </td>
                  </tr>
                  {editingId === user.id && (
                    <tr className="border-b border-white/6 bg-white/[0.03]">
                      <td className="px-4 py-4" colSpan={7}>
                        <div className="flex flex-wrap items-end gap-6">
                          <div>
                            <p className="mb-1.5 text-xs font-medium text-white/50">
                              Roles
                            </p>
                            <div className="flex gap-3">
                              {ALL_ROLES.map((role) => (
                                <label
                                  key={role}
                                  className="flex items-center gap-1.5 text-sm text-white/80"
                                >
                                  <input
                                    type="checkbox"
                                    checked={editRoles.includes(role)}
                                    onChange={() => toggleRole(role)}
                                  />
                                  {role}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="mb-1.5 text-xs font-medium text-white/50">
                              Teams (comma-separated)
                            </p>
                            <Input
                              value={editTeams}
                              onChange={(e) => setEditTeams(e.target.value)}
                              className="w-64"
                            />
                          </div>
                          <label className="flex items-center gap-1.5 text-sm text-white/80">
                            <input
                              type="checkbox"
                              checked={editActive}
                              onChange={(e) => setEditActive(e.target.checked)}
                            />
                            Active
                          </label>
                          <Button
                            disabled={saving}
                            onClick={() => handleSave(user.id)}
                          >
                            {saving ? "Saving…" : "Save"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-white/60">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="disabled:opacity-30"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
