import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { listInterviews } from '../services/api';

/** Reports — searchable list of all interviews, linking into each full report. */
export default function Reports() {
  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    listInterviews().then(setInterviews).catch(() => {});
  }, []);

  const filtered = interviews.filter((iv) => {
    const matchesSearch =
      iv.candidate?.name.toLowerCase().includes(search.toLowerCase()) ||
      iv.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || iv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Reports">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search candidate or position…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/[0.04] border border-border rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue2 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/[0.04] border border-border rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue2"
        >
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted text-xs uppercase font-mono border-b border-border">
              <th className="pb-2">Candidate</th>
              <th className="pb-2">Position</th>
              <th className="pb-2">Score</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((iv) => (
              <tr key={iv._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 text-slate-100">{iv.candidate?.name}</td>
                <td className="py-2.5 text-muted">{iv.position}</td>
                <td className="py-2.5 text-slate-100">{iv.overallScore != null ? `${Math.round(iv.overallScore)}%` : '—'}</td>
                <td className="py-2.5 text-muted">{new Date(iv.createdAt).toLocaleDateString()}</td>
                <td className="py-2.5">
                  {iv.status === 'Completed' ? (
                    <Link to={`/interviews/${iv._id}/report`} className="text-blue2 hover:underline">
                      View
                    </Link>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
