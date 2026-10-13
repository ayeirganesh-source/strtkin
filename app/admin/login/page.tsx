"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "strtkin2026") {
      localStorage.setItem("strtkin_admin_auth", "true");
      router.push("/admin/orders");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-neutral-50 border border-neutral-200 p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest bg-black text-white px-2.5 py-1 font-bold">
            Admin Portal
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight pt-2">STRTKIN.in Control</h1>
          <p className="text-xs text-neutral-500">Sign in to manage COD orders and inventory catalog.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Username</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3.5 text-neutral-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white text-xs uppercase tracking-widest py-3 font-bold hover:bg-neutral-800 transition flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}