import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import Badge from '../components/Badge';
import { getCandidate } from '../services/api';

/** CandidateProfile — one candidate's details + their past interviews. */
export default function CandidateProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCandidate(id).then(setData).catch(() => {});
  }, [id]);

  if (!data) {
    return (
      <AdminLayout title="Candidate">
        <p className="text-[var(--text-secondary)]">Loading…</p>
      </AdminLayout>
    );
  }

  const { candidate, interviews } = data;

  return (
    <AdminLayout title="Candidate Profile">
      <div
        className="
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl
          p-4 sm:p-5 md:p-6
          mb-5 sm:mb-6
          transition-colors duration-300
        "
      >
        <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] break-words">
          {candidate.name}
        </h2>

        <p className="text-[var(--text-secondary)] text-sm mb-4 break-words">
          {candidate.position}
        </p>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="min-w-0">
            <div className="text-[var(--text-secondary)] text-xs font-mono uppercase mb-1">
              Email
            </div>
            <div className="text-[var(--text-primary)] break-all">
              {candidate.email}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[var(--text-secondary)] text-xs font-mono uppercase mb-1">
              Experience
            </div>
            <div className="text-[var(--text-primary)] break-words">
              {candidate.experience || '—'}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[var(--text-secondary)] text-xs font-mono uppercase mb-1">
              Position
            </div>
            <div className="text-[var(--text-primary)] break-words">
              {candidate.position}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[var(--text-secondary)] text-xs font-mono uppercase mb-1">
              Added On
            </div>
            <div className="text-[var(--text-primary)]">
              {new Date(candidate.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <Link
          to={`/interviews/create?candidateId=${candidate._id}`}
          className="
            inline-block
            w-full sm:w-auto
            text-center
            mt-5
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
          + Start New Interview
        </Link>
      </div>

      <div
        className="
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl
          p-4 sm:p-5 md:p-6
          transition-colors duration-300
        "
      >
        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">
          Interview History
        </h3>

        <div className="flex flex-col gap-3">
          {interviews.map((iv) => (
            <div
              key={iv._id}
              className="
                flex flex-col sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                bg-slate-500/[0.04]
                dark:bg-white/[0.03]
                border border-[var(--border-color)]
                rounded-lg
                px-3 sm:px-4
                py-3
              "
            >
              <div className="min-w-0">
                <div className="text-[var(--text-primary)] font-medium break-words">
                  {iv.position}
                </div>

                <div className="text-[var(--text-secondary)] text-xs mt-0.5">
                  {new Date(iv.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                <Badge status={iv.status} />

                {iv.status === 'Completed' && (
                  <Link
                    to={`/interviews/${iv._id}/report`}
                    className="text-blue2 text-sm hover:underline whitespace-nowrap"
                  >
                    View Report
                  </Link>
                )}
              </div>
            </div>
          ))}

          {interviews.length === 0 && (
            <p className="text-[var(--text-secondary)] text-sm">
              No interviews yet for this candidate.
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}