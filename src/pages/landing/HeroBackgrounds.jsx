import React from 'react';

/** Face-scan hero illustration used for the "Multimodal AI Analysis" slide. */
export function SvgFace() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="sg1" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(26,111,255,0.07)" strokeWidth="1" />
        </pattern>
        <radialGradient id="rg1" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(41,121,255,0.22)" />
          <stop offset="100%" stopColor="rgba(5,13,26,0)" />
        </radialGradient>
        <linearGradient id="bf1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(5,13,26,0)" />
          <stop offset="100%" stopColor="#050d1a" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="#050d1a" />
      <rect width="1440" height="900" fill="url(#sg1)" />
      <rect width="1440" height="900" fill="url(#rg1)" />
      <ellipse cx="720" cy="410" rx="130" ry="155" fill="none" stroke="rgba(0,212,255,0.13)" strokeWidth="1.5" strokeDasharray="8 5" />
      <rect x="570" y="240" width="300" height="340" rx="6" fill="none" stroke="rgba(0,212,255,0.07)" strokeWidth="1" strokeDasharray="6 4" />
      <path d="M570 268 L570 240 L598 240" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="2" />
      <path d="M842 240 L870 240 L870 268" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="2" />
      <path d="M570 552 L570 580 L598 580" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="2" />
      <path d="M842 580 L870 580 L870 552" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="2" />
      <circle cx="675" cy="375" r="20" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
      <circle cx="765" cy="375" r="20" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
      <circle cx="675" cy="375" r="5" fill="rgba(0,212,255,0.2)" />
      <circle cx="765" cy="375" r="5" fill="rgba(0,212,255,0.2)" />
      <path d="M720 395 L707 435 L720 445 L733 435 Z" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="1" />
      <path d="M693 462 Q720 482 747 462" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5" />
      {[[675, 375], [765, 375], [720, 420], [720, 448], [693, 462], [747, 462], [652, 352], [788, 352]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="rgba(0,212,255,0.38)" />
      ))}
      {[[675, 375, 720, 420], [765, 375, 720, 420], [720, 420, 720, 448], [720, 448, 693, 462], [720, 448, 747, 462]].map(
        ([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(41,121,255,0.14)" strokeWidth="1" />
        )
      )}
      <line x1="870" y1="372" x2="980" y2="352" stroke="rgba(0,212,255,0.22)" strokeWidth="1" />
      <line x1="870" y1="408" x2="992" y2="408" stroke="rgba(0,212,255,0.22)" strokeWidth="1" />
      <line x1="870" y1="444" x2="980" y2="464" stroke="rgba(0,212,255,0.22)" strokeWidth="1" />
      <rect x="982" y="342" width="130" height="19" rx="3" fill="rgba(13,32,64,.8)" stroke="rgba(0,212,255,0.22)" strokeWidth="0.5" />
      <rect x="994" y="399" width="110" height="19" rx="3" fill="rgba(13,32,64,.8)" stroke="rgba(0,212,255,0.22)" strokeWidth="0.5" />
      <rect x="982" y="455" width="125" height="19" rx="3" fill="rgba(13,32,64,.8)" stroke="rgba(0,212,255,0.22)" strokeWidth="0.5" />
      <rect width="1440" height="220" y="680" fill="url(#bf1)" />
    </svg>
  );
}

