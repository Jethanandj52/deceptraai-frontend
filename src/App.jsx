import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ================= AUTH PAGES =================
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";

// ================= RECRUITER / ADMIN PAGES =================
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import Questions from "./pages/Questions";
import Interviews from "./pages/Interviews";
import CreateInterview from "./pages/CreateInterview";
import InterviewLinkResult from "./pages/InterviewLinkResult";
import InterviewReport from "./pages/InterviewReport";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

// ================= CANDIDATE PAGES =================
import InterviewInvite from "./pages/candidate/InterviewInvite";
import InterviewVerify from "./pages/candidate/InterviewVerify";
import InterviewCheck from "./pages/candidate/InterviewCheck";
import InterviewInstructions from "./pages/candidate/InterviewInstructions";
import InterviewLive from "./pages/candidate/InterviewLive";
import InterviewComplete from "./pages/candidate/InterviewComplete";

import LandingPage from "./pages/landing/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================================
            DEFAULT
        ========================================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* ==========================================
            AUTHENTICATION
        ========================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* ==========================================
            RECRUITER / ADMIN
        ========================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/home"
          element={<LandingPage />}
        />

        <Route
          path="/candidates"
          element={<Candidates />}
        />

        <Route
          path="/candidates/:id"
          element={<CandidateProfile />}
        />

        <Route
          path="/questions"
          element={<Questions />}
        />

        <Route
          path="/interviews"
          element={<Interviews />}
        />

        <Route
          path="/interviews/create"
          element={<CreateInterview />}
        />

        <Route
          path="/interviews/:id/link"
          element={<InterviewLinkResult />}
        />

        <Route
          path="/interviews/:id/report"
          element={<InterviewReport />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* ==========================================
            CANDIDATE INTERVIEW
            TOKEN IS NOT IN URL
        ========================================== */}

        <Route
          path="/interview"
          element={<InterviewInvite />}
        />

        <Route
          path="/interview/verify"
          element={<InterviewVerify />}
        />

        <Route
          path="/interview/check"
          element={<InterviewCheck />}
        />

        <Route
          path="/interview/instructions"
          element={<InterviewInstructions />}
        />

        <Route
          path="/interview/live"
          element={<InterviewLive />}
        />

        <Route
          path="/interview/complete"
          element={<InterviewComplete />}
        />

        {/* ==========================================
            404 / UNKNOWN ROUTE
        ========================================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}