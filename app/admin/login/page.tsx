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
      router.push("/admin");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-black text-white font-sans selection:bg-[#FF5500] selection:text-white">
      <div className="max-w-md w-full bg-neutral-950 border border-neutral-800 p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest bg-[#FF5500] text-white px-2.5 py-1 font-black">
            ADMIN PORTAL
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight pt-2 text-white">STRTKIN.IN CONTROL</h1>
          <p className="text-xs text-neutral-400">Sign in to manage COD orders and inventory catalog.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-neutral-400">Username</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 border border-neutral-800 text-sm focus:outline-none focus:border-[#FF5500] bg-black text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-neutral-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-neutral-800 text-sm focus:outline-none focus:border-[#FF5500] bg-black text-white"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500 font-bold uppercase tracking-wider">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#FF5500] text-white text-xs uppercase tracking-widest py-4 font-black hover:bg-[#e04b00] transition flex items-center justify-center gap-2"
          >
            SIGN IN <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}