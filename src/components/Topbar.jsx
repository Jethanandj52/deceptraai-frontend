import React from 'react';
import { getUser } from '../utils/auth';

/** Topbar — page title + search placeholder + logged-in recruiter's name. */
export default function Topbar({ title }) {
  const user = getUser();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-navy2/60">
      <h1 className="text-lg font-bold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search…"
          className="hidden sm:block bg-white/[0.04] border border-border rounded-lg px-3 py-1.5 text-sm text-slate-100 placeholder:text-muted outline-none focus:border-blue2 w-52"
        />
        <span className="text-muted text-lg">🔔</span>
        <span className="text-sm text-slate-100 font-medium">{user?.name || 'Recruiter'} ▾</span>
      </div>
    </header>
  );
}
