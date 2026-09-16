import React from 'react';

/** DistributionBar — stacked bar showing Low/Moderate/High signal percentages. */
export default function DistributionBar({ low, moderate, high }) {
  const rows = [
    { label: 'Low Deception-related Signals', value: low, color: '#10b981' },
    { label: 'Moderate Signals', value: moderate, color: '#f59e0b' },
    { label: 'High Signals', value: high, color: '#f43f5e' },
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {rows.map((r) => (
        <div key={r.label} className="min-w-0">
          <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
            <span className="text-[var(--text-secondary)] truncate">
              {r.label}
            </span>

            <span
              className="font-semibold shrink-0"
              style={{ color: r.color }}
            >
              {r.value}%
            </span>
          </div>

          <div className="h-2 sm:h-2.5 rounded-full bg-slate-200 dark:bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${r.value}%`,
                background: r.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}