import React, {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import CandidateShell from '../../components/CandidateShell';

import {
  getInvitation,
  sendInterviewVerificationCode,
  apiErrorMessage,
} from '../../services/api';


export default function InterviewInvite() {
  const navigate =
    useNavigate();

  const [
    invite,
    setInvite,
  ] = useState(null);

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    error,
    setError,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);


  // ==========================================
  // Load public interview page
  // ==========================================

  useEffect(() => {
    getInvitation()
      .then((data) => {
        setInvite(data);
      })
      .catch((err) => {
        setError(
          apiErrorMessage(
            err,
            'Unable to open interview.'
          )
        );
      });
  }, []);


  // ==========================================
  // Send Verification Code
  // ==========================================

  const handleSendCode =
    async (e) => {
      e.preventDefault();

      setError('');

      if (!email.trim()) {
        setError(
          'Please enter your email address.'
        );

        return;
      }

      setLoading(true);

      try {
        await sendInterviewVerificationCode(
          email.trim()
        );

        // Save email temporarily
        sessionStorage.setItem(
          'interviewEmail',
          email.trim()
        );

        // Go to OTP page
        navigate(
          '/interview/verify'
        );
      } catch (err) {
        setError(
          apiErrorMessage(
            err,
            'Unable to send verification code.'
          )
        );
      } finally {
        setLoading(false);
      }
    };


  // ==========================================
  // Loading
  // ==========================================

  if (!invite && !error) {
    return (
      <CandidateShell>
        <p className="text-center text-muted text-sm">
          Loading…
        </p>
      </CandidateShell>
    );
  }


  // ==========================================
  // Error
  // ==========================================

  if (error && !invite) {
    return (
      <CandidateShell>
        <p className="text-center text-danger text-sm">
          {error}
        </p>
      </CandidateShell>
    );
  }


  return (
    <CandidateShell>

      <h1 className="text-center text-2xl font-bold text-white mb-2">
        AI Interview Assessment
      </h1>

      <p className="text-center text-blue2 text-sm mb-5">
        Candidate Verification
      </p>

      <p className="text-center text-muted text-sm mb-6">
        Enter the email address that received
        the interview invitation.
      </p>


      {error && (
        <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}


      <form
        onSubmit={handleSendCode}
        className="flex flex-col gap-4"
      >

        <div>
          <label className="block text-sm font-bold text-white mb-2">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="candidate@example.com"
            autoComplete="email"
            className="w-full bg-navy2 border border-border rounded-lg px-3 py-3 text-sm text-slate-100 outline-none focus:border-blue2"
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue2 text-white font-bold text-sm disabled:opacity-50"
        >
          {loading
            ? 'Sending Code...'
            : 'Send Verification Code'}
        </button>

      </form>


      <p className="text-center text-muted text-xs mt-4">
        A 6-digit verification code will be
        sent to your email.
      </p>

    </CandidateShell>
  );
}