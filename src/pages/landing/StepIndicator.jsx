import React from 'react';

const STEPS = [
  { id: 0, label: 'Ready' },
  { id: 1, label: 'Face' },
  { id: 2, label: 'Voice' },
  { id: 3, label: 'Text' },
  { id: 4, label: 'Result' },
];

/**
 * StepIndicator
 * Horizontal stepper showing which analysis stage is currently running.
 */
export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center gap-0 mb-7 overflow-x-auto pb-1">
      {STEPS.map((s, i) => {
        const done = currentStep > s.id;
        const active = currentStep === s.id;

        return (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-1 min-w-[52px]">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border',
                  done
                    ? 'bg-success text-black border-success shadow-[0_0_10px_rgba(16,185,129,0.35)]'
                    : active
                    ? 'bg-cyan text-black border-cyan shadow-[0_0_12px_rgba(0,212,255,0.45)]'
                    : 'bg-white/[0.04] text-muted border-border',
                ].join(' ')}
              >
                {done ? '✓' : s.id}
              </div>
              <span
                className={[
                  'font-mono text-[0.58rem] uppercase tracking-wider',
                  done || active ? 'text-slate-100' : 'text-muted',
                ].join(' ')}
              >
                {s.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-px min-w-[18px] mb-3.5 transition-colors duration-300"
                style={{ background: done ? '#10b981' : '#1a3a6b' }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
