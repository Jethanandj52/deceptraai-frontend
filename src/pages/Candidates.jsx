import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import {
  listCandidates,
  createCandidate,
  apiErrorMessage,
} from '../services/api';

/** Candidates — list all candidates, with an "Add Candidate" modal form. */
export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    experience: '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => listCandidates().then(setCandidates).catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await createCandidate(form);
      setForm({
        name: '',
        email: '',
        position: '',
        experience: '',
      });
      setShowModal(false);
      load();
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Candidates">
      <div
        className="
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          mb-4
        "
      >
        <input
          type="text"
          placeholder="Search candidate…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full sm:w-64
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

        <button
          onClick={() => setShowModal(true)}
          className="
            w-full sm:w-auto
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
          + Add Candidate
        </button>
      </div>

      <div
        className="
          bg-[var(--bg-secondary)]
          border border-[var(--border-color)]
          rounded-xl
          p-3 sm:p-4 md:p-5
          transition-colors duration-300
          overflow-hidden
        "
      >
        {/* Responsive table scroll on small screens */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead>
              <tr className="text-left text-[var(--text-secondary)] text-xs uppercase font-mono border-b border-[var(--border-color)]">
                <th className="pb-2 pr-4">Candidate</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Position</th>
                <th className="pb-2 pr-4">Interviews</th>
                <th className="pb-2 pr-4">Last Interview</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-[var(--border-color)]/50 last:border-0"
                >
                  <td className="py-2.5 pr-4 text-[var(--text-primary)]">
                    {c.name}
                  </td>

                  <td className="py-2.5 pr-4 text-[var(--text-secondary)]">
                    {c.email}
                  </td>

                  <td className="py-2.5 pr-4 text-[var(--text-secondary)]">
                    {c.position}
                  </td>

                  <td className="py-2.5 pr-4 text-[var(--text-secondary)]">
                    {c.interviewCount}
                  </td>

                  <td className="py-2.5 pr-4 text-[var(--text-secondary)]">
                    {c.lastInterviewDate
                      ? new Date(c.lastInterviewDate).toLocaleDateString()
                      : '—'}
                  </td>

                  <td className="py-2.5">
                    <Link
                      to={`/candidates/${c._id}`}
                      className="text-blue2 hover:underline whitespace-nowrap"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-[var(--text-secondary)]"
                  >
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal
          title="Add Candidate"
          onClose={() => setShowModal(false)}
        >
          {error && (
            <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2 mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="
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

            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="
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

            <input
              required
              placeholder="Position (e.g. Software Engineer)"
              value={form.position}
              onChange={(e) =>
                setForm({ ...form, position: e.target.value })
              }
              className="
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

            <input
              placeholder="Experience (optional)"
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
              className="
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

            <button
              disabled={saving}
              className="
                mt-1
                py-2.5
                rounded-lg
                bg-blue2
                text-white
                font-bold
                text-sm
                disabled:opacity-60
                hover:enabled:opacity-90
                transition-opacity
              "
            >
              {saving ? 'Saving…' : 'Add Candidate'}
            </button>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
}