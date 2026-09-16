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
  const [defaults, setDefaults] = useState(loadDefaults());
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setDefaults((prev) => ({ ...prev, [key]: !prev[key] }));

  const save = () => {
    localStorage.setItem(DEFAULTS_KEY, JSON.stringify(defaults));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-xl flex flex-col gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">Profile</h3>
          <div className="text-sm text-slate-100 mb-1">Name: {user?.name}</div>
          <div className="text-sm text-muted">Email: {user?.email}</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">Default Interview Settings</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              ['cameraRequired', 'Camera Required'],
              ['micRequired', 'Microphone Required'],
              ['autoRecording', 'Auto Recording'],
              ['faceAnalysis', 'Face Analysis'],
              ['voiceAnalysis', 'Voice Analysis'],
              ['textAnalysis', 'Text Analysis'],
              ['multimodalFusion', 'Multimodal Fusion'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-slate-100">
                <input type="checkbox" checked={!!defaults[key]} onChange={() => toggle(key)} />
                {label}
              </label>
            ))}
          </div>
          <button onClick={save} className="px-4 py-2 rounded-lg bg-blue2 text-white text-sm font-bold">
            {saved ? 'Saved ✓' : 'Save Defaults'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
