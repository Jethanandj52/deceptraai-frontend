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
    <div className="mb-4 min-w-0">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs text-[var(--text-secondary)] truncate">
          {label}
        </span>

        <span
          className={`text-xs font-bold shrink-0 ${scoreClass(
            score
          )}`}
        >
          {score}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-200 dark:bg-white/[0.06] overflow-hidden">
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
    <div
      className="
        bg-[var(--bg-secondary)]
        border border-[var(--border-color)]
        rounded-xl
        p-4 sm:p-5
        min-w-0
        transition-colors duration-300
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className="
              text-xs
              text-[var(--text-secondary)]
              font-mono
              uppercase
              tracking-wide
              truncate
            "
          >
            {title}
          </div>

          <div
            className={`text-2xl sm:text-3xl font-black mt-2 ${scoreClass(
              score
            )}`}
          >
            {score}%
          </div>
        </div>

        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg flex items-center justify-center border ${
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

      <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
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
      <div className="min-w-0">
        <div className="text-xs text-[var(--text-secondary)] mb-2">
          Selected Option
        </div>

        <div
          className="
            inline-flex
            max-w-full
            items-center
            gap-2
            px-3 sm:px-4
            py-2.5
            rounded-lg
            bg-blue2/10
            border border-blue2/25
          "
        >
          <span className="w-2 h-2 shrink-0 rounded-full bg-blue2" />

          <span
            className="
              text-sm
              font-semibold
              text-[var(--text-primary)]
              break-words
            "
          >
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
      <div className="space-y-4 min-w-0">
        <div>
          <div className="text-xs text-[var(--text-secondary)] mb-2">
            Voice Transcript
          </div>

          <div
            className="
              bg-slate-500/[0.04]
              dark:bg-black/20
              border border-[var(--border-color)]
              rounded-lg
              p-3 sm:p-4
            "
          >
            <p
              className="
                text-sm
                text-[var(--text-primary)]
                leading-relaxed
                whitespace-pre-wrap
                break-words
              "
            >
              {answer.transcript ||
                answer.answer ||
                "No transcript available."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
          <span className="px-2 py-1 rounded-md bg-purple/10 border border-purple/20 text-purple">
            Voice Answer
          </span>

          {answer.answeredAt && (
            <span className="break-words">
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
    <div className="min-w-0">
      <div className="text-xs text-[var(--text-secondary)] mb-2">
        Candidate Answer
      </div>

      <div
        className="
          bg-slate-500/[0.04]
          dark:bg-black/20
          border border-[var(--border-color)]
          rounded-lg
          p-3 sm:p-4
        "
      >
        <p
          className="
            text-sm
            text-[var(--text-primary)]
            leading-relaxed
            whitespace-pre-wrap
            break-words
          "
        >
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
      className={`bg-[var(--bg-secondary)] border rounded-xl overflow-hidden transition-colors duration-300 ${
        answer.flagged
          ? "border-danger/30"
          : "border-[var(--border-color)]"
      }`}
    >
      {/* Question Header */}

      <div
        className="
          px-4 sm:px-5
          py-3 sm:py-4
          border-b border-[var(--border-color)]
          bg-slate-500/[0.02]
          dark:bg-white/[0.02]
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg bg-blue2/10 border border-blue2/20 flex items-center justify-center">
              <span className="text-xs font-bold text-blue2">
                Q{index + 1}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--text-secondary)]">
                  Question {index + 1}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-blue2/10 border border-blue2/20 text-blue2 text-[10px] font-bold">
                  {answer.questionType ||
                    "Paragraph"}
                </span>
              </div>

              <h3
                className="
                  text-sm
                  font-semibold
                  text-[var(--text-primary)]
                  leading-relaxed
                  break-words
                "
              >
                {answer.questionText ||
                  "Question text unavailable"}
              </h3>
            </div>
          </div>

          {/* Combined */}

          <div className="text-left sm:text-right shrink-0">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase font-mono">
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

      <div className="p-4 sm:p-5">
        <AnswerContent answer={answer} />

        {/* AI Signals */}

        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[var(--border-color)]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
              AI Signal Analysis
            </h4>

            {answer.flagged && (
              <span className="px-2.5 py-1 rounded-md bg-danger/10 border border-danger/25 text-danger text-[10px] font-bold">
                ⚠ FLAGGED
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
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

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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
        <div className="flex items-center justify-center py-16 sm:py-20">
          <p className="text-[var(--text-secondary)] text-sm">
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
        <div
          className="
            bg-[var(--bg-secondary)]
            border border-danger/20
            rounded-xl
            p-4 sm:p-6
          "
        >
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
      <div className="space-y-4 sm:space-y-5">

        {/* ==============================================
            Top Actions
        =============================================== */}

        <div className="flex justify-end print:hidden">
          <button
            onClick={() =>
              window.print()
            }
            className="
              w-full sm:w-auto
              px-4 py-2.5
              rounded-lg
              bg-slate-500/[0.05]
              dark:bg-white/[0.05]
              border border-[var(--border-color)]
              text-sm
              font-semibold
              text-[var(--text-primary)]
              hover:bg-slate-500/[0.08]
              dark:hover:bg-white/[0.08]
              transition-colors
            "
          >
            🖨 Download PDF
          </button>
        </div>

        {/* ==============================================
            Candidate Header
        =============================================== */}

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-colors duration-300">
          <div className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">

              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-blue2/10 border border-blue2/20 flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-black text-blue2">
                    {(
                      interview.candidate?.name ||
                      "C"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] break-words">
                    {interview.candidate?.name ||
                      "Candidate"}
                  </h2>

                  <p className="text-sm text-[var(--text-secondary)] mt-1 break-all">
                    {interview.candidate?.email ||
                      "No email available"}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-2.5 py-1 rounded-md bg-blue2/10 border border-blue2/20 text-blue2 text-xs font-semibold break-words">
                      {interview.position ||
                        "Position"}
                    </span>

                    <span className="px-2.5 py-1 rounded-md bg-slate-500/[0.04] dark:bg-white/[0.04] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs">
                      {interview.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-left lg:text-right shrink-0">
                <div className="text-xs text-[var(--text-secondary)] font-mono uppercase">
                  Interview Date
                </div>

                <div className="text-sm text-[var(--text-primary)] mt-1 break-words">
                  {formatDate(
                    interview.createdAt
                  )}
                </div>

                {interview.completedAt && (
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
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

          <div className="border-t border-[var(--border-color)] bg-slate-500/[0.02] dark:bg-white/[0.02] p-4 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-center">

              <div className="lg:col-span-2 min-w-0">
                <div className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wide">
                  AI-Assisted Behavioral Assessment
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-2">
                  Interview Analysis
                </h1>

                <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
                  The report contains the behavioral,
                  voice, facial and text-related
                  signals collected during the
                  interview.
                </p>
              </div>

              <div className="text-left lg:text-right">
                <div
                  className={`text-4xl sm:text-5xl font-black ${scoreClass(
                    overall
                  )}`}
                >
                  {overall}%
                </div>

                <div className="text-xs text-[var(--text-secondary)] uppercase font-mono mt-1">
                  Combined Score
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[var(--border-color)]">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Signal Summary
              </h3>

              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Average signals across answered
                questions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3 mb-4">
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Candidate Answers
              </h3>

              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Actual answers received and stored by
                the backend.
              </p>
            </div>

            <div className="text-xs text-[var(--text-secondary)] shrink-0">
              {answers.length} answered question
              {answers.length !== 1
                ? "s"
                : ""}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {answers.length === 0 ? (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 sm:p-8 text-center">
                <div className="text-2xl mb-2">
                  📭
                </div>

                <p className="text-sm text-[var(--text-secondary)]">
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
          <div className="bg-[var(--bg-secondary)] border border-danger/20 rounded-xl overflow-hidden transition-colors duration-300">
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-danger/15 bg-danger/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg bg-danger/10 border border-danger/20 flex items-center justify-center">
                  ⚠
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Flagged Moments
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Questions containing elevated
                    signals
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-3">
              {flagged.map(
                (answer, index) => (
                  <div
                    key={
                      answer.questionIndex ??
                      index
                    }
                    className="rounded-lg bg-danger/[0.04] border border-danger/15 p-3 sm:p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <div className="text-xs text-danger font-mono mb-1">
                          Q
                          {Number(
                            answer.questionIndex ??
                              index
                          ) + 1}
                        </div>

                        <div className="text-sm font-semibold text-[var(--text-primary)] break-words">
                          {answer.questionText}
                        </div>
                      </div>

                      <div className="text-danger text-sm font-bold shrink-0">
                        {Math.round(
                          Number(
                            answer.combinedScore ||
                              0
                          )
                        )}
                        %
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                      <div>
                        <div className="text-[10px] text-[var(--text-secondary)] uppercase">
                          Face
                        </div>

                        <div className="text-xs text-[var(--text-primary)] mt-1">
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
                        <div className="text-[10px] text-[var(--text-secondary)] uppercase">
                          Voice
                        </div>

                        <div className="text-xs text-[var(--text-primary)] mt-1">
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
                        <div className="text-[10px] text-[var(--text-secondary)] uppercase">
                          Text
                        </div>

                        <div className="text-xs text-[var(--text-primary)] mt-1">
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

        <div className="text-center py-4 sm:py-5">
          <p className="text-[11px] text-[var(--text-secondary)]">
            DeceptionAI • AI-Assisted Interview
            Analysis
          </p>

          <p className="text-[10px] text-[var(--text-secondary)] mt-1">
            Behavioral signals are probabilistic
            indicators and require human review.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}