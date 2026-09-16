import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import AnimatedBackground from "../../components/AnimatedBackground";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name,
        companyName,
        email,
        password,
      });

      navigate("/verify-otp", {
        state: {
          email,
          purpose: "signup",
        },
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden flex items-center justify-center px-4 py-8">

      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Logo */}
        <div className="text-center mb-6">

           <div className="flex justify-center mb-3">
            <img
              src="/logo.png"
              alt="DeceptionAI Logo"
              className="
                w-16
                h-16
                sm:w-20
                sm:h-20
                object-contain
              "
            />
          </div>

          <h1 className="text-3xl font-black tracking-tight">

            Deception

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              AI
            </span>

          </h1>

          <p className="text-slate-400 text-sm mt-1.5">
            AI-Powered Interview Assessment Platform
          </p>

        </div>

        {/* Card */}
        <div className="bg-[#0d1324] backdrop-blur-2xl border border-white/[0.10] rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/50">

          {/* Header */}
          <div className="text-center mb-6">

            <h2 className="text-2xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-sm text-slate-400 mt-1.5">
              Create your company account to get started
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 mb-5 text-sm text-red-300">

              <span>⚠️</span>

              <span>{error}</span>

            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-3.5"
          >

            {/* Full Name */}
            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                👤
              </span>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Full Name"
                required
                className="w-full h-12 bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/70 focus:bg-blue-500/[0.05] focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* Company Name */}
            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                🏢
              </span>

              <input
                type="text"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
                placeholder="Company Name"
                required
                className="w-full h-12 bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/70 focus:bg-blue-500/[0.05] focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* Email */}
            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                ✉
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Work Email Address"
                required
                className="w-full h-12 bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/70 focus:bg-blue-500/[0.05] focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* Password */}
            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                required
                minLength={6}
                className="w-full h-12 bg-black/20 border border-white/10 rounded-xl pl-12 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/70 focus:bg-blue-500/[0.05] focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </button>

            </div>

            {/* Confirm Password */}
            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                🔐
              </span>

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm Password"
                required
                className="w-full h-12 bg-black/20 border border-white/10 rounded-xl pl-12 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500/70 focus:bg-blue-500/[0.05] focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showConfirm
                  ? "🙈"
                  : "👁️"}
              </button>

            </div>

            {/* Password Hint */}
            <p className="text-[11px] text-slate-500 px-1">
              Use at least 6 characters for your password.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 mt-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all duration-500 hover:shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              <span className="relative z-10 flex items-center justify-center gap-2">

                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </>
                )}

              </span>

            </button>

          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-3 my-5">

            <div className="flex-1 h-px bg-white/[0.08]" />

            <span className="text-[10px] uppercase tracking-wider text-slate-600">
              Secure Registration
            </span>

            <div className="flex-1 h-px bg-white/[0.08]" />

          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-5 text-[11px] text-slate-500">

            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">
                ●
              </span>
              Secure
            </span>

            <span className="flex items-center gap-1.5">
              <span className="text-blue-400">
                ●
              </span>
              AI Powered
            </span>

            <span className="flex items-center gap-1.5">
              <span className="text-purple-400">
                ●
              </span>
              Private
            </span>

          </div>

          {/* Login */}
          <p className="text-center text-sm text-slate-400 mt-5">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Login
            </Link>

          </p>

        </div>

        {/* Copyright */}
        <p className="text-center text-[11px] text-slate-600 mt-5">
          © {new Date().getFullYear()} DeceptionAI. AI-assisted assessment platform.
        </p>

      </div>

    </div>
  );
}