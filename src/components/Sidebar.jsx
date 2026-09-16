import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth';

const LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/candidates', label: 'Candidates', icon: '👤' },
  { to: '/interviews', label: 'Interviews', icon: '🎤' },
  { to: '/questions', label: 'Question Bank', icon: '📝' },
  { to: '/reports', label: 'Reports', icon: '📊' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

/** Sidebar — left navigation for every admin/recruiter page. */
export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <aside className="w-60 flex-shrink-0 bg-navy2 border-r border-border min-h-screen flex flex-col">
      <div className="px-5 py-5 border-b border-border">
        <div className="text-xl font-black tracking-tight text-white">
          🤖 Deception<span className="text-blue2">AI</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive ? 'bg-blue2/15 text-cyan border border-blue2/30' : 'text-muted hover:bg-white/[0.04] hover:text-slate-100',
              ].join(' ')
            }
          >
            <span>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-white/[0.04] hover:text-danger transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
