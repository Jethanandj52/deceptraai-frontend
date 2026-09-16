import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import CandidateShell from '../../components/CandidateShell';


const RULES = [
  'Keep your face visible to the camera',
  'Stay in a quiet, well-lit environment',
  'Keep your microphone enabled throughout',
  'Do not switch browser tabs during the interview',
  'Answer each question clearly and naturally',
  'Do not close or leave the interview window',
];


export default function InterviewInstructions() {
  const navigate =
    useNavigate();


  const handleStart =
    () => {
      navigate(
        '/interview/live'
      );
    };


  return (
    <CandidateShell>

      <h1 className="text-center text-lg font-bold text-white mb-5">
        Before You Begin
      </h1>


      <ul className="flex flex-col gap-2.5 mb-6">

        {RULES.map((r) => (
          <li
            key={r}
            className="flex items-start gap-2.5 text-sm text-slate-100"
          >

            <span className="text-blue2 mt-0.5">
              •
            </span>

            {r}

          </li>
        ))}

      </ul>


      <button
        onClick={
          handleStart
        }
        className="w-full py-3 rounded-lg bg-blue2 text-white font-bold text-sm"
      >
        I Understand — Start Interview
      </button>

    </CandidateShell>
  );
}