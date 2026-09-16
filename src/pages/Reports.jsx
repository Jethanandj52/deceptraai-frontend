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
      iv.candidate?.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      iv.position
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      iv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Reports">

      {/* =====================================================
          Search + Filter
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-2 sm:gap-3
          mb-4 sm:mb-5
        "
      >
        <input
          type="text"
          placeholder="Search candidate or position…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            sm:w-64
            bg-[var(--input-bg)]
            border border-[var(--border-color)]
            rounded-lg
            px-3 py-2.5
            text-sm
            text-[var(--text-primary)]
            placeholder:text-[var(--text-secondary)]
            outline-none
            focus:border-blue2
            transition-colors
          "
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            w-full
            sm:w-auto
            min-w-0
            bg-[var(--input-bg)]
            border border-[var(--border-color)]
            rounded-lg
            px-3 py-2.5
            text-sm
            text-[var(--text-primary)]
            outline-none
            focus:border-blue2
            transition-colors
          "
        >
          <option
            value=""
            className="bg-[var(--bg-secondary)]"
          >
            All Statuses
          </option>

          <option
            value="Completed"
            className="bg-[var(--bg-secondary)]"
          >
            Completed
          </option>

          <option
            value="Pending"
            className="bg-[var(--bg-secondary)]"
          >
            Pending
          </option>

          <option
            value="InProgress"
            className="bg-[var(--bg-secondary)]"
          >
            In Progress
          </option>

          <option
            value="Expired"
            className="bg-[var(--bg-secondary)]"
          >
            Expired
          </option>
        </select>
      </div>


      {/* =====================================================
          Reports Table
      ====================================================== */}

      <div
        className="
          w-full
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl
          p-3 sm:p-4 md:p-5
          overflow-hidden
          transition-colors duration-300
        "
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">

            <thead>
              <tr
                className="
                  text-left
                  text-[var(--text-secondary)]
                  text-xs
                  uppercase
                  font-mono
                  border-b border-[var(--border-color)]
                "
              >
                <th className="pb-2 pr-4">
                  Candidate
                </th>

                <th className="pb-2 pr-4">
                  Position
                </th>

                <th className="pb-2 pr-4">
                  Score
                </th>

                <th className="pb-2 pr-4">
                  Date
                </th>

                <th className="pb-2">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((iv) => (
                <tr
                  key={iv._id}
                  className="
                    border-b
                    border-[var(--border-color)]/50
                    last:border-0
                  "
                >

                  <td
                    className="
                      py-3
                      pr-4
                      text-[var(--text-primary)]
                      font-medium
                      break-words
                    "
                  >
                    {iv.candidate?.name}
                  </td>

                  <td
                    className="
                      py-3
                      pr-4
                      text-[var(--text-secondary)]
                      break-words
                    "
                  >
                    {iv.position}
                  </td>

                  <td
                    className="
                      py-3
                      pr-4
                      text-[var(--text-primary)]
                      font-semibold
                      whitespace-nowrap
                    "
                  >
                    {iv.overallScore != null
                      ? `${Math.round(iv.overallScore)}%`
                      : '—'}
                  </td>

                  <td
                    className="
                      py-3
                      pr-4
                      text-[var(--text-secondary)]
                      whitespace-nowrap
                    "
                  >
                    {new Date(
                      iv.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="py-3">
                    {iv.status === 'Completed' ? (
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
                    ) : (
                      <span className="text-[var(--text-secondary)]">
                        —
                      </span>
                    )}
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="
                      py-8
                      text-center
                      text-[var(--text-secondary)]
                    "
                  >
                    No reports found.
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