import React from 'react';

/** Modal — simple centered dialog used for "Add Candidate" / "Add Question" forms. */
export default function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-slate-100 text-xl leading-none">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
