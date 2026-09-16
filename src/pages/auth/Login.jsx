import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { setAuth } from "../../utils/auth";
import AnimatedBackground from "../../components/AnimatedBackground";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      setAuth(data.token, {
        id: data.id,
        name: data.name,
        companyName: data.companyName,
        email: data.email,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">

      <AnimatedBackground />

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="text-4xl mb-3">
            🤖
          </div>

          <h1 className="text-3xl font-bold text-white">
            Deception
            <span className="text-blue-500">
              AI
            </span>
          </h1>

          <p className="text-gray-400 mt-2">
            AI Interview Assessment Platform
          </p>

        </div>

        {/* Card */}
        <div className="bg-[#0d1324] border border-gray-800 rounded-2xl p-7 shadow-2xl">

          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Login to continue to your account.
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

            {/* Email */}
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

            {/* Password */}
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
                  placeholder="Enter your password"
                  required
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

            <div className="flex justify-between">

              <div></div>

              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* Signup */}
          <p className="text-center text-gray-400 text-sm mt-6">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}