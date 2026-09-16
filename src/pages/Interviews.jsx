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

      <div className="flex justify-end mb-4">

        <Link
          to="/interviews/create"
          className="px-4 py-2 rounded-lg bg-blue2 text-white text-sm font-bold"
        >
          + Create Interview
        </Link>

      </div>


      <div className="bg-card border border-border rounded-xl p-5">

        <table className="w-full text-sm">

          <thead>

            <tr className="text-left text-muted text-xs uppercase font-mono border-b border-border">

              <th className="pb-2">
                Candidate
              </th>

              <th className="pb-2">
                Position
              </th>

              <th className="pb-2">
                Link Status
              </th>

              <th className="pb-2">
                Created
              </th>

              <th className="pb-2">
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
                  className="border-b border-border/50 last:border-0"
                >

                  <td className="py-2.5 text-slate-100">
                    {iv.candidate?.name ||
                      'N/A'}
                  </td>


                  <td className="py-2.5 text-muted">
                    {iv.position}
                  </td>


                  <td className="py-2.5">

                    <Badge
                      status={
                        iv.linkStatus
                      }
                    />

                  </td>


                  <td className="py-2.5 text-muted">
                    {new Date(
                      iv.createdAt
                    ).toLocaleDateString()}
                  </td>


                  <td className="py-2.5 text-muted">
                    {iv.linkExpiresAt
                      ? new Date(
                          iv.linkExpiresAt
                        ).toLocaleDateString()
                      : 'N/A'}
                  </td>


                  <td className="py-2.5 flex gap-3">

                    <button
                      onClick={
                        copyLink
                      }
                      className="text-blue2 hover:underline"
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
                        className="text-blue2 hover:underline"
                      >
                        View
                      </Link>

                    )}

                  </td>

                </tr>

              )
            )}


            {interviews.length ===
              0 && (

              <tr>

                <td
                  colSpan={6}
                  className="py-6 text-center text-muted"
                >
                  No interviews yet.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}