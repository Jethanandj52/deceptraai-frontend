import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  registerUser,
  loginUser,
  apiErrorMessage,
} from '../services/api';
import { setAuth } from '../utils/auth';

/** Login — recruiter/admin sign-in and sign-up page. */
export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'signup') {
        await registerUser({
          name,
          email,
          password,
        });

        setMode('login');
        setError('');
      } else {
        const data = await loginUser({
          email,
          password,
        });

        setAuth(data.token, {
          id: data.id,
          name: data.name,
          email: data.email,
        });

        navigate('/dashboard');
      }
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
        flex
        items-center
        justify-center
        p-3 sm:p-4
        transition-colors
        duration-300
      "
    >
      <div
        className="
          w-full
          max-w-sm
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl sm:rounded-2xl
          p-5 sm:p-6 md:p-8
          transition-colors
          duration-300
        "
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img
              src="/logo.png"
              alt="DeceptionAI Logo"
              className="
                w-11
                h-11
                sm:w-12
                sm:h-12
                object-contain
                shrink-0
              "
            />

            <div
              className="
                text-xl sm:text-2xl
                font-black
                tracking-tight
                text-[var(--text-primary)]
              "
            >
              Deception<span className="text-blue2">AI</span>
            </div>
          </div>

          <p
            className="
              text-[var(--text-secondary)]
              text-xs
            "
          >
            AI Interview Assessment Platform
          </p>
        </div>

        {/* Login / Signup Tabs */}
        <div
          className="
            grid
            grid-cols-2
            gap-1.5
            bg-slate-500/[0.04]
            dark:bg-white/[0.03]
            p-1.5
            rounded-lg
            mb-5
            border border-[var(--border-color)]/50
          "
        >
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`
              py-2
              rounded-md
              text-sm
              font-bold
              transition-colors
              ${
                mode === 'login'
                  ? 'bg-blue2 text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`
              py-2
              rounded-md
              text-sm
              font-bold
              transition-colors
              ${
                mode === 'signup'
                  ? 'bg-blue2 text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              text-xs
              text-rose-600
              dark:text-rose-300
              bg-rose-500/10
              border border-rose-500/25
              rounded-lg
              px-3
              py-2
              mb-4
              break-words
            "
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            flex
            flex-col
            gap-3
          "
        >
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                bg-[var(--input-bg)]
                border border-[var(--border-color)]
                rounded-lg
                px-3
                py-2.5
                text-sm
                text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]
                outline-none
                focus:border-blue2
                transition-colors
              "
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              bg-[var(--input-bg)]
              border border-[var(--border-color)]
              rounded-lg
              px-3
              py-2.5
              text-sm
              text-[var(--text-primary)]
              placeholder:text-[var(--text-secondary)]
              outline-none
              focus:border-blue2
              transition-colors
            "
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              bg-[var(--input-bg)]
              border border-[var(--border-color)]
              rounded-lg
              px-3
              py-2.5
              text-sm
              text-[var(--text-primary)]
              placeholder:text-[var(--text-secondary)]
              outline-none
              focus:border-blue2
              transition-colors
            "
          />

          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              mt-1
              py-2.5
              rounded-lg
              bg-blue2
              text-white
              font-bold
              text-sm
              disabled:opacity-60
              hover:enabled:opacity-90
              transition-opacity
            "
          >
            {submitting
              ? 'Please wait…'
              : mode === 'login'
                ? 'Log In'
                : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}