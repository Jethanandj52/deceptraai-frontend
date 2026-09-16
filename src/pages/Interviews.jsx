import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import AdminLayout from '../components/AdminLayout';

import Badge from '../components/Badge';

import {
  listInterviews,
} from '../services/api';


// =========================================================
// Interviews
// =========================================================

export default function Interviews() {

  const [
    interviews,
    setInterviews,
  ] = useState([]);

  const [
    copiedId,
    setCopiedId,
  ] = useState(null);


  // =======================================================
  // Load Interviews
  // =======================================================

  useEffect(() => {

    listInterviews()
      .then(setInterviews)
      .catch(() => {});

  }, []);


  // =======================================================
  // Copy Candidate Link
  // =======================================================

  const copyLink =
    async () => {

      /*
       * IMPORTANT:
       *
       * Token is no longer exposed.
       *
       * Candidate opens /interview
       * and enters email.
       */

      const url =
        `${window.location.origin}/interview`;

      await navigator.clipboard.writeText(
        url
      );

      setCopiedId(
        'public-interview'
      );

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    };


  return (
    <AdminLayout title="Interviews">

      {/* =================================================
          Create Interview
      ================================================= */}

      <div className="flex justify-end mb-4 sm:mb-5">

        <Link
          to="/interviews/create"
          className="
            w-full sm:w-auto
            text-center
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
          + Create Interview
        </Link>

      </div>


      {/* =================================================
          Interview Table
      ================================================= */}

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

        {/* Horizontal scroll on smaller screens */}

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[800px] text-sm">

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
                  Link Status
                </th>

                <th className="pb-2 pr-4">
                  Created
                </th>

                <th className="pb-2 pr-4">
                  Expires
                </th>

                <th className="pb-2">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {interviews.map(
                (iv) => (

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
                      {iv.candidate?.name ||
                        'N/A'}
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


                    <td className="py-3 pr-4">

                      <Badge
                        status={
                          iv.linkStatus
                        }
                      />

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


                    <td
                      className="
                        py-3
                        pr-4
                        text-[var(--text-secondary)]
                        whitespace-nowrap
                      "
                    >
                      {iv.linkExpiresAt
                        ? new Date(
                            iv.linkExpiresAt
                          ).toLocaleDateString()
                        : 'N/A'}
                    </td>


                    <td className="py-3">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={
                            copyLink
                          }
                          className="
                            text-blue2
                            hover:underline
                            whitespace-nowrap
                          "
                        >
                          {copiedId ===
                          'public-interview'
                            ? 'Copied!'
                            : 'Copy Link'}
                        </button>


                        {iv.status ===
                          'Completed' && (

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

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}


              {interviews.length ===
                0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="
                      py-8
                      text-center
                      text-[var(--text-secondary)]
                    "
                  >
                    No interviews yet.
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