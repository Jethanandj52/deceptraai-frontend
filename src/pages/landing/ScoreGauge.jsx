import React from 'react';

/** Maps a 0-100 deception score to a semantic colour (green → amber → red). */
export function scoreColor(value) {
  if (value === null || value === undefined) return '#2979ff';
  if (value < 40) return '#10b981';
  if (value < 65) return '#f59e0b';
  return '#f43f5e';
}

/**
 * ScoreGauge
 * Labeled progress bar for a single modality score (0-100).
 */
export default function ScoreGauge({ label, score, color }) {
  const value = score !== null && score !== undefined ? Math.round(score) : null;
  const barColor = color || scoreColor(score);

  return (
    <div className="w-full mb-3 last:mb-0">
      <div className="flex justify-between mb-1.5 font-mono text-[0.7rem]">
        <span className="text-muted">{label}</span>
        <span style={{ color: barColor }} className="font-bold">
          {value !== null ? `${value}%` : '—'}
        </span>
      </div>
      <div className="h-[6px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-[width,background] duration-700 ease-out"
          style={{
            width: value !== null ? `${value}%` : '0%',
            background: barColor,
            boxShadow: value !== null ? `0 0 8px ${barColor}80` : 'none',
          }}
        />
      </div>
    </div>
  );
}
