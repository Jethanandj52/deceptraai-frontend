import React, {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import CandidateShell from '../../components/CandidateShell';

import {
  verifyInterviewCandidate,
  sendInterviewVerificationCode,
  apiErrorMessage,
} from '../../services/api';


export default function InterviewVerify() {
  const navigate =
    useNavigate();


  const [
    email,
    setEmail,
  ] = useState('');


  const [
    verificationCode,
    setVerificationCode,
  ] = useState('');


  const [
    error,
    setError,
  ] = useState('');


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    resendLoading,
    setResendLoading,
  ] = useState(false);


  // ==========================================
  // Get email
  // ==========================================

  useEffect(() => {
    const savedEmail =
      sessionStorage.getItem(
        'interviewEmail'
      );

    if (!savedEmail) {
      navigate(
        '/interview',
        {
          replace: true,
        }
      );

      return;
    }

    setEmail(savedEmail);
  }, [navigate]);


  // ==========================================
  // Verify Code
  // ==========================================

  const handleVerify =
    async (e) => {
      e.preventDefault();

      setError('');

      if (!email.trim()) {
        setError(
          'Email address is missing.'
        );

        return;
      }

      if (
        !verificationCode.trim()
      ) {
        setError(
          'Please enter the verification code.'
        );

        return;
      }

      if (
        !/^\d{6}$/.test(
          verificationCode.trim()
        )
      ) {
        setError(
          'Verification code must be 6 digits.'
        );

        return;
      }

      setLoading(true);

      try {
        const result =
          await verifyInterviewCandidate(
            email.trim(),
            verificationCode.trim()
          );


        // Store candidate name
        if (
          result?.candidateName
        ) {
          sessionStorage.setItem(
            'candidateName',
            result.candidateName
          );
        }


        // Session is created by backend.
        // No token is stored.


        navigate(
          '/interview/check'
        );

      } catch (err) {
        setError(
          apiErrorMessage(
            err,
            'Invalid or expired verification code.'
          )
        );
      } finally {
        setLoading(false);
      }
    };


  // ==========================================
  // Resend Code
  // ==========================================

  const handleResend =
    async () => {
      setError('');

      if (!email.trim()) {
        setError(
          'Email address is missing.'
        );

        return;
      }

      setResendLoading(true);

      try {
        await sendInterviewVerificationCode(
          email.trim()
        );

        setVerificationCode('');

        setError('');

      } catch (err) {
        setError(
          apiErrorMessage(
            err,
            'Unable to resend verification code.'
          )
        );
      } finally {
        setResendLoading(false);
      }
    };


  return (
    <CandidateShell>

      <h1 className="text-center text-lg font-bold text-white mb-2">
        Verify Your Interview
      </h1>


      <p className="text-center text-muted text-sm mb-6">
        We have sent a 6-digit verification
        code to your email address.
      </p>


      {email && (
        <div className="bg-white/[0.03] border border-border rounded-lg px-4 py-3 mb-5 text-center">
          <p className="text-xs text-muted mb-1">
            Verification email
          </p>

          <p className="text-sm text-slate-100 break-all">
            {email}
          </p>
        </div>
      )}


      {error && (
        <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}


      <form
        onSubmit={handleVerify}
        className="flex flex-col gap-4"
      >

        <div>
          <label className="block text-sm font-bold text-white mb-2">
            Verification Code
          </label>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={verificationCode}
            onChange={(e) => {
              const value =
                e.target.value
                  .replace(/\D/g, '')
                  .slice(0, 6);

              setVerificationCode(
                value
              );
            }}
            placeholder="123456"
            maxLength={6}
            autoComplete="one-time-code"
            className="w-full bg-navy2 border border-border rounded-lg px-3 py-3 text-center text-xl tracking-[0.4em] font-mono text-slate-100 outline-none focus:border-blue2"
          />
        </div>


        <button
          type="submit"
          disabled={
            loading ||
            verificationCode.length !== 6
          }
          className="w-full py-3 rounded-lg bg-blue2 text-white font-bold text-sm disabled:opacity-50"
        >
          {loading
            ? 'Verifying...'
            : 'Verify & Continue'}
        </button>

      </form>


      <div className="text-center mt-5">

        <p className="text-muted text-xs mb-2">
          Didn't receive the code?
        </p>

        <button
          type="button"
          onClick={
            handleResend
          }
          disabled={resendLoading}
          className="text-blue2 text-sm font-bold disabled:opacity-50"
        >
          {resendLoading
            ? 'Sending...'
            : 'Resend Code'}
        </button>

      </div>


      <button
        type="button"
        onClick={() => {
          sessionStorage.removeItem(
            'interviewEmail'
          );

          navigate(
            '/interview'
          );
        }}
        className="w-full mt-5 text-xs text-muted hover:text-white"
      >
        Use a different email
      </button>

    </CandidateShell>
  );
}