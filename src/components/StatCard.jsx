import React from 'react';

/** StatCard — one dashboard summary number (Total Interviews, Completed, etc). */
export default function StatCard({ label, value, sublabel, accent = '#2979ff' }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="text-muted text-xs font-mono uppercase tracking-wide mb-2">{label}</div>
      <div className="text-3xl font-black" style={{ color: accent }}>
        {value}
      </div>
      {sublabel && <div className="text-muted text-xs mt-1.5">{sublabel}</div>}
    </div>
  );
}
