import React, { useState } from 'react';

/**
 * ResultCard
 * Displays the final aggregated multimodal result with a prominent verdict banner,
 * per-modality score boxes/bars, and a collapsible raw-JSON view.
 */
export default function ResultCard({ result }) {
  const [showJson, setShowJson] = useState(false);

  const isDeceptive = result.result === 'Deceptive';
  const accent = isDeceptive ? '#f43f5e' : '#10b981';
  const emoji = isDeceptive ? '🔴' : '🟢';
  const verdictText = isDeceptive ? 'DECEPTIVE' : 'TRUTHFUL';

  const rows = [
    { label: 'Face', value: result.face_score, color: '#00d4ff' },
    { label: 'Voice', value: result.voice_score, color: '#7c3aed' },
    { label: 'Text', value: result.text_score, color: '#f59e0b' },
  ];

  return (
    <div
      className="rounded-[18px] p-8 mt-5 animate-rise-up backdrop-blur-md"
      style={{
        background: 'linear-gradient(135deg, rgba(13,32,64,0.95), rgba(7,18,37,0.98))',
        border: `1px solid ${accent}35`,
      }}
    >
      {/* Final combined score hero */}
      <div
        className="flex items-center justify-center gap-4 p-4 rounded-2xl mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(13,32,64,0.88), rgba(7,18,37,0.94))',
          border: '1px solid rgba(41,121,255,0.25)',
        }}
      >
        <div>
          <div className="font-mono text-[0.62rem] text-muted uppercase tracking-wider">
            Final Combined Deception Score
          </div>
          <div className="text-[0.72rem] text-muted mt-1">Face 40% • Voice 35% • Text 25%</div>
        </div>
        <div className="font-mono text-5xl font-black leading-none" style={{ color: accent }}>
          {Math.round(Number(result.final_score || 0))}%
        </div>
      </div>

      {/* Verdict */}
      <div className="flex items-center justify-center gap-5 mb-8 flex-wrap">
        <span className="text-5xl leading-none">{emoji}</span>
        <div>
          <div
            className="font-black tracking-tighter leading-none text-[clamp(2rem,5vw,3rem)]"
            style={{ color: accent }}
          >
            {verdictText}
          </div>
          <div className="font-mono text-xs text-muted mt-1">
            Confidence: <span style={{ color: accent }} className="font-bold">{result.confidence}</span>
          </div>
        </div>
      </div>

      {/* 4 score boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-7">
        {rows.map((r) => (
          <div key={r.label} className="bg-white/[0.03] border border-border rounded-xl p-3.5 text-center">
            <div className="font-mono text-2xl font-bold leading-none mb-1" style={{ color: r.color }}>
              {Math.round(r.value)}
              <span className="text-sm opacity-70">%</span>
            </div>
            <div className="font-mono text-[0.58rem] text-muted uppercase tracking-wider">{r.label}</div>
          </div>
        ))}
        <div
          className="rounded-xl p-3.5 text-center"
          style={{ border: '1px solid rgba(41,121,255,0.35)', background: 'rgba(41,121,255,0.06)' }}
        >
          <div className="font-mono text-2xl font-bold leading-none mb-1" style={{ color: accent }}>
            {Math.round(result.final_score)}
            <span className="text-sm opacity-70">%</span>
          </div>
          <div className="font-mono text-[0.58rem] text-muted uppercase tracking-wider">Final</div>
        </div>
      </div>

      {/* Modality bars */}
      <div className="bg-black/25 rounded-xl p-5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3.5 mb-3.5 last:mb-0">
            <div className="font-mono text-xs text-muted w-14 flex-shrink-0">{r.label}</div>
            <div className="flex-1 h-[7px] rounded bg-white/[0.07] overflow-hidden">
              <div
                className="h-full rounded transition-[width] duration-1000 ease-out"
                style={{ width: `${r.value}%`, background: r.color, boxShadow: `0 0 8px ${r.color}60` }}
              />
            </div>
            <div className="font-mono text-xs w-9 text-right flex-shrink-0" style={{ color: r.color }}>
              {Math.round(r.value)}%
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3.5 mt-3.5">
          <div className="font-mono text-xs w-14 flex-shrink-0" style={{ color: accent }}>
            Final
          </div>
          <div className="flex-1 h-[7px] rounded bg-white/[0.07] overflow-hidden">
            <div
              className="h-full rounded transition-[width] duration-1000 ease-out"
              style={{
                width: `${result.final_score}%`,
                background: `linear-gradient(90deg, #1a6fff, ${accent})`,
                boxShadow: `0 0 10px ${accent}50`,
              }}
            />
          </div>
          <div className="font-mono text-xs w-9 text-right flex-shrink-0 font-bold" style={{ color: accent }}>
            {Math.round(result.final_score)}%
          </div>
        </div>
      </div>

      {/* JSON toggle */}
      <div>
        <button
          onClick={() => setShowJson((p) => !p)}
          className="bg-transparent border-none text-muted font-mono text-xs cursor-pointer mt-5 py-1 underline hover:text-blue2 transition-colors"
        >
          {showJson ? '▲ Hide' : '▼ View'} raw JSON output
        </button>
        {showJson && (
          <pre className="mt-2.5 p-3.5 bg-black/40 rounded-lg border border-border font-mono text-xs text-cyan overflow-x-auto leading-relaxed whitespace-pre">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
