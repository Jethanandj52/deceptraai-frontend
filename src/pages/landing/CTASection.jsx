import React from 'react';
import { useNavigate } from 'react-router-dom';

/** CTASection — "Ready to experience DECEPTRA?" call-to-action band. */
export default function CTASection({ onGetStarted }) {
    const navigate = useNavigate();
  
  return (
    <div
      className="border-t border-b border-border py-20 px-[5%] text-center"
      style={{ background: 'linear-gradient(135deg, #091a3d, #0a1f4a)' }}
    >
      <h2 className="font-black text-white tracking-tight mb-3.5 text-[clamp(1.5rem,3.5vw,2.2rem)]">
        Ready to experience DECEPTRA?
      </h2>
      <p className="text-muted text-[0.9rem] max-w-md mx-auto mb-9 leading-[1.8]">
        Join researchers and students using our platform for real-time deception analysis.
      </p>
      <div className="flex gap-3.5 justify-center flex-wrap">
        <button
          onClick={() => navigate('/interview')}
          className="bg-blue2 border-none text-white px-5 py-2 rounded-lg text-[0.82rem] font-bold shadow-[0_4px_20px_rgba(41,121,255,0.35)] hover:opacity-90 hover:scale-[1.03] transition-transform"
        >
          ⚡ Get Started
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-transparent text-white border-[1.5px] border-white/30 rounded-lg px-9 py-3.5 text-[0.9rem] font-semibold cursor-pointer hover:border-white transition-colors"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
