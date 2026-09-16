import React from 'react';

const COLORS = {
  Completed: 'bg-success/15 text-success border-success/30',
  Pending: 'bg-warning/15 text-warning border-warning/30',
  InProgress: 'bg-blue2/15 text-cyan border-blue2/30',
  Expired: 'bg-danger/15 text-danger border-danger/30',
  Active: 'bg-blue2/15 text-cyan border-blue2/30',
  Opened: 'bg-warning/15 text-warning border-warning/30',
};

/** Badge — small color-coded status pill used across tables. */
export default function Badge({ status }) {
  const classes =
    COLORS[status] ||
    'bg-slate-500/10 dark:bg-white/10 text-[var(--text-secondary)] border-[var(--border-color)]';

  return (
    <span
      className={`
        inline-block
        px-2.5 py-1
        rounded-full
        text-xs
        font-semibold
        border
        whitespace-nowrap
        ${classes}
      `}
    >
      {status}
    </span>
  );
}