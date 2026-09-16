import React, { useEffect, useRef, useState } from 'react';
import { getUser } from '../utils/auth';

export default function Topbar({ title, setIsOpen, theme, toggleTheme }) {
  const user = getUser();

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayName = user?.name || 'Recruiter';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <header
      className="
        h-16 flex-shrink-0
        flex items-center justify-between
        px-4 sm:px-6
        border-b border-[var(--border-color)]
        bg-[var(--bg-secondary)]
        sticky top-0 z-30
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(true)}
          className="
            md:hidden
            w-9 h-9 flex-shrink-0
            flex items-center justify-center
            rounded-lg
            bg-[var(--hover-bg)]
            text-[var(--text-primary)]
            hover:bg-blue-500/10
            transition-colors
          "
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Page Title */}
        <h1 className="text-lg font-bold text-[var(--text-primary)] truncate">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search…"
          className="
            hidden lg:block
            bg-[var(--input-bg)]
            border border-[var(--border-color)]
            rounded-lg
            px-3 py-1.5
            text-sm
            text-[var(--text-primary)]
            placeholder:text-[var(--text-secondary)]
            outline-none
            focus:border-blue-500
            w-52
          "
        />

        {/* Theme Button */}
        <button
          onClick={toggleTheme}
          className="
            w-9 h-9
            flex items-center justify-center
            rounded-lg
            bg-[var(--hover-bg)]
            border border-[var(--border-color)]
            hover:border-blue-500
            transition-all
          "
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Notification */}
        <button
          className="
            w-9 h-9
            flex items-center justify-center
            rounded-lg
            hover:bg-[var(--hover-bg)]
            transition-colors
          "
          aria-label="Notifications"
        >
          🔔
        </button>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>

          {/* Profile Button */}
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="
              flex items-center gap-2
              rounded-lg
              px-2 py-1.5
              hover:bg-[var(--hover-bg)]
              transition-all duration-200
              outline-none
            "
            aria-expanded={showProfile}
            aria-label="Open profile menu"
          >

            {/* Avatar */}
            <div
              className="
                w-8 h-8
                rounded-full
                flex items-center justify-center
                bg-blue-500
                text-white
                text-sm
                font-bold
                shadow-sm
              "
            >
              {avatarLetter}
            </div>

            {/* User Name */}
            <span
              className="
                hidden sm:block
                text-sm
                text-[var(--text-primary)]
                font-medium
                max-w-[130px]
                truncate
              "
            >
              {displayName}
            </span>

            {/* Arrow */}
            <span
              className={`
                hidden sm:block
                text-xs
                text-[var(--text-secondary)]
                transition-transform duration-300
                ${showProfile ? 'rotate-180' : 'rotate-0'}
              `}
            >
              ▾
            </span>
          </button>

          {/* Profile Dropdown */}
          <div
            className={`
              absolute right-0 top-full mt-3
              w-72 max-w-[calc(100vw-2rem)]
              bg-[var(--bg-secondary)]
              border border-[var(--border-color)]
              rounded-xl
              shadow-2xl
              overflow-hidden
              origin-top-right
              transition-all duration-200 ease-out
              ${
                showProfile
                  ? 'opacity-100 scale-100 translate-y-0 visible'
                  : 'opacity-0 scale-95 -translate-y-2 invisible'
              }
            `}
          >

            {/* Profile Header */}
            <div className="px-5 py-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3">

                {/* Large Avatar */}
                <div
                  className="
                    w-12 h-12
                    rounded-full
                    flex items-center justify-center
                    bg-blue-500
                    text-white
                    text-lg
                    font-bold
                    flex-shrink-0
                  "
                >
                  {avatarLetter}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-[var(--text-primary)] truncate">
                    {user?.name || 'Recruiter'}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                    {user?.role || 'Recruiter'}
                  </p>
                </div>

              </div>
            </div>

            {/* User Data */}
            <div className="px-5 py-4 space-y-4">

              {/* Name */}
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">
                  Name
                </p>

                <p className="text-sm font-medium text-[var(--text-primary)] break-words">
                  {user?.name || 'Not available'}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">
                  Email
                </p>

                <p className="text-sm font-medium text-[var(--text-primary)] break-all">
                  {user?.email || 'Not available'}
                </p>
              </div>

              {/* Role */}
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">
                  Role
                </p>

                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {user?.role || 'Recruiter'}
                </p>
              </div>

              {/* User ID */}
              {(user?._id || user?.id) && (
                <div>
                  <p className="text-xs text-[var(--text-secondary)] mb-1">
                    User ID
                  </p>

                  <p className="text-xs font-mono text-[var(--text-primary)] break-all">
                    {user?._id || user?.id}
                  </p>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[var(--border-color)]">
              <p className="text-xs text-[var(--text-secondary)] text-center">
                DeceptionAI Recruiter Account
              </p>
            </div>

          </div>
        </div>

      </div>
    </header>
  );
}