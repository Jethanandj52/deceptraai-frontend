
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { getInterview } from "../services/api";

// ======================================================
// Helpers
// ======================================================

function average(answers, key) {
  if (!answers.length) return 0;

  return Math.round(
    answers.reduce(
      (sum, answer) =>
        sum + Number(answer[key] || 0),
      0
    ) / answers.length
  );
}

function scoreClass(score) {
  const value = Number(score || 0);

  if (value >= 70) {
    return "text-danger";
  }

  if (value >= 40) {
    return "text-warning";
  }

  return "text-success";
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleString();
}

// ======================================================
// Score Bar
// ======================================================

function ScoreBar({ label, value }) {
  const score = Math.round(
    Number(value || 0)
  );

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted">
          {label}
        </span>

        <span
          className={`text-xs font-bold ${scoreClass(
            score
          )}`}
        >
          {score}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.min(
              Math.max(score, 0),
              100
            )}%`,
            background:
              score >= 70
                ? "#ef4444"
                : score >= 40
                ? "#f59e0b"
                : "#22c55e",
          }}
        />
      </div>
    </div>
  );
}

// ======================================================
// Signal Card
// ======================================================

function SignalCard({
  title,
  value,
  description,
}) {
  const score = Math.round(
    Number(value || 0)
  );

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted font-mono uppercase tracking-wide">
            {title}
          </div>

          <div
            className={`text-3xl font-black mt-2 ${scoreClass(
              score
            )}`}
          >
            {score}%
          </div>
        </div>

        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
            score >= 70
              ? "bg-danger/10 border-danger/20"
              : score >= 40
              ? "bg-warning/10 border-warning/20"
              : "bg-success/10 border-success/20"
          }`}
        >
          <span className="text-sm">
            {score >= 70
              ? "!"
              : score >= 40
              ? "~"
              : "✓"}
          </span>
        </div>
      </div>

      <p className="text-xs text-muted mt-3">
        {description}
      </p>
    </div>
  );
}

// ======================================================
// Answer Content
// ======================================================

