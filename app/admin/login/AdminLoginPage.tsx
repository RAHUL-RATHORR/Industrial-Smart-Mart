"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminField, adminInputClass } from "@/components/admin/AdminForm";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Login failed");
        return;
      }

      const redirectTo = searchParams.get("from") || "/admin";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex size-14 items-center justify-center rounded-2xl bg-[#f4b400] text-white font-black text-xl">
            ISM
          </div>
          <h1 className="text-2xl font-black">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">Manage categories, products & brands</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AdminField label="Username">
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                className={`${adminInputClass} pl-9`}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </AdminField>

          <AdminField label="Password">
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                className={`${adminInputClass} pl-9`}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </AdminField>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <Button type="submit" variant="brand" className="w-full h-10" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-500">
          Default: <span className="font-semibold">admin</span> / <span className="font-semibold">admin123</span>
        </p>
      </div>
    </div>
  );
}
