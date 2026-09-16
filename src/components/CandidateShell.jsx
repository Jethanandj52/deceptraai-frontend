import React from 'react';

/** CandidateShell — simple centered-card layout shared by all candidate-facing pages. */
export default function CandidateShell({ children, wide = false }) {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
        flex items-center justify-center
        p-3 sm:p-4 md:p-6
        transition-colors duration-300
      "
    >
      <div
        className={`
          w-full
          ${wide ? 'max-w-3xl' : 'max-w-md'}
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl sm:rounded-2xl
          p-5 sm:p-6 md:p-8
          transition-colors duration-300
        `}
      >
        <div className="text-center mb-5 sm:mb-6">
          <div className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
            🤖 Deception<span className="text-blue2">AI</span>
          </div>

          <p className="text-[var(--text-secondary)] text-xs mt-1">
            AI Interview Assessment
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}