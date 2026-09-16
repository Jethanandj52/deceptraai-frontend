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
        <p className="text-muted">Loading…</p>
      </AdminLayout>
    );
  }

  const { candidate, interviews } = data;

  return (
    <AdminLayout title="Candidate Profile">
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
        <p className="text-muted text-sm mb-4">{candidate.position}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted text-xs font-mono uppercase mb-1">Email</div>
            <div className="text-slate-100">{candidate.email}</div>
          </div>
          <div>
            <div className="text-muted text-xs font-mono uppercase mb-1">Experience</div>
            <div className="text-slate-100">{candidate.experience || '—'}</div>
          </div>
          <div>
            <div className="text-muted text-xs font-mono uppercase mb-1">Position</div>
            <div className="text-slate-100">{candidate.position}</div>
          </div>
          <div>
            <div className="text-muted text-xs font-mono uppercase mb-1">Added On</div>
            <div className="text-slate-100">{new Date(candidate.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <Link
          to={`/interviews/create?candidateId=${candidate._id}`}
          className="inline-block mt-5 px-4 py-2 rounded-lg bg-blue2 text-white text-sm font-bold"
        >
          + Start New Interview
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Interview History</h3>
        <div className="flex flex-col gap-3">
          {interviews.map((iv) => (
            <div key={iv._id} className="flex items-center justify-between bg-white/[0.03] border border-border rounded-lg px-4 py-3">
              <div>
                <div className="text-slate-100 font-medium">{iv.position}</div>
                <div className="text-muted text-xs">{new Date(iv.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <Badge status={iv.status} />
                {iv.status === 'Completed' && (
                  <Link to={`/interviews/${iv._id}/report`} className="text-blue2 text-sm hover:underline">
                    View Report
                  </Link>
                )}
              </div>
            </div>
          ))}
          {interviews.length === 0 && <p className="text-muted text-sm">No interviews yet for this candidate.</p>}
        </div>
      </div>
    </AdminLayout>
  );
}
