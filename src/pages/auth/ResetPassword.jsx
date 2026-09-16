import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/api";
import AnimatedBackground from "../../components/AnimatedBackground";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

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

    if (!email) {
      setError(
        "Email information is missing. Please restart the password reset process."
      );
      return;
    }

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
      await resetPassword({
        email,
        password,
        confirmPassword,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Password reset failed."
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
            🔑
          </div>

          <h1 className="text-3xl font-bold text-white">
            Deception
            <span className="text-blue-500">
              AI
            </span>
          </h1>

        </div>

        <div className="bg-[#0d1324] border border-gray-800 rounded-2xl p-7 shadow-2xl">

          <h2 className="text-2xl font-bold text-white">
            Reset Password
          </h2>

          <p className="text-gray-400 text-sm mt-2 mb-6">
            Create a new password for your account.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-5">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* New Password */}
            <div>

              <div className="relative mt-2">

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
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  className="w-full bg-[#080d1c] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <div className="relative mt-2">

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
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                  className="w-full bg-[#080d1c] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(
                      !showConfirm
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
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