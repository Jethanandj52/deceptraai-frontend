import React from 'react';

/** CandidateShell — simple centered-card layout shared by all candidate-facing pages. */
export default function CandidateShell({ children, wide = false }) {
  return (
    <div className="min-h-screen bg-navy text-slate-100 flex items-center justify-center p-4">
      <div className={`w-full ${wide ? 'max-w-3xl' : 'max-w-md'} bg-card border border-border rounded-2xl p-8`}>
        <div className="text-center mb-6">
          <div className="text-xl font-black text-white">
            🤖 Deception<span className="text-blue2">AI</span>
          </div>
          <p className="text-muted text-xs mt-1">AI Interview Assessment</p>
        </div>
        {children}
      </div>
    </div>
  );
}
