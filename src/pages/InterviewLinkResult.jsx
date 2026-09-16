import React, {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import AdminLayout from '../components/AdminLayout';

import {
  getInterview,
  sendInterviewEmail,
  apiErrorMessage,
} from '../services/api';


// =========================================================
// Interview Link Result
// =========================================================

export default function InterviewLinkResult() {

  const {
    id,
  } = useParams();


  const [
    interview,
    setInterview,
  ] = useState(null);


  const [
    copied,
    setCopied,
  ] = useState(false);


  const [
    sendingEmail,
    setSendingEmail,
  ] = useState(false);


  const [
    emailSent,
    setEmailSent,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState('');


  // =======================================================
  // Load Interview
  // =======================================================

  useEffect(() => {

    getInterview(id)

      .then(setInterview)

      .catch((err) => {

        setError(
          apiErrorMessage(
            err,
            'Unable to load interview.'
          )
        );

      });

  }, [id]);


  // =======================================================
  // Public Interview Link
  // =======================================================

  const link =
    `${window.location.origin}/interview`;


  // =======================================================
  // Copy Link
  // =======================================================

  const copyLink =
    async () => {

      await navigator.clipboard.writeText(
        link
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    };


  // =======================================================
  // Send Email
  // =======================================================

  const handleSendEmail =
    async () => {

      setSendingEmail(true);

      setError('');

      setEmailSent(false);

      try {

        await sendInterviewEmail(id);

        setEmailSent(true);

        setTimeout(() => {
          setEmailSent(false);
        }, 3000);

      } catch (err) {

        setError(
          apiErrorMessage(
            err,
            'Unable to send interview invitation.'
          )
        );

      } finally {

        setSendingEmail(false);

      }

    };


  // =======================================================
  // Loading
  // =======================================================

  if (!interview) {

    return (
      <AdminLayout title="Interview Link">

        {error ? (

          <p className="text-danger">
            {error}
          </p>

        ) : (

          <p className="text-muted">
            Loading...
          </p>

        )}

      </AdminLayout>
    );
  }


  // =======================================================
  // UI
  // =======================================================

  return (
    <AdminLayout title="Interview Created">

      <div className="max-w-xl bg-card border border-border rounded-xl p-8 text-center">

        <div className="text-success text-3xl mb-2">
          ✓
        </div>


        <h2 className="text-lg font-bold text-white mb-4">
          Interview Created Successfully
        </h2>


        {error && (

          <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2 mb-4">
            {error}
          </div>

        )}


        {emailSent && (

          <div className="text-xs text-green-300 bg-green-500/10 border border-green-500/25 rounded-lg px-3 py-2 mb-4">

            Interview invitation sent
            successfully to{' '}

            {interview.candidate?.email}

          </div>

        )}


        {/* Candidate Details */}

        <div className="text-left bg-white/[0.03] border border-border rounded-lg p-4 mb-5 text-sm">

          <div className="mb-2">

            <span className="text-muted">
              Candidate:{' '}
            </span>

            <span className="text-slate-100 font-medium">
              {interview.candidate?.name}
            </span>

          </div>


          <div className="mb-2">

            <span className="text-muted">
              Email:{' '}
            </span>

            <span className="text-slate-100 font-medium">
              {interview.candidate?.email}
            </span>

          </div>


          <div>

            <span className="text-muted">
              Position:{' '}
            </span>

            <span className="text-slate-100 font-medium">
              {interview.position}
            </span>

          </div>

        </div>


        {/* Public Link */}

        <div className="text-left mb-2">

          <p className="text-muted text-xs mb-2">
            Candidate Interview Link
          </p>

        </div>


        <div className="bg-navy2 border border-border rounded-lg px-4 py-3 mb-5 font-mono text-cyan text-sm break-all">
          {link}
        </div>


        {/* Explanation */}

        <div className="bg-blue2/5 border border-blue2/20 rounded-lg p-4 mb-5 text-left">

          <p className="text-blue2 text-sm font-semibold mb-1">
            Secure Interview Verification
          </p>

          <p className="text-muted text-xs leading-relaxed">
            The candidate does not receive an
            interview token in the URL. The
            candidate opens this link, enters
            their registered email address, and
            receives a 6-digit verification code
            by email.
          </p>

        </div>


        {/* Actions */}

        <div className="flex flex-wrap gap-3 justify-center">

          <button
            onClick={
              copyLink
            }
            className="px-4 py-2 rounded-lg bg-blue2 text-white text-sm font-bold"
          >
            {copied
              ? 'Copied!'
              : '📋 Copy Link'}
          </button>


          <button
            onClick={
              handleSendEmail
            }
            disabled={
              sendingEmail
            }
            className="px-4 py-2 rounded-lg bg-white/[0.05] border border-border text-sm font-semibold text-slate-100 disabled:opacity-50"
          >
            {sendingEmail
              ? 'Sending...'
              : emailSent
                ? '✓ Email Sent'
                : '✉ Send Email'}
          </button>


          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Please complete your interview here: ${link}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-white/[0.05] border border-border text-sm font-semibold text-slate-100"
          >
            💬 WhatsApp
          </a>

        </div>


        <Link
          to="/interviews"
          className="block mt-6 text-blue2 text-sm hover:underline"
        >
          Back to Interviews
        </Link>

      </div>

    </AdminLayout>
  );
}