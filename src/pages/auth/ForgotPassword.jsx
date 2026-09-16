import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/api";
import AnimatedBackground from "../../components/AnimatedBackground";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);

      navigate("/verify-otp", {
        state: {
          email,
          purpose: "forgot-password",
        },
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">

      <AnimatedBackground />

      <div className="w-full max-w-md">

        <div className="text-center mb-7">

          <div className="text-4xl mb-3">
            🔐
          </div>

          <h1 className="text-3xl font-bold text-white">
            Deception
            <span className="text-blue-500">
              AI
            </span>
          </h1>

        </div>

        <div className="bg-[#0d1324] border border-gray-800 rounded-2xl p-7 shadow-2xl text-center">

          <h2 className="text-2xl font-bold text-white">
            Forgot Password?
          </h2>

          <p className="text-gray-400 text-sm mt-2 mb-6">
            Enter your email and we will send you a verification code.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-5">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                required
                className="w-full mt-2 bg-[#080d1c] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
            >
              {loading
                ? "Sending..."
                : "Send Verification Code"}
            </button>

          </form>

          <div className="text-center mt-6">

            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}