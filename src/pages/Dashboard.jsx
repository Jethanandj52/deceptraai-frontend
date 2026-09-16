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
    listInterviews()
      .then((data) => setRecent(data.slice(0, 5)))
      .catch(() => {});
  }, []);

  return (
    <AdminLayout title="Dashboard">

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
        <Link
          to="/interviews/create"
          className="
            w-full xs:w-auto
            px-4 py-2.5
            rounded-lg
            bg-blue2
            text-white
            text-sm
            font-bold
            text-center
            hover:opacity-90
            transition-opacity
          "
        >
          + Create Interview
        </Link>

        <Link
          to="/candidates"
          className="
            w-full xs:w-auto
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
          + Add Candidate
        </Link>

        <Link
          to="/questions"
          className="
            w-full xs:w-auto
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
          Question Bank
        </Link>

        <Link
          to="/reports"
          className="
            w-full xs:w-auto
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
          View Reports
        </Link>
      </div>


      {/* Statistics */}
      <div className="
        grid
        grid-cols-1
        xs:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-5
        gap-3 sm:gap-4
        mb-5 sm:mb-6
      ">
        <StatCard
          label="Total Interviews"
          value={stats?.totalInterviews ?? '—'}
          sublabel="All time"
        />

        <StatCard
          label="Completed"
          value={stats?.completed ?? '—'}
          sublabel={`${stats?.completionRate ?? 0}% completion`}
          accent="#10b981"
        />

        <StatCard
          label="Pending"
          value={stats?.pending ?? '—'}
          sublabel="Awaiting candidate"
          accent="#f59e0b"
        />

        <StatCard
          label="In Progress"
          value={stats?.inProgress ?? '—'}
          sublabel="Currently active"
          accent="#00d4ff"
        />

        <StatCard
          label="Avg. Assessment"
          value={`${stats?.avgAssessment ?? 0}%`}
          sublabel="Across completed"
          accent="#7c3aed"
        />
      </div>


      {/* Charts */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-3 sm:gap-4
        mb-5 sm:mb-6
      ">

        <div
          className="
            bg-[var(--bg-secondary)]
            border border-[var(--border-color)]
            rounded-xl
            p-4 sm:p-5
            min-w-0
            transition-colors duration-300
          "
        >
          <h3 className="
            text-sm
            font-bold
            text-[var(--text-primary)]
            mb-4
          ">
            Interviews Overview (last 7 days)
          </h3>

          <div className="w-full overflow-hidden">
            <BarChart data={chart} />
          </div>
        </div>


        <div
          className="
            bg-[var(--bg-secondary)]
            border border-[var(--border-color)]
            rounded-xl
            p-4 sm:p-5
            min-w-0
            transition-colors duration-300
          "
        >
          <h3 className="
            text-sm
            font-bold
            text-[var(--text-primary)]
            mb-4
          ">
            Assessment Distribution
          </h3>

          {distribution ? (
            <DistributionBar
              low={distribution.low}
              moderate={distribution.moderate}
              high={distribution.high}
            />
          ) : (
            <p className="
              text-[var(--text-secondary)]
              text-sm
            ">
              No completed interviews yet.
            </p>
          )}
        </div>

      </div>


      {/* Recent Interviews */}
      <div
        className="
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl
          p-3 sm:p-4 md:p-5
          min-w-0
          transition-colors duration-300
          overflow-hidden
        "
      >

        <h3 className="
          text-sm
          font-bold
          text-[var(--text-primary)]
          mb-4
        ">
          Recent Interviews
        </h3>


        {/* Horizontal scroll on mobile */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">

            <thead>
              <tr className="
                text-left
                text-[var(--text-secondary)]
                text-xs
                uppercase
                font-mono
                border-b border-[var(--border-color)]
              ">
                <th className="pb-2 pr-4">Candidate</th>
                <th className="pb-2 pr-4">Position</th>
                <th className="pb-2 pr-4">Date</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Assessment</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>


            <tbody>
              {recent.map((iv) => (

                <tr
                  key={iv._id}
                  className="
                    border-b
                    border-[var(--border-color)]/50
                    last:border-0
                  "
                >

                  <td className="
                    py-2.5
                    pr-4
                    text-[var(--text-primary)]
                  ">
                    {iv.candidate?.name}
                  </td>


                  <td className="
                    py-2.5
                    pr-4
                    text-[var(--text-secondary)]
                  ">
                    {iv.position}
                  </td>


                  <td className="
                    py-2.5
                    pr-4
                    text-[var(--text-secondary)]
                  ">
                    {new Date(
                      iv.createdAt
                    ).toLocaleDateString()}
                  </td>


                  <td className="py-2.5 pr-4">
                    <Badge status={iv.status} />
                  </td>


                  <td className="
                    py-2.5
                    pr-4
                    text-[var(--text-primary)]
                  ">
                    {iv.overallScore != null
                      ? `${Math.round(iv.overallScore)}%`
                      : '—'}
                  </td>


                  <td className="py-2.5">
                    <Link
                      to={`/interviews/${iv._id}/report`}
                      className="
                        text-blue2
                        hover:underline
                        whitespace-nowrap
                      "
                    >
                      View
                    </Link>
                  </td>

                </tr>

              ))}


              {recent.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="
                      py-6
                      text-center
                      text-[var(--text-secondary)]
                    "
                  >
                    No interviews yet — create one to get started.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

      </div>

    </AdminLayout>
  );
}