function AnswerContent({ answer }) {
  const questionType =
    answer.questionType || "Paragraph";

  // ==============================================
  // MCQ
  // ==============================================

  if (questionType === "MCQ") {
    return (
      <div>
        <div className="text-xs text-muted mb-2">
          Selected Option
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue2/10 border border-blue2/25">
          <span className="w-2 h-2 rounded-full bg-blue2" />

          <span className="text-sm font-semibold text-slate-100">
            {answer.selectedOption ||
              answer.answer ||
              "No option selected"}
          </span>
        </div>
      </div>
    );
  }

  // ==============================================
  // Voice
  // ==============================================

  if (questionType === "Voice") {
    return (
      <div className="space-y-4">
        <div>
          <div className="text-xs text-muted mb-2">
            Voice Transcript
          </div>

          <div className="bg-black/20 border border-border rounded-lg p-4">
            <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">
              {answer.transcript ||
                answer.answer ||
                "No transcript available."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="px-2 py-1 rounded-md bg-purple/10 border border-purple/20 text-purple">
            Voice Answer
          </span>

          {answer.answeredAt && (
            <span>
              Recorded:{" "}
              {formatDate(
                answer.answeredAt
              )}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ==============================================
  // Paragraph
  // ==============================================

  return (
    <div>
      <div className="text-xs text-muted mb-2">
        Candidate Answer
      </div>

      <div className="bg-black/20 border border-border rounded-lg p-4">
        <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">
          {answer.answer ||
            answer.transcript ||
            "No answer provided."}
        </p>
      </div>
    </div>
  );
}

// ======================================================
// Question Card
// ======================================================

function QuestionCard({
  answer,
  index,
}) {
  const combined = Math.round(
    Number(answer.combinedScore || 0)
  );

  return (
    <div
      className={`bg-card border rounded-xl overflow-hidden ${
        answer.flagged
          ? "border-danger/30"
          : "border-border"
      }`}
    >
      {/* Question Header */}

      <div className="px-5 py-4 border-b border-border bg-white/[0.02]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-blue2/10 border border-blue2/20 flex items-center justify-center">
              <span className="text-xs font-bold text-blue2">
                Q{index + 1}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wide text-muted">
                  Question {index + 1}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-blue2/10 border border-blue2/20 text-blue2 text-[10px] font-bold">
                  {answer.questionType ||
                    "Paragraph"}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white leading-relaxed">
                {answer.questionText ||
                  "Question text unavailable"}
              </h3>
            </div>
          </div>

          {/* Combined */}

          <div className="text-right">
            <div className="text-[10px] text-muted uppercase font-mono">
              Combined Signal
            </div>

            <div
              className={`text-xl font-black ${scoreClass(
                combined
              )}`}
            >
              {combined}%
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Answer */}

      <div className="p-5">
        <AnswerContent answer={answer} />

        {/* AI Signals */}

        <div className="mt-6 pt-5 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wide">
              AI Signal Analysis
            </h4>

            {answer.flagged && (
              <span className="px-2.5 py-1 rounded-md bg-danger/10 border border-danger/25 text-danger text-[10px] font-bold">
                ⚠ FLAGGED
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ScoreBar
              label="Face Signal"
              value={answer.faceScore}
            />

            <ScoreBar
              label="Voice Signal"
              value={answer.voiceScore}
            />

            <ScoreBar
              label="Text Signal"
              value={answer.textScore}
            />
          </div>

          {answer.flagged && (
            <div className="mt-3 rounded-lg bg-danger/[0.05] border border-danger/20 p-3">
              <div className="text-xs font-semibold text-danger mb-1">
                Elevated behavioral signal
              </div>

              <p className="text-xs text-muted leading-relaxed">
                This question contains one or
                more elevated behavioral or
                deception-related signals. This
                should not be interpreted as
                definitive proof of deception.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// Interview Report
// ======================================================

export default function InterviewReport() {
  const { id } = useParams();

  const [
    interview,
    setInterview,
  ] = useState(null);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    getInterview(id)
      .then(setInterview)
      .catch((err) => {
        setError(
          err?.message ||
            "Unable to load interview report."
        );
      });
  }, [id]);

  // ======================================================
  // Loading
  // ======================================================

  if (!interview && !error) {
    return (
      <AdminLayout title="Interview Report">
        <div className="flex items-center justify-center py-20">
          <p className="text-muted text-sm">
            Loading interview report...
          </p>
        </div>
      </AdminLayout>
    );
  }

  // ======================================================
  // Error
  // ======================================================

  if (error) {
    return (
      <AdminLayout title="Interview Report">
        <div className="bg-card border border-danger/20 rounded-xl p-6">
          <p className="text-danger text-sm">
            {error}
          </p>
        </div>
      </AdminLayout>
    );
  }

  const answers = [
    ...(interview.answers || []),
  ].sort(
    (a, b) =>
      Number(a.questionIndex || 0) -
      Number(b.questionIndex || 0)
  );

  const flagged = answers.filter(
    (answer) => answer.flagged
  );

  const overall = Math.round(
    Number(interview.overallScore || 0)
  );

  const faceAverage = average(
    answers,
    "faceScore"
  );

  const voiceAverage = average(
    answers,
    "voiceScore"
  );

  const textAverage = average(
    answers,
    "textScore"
  );

  // ======================================================
  // UI
  // ======================================================

  return (
    <AdminLayout title="Interview Report">
      <div className="space-y-5">

        {/* ==============================================
            Top Actions
        =============================================== */}

        <div className="flex justify-end print:hidden">
          <button
            onClick={() =>
              window.print()
            }
            className="px-4 py-2.5 rounded-lg bg-white/[0.05] border border-border text-sm font-semibold text-slate-100 hover:bg-white/[0.08] transition"
          >
            🖨 Download PDF
          </button>
        </div>

        {/* ==============================================
            Candidate Header
        =============================================== */}

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue2/10 border border-blue2/20 flex items-center justify-center">
                  <span className="text-xl font-black text-blue2">
                    {(
                      interview.candidate?.name ||
                      "C"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    {interview.candidate?.name ||
                      "Candidate"}
                  </h2>

                  <p className="text-sm text-muted mt-1">
                    {interview.candidate?.email ||
                      "No email available"}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-2.5 py-1 rounded-md bg-blue2/10 border border-blue2/20 text-blue2 text-xs font-semibold">
                      {interview.position ||
                        "Position"}
                    </span>

                    <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-border text-muted text-xs">
                      {interview.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-muted font-mono uppercase">
                  Interview Date
                </div>

                <div className="text-sm text-slate-100 mt-1">
                  {formatDate(
                    interview.createdAt
                  )}
                </div>

                {interview.completedAt && (
                  <div className="text-xs text-muted mt-1">
                    Completed{" "}
                    {formatDate(
                      interview.completedAt
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Overall */}

          <div className="border-t border-border bg-white/[0.02] p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

              <div className="md:col-span-2">
                <div className="text-xs text-muted font-mono uppercase tracking-wide">
                  AI-Assisted Behavioral Assessment
                </div>

                <h1 className="text-3xl font-black text-white mt-2">
                  Interview Analysis
                </h1>

                <p className="text-sm text-muted mt-2 max-w-2xl leading-relaxed">
                  The report contains the behavioral,
                  voice, facial and text-related
                  signals collected during the
                  interview.
                </p>
              </div>

              <div className="text-center md:text-right">
                <div
                  className={`text-5xl font-black ${scoreClass(
                    overall
                  )}`}
                >
                  {overall}%
                </div>

                <div className="text-xs text-muted uppercase font-mono mt-1">
                  Combined Score
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border">
              <p className="text-xs text-muted leading-relaxed">
                This assessment represents
                behavioral and deception-related
                signals and should not be interpreted
                as definitive proof of truth or
                deception.
              </p>
            </div>
          </div>
        </div>

        {/* ==============================================
            Signal Summary
        =============================================== */}

        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Signal Summary
              </h3>

              <p className="text-xs text-muted mt-1">
                Average signals across answered
                questions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SignalCard
              title="Face Signals"
              value={faceAverage}
              description="Facial behavioral signal average."
            />

            <SignalCard
              title="Voice Signals"
              value={voiceAverage}
              description="Voice-related behavioral signal average."
            />

            <SignalCard
              title="Text Analysis"
              value={textAverage}
              description="Text-related behavioral signal average."
            />

            <SignalCard
              title="Combined"
              value={overall}
              description="Overall fused interview signal."
            />
          </div>
        </div>

        {/* ==============================================
            Interview Answers
        =============================================== */}

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                Candidate Answers
              </h3>

              <p className="text-xs text-muted mt-1">
                Actual answers received and stored by
                the backend.
              </p>
            </div>

            <div className="text-xs text-muted">
              {answers.length} answered question
              {answers.length !== 1
                ? "s"
                : ""}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {answers.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <div className="text-2xl mb-2">
                  📭
                </div>

                <p className="text-sm text-muted">
                  No answers have been recorded for
                  this interview.
                </p>
              </div>
            ) : (
              answers.map(
                (answer, index) => (
                  <QuestionCard
                    key={
                      answer.questionIndex ??
                      index
                    }
                    answer={answer}
                    index={index}
                  />
                )
              )
            )}
          </div>
        </div>

        {/* ==============================================
            Flagged Moments
        =============================================== */}

        {flagged.length > 0 && (
          <div className="bg-card border border-danger/20 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-danger/15 bg-danger/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center">
                  ⚠
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">
                    Flagged Moments
                  </h3>

                  <p className="text-xs text-muted mt-1">
                    Questions containing elevated
                    signals
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
              {flagged.map(
                (answer, index) => (
                  <div
                    key={
                      answer.questionIndex ??
                      index
                    }
                    className="rounded-lg bg-danger/[0.04] border border-danger/15 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs text-danger font-mono mb-1">
                          Q
                          {Number(
                            answer.questionIndex ??
                              index
                          ) + 1}
                        </div>

                        <div className="text-sm font-semibold text-slate-100">
                          {answer.questionText}
                        </div>
                      </div>

                      <div className="text-danger text-sm font-bold">
                        {Math.round(
                          Number(
                            answer.combinedScore ||
                              0
                          )
                        )}
                        %
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div>
                        <div className="text-[10px] text-muted uppercase">
                          Face
                        </div>

                        <div className="text-xs text-slate-100 mt-1">
                          {Math.round(
                            Number(
                              answer.faceScore ||
                                0
                            )
                          )}
                          %
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-muted uppercase">
                          Voice
                        </div>

                        <div className="text-xs text-slate-100 mt-1">
                          {Math.round(
                            Number(
                              answer.voiceScore ||
                                0
                            )
                          )}
                          %
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-muted uppercase">
                          Text
                        </div>

                        <div className="text-xs text-slate-100 mt-1">
                          {Math.round(
                            Number(
                              answer.textScore ||
                                0
                            )
                          )}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* ==============================================
            Footer
        =============================================== */}

        <div className="text-center py-5">
          <p className="text-[11px] text-muted">
            DeceptionAI • AI-Assisted Interview
            Analysis
          </p>

          <p className="text-[10px] text-muted mt-1">
            Behavioral signals are probabilistic
            indicators and require human review.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}