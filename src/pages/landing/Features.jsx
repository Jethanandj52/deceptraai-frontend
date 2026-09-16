import React from 'react';

const FEATURES = [
  { icon: '🧠', t: 'No GPU Required', d: 'All inference on CPU: OpenCV, Librosa, TextBlob. Works on any standard laptop.', p: 'CPU-only' },
  { icon: '🔒', t: '100% Private', d: 'No cloud calls. All video, audio, and text stays on your machine. Zero data leaves.', p: 'Privacy-first' },
  { icon: '📡', t: 'REST API', d: '4 clean FastAPI endpoints with Swagger docs at /docs. Easy to connect.', p: 'OpenAPI' },
  { icon: '📊', t: 'Explainable AI', d: 'Per-modality scores with full JSON breakdown. See exactly why the verdict was reached.', p: 'Explainable' },
  { icon: '🎓', t: 'FYP-Ready', d: 'Full comments, modular structure, clean React + FastAPI architecture.', p: 'Documented' },
  { icon: '⚡', t: 'Real-Time', d: 'Results in under 2 seconds via async FastAPI with live step-by-step progress.', p: '< 2s' },
];

/** Features — capability grid section. */
export default function Features() {
  return (
    <section id="features" className="py-20 px-[5%]">
      <div className="text-center">
        <span className="block font-mono text-[0.62rem] tracking-[0.15em] uppercase text-blue2 mb-3">Capabilities</span>
        <h2 className="font-extrabold tracking-tight mb-3 text-white text-[clamp(1.5rem,3vw,2.2rem)]">
          Built for Research &amp; FYP
        </h2>
        <p className="text-muted text-[0.88rem] leading-[1.8] max-w-xl mx-auto">
          Production-ready, CPU-only, fully commented and beginner-friendly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.1rem] mt-10">
        {FEATURES.map((f) => (
          <div key={f.t} className="bg-card border border-border rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:border-blue2/40">
            <div className="w-[42px] h-[42px] rounded-xl bg-blue2/[0.12] flex items-center justify-center text-xl mb-4">{f.icon}</div>
            <h3 className="text-[0.9rem] font-bold mb-1.5 text-white">{f.t}</h3>
            <p className="text-muted text-[0.78rem] leading-[1.7]">{f.d}</p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full font-mono text-[0.58rem] tracking-wider uppercase bg-blue2/[0.12] text-blue2 border border-blue2/25">
              {f.p}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
