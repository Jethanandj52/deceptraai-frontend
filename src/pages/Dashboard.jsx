import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import DistributionBar from '../components/DistributionBar';
import Badge from '../components/Badge';
import {
  getDashboardStats,
  getInterviewsChart,
  getAssessmentDistribution,
  listInterviews,
} from '../services/api';

/** Dashboard — recruiter home: summary cards, recent interviews, chart, distribution. */
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [distribution, setDistribution] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(() => {});
    getInterviewsChart(7).then(setChart).catch(() => {});
    getAssessmentDistribution().then(setDistribution).catch(() => {});
    listInterviews().then((data) => setRecent(data.slice(0, 5))).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="flex flex-wrap gap-3 mb-6">
        <Link to="/interviews/create" className="px-4 py-2 rounded-lg bg-blue2 text-white text-sm font-bold">
          + Create Interview
        </Link>
        <Link to="/candidates" className="px-4 py-2 rounded-lg bg-white/[0.05] border border-border text-sm font-semibold text-slate-100">
          + Add Candidate
        </Link>
        <Link to="/questions" className="px-4 py-2 rounded-lg bg-white/[0.05] border border-border text-sm font-semibold text-slate-100">
          Question Bank
        </Link>
        <Link to="/reports" className="px-4 py-2 rounded-lg bg-white/[0.05] border border-border text-sm font-semibold text-slate-100">
          View Reports
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Interviews" value={stats?.totalInterviews ?? '—'} sublabel="All time" />
        <StatCard label="Completed" value={stats?.completed ?? '—'} sublabel={`${stats?.completionRate ?? 0}% completion`} accent="#10b981" />
        <StatCard label="Pending" value={stats?.pending ?? '—'} sublabel="Awaiting candidate" accent="#f59e0b" />
        <StatCard label="In Progress" value={stats?.inProgress ?? '—'} sublabel="Currently active" accent="#00d4ff" />
        <StatCard label="Avg. Assessment" value={`${stats?.avgAssessment ?? 0}%`} sublabel="Across completed" accent="#7c3aed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Interviews Overview (last 7 days)</h3>
          <BarChart data={chart} />
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Assessment Distribution</h3>
          {distribution ? (
            <DistributionBar low={distribution.low} moderate={distribution.moderate} high={distribution.high} />
          ) : (
            <p className="text-muted text-sm">No completed interviews yet.</p>
          )}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-4">Recent Interviews</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted text-xs uppercase font-mono border-b border-border">
              <th className="pb-2">Candidate</th>
              <th className="pb-2">Position</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Assessment</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((iv) => (
              <tr key={iv._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 text-slate-100">{iv.candidate?.name}</td>
                <td className="py-2.5 text-muted">{iv.position}</td>
                <td className="py-2.5 text-muted">{new Date(iv.createdAt).toLocaleDateString()}</td>
                <td className="py-2.5"><Badge status={iv.status} /></td>
                <td className="py-2.5 text-slate-100">{iv.overallScore != null ? `${Math.round(iv.overallScore)}%` : '—'}</td>
                <td className="py-2.5">
                  <Link to={`/interviews/${iv._id}/report`} className="text-blue2 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-muted">
                  No interviews yet — create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
