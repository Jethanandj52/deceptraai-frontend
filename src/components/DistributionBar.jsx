import React from 'react';

/** DistributionBar — stacked bar showing Low/Moderate/High signal percentages. */
export default function DistributionBar({ low, moderate, high }) {
  const rows = [
    { label: 'Low Deception-related Signals', value: low, color: '#10b981' },
    { label: 'Moderate Signals', value: moderate, color: '#f59e0b' },
    { label: 'High Signals', value: high, color: '#f43f5e' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted">{r.label}</span>
            <span className="font-semibold" style={{ color: r.color }}>
              {r.value}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${r.value}%`, background: r.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
