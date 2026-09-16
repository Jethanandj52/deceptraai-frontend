import React from 'react';
import ScoreGauge, { scoreColor } from './ScoreGauge';

/** ScoresPanel — modality score summary, readiness checklist, and run/reset actions. */
export default function ScoresPanel({
  faceScore,
  voiceScore,
  textScore,
  hasCapturedImage,
  hasAudio,
  hasStatement,
  loading,
  step,
  finalResult,
  onRunAnalysis,
  onReset,
}) {
  const checklist = [
    { label: 'Face captured', ok: hasCapturedImage },
    { label: 'Voice recorded', ok: hasAudio },
    { label: 'Statement typed', ok: hasStatement },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 font-bold text-[0.82rem] mb-3.5 text-slate-100">
        <span className="text-base">📊</span> Modality Scores
      </div>

      <ScoreGauge label="Face" score={faceScore} color={faceScore !== null ? scoreColor(faceScore) : '#00d4ff'} />
      <ScoreGauge label="Voice" score={voiceScore} color={voiceScore !== null ? scoreColor(voiceScore) : '#7c3aed'} />
      <ScoreGauge label="Text" score={textScore} color={textScore !== null ? scoreColor(textScore) : '#f59e0b'} />

      <div className="bg-black/20 rounded-lg p-3 my-3.5 flex flex-col gap-2">
        {checklist.map(({ label, ok }) => (
          <div key={label} className="flex items-center gap-2 font-mono text-[0.65rem]">
            <span className={ok ? 'text-success' : 'text-muted'}>{ok ? '✓' : '○'}</span>
            <span className={ok ? 'text-slate-100' : 'text-muted'}>{label}</span>
            {!ok && <span className="text-muted ml-auto">(optional)</span>}
          </div>
        ))}
      </div>

      <button
        onClick={loading ? undefined : onRunAnalysis}
        disabled={loading}
        className="w-full py-3.5 rounded-xl border-none text-white font-extrabold text-[0.88rem] cursor-pointer shadow-[0_0_22px_rgba(41,121,255,0.3)] hover:opacity-90 hover:scale-[1.02] disabled:opacity-55 disabled:cursor-not-allowed disabled:scale-100 transition-all mt-2"
        style={{ background: 'linear-gradient(135deg, #1a6fff, #2979ff)' }}
      >
        {loading ? `Analyzing Step ${step}/3…` : '⚡ Run Full Analysis'}
      </button>

      {finalResult && (
        <button
          onClick={onReset}
          className="w-full mt-2.5 py-3 rounded-lg bg-white/[0.04] border border-border text-muted font-semibold text-[0.82rem] cursor-pointer hover:border-blue2 hover:text-blue2 transition-colors"
        >
          🔄 Reset &amp; Analyze Again
        </button>
      )}
    </div>
  );
}
