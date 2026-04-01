import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// ── Validation schema ──────────────────────────────────────────────────────────
const loginSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

// ── Helper: styled error message ───────────────────────────────────────────────
function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-red-400">{msg}</p>;
}

export default function AdminLogin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setStatus(null);

      // 1) Hardcoded admin shortcut
      if (values.username === "admin" && values.password === "admin") {
        localStorage.setItem("admin_token", "admin_authenticated");
        navigate("/admin");
        return;
      }

      // 2) Real API login
      try {
        const res = await fetch(
          "https://e-commerce-api-v2.nt.azimumarov.uz/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          },
        );
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("admin_token", data.token);
          navigate("/admin");
        } else {
          setStatus("Invalid username or password");
        }
      } catch {
        setStatus("Invalid username or password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Convenience: show error only if field was touched
  const err = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

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
          onSubmit={formik.handleSubmit}
          noValidate
          className="bg-[#1a1a1a] rounded-3xl p-8 space-y-5 border border-white/5"
        >
          {/* Server-level error */}
          {formik.status && (
            <div className="px-4 py-3 text-sm text-red-400 border bg-red-500/10 border-red-500/20 rounded-xl">
              {formik.status}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block mb-2 text-xs font-medium tracking-widest text-gray-400 uppercase">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="admin"
              className={`w-full bg-[#0f0f0f] border text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none transition text-sm ${
                err("username")
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-white/30"
              }`}
            />
            <FieldError msg={err("username")} />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-xs font-medium tracking-widest text-gray-400 uppercase">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className={`w-full bg-[#0f0f0f] border text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none transition text-sm ${
                err("password")
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-white/30"
              }`}
            />
            <FieldError msg={err("password")} />
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-600">
          Default: admin / admin
        </p>
      </div>
    </div>
  );
}
