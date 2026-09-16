import React from 'react';

/** BarChart — plain CSS bars (no charting library) for "Interviews Overview". */
export default function BarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex items-end justify-center h-32">
            <div
              className="w-full max-w-[28px] rounded-t bg-blue2"
              style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count ? '6px' : '2px', opacity: d.count ? 1 : 0.25 }}
            />
          </div>
          <span className="text-[0.6rem] text-muted font-mono">
            {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })}
          </span>
        </div>
      ))}
    </div>
  );
}
