import React from 'react';

/** Modal — simple centered dialog used for "Add Candidate" / "Add Question" forms. */
export default function Modal({ title, onClose, children }) {
  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70
        flex items-center justify-center
        p-3 sm:p-4
        overflow-y-auto
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          w-full max-w-md
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl
          p-4 sm:p-5 md:p-6
          max-h-[90vh]
          overflow-y-auto
          transition-colors duration-300
        "
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] truncate">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              shrink-0
              text-[var(--text-secondary)]
              hover:text-[var(--text-primary)]
              text-xl
              leading-none
              transition-colors
            "
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}