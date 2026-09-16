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

          <p className="text-[var(--text-secondary)]">
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

      <div
        className="
          w-full
          max-w-xl
          mx-auto
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl
          p-4 sm:p-5 md:p-6 lg:p-8
          text-center
          transition-colors duration-300
        "
      >

        <div className="text-success text-3xl mb-2">
          ✓
        </div>


        <h2
          className="
            text-base sm:text-lg
            font-bold
            text-[var(--text-primary)]
            mb-4
          "
        >
          Interview Created Successfully
        </h2>


        {error && (

          <div
            className="
              text-xs
              text-rose-600 dark:text-rose-300
              bg-rose-500/10
              border border-rose-500/25
              rounded-lg
              px-3 py-2
              mb-4
              text-left
            "
          >
            {error}
          </div>

        )}


        {emailSent && (

          <div
            className="
              text-xs
              text-green-600 dark:text-green-300
              bg-green-500/10
              border border-green-500/25
              rounded-lg
              px-3 py-2
              mb-4
              text-left
            "
          >

            Interview invitation sent
            successfully to{' '}

            <span className="break-all">
              {interview.candidate?.email}
            </span>

          </div>

        )}


        {/* Candidate Details */}

        <div
          className="
            text-left
            bg-slate-500/[0.04]
            dark:bg-white/[0.03]
            border border-[var(--border-color)]
            rounded-lg
            p-3 sm:p-4
            mb-5
            text-sm
            transition-colors duration-300
          "
        >

          <div className="mb-2 flex flex-col sm:flex-row sm:gap-1">

            <span className="text-[var(--text-secondary)] shrink-0">
              Candidate:
            </span>

            <span
              className="
                text-[var(--text-primary)]
                font-medium
                break-words
              "
            >
              {interview.candidate?.name}
            </span>

          </div>


          <div className="mb-2 flex flex-col sm:flex-row sm:gap-1">

            <span className="text-[var(--text-secondary)] shrink-0">
              Email:
            </span>

            <span
              className="
                text-[var(--text-primary)]
                font-medium
                break-all
              "
            >
              {interview.candidate?.email}
            </span>

          </div>


          <div className="flex flex-col sm:flex-row sm:gap-1">

            <span className="text-[var(--text-secondary)] shrink-0">
              Position:
            </span>

            <span
              className="
                text-[var(--text-primary)]
                font-medium
                break-words
              "
            >
              {interview.position}
            </span>

          </div>

        </div>


        {/* Public Link */}

        <div className="text-left mb-2">

          <p
            className="
              text-[var(--text-secondary)]
              text-xs
              mb-2
            "
          >
            Candidate Interview Link
          </p>

        </div>


        <div
          className="
            bg-[var(--input-bg)]
            border border-[var(--border-color)]
            rounded-lg
            px-3 sm:px-4
            py-3
            mb-5
            font-mono
            text-cyan
            text-xs sm:text-sm
            break-all
            text-left
            transition-colors duration-300
          "
        >
          {link}
        </div>


        {/* Explanation */}

        <div
          className="
            bg-blue2/5
            border border-blue2/20
            rounded-lg
            p-3 sm:p-4
            mb-5
            text-left
          "
        >

          <p className="text-blue2 text-sm font-semibold mb-1">
            Secure Interview Verification
          </p>

          <p
            className="
              text-[var(--text-secondary)]
              text-xs
              leading-relaxed
            "
          >
            The candidate does not receive an
            interview token in the URL. The
            candidate opens this link, enters
            their registered email address, and
            receives a 6-digit verification code
            by email.
          </p>

        </div>


        {/* Actions */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-2 sm:gap-3
          "
        >

          <button
            onClick={
              copyLink
            }
            className="
              w-full
              px-4 py-2.5
              rounded-lg
              bg-blue2
              text-white
              text-sm
              font-bold
              hover:opacity-90
              transition-opacity
            "
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
            className="
              w-full
              px-4 py-2.5
              rounded-lg
              bg-slate-500/[0.05]
              dark:bg-white/[0.05]
              border border-[var(--border-color)]
              text-sm
              font-semibold
              text-[var(--text-primary)]
              disabled:opacity-50
              hover:bg-slate-500/[0.08]
              dark:hover:bg-white/[0.08]
              transition-colors
            "
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
            className="
              w-full
              px-4 py-2.5
              rounded-lg
              bg-slate-500/[0.05]
              dark:bg-white/[0.05]
              border border-[var(--border-color)]
              text-sm
              font-semibold
              text-[var(--text-primary)]
              text-center
              hover:bg-slate-500/[0.08]
              dark:hover:bg-white/[0.08]
              transition-colors
            "
          >
            💬 WhatsApp
          </a>

        </div>


        <Link
          to="/interviews"
          className="
            block
            mt-5 sm:mt-6
            text-blue2
            text-sm
            hover:underline
          "
        >
          Back to Interviews
        </Link>

      </div>

    </AdminLayout>
  );
}