/** Voice-waveform hero illustration used for the "Voice Analysis" slide. */
export function SvgVoice() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="sg2" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(124,58,237,0.07)" strokeWidth="1" />
        </pattern>
        <radialGradient id="rg2" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(124,58,237,0.18)" />
          <stop offset="100%" stopColor="rgba(5,13,26,0)" />
        </radialGradient>
        <radialGradient id="rg2b" cx="80%" cy="25%" r="35%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.1)" />
          <stop offset="100%" stopColor="rgba(5,13,26,0)" />
        </radialGradient>
        <linearGradient id="bf2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(5,13,26,0)" />
          <stop offset="100%" stopColor="#050d1a" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="#050d1a" />
      <rect width="1440" height="900" fill="url(#sg2)" />
      <rect width="1440" height="900" fill="url(#rg2)" />
      <rect width="1440" height="900" fill="url(#rg2b)" />
      <line x1="180" y1="450" x2="1260" y2="450" stroke="rgba(124,58,237,0.13)" strokeWidth="1" />
      <polyline
        points="180,450 215,450 248,335 282,565 315,358 348,515 382,424 415,450 448,450 482,278 515,622 548,318 582,558 615,390 648,492 682,430 715,450 748,450 782,312 815,588 848,352 882,542 915,402 948,482 982,442 1015,450 1048,450 1082,348 1115,552 1148,378 1182,522 1215,410 1248,470 1260,450"
        fill="none"
        stroke="rgba(124,58,237,0.42)"
        strokeWidth="2.5"
      />
      <polyline
        points="180,450 225,450 268,402 312,498 355,422 398,478 442,446 485,450 528,385 572,515 615,402 658,498 702,436 745,452 788,392 832,508 875,418 918,488 962,442 1005,454 1048,450 1092,422 1135,478 1178,434 1222,466 1260,450"
        fill="none"
        stroke="rgba(0,212,255,0.22)"
        strokeWidth="1.5"
      />
      <circle cx="720" cy="450" r="125" fill="none" stroke="rgba(124,58,237,0.07)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="720" cy="450" r="205" fill="none" stroke="rgba(124,58,237,0.04)" strokeWidth="1" strokeDasharray="4 8" />
      {[[482, 278], [515, 622], [748, 312], [782, 588], [1048, 348], [1082, 552]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="rgba(124,58,237,0.45)" />
          <line x1={x} y1={y} x2={x} y2={450} stroke="rgba(124,58,237,0.14)" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}
      <rect x="575" y="155" width="290" height="82" rx="8" fill="rgba(13,32,64,.82)" stroke="rgba(124,58,237,0.38)" strokeWidth="1" />
      <text x="720" y="192" textAnchor="middle" fill="rgba(0,212,255,0.82)" fontFamily="Space Mono,monospace" fontSize="11">
        VOICE STRESS INDEX
      </text>
      <text x="720" y="220" textAnchor="middle" fill="rgba(244,63,94,0.88)" fontFamily="Space Mono,monospace" fontSize="13" fontWeight="bold">
        HIGH — 74.3%
      </text>
      <rect width="1440" height="220" y="680" fill="url(#bf2)" />
    </svg>
  );
}

/** Neural-graph hero illustration used for the "Text & NLP Analysis" slide. */
export function SvgBrain() {
  const nodes = [
    [720, 205], [515, 305], [925, 305], [375, 455], [638, 425], [802, 425], [1065, 455],
    [458, 585], [682, 562], [758, 562], [982, 585], [720, 685],
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 7], [4, 8], [5, 8], [5, 9],
    [6, 9], [6, 10], [7, 11], [8, 11], [9, 11], [10, 11],
  ];
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="sg3" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(26,111,255,0.06)" strokeWidth="1" />
        </pattern>
        <radialGradient id="rg3" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(41,121,255,0.15)" />
          <stop offset="100%" stopColor="rgba(5,13,26,0)" />
        </radialGradient>
        <linearGradient id="bf3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(5,13,26,0)" />
          <stop offset="100%" stopColor="#050d1a" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="#050d1a" />
      <rect width="1440" height="900" fill="url(#sg3)" />
      <rect width="1440" height="900" fill="url(#rg3)" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0] + 360}
          y1={nodes[a][1] + 50}
          x2={nodes[b][0] + 360}
          y2={nodes[b][1] + 50}
          stroke={i % 3 === 0 ? 'rgba(0,212,255,0.14)' : 'rgba(41,121,255,0.11)'}
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x + 360}
            cy={y + 50}
            r="11"
            fill="rgba(13,32,64,.92)"
            stroke={i === 0 || i === 11 ? 'rgba(0,212,255,0.55)' : 'rgba(41,121,255,0.32)'}
            strokeWidth="1.5"
          />
          <circle cx={x + 360} cy={y + 50} r="4" fill={i === 0 || i === 11 ? 'rgba(0,212,255,0.5)' : 'rgba(41,121,255,0.28)'} />
        </g>
      ))}
      {[['FACE', 315, 270], ['VOICE', 580, 270], ['TEXT', 1072, 270]].map(([t, x, y]) => (
        <g key={t}>
          <rect x={x - 28} y={y - 15} width={56} height={20} rx="3" fill="rgba(13,32,64,.82)" stroke="rgba(41,121,255,0.28)" strokeWidth="0.8" />
          <text x={x} y={y} textAnchor="middle" fill="rgba(0,212,255,0.7)" fontFamily="Space Mono,monospace" fontSize="9">
            {t}
          </text>
        </g>
      ))}
      <rect x="1028" y="720" width="124" height="26" rx="5" fill="rgba(13,32,64,.88)" stroke="rgba(244,63,94,0.42)" strokeWidth="1" />
      <text x="1090" y="737" textAnchor="middle" fill="rgba(244,63,94,0.88)" fontFamily="Space Mono,monospace" fontSize="10">
        DECEPTIVE
      </text>
      <rect width="1440" height="220" y="680" fill="url(#bf3)" />
    </svg>
  );
}
