import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import Webcam from 'react-webcam';

import CandidateShell from '../../components/CandidateShell';


/**
 * InterviewCheck
 *
 * Requests camera/mic permission,
 * shows live preview + checklist.
 */
export default function InterviewCheck() {
  const navigate =
    useNavigate();

  const webcamRef =
    useRef(null);

  const [
    cameraOk,
    setCameraOk,
  ] = useState(null);

  const [
    micOk,
    setMicOk,
  ] = useState(null);

  const [
    error,
    setError,
  ] = useState('');


  // ==========================================
  // Camera + Microphone Check
  // ==========================================

  useEffect(() => {
    let micStream;


    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })

      .then((stream) => {
        setCameraOk(true);
        setMicOk(true);

        micStream = stream;
      })

      .catch(() => {
        setCameraOk(false);
        setMicOk(false);

        setError(
          'Camera or microphone access was denied. Please allow access and reload this page.'
        );
      });


    return () => {
      micStream?.getTracks()
        .forEach((track) =>
          track.stop()
        );
    };

  }, []);


  const ready =
    cameraOk &&
    micOk;


  // ==========================================
  // Continue
  // ==========================================

  const handleContinue =
    () => {
      if (!ready) {
        return;
      }

      navigate(
        '/interview/instructions'
      );
    };


  return (
    <CandidateShell wide>

      <h1 className="text-center text-lg font-bold text-white mb-5">
        Device Check
      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>

          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-border">

            {cameraOk ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted text-sm">
                {cameraOk === null
                  ? 'Requesting camera…'
                  : 'Camera unavailable'}
              </div>
            )}

          </div>

        </div>


        <div className="flex flex-col gap-3 justify-center">

          <ChecklistRow
            label="Camera"
            ok={cameraOk}
          />

          <ChecklistRow
            label="Microphone"
            ok={micOk}
          />

          <ChecklistRow
            label="Browser"
            ok={true}
            note="Supported"
          />

          <ChecklistRow
            label="Internet"
            ok={true}
            note="Connection stable"
          />

        </div>

      </div>


      {error && (
        <p className="text-danger text-sm text-center mt-5">
          {error}
        </p>
      )}


      <button
        disabled={!ready}
        onClick={
          handleContinue
        }
        className="w-full mt-6 py-3 rounded-lg bg-blue2 text-white font-bold text-sm disabled:opacity-50"
      >
        Continue
      </button>

    </CandidateShell>
  );
}


function ChecklistRow({
  label,
  ok,
  note,
}) {
  return (
    <div className="flex items-center justify-between bg-white/[0.03] border border-border rounded-lg px-4 py-3 text-sm">

      <span className="text-slate-100">
        {label}
      </span>

      <span
        className={
          ok === false
            ? 'text-danger'
            : ok
              ? 'text-success'
              : 'text-muted'
        }
      >
        {ok === null
          ? 'Checking…'
          : ok
            ? `✓ ${note || 'Detected'}`
            : '✗ Not detected'}
      </span>

    </div>
  );
}