import React from 'react';

const STEPS = [
  { n: '01', icon: '📷', title: 'Capture Your Face', desc: 'Allow webcam access and capture a live frame. DECEPTRA analyzes micro-expressions, pixel variance, and facial asymmetry.' },
  { n: '02', icon: '🎙️', title: 'Record Your Voice', desc: 'Speak your statement. AI extracts pitch variation, energy fluctuation, and MFCC patterns from your audio.' },
  { n: '03', icon: '💬', title: 'Enter Statement', desc: 'Type what you said. TextBlob + linguistic analysis checks negation density, pronoun ratio, and filler words.' },
  { n: '04', icon: '⚡', title: 'Get Your Verdict', desc: 'Weighted fusion: Face 40% + Voice 35% + Text 25%. Returns Truthful or Deceptive with confidence level.' },
];

/** HowItWorks — the four-step process explainer section. */
export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-[5%] bg-navy2">
      <div className="text-center">
        <span className="block font-mono text-[0.62rem] tracking-[0.15em] uppercase text-blue2 mb-3">Process</span>
        <h2 className="font-extrabold tracking-tight mb-3 text-white text-[clamp(1.5rem,3vw,2.2rem)]">
          How to use DECEPTRA?
        </h2>
        <p className="text-muted text-[0.88rem] leading-[1.8] max-w-xl mx-auto">
          Three simple steps. Three AI modalities. One definitive verdict.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.1rem] mt-10">
        {STEPS.map((c) => (
          <div
            key={c.title}
            className="relative overflow-hidden bg-card border border-border rounded-2xl px-6 py-7 text-center transition-transform hover:-translate-y-1.5 hover:border-blue2/45 group"
          >
            <span className="absolute top-3.5 right-4 font-mono text-[0.58rem] text-blue2/20">{c.n}</span>
            <div className="w-[58px] h-[58px] bg-blue2/10 border border-blue2/25 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              {c.icon}
            </div>
            <h3 className="text-[0.92rem] font-bold mb-2 text-white">{c.title}</h3>
            <p className="text-muted text-[0.78rem] leading-[1.7]">{c.desc}</p>
            <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg,#1a6fff,#00d4ff)' }} />
          </div>
        ))}
      </div>
    </section>
  );
}
