import React from 'react';
import ScoreGauge, { scoreColor } from './ScoreGauge';

/** VoiceCard — waveform + record button, voice score, and the statement textarea. */
export default function VoiceCard({
  wvHeights,
  isRecording,
  audioBlob,
  voiceScore,
  statement,
  textScore,
  onStart,
  onStop,
  onStatementChange,
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 font-bold text-[0.82rem] mb-3.5 text-slate-100">
        <span className="text-base">🎙️</span> Voice Analysis
      </div>

      <div className="py-3 text-center">
        <div className="h-[52px] flex items-center justify-center gap-0.5 my-2.5">
          {wvHeights.map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-sm transition-[height] duration-150"
              style={{
                height: `${h}px`,
                background: isRecording ? (i % 3 === 0 ? '#00d4ff' : '#7c3aed') : audioBlob ? '#2979ff' : '#1a3a6b',
                opacity: isRecording ? 0.5 + Math.random() * 0.4 : 0.6,
              }}
            />
          ))}
        </div>

        <button
          onClick={isRecording ? onStop : onStart}
          className={[
            'w-full py-2.5 rounded-lg cursor-pointer font-mono text-[0.68rem] tracking-wider uppercase flex items-center justify-center gap-2 transition-colors',
            isRecording
              ? 'bg-danger/20 border border-danger text-white shadow-[0_0_14px_rgba(244,63,94,0.3)]'
              : 'bg-danger/10 border border-danger/40 text-danger hover:bg-danger/[0.18]',
          ].join(' ')}
        >
          <span className="w-2 h-2 rounded-full bg-current flex-shrink-0" />
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>

        <div className="font-mono text-[0.62rem] text-muted mt-1.5">
          {isRecording && '● Recording in progress…'}
          {!isRecording && audioBlob && '✓ Audio captured — ready to analyze'}
          {!isRecording && !audioBlob && 'Press to record your statement'}
        </div>
      </div>

      {voiceScore !== null && (
        <div className="mt-2">
          <ScoreGauge label="Voice Score" score={voiceScore} color={scoreColor(voiceScore)} />
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center gap-2 font-bold text-[0.82rem] mb-2.5 text-slate-100">
          <span className="text-base">💬</span> Statement Text
        </div>
        <textarea
          value={statement}
          onChange={(e) => onStatementChange(e.target.value)}
          placeholder="Type the statement to analyze for deception…"
          className="w-full bg-white/[0.03] border border-border border-l-2 border-l-blue2 rounded-lg p-3 text-slate-100 font-mono text-[0.75rem] resize-y min-h-[100px] outline-none leading-relaxed focus:border-blue2 placeholder:text-muted"
        />
      </div>

      {textScore !== null && (
        <div className="mt-2">
          <ScoreGauge label="Text Score" score={textScore} color={scoreColor(textScore)} />
        </div>
      )}
    </div>
  );
}
