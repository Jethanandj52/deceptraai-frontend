import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, apiErrorMessage } from '../services/api';
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
        await registerUser({ name, email, password });
        setMode('login');
        setError('');
      } else {
        const data = await loginUser({ email, password });
        setAuth(data.token, { id: data.id, name: data.name, email: data.email });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="text-2xl font-black text-white mb-1">
            🤖 Deception<span className="text-blue2">AI</span>
          </div>
          <p className="text-muted text-xs">AI Interview Assessment Platform</p>
        </div>

        <div className="grid grid-cols-2 gap-1.5 bg-white/[0.03] p-1.5 rounded-lg mb-5">
          <button
            onClick={() => setMode('login')}
            className={`py-2 rounded-md text-sm font-bold ${mode === 'login' ? 'bg-blue2 text-white' : 'text-muted'}`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`py-2 rounded-md text-sm font-bold ${mode === 'signup' ? 'bg-blue2 text-white' : 'text-muted'}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 py-2.5 rounded-lg bg-blue2 text-white font-bold text-sm disabled:opacity-60"
          >
            {submitting ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
