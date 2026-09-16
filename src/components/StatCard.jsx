import React from 'react';

/** StatCard — one dashboard summary number (Total Interviews, Completed, etc). */
export default function StatCard({
  label,
  value,
  sublabel,
  accent = '#2979ff',
}) {
  return (
    <div
      className="
        bg-[var(--bg-secondary)]
        border border-[var(--border-color)]
        rounded-xl
        p-4 sm:p-5
        transition-colors duration-300
        min-w-0
      "
    >
      <div
        className="
          text-[var(--text-secondary)]
          text-[0.65rem] sm:text-xs
          font-mono
          uppercase
          tracking-wide
          mb-2
          truncate
        "
      >
        {label}
      </div>

      <div
        className="text-2xl sm:text-3xl font-black truncate"
        style={{ color: accent }}
      >
        {value}
      </div>

      {sublabel && (
        <div className="text-[var(--text-secondary)] text-xs mt-1.5 truncate">
          {sublabel}
        </div>
      )}
    </div>
  );
}