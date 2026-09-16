import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getUser } from '../utils/auth';

const DEFAULTS_KEY = 'deceptionai_default_settings';

function loadDefaults() {
  try {
    return JSON.parse(localStorage.getItem(DEFAULTS_KEY)) || {
      cameraRequired: true,
      micRequired: true,
      autoRecording: true,
      faceAnalysis: true,
      voiceAnalysis: true,
      textAnalysis: true,
      multimodalFusion: true,
    };
  } catch {
    return {};
  }
}

/**
 * Settings — recruiter profile (read-only here) + default interview settings.
 * Note: these defaults are saved locally in the browser as a starting point for
 * the "Create Interview" form; they are not yet synced to the backend.
 */
export default function Settings() {
  const user = getUser();

  const [defaults, setDefaults] =
    useState(loadDefaults());

  const [saved, setSaved] =
    useState(false);

  const toggle = (key) =>
    setDefaults((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  const save = () => {
    localStorage.setItem(
      DEFAULTS_KEY,
      JSON.stringify(defaults)
    );

    setSaved(true);

    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <AdminLayout title="Settings">

      <div
        className="
          w-full
          max-w-xl
          mx-auto
          flex
          flex-col
          gap-4 sm:gap-5 md:gap-6
        "
      >

        {/* =====================================================
            Profile
        ====================================================== */}

        <div
          className="
            w-full
            bg-[var(--bg-secondary)]
            border border-[var(--border-color)]
            rounded-xl
            p-4 sm:p-5 md:p-6
            transition-colors duration-300
          "
        >
          <h3
            className="
              text-sm
              font-bold
              text-[var(--text-primary)]
              mb-4
            "
          >
            Profile
          </h3>

          <div
            className="
              text-sm
              text-[var(--text-primary)]
              mb-2
              break-words
            "
          >
            Name: {user?.name}
          </div>

          <div
            className="
              text-sm
              text-[var(--text-secondary)]
              break-all
            "
          >
            Email: {user?.email}
          </div>
        </div>


        {/* =====================================================
            Default Interview Settings
        ====================================================== */}

        <div
          className="
            w-full
            bg-[var(--bg-secondary)]
            border border-[var(--border-color)]
            rounded-xl
            p-4 sm:p-5 md:p-6
            transition-colors duration-300
          "
        >
          <h3
            className="
              text-sm
              font-bold
              text-[var(--text-primary)]
              mb-4
            "
          >
            Default Interview Settings
          </h3>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-2 sm:gap-3
              mb-5
            "
          >
            {[
              ['cameraRequired', 'Camera Required'],
              ['micRequired', 'Microphone Required'],
              ['autoRecording', 'Auto Recording'],
              ['faceAnalysis', 'Face Analysis'],
              ['voiceAnalysis', 'Voice Analysis'],
              ['textAnalysis', 'Text Analysis'],
              ['multimodalFusion', 'Multimodal Fusion'],
            ].map(([key, label]) => (
              <label
                key={key}
                className="
                  flex
                  items-center
                  gap-2.5
                  min-w-0
                  p-2.5
                  rounded-lg
                  bg-slate-500/[0.04]
                  dark:bg-white/[0.03]
                  border border-[var(--border-color)]/60
                  text-sm
                  text-[var(--text-primary)]
                  cursor-pointer
                  transition-colors
                "
              >
                <input
                  type="checkbox"
                  checked={!!defaults[key]}
                  onChange={() => toggle(key)}
                  className="
                    w-4
                    h-4
                    shrink-0
                    accent-blue-600
                    cursor-pointer
                  "
                />

                <span className="break-words">
                  {label}
                </span>
              </label>
            ))}
          </div>


          {/* =================================================
              Save Button
          ================================================== */}

          <button
            onClick={save}
            className="
              w-full
              sm:w-auto
              px-4
              py-2.5
              rounded-lg
              bg-blue2
              text-white
              text-sm
              font-bold
              hover:opacity-90
              transition-opacity
            "
          >
            {saved
              ? 'Saved ✓'
              : 'Save Defaults'}
          </button>
        </div>

      </div>

    </AdminLayout>
  );
}