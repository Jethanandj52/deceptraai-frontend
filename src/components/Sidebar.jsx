import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth';

const LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/candidates', label: 'Candidates', icon: '👤' },
  { to: '/interviews', label: 'Interviews', icon: '🎤' },
  { to: '/questions', label: 'Question Bank', icon: '📝' },
  { to: '/reports', label: 'Reports', icon: '📊' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

/** Sidebar — responsive left navigation for admin/recruiter pages. */
export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            md:hidden
          "
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky
          top-0
          left-0
          z-50

          w-60
          flex-shrink-0

          bg-[var(--bg-secondary)]
          border-r border-[var(--border-color)]

          min-h-screen

          flex
          flex-col

          transition-transform
          duration-300

          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div
          className="
            px-4 sm:px-5
            py-4 sm:py-5
            border-b border-[var(--border-color)]
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {/* Project Logo + Name */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/logo.png"
              alt="DeceptionAI Logo"
              className="
                w-15
                h-15
                sm:w-10
                sm:h-10
                object-contain
                shrink-0
              "
            />

            <div
              className="
                text-lg sm:text-xl
                font-black
                tracking-tight
                text-[var(--text-primary)]
                truncate
              "
            >
              Deception<span className="text-blue-500">AI</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="
              md:hidden
              shrink-0
              text-[var(--text-secondary)]
              hover:text-[var(--text-primary)]
              text-xl
              transition-colors
            "
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="
            flex-1
            px-3
            py-4
            flex
            flex-col
            gap-1
            overflow-y-auto
          "
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                [
                  `
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                  `,
                  `
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                  `,
                  isActive
                    ? `
                      bg-blue-500/15
                      text-cyan-500
                      border
                      border-blue-500/30
                    `
                    : `
                      text-[var(--text-secondary)]
                      hover:bg-[var(--hover-bg)]
                      hover:text-[var(--text-primary)]
                    `,
                ].join(' ')
              }
            >
              <span className="text-base shrink-0">
                {l.icon}
              </span>

              <span className="truncate">
                {l.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div
          className="
            px-3
            py-4
            border-t border-[var(--border-color)]
          "
        >
          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg

              text-sm
              font-medium

              text-[var(--text-secondary)]

              hover:bg-red-500/10
              hover:text-red-500

              transition-colors
            "
          >
            <span className="shrink-0">
              🚪
            </span>

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}