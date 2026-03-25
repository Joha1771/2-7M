import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple hardcoded admin check — replace with real API call if needed
    if (form.username === "admin" && form.password === "admin") {
      localStorage.setItem("admin_token", "admin_authenticated");
      navigate("/admin");
    } else {
      // Try real API login
      try {
        const res = await fetch(
          "https://e-commerce-api-v2.nt.azimumarov.uz/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          },
        );
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("admin_token", data.token);
          navigate("/admin");
        } else {
          setError("Invalid username or password");
        }
      } catch {
        setError("Invalid username or password");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-2xl">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M6 8h20M6 16h14M6 24h18"
                stroke="#0f0f0f"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage your store
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] rounded-3xl p-8 space-y-5 border border-white/5"
        >
          {error && (
            <div className="px-4 py-3 text-sm text-red-400 border bg-red-500/10 border-red-500/20 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-2 text-xs font-medium tracking-widest text-gray-400 uppercase">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="admin"
              required
              className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium tracking-widest text-gray-400 uppercase">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
              className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-600">
          Default: admin / admin
        </p>
      </div>
    </div>
  );
}
