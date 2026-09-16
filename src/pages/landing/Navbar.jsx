import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Navbar
 * Fixed top navigation for the marketing site (Home page).
 */
export default function Navbar({
  currentUser,
  onDashboard,
  onLogout,
  onRequireAuth,
}) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] h-16 flex items-center justify-between px-[5%] bg-navy/[0.93] border-b border-blue2/[0.15] backdrop-blur-2xl">

      <div className="text-2xl font-black tracking-tighter text-white">
        DEC
        <span className="text-blue2 drop-shadow-[0_0_20px_rgba(41,121,255,0.5)]">
          EPTRA
        </span>
      </div>

      <ul className="hidden md:flex gap-6 list-none">

        <li>
          <a
            href="#"
            className="text-white text-[0.82rem] font-medium no-underline"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="#how"
            className="text-muted hover:text-white text-[0.82rem] font-medium no-underline transition-colors"
          >
            How It Works
          </a>
        </li>

        <li>
          <a
            href="#about"
            className="text-muted hover:text-white text-[0.82rem] font-medium no-underline transition-colors"
          >
            About
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className="text-muted hover:text-white text-[0.82rem] font-medium no-underline transition-colors"
          >
            Contact
          </a>
        </li>

      </ul>

      <div className="flex items-center gap-2.5">

        {currentUser && (
          <span className="font-mono text-[0.68rem] text-muted hidden sm:inline">
            Hi, {currentUser.name}
          </span>
        )}

        <button
          onClick={() => navigate('/interview')}
          className="bg-blue2 border-none text-white px-5 py-2 rounded-lg text-[0.82rem] font-bold shadow-[0_4px_20px_rgba(41,121,255,0.35)] hover:opacity-90 hover:scale-[1.03] transition-transform"
        >
          Get Start
        </button>

      </div>

    </nav>
  );
}