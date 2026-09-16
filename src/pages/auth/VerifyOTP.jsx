import React, {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  verifyOTP,
  resendOTP,
} from "../../services/api";

import AnimatedBackground from "../../components/AnimatedBackground";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const purpose =
    location.state?.purpose || "signup";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] =
    useState(false);

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError(
        "Email information is missing. Please restart the process."
      );
      return;
    }

    if (otp.length !== 6) {
      setError(
        "Please enter a valid 6-digit OTP."
      );
      return;
    }

    setLoading(true);

    try {
      await verifyOTP({
        email,
        otp,
        purpose,
      });

      if (purpose === "forgot-password") {

        navigate("/reset-password", {
          state: {
            email,
          },
        });

      } else {

        navigate("/login");

      }

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) {
      return;
    }

    if (!email) {
      setError(
        "Email information is missing."
      );
      return;
    }

    setError("");
    setResendLoading(true);

    try {
      await resendOTP({
        email,
        purpose,
      });

      setTimer(60);
      setOtp("");

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to resend OTP."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">

      <AnimatedBackground />

      <div className="w-full max-w-md">

        <div className="text-center mb-7">

          <div className="text-4xl mb-3">
            📩
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
            Verify OTP
          </h2>

          <p className="text-gray-400 text-sm mt-2 mb-6">
            Enter the 6-digit verification code sent to:
          </p>

          <p className="text-blue-400 text-sm mb-6 break-all">
            {email || "your email"}
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

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              placeholder="000000"
              required
              className="w-full bg-[#080d1c] border border-gray-700 rounded-lg px-4 py-4 text-white text-center text-2xl tracking-[10px] outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

          </form>

          <div className="text-center mt-6">

            {timer > 0 ? (

              <p className="text-gray-500 text-sm">

                Resend code in{" "}

                <span className="text-blue-400">
                  {timer}s
                </span>

              </p>

            ) : (

              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-blue-400 hover:text-blue-300 text-sm disabled:opacity-50"
              >
                {resendLoading
                  ? "Sending..."
                  : "Resend OTP"}
              </button>

            )}

          </div>

          <div className="text-center mt-5">

            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-sm"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}