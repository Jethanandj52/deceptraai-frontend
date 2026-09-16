import React, { useState } from 'react';
import { registerUser, loginUser, apiErrorMessage } from '../services/api';
import { setAuth } from '../utils/auth';

/**
 * AuthModal
 * Login / signup dialog backed by the real DECEPTRA backend (Express + MongoDB + JWT).
 */
export default function AuthModal({ initialMode = 'login', onClose, onAuthenticated }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !password || (mode === 'signup' && !cleanName)) {
      setMessageType('error');
      setMessage('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setMessageType('error');
      setMessage('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'signup') {
        await registerUser({ name: cleanName, email: cleanEmail, password });
        setMessageType('ok');
        setMessage('Account created successfully. You can now log in.');
        setMode('login');
        setPassword('');
      } else {
        const data = await loginUser({ email: cleanEmail, password });
        const user = { id: data.id, name: data.name, email: data.email };
        setAuth(data.token, user);
        onAuthenticated(user);
      }
    } catch (err) {
      setMessageType('error');
      setMessage(apiErrorMessage(err, 'Unable to reach the DECEPTRA server. Is the backend running?'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[3000] bg-black/[0.72] backdrop-blur-md flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'login' ? 'Login' : 'Sign Up'}
        className="w-full max-w-[430px] rounded-[18px] p-6 shadow-2xl animate-auth-in"
        style={{ background: 'linear-gradient(145deg, #0d2040, #071225)', border: '1px solid #1a3a6b' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-extrabold text-white">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </div>
            <div className="text-muted text-xs mt-0.5">DECEPTRA Access</div>
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border border-border text-muted w-8 h-8 rounded-lg cursor-pointer text-base"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 bg-white/[0.03] p-1.5 rounded-lg mb-4">
          <button
            onClick={() => switchMode('login')}
            className={`border-none py-2 rounded-md cursor-pointer font-bold transition-colors ${
              mode === 'login' ? 'bg-blue2 text-white' : 'bg-transparent text-muted'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`border-none py-2 rounded-md cursor-pointer font-bold transition-colors ${
              mode === 'signup' ? 'bg-blue2 text-white' : 'bg-transparent text-muted'
            }`}
          >
            Sign Up
          </button>
        </div>

        {message && (
          <div
            className={`text-xs leading-relaxed mb-3 px-3 py-2.5 rounded-lg border ${
              messageType === 'error'
                ? 'text-rose-300 bg-rose-500/[0.09] border-rose-500/25'
                : 'text-emerald-300 bg-emerald-500/[0.08] border-emerald-500/[0.22]'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-3.5">
              <label className="block text-muted text-[0.72rem] font-mono mb-1.5">FULL NAME</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full bg-navy2 border border-border text-slate-100 rounded-lg px-3 py-3 outline-none focus:border-blue2 focus:shadow-[0_0_0_3px_rgba(41,121,255,0.1)] transition"
              />
            </div>
          )}

          <div className="mb-3.5">
            <label className="block text-muted text-[0.72rem] font-mono mb-1.5">EMAIL</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full bg-navy2 border border-border text-slate-100 rounded-lg px-3 py-3 outline-none focus:border-blue2 focus:shadow-[0_0_0_3px_rgba(41,121,255,0.1)] transition"
            />
          </div>

          <div className="mb-3.5">
            <label className="block text-muted text-[0.72rem] font-mono mb-1.5">PASSWORD</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              className="w-full bg-navy2 border border-border text-slate-100 rounded-lg px-3 py-3 outline-none focus:border-blue2 focus:shadow-[0_0_0_3px_rgba(41,121,255,0.1)] transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg border-none font-extrabold text-white cursor-pointer mt-1 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #1a6fff, #2979ff)' }}
          >
            {submitting ? 'Please wait…' : mode === 'login' ? '🔐 Log In' : '✨ Create Account'}
          </button>
        </form>

        <div className="text-center text-[0.64rem] text-slate-500 mt-3 leading-relaxed">
          Your account is stored securely on the DECEPTRA server (MongoDB + hashed password + JWT session).
        </div>
      </div>
    </div>
  );
}
