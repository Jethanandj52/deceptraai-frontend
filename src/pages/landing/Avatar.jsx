import React from 'react';

const PALETTES = [
  ['#1a6fff', '#00d4ff'],
  ['#7c3aed', '#2979ff'],
  ['#0ea5e9', '#10b981'],
  ['#f59e0b', '#ef4444'],
];

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function hashIndex(str, mod) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 1000;
  return h % mod;
}

/**
 * Avatar
 * Generated initials avatar used as a stand-in for team photos.
 * Swap the `src` prop with a real photo URL/import when available:
 *   <Avatar name="Jane Doe" src={janePhoto} className="..." />
 */
export default function Avatar({ name, src, className = '', shape = 'circle' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${className} ${shape === 'circle' ? 'rounded-full' : 'rounded-xl'} object-cover object-top`}
      />
    );
  }

  const [c1, c2] = PALETTES[hashIndex(name, PALETTES.length)];

  return (
    <div
      className={`${className} ${shape === 'circle' ? 'rounded-full' : 'rounded-xl'} flex items-center justify-center font-mono font-bold text-white`}
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      {initials(name)}
    </div>
  );
}
