import React from 'react';

/** BarChart — plain CSS bars (no charting library) for "Interviews Overview". */
export default function BarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="flex items-end gap-1.5 sm:gap-2 h-32 sm:h-40 w-full">
      {data.map((d) => (
        <div
          key={d.date}
          className="flex-1 min-w-0 flex flex-col items-center gap-2"
        >
          <div className="w-full flex items-end justify-center h-24 sm:h-32">
            <div
              className="
                w-full
                max-w-[20px] sm:max-w-[28px]
                rounded-t
                bg-blue2
                transition-all
              "
              style={{
                height: `${(d.count / max) * 100}%`,
                minHeight: d.count ? '6px' : '2px',
                opacity: d.count ? 1 : 0.25,
              }}
            />
          </div>

          <span className="text-[0.55rem] sm:text-[0.6rem] text-[var(--text-secondary)] font-mono truncate">
            {new Date(d.date).toLocaleDateString(undefined, {
              weekday: 'short',
            })}
          </span>
        </div>
      ))}
    </div>
  );
}