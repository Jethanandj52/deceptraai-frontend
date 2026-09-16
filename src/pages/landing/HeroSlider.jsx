import React, { useEffect, useRef, useState } from 'react';
import { SvgFace, SvgVoice, SvgBrain } from './HeroBackgrounds';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    title: 'Uncover the Truth',
    a1: 'Multimodal',
    a2: 'AI Analysis',
    bg: 'face',
    sub: 'DECEPTRA analyzes facial micro-expressions, vocal stress, and linguistic cues in real-time — all locally on your machine, no GPU required.',
  },
  {
    title: 'Vocal Stress Detection',
    a1: 'Voice',
    a2: 'Analysis',
    bg: 'voice',
    sub: 'Librosa extracts pitch variation, MFCC variance, and RMS energy from your voice to identify deceptive speech patterns with high accuracy.',
  },
  {
    title: 'Linguistic Pattern AI',
    a1: 'Text &',
    a2: 'NLP Analysis',
    bg: 'brain',
    sub: 'TextBlob + NLP detects negation density, pronoun scarcity, and filler words — proven deception cues in natural language statements.',
  },
];

const STATS = [
  ['3', 'AI Modalities'],
  ['CPU', 'No GPU'],
  ['100%', 'Local & Private'],
  ['<2s', 'Analysis Time'],
];

/**
 * HeroSlider
 * Auto-rotating hero banner with an animated SVG background per slide,
 * a scan-line overlay, and live "detector" data-tag decorations.
 */
export default function HeroSlider({ onRequireAuth }) {
    const navigate = useNavigate();
  
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (i) => {
    setSlide(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-[5%] pt-28 pb-20 overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0">
        {slide === 0 && <SvgFace />}
        {slide === 1 && <SvgVoice />}
        {slide === 2 && <SvgBrain />}
      </div>

      {/* Scanner overlays */}
      <div className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/[0.55] to-transparent animate-scan-down z-[2]" />
      <div className="pointer-events-none absolute top-0 bottom-0 w-px left-[28%] bg-gradient-to-b from-transparent via-blue2/45 to-transparent animate-scan-right z-[2]" />
      <div className="pointer-events-none absolute top-0 bottom-0 w-px left-[68%] bg-gradient-to-b from-transparent via-blue2/45 to-transparent animate-scan-right-slow z-[2]" />

      <div className="absolute w-10 h-10 z-[3] opacity-60 top-[72px] left-[5%] border-t-2 border-l-2 border-cyan rounded-tl" />
      <div className="absolute w-10 h-10 z-[3] opacity-60 top-[72px] right-[5%] border-t-2 border-r-2 border-cyan rounded-tr" />
      <div className="absolute w-10 h-10 z-[3] opacity-60 bottom-[100px] left-[5%] border-b-2 border-l-2 border-cyan rounded-bl" />
      <div className="absolute w-10 h-10 z-[3] opacity-60 bottom-[100px] right-[5%] border-b-2 border-r-2 border-cyan rounded-br" />

      <div className="hidden sm:block pointer-events-none absolute z-[3] border border-blue2/40 rounded-lg px-3 py-1.5 font-mono text-[0.58rem] text-cyan/80 bg-navy2/[0.88] top-[16%] left-[3%] animate-float-tag">
        FACE_SCORE: 68.2%
      </div>
      <div className="hidden sm:block pointer-events-none absolute z-[3] border border-blue2/40 rounded-lg px-3 py-1.5 font-mono text-[0.58rem] text-cyan/80 bg-navy2/[0.88] top-[23%] right-[3%] animate-float-tag [animation-delay:-1.5s]">
        VOICE_STRESS: HIGH
      </div>
      <div className="hidden sm:block pointer-events-none absolute z-[3] border border-blue2/40 rounded-lg px-3 py-1.5 font-mono text-[0.58rem] text-cyan/80 bg-navy2/[0.88] bottom-[26%] left-[4%] animate-float-tag [animation-delay:-0.8s]">
        TEXT_NEGATION: 4×
      </div>
      <div className="hidden sm:block pointer-events-none absolute z-[3] border border-blue2/40 rounded-lg px-3 py-1.5 font-mono text-[0.58rem] text-cyan/80 bg-navy2/[0.88] bottom-[20%] right-[3%] animate-float-tag [animation-delay:-2.3s]">
        VERDICT: DECEPTIVE
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => go((slide - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-[1.5%] top-1/2 -translate-y-1/2 z-[5] bg-navy2/75 border border-border rounded-full w-11 h-11 items-center justify-center cursor-pointer text-muted text-xl hover:border-blue2 hover:text-blue2 transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => go((slide + 1) % SLIDES.length)}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-[1.5%] top-1/2 -translate-y-1/2 z-[5] bg-navy2/75 border border-border rounded-full w-11 h-11 items-center justify-center cursor-pointer text-muted text-xl hover:border-blue2 hover:text-blue2 transition-colors"
      >
        ›
      </button>

      {/* Content */}
      <div key={slide} className="relative z-[4] max-w-3xl animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-blue2/10 border border-blue2/[0.35] rounded-full px-4 py-1.5 mb-7 font-mono text-[0.62rem] text-cyan tracking-[0.1em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00d4ff] animate-dot-pulse" />
          Live Multimodal Detection · v1.0
        </div>

        <h1 className="font-black leading-[1.05] tracking-tighter mb-5 text-white text-[clamp(2.2rem,5.5vw,4rem)]">
          {SLIDES[slide].title}
          <br />
          with <span className="text-blue2 drop-shadow-[0_0_40px_rgba(41,121,255,0.4)]">{SLIDES[slide].a1}</span>
          <br />
          <span className="text-cyan drop-shadow-[0_0_30px_rgba(0,212,255,0.35)]">{SLIDES[slide].a2}</span>
        </h1>

        <p className="text-muted text-[0.95rem] max-w-xl mx-auto mb-9 leading-[1.85]">{SLIDES[slide].sub}</p>

        <div className="flex gap-3.5 justify-center flex-wrap">
          <button
          onClick={() => navigate('/interview')}
          className="bg-blue2 border-none text-white px-5 py-2 rounded-lg text-[0.82rem] font-bold shadow-[0_4px_20px_rgba(41,121,255,0.35)] hover:opacity-90 hover:scale-[1.03] transition-transform"
        >
            ⚡ Start Analysis
          </button>
          <button
            onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent text-slate-100 border-[1.5px] border-border rounded-lg px-9 py-3.5 text-[0.9rem] font-semibold cursor-pointer hover:border-blue2 hover:text-blue2 transition-colors"
          >
            See How It Works
          </button>
        </div>

        <div className="flex gap-10 justify-center flex-wrap mt-14 pt-10 border-t border-blue2/[0.15]">
          {STATS.map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-black text-blue2 tracking-tighter drop-shadow-[0_0_18px_rgba(41,121,255,0.35)]">{n}</div>
              <div className="font-mono text-[0.62rem] text-muted uppercase tracking-[0.1em] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-[5]">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-2 rounded-full border-none cursor-pointer p-0 transition-[width,background] duration-300"
            style={{
              width: i === slide ? 22 : 8,
              background: i === slide ? '#2979ff' : '#1a3a6b',
              boxShadow: i === slide ? '0 0 10px rgba(41,121,255,0.5)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  );
}
