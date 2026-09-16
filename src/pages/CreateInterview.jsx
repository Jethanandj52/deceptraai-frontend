import React, {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import AdminLayout from '../components/AdminLayout';

import {
  listCandidates,
  listQuestions,
  createInterview,
  apiErrorMessage,
} from '../services/api';


// =========================================================
// Interview Types
// =========================================================

const TYPES = [
  'Technical',
  'HR',
  'Behavioral',
  'General',
];


// =========================================================
// Default Settings
// =========================================================

const DEFAULT_SETTINGS = {
  cameraRequired: true,
  micRequired: true,
  fullscreenRequired: false,
  faceAnalysis: true,
  voiceAnalysis: true,
  textAnalysis: true,
  autoRecording: true,
  durationMinutes: 30,
};


// =========================================================
// Create Interview
// =========================================================

export default function CreateInterview() {

  const navigate =
    useNavigate();

  const [
    params,
  ] = useSearchParams();


  const [
    candidates,
    setCandidates,
  ] = useState([]);


  const [
    questions,
    setQuestions,
  ] = useState([]);


  const [
    candidateId,
    setCandidateId,
  ] = useState(
    params.get('candidateId') || ''
  );


  const [
    position,
    setPosition,
  ] = useState('');


  const [
    type,
    setType,
  ] = useState('General');


  const [
    selectedQuestions,
    setSelectedQuestions,
  ] = useState([]);


  const [
    settings,
    setSettings,
  ] = useState(
    DEFAULT_SETTINGS
  );


  const [
    error,
    setError,
  ] = useState('');


  const [
    saving,
    setSaving,
  ] = useState(false);


  // =======================================================
  // Load Data
  // =======================================================

  useEffect(() => {

    listCandidates()
      .then(setCandidates)
      .catch(() => {});


    listQuestions()
      .then(setQuestions)
      .catch(() => {});

  }, []);


  // =======================================================
  // Candidate Position
  // =======================================================

  useEffect(() => {

    const candidate =
      candidates.find(
        (item) =>
          item._id === candidateId
      );

    if (candidate) {

      setPosition(
        candidate.position || ''
      );

    }

  }, [
    candidateId,
    candidates,
  ]);


  // =======================================================
  // Toggle Question
  // =======================================================

  const toggleQuestion =
    (question) => {

      setSelectedQuestions(
        (previous) => {

          const exists =
            previous.some(
              (item) =>
                item._id ===
                question._id
            );

          if (exists) {

            return previous.filter(
              (item) =>
                item._id !==
                question._id
            );

          }

          return [
            ...previous,
            question,
          ];

        }
      );

    };


  // =======================================================
  // Toggle Setting
  // =======================================================

  const toggleSetting =
    (key) => {

      setSettings(
        (previous) => ({
          ...previous,
          [key]:
            !previous[key],
        })
      );

    };


  // =======================================================
  // Submit
  // =======================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError('');

      if (
        !candidateId ||
        !position ||
        selectedQuestions.length === 0
      ) {

        setError(
          'Please select a candidate, position, and at least one question.'
        );

        return;
      }


      setSaving(true);


      try {

        const interview =
          await createInterview({

            candidateId,

            position,

            type,

            questions:
              selectedQuestions.map(
                (question) => ({

                  /*
                   * Keep the question ID.
                   *
                   * This is important because
                   * InterviewAnswer uses questionId.
                   */

                  questionId:
                    question._id,

                  text:
                    question.text,

                  category:
                    question.category ||
                    'General',

                  type:
                    question.type ||
                    'Paragraph',

                  options:
                    question.type ===
                    'MCQ'
                      ? (
                          question.options ||
                          []
                        )
                      : [],

                })
              ),

            settings,

          });


        navigate(
          `/interviews/${interview._id}/link`
        );

      } catch (err) {

        setError(
          apiErrorMessage(
            err,
            'Unable to create interview.'
          )
        );

      } finally {

        setSaving(false);

      }

    };


  return (
    <AdminLayout title="Create Interview">

      <form
        onSubmit={
          handleSubmit
        }
        className="max-w-2xl bg-card border border-border rounded-xl p-6 flex flex-col gap-6"
      >

        {/* ERROR */}

        {error && (

          <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2">
            {error}
          </div>

        )}


        {/* =================================================
            STEP 1
        ================================================= */}

        <div>

          <label className="block text-sm font-bold text-white mb-2">
            1. Select Candidate
          </label>


          <select
            value={candidateId}
            onChange={(event) =>
              setCandidateId(
                event.target.value
              )
            }
            className="w-full bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
          >

            <option value="">
              -- Choose a candidate --
            </option>


            {candidates.map(
              (candidate) => (

                <option
                  key={
                    candidate._id
                  }
                  value={
                    candidate._id
                  }
                >
                  {candidate.name}
                  {' '}
                  ({candidate.position})
                </option>

              )
            )}

          </select>

        </div>


        {/* =================================================
            STEP 2
        ================================================= */}

        <div>

          <label className="block text-sm font-bold text-white mb-2">
            2. Position
          </label>


          <input
            value={position}
            onChange={(event) =>
              setPosition(
                event.target.value
              )
            }
            placeholder="Software Engineer"
            className="w-full bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
          />

        </div>


        {/* =================================================
            STEP 3
        ================================================= */}

        <div>

          <label className="block text-sm font-bold text-white mb-2">
            3. Interview Type
          </label>


          <div className="flex gap-4 flex-wrap">

            {TYPES.map(
              (item) => (

                <label
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-100"
                >

                  <input
                    type="radio"
                    checked={
                      type === item
                    }
                    onChange={() =>
                      setType(item)
                    }
                  />

                  {item}

                </label>

              )
            )}

          </div>

        </div>


        {/* =================================================
            STEP 4
        ================================================= */}

        <div>

          <label className="block text-sm font-bold text-white mb-2">
            4. Select Questions
          </label>


          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto bg-navy2 border border-border rounded-lg p-3">

            {questions.map(
              (question) => (

                <label
                  key={
                    question._id
                  }
                  className="flex items-start gap-2 text-sm text-slate-100 cursor-pointer"
                >

                  <input
                    type="checkbox"
                    checked={selectedQuestions.some(
                      (item) =>
                        item._id ===
                        question._id
                    )}
                    onChange={() =>
                      toggleQuestion(
                        question
                      )
                    }
                    className="mt-1"
                  />


                  <div>

                    <div>
                      {question.text}
                    </div>


                    <div className="text-xs text-blue2 mt-1">

                      {question.type ||
                        'Paragraph'}


                      {question.type ===
                        'MCQ' &&
                        question.options
                          ?.length >
                          0 &&
                        ` • ${question.options.length} options`}

                    </div>

                  </div>

                </label>

              )
            )}


            {questions.length ===
              0 && (

              <p className="text-muted text-sm">
                No questions in your
                question bank yet.
              </p>

            )}

          </div>

        </div>


        {/* =================================================
            STEP 5
        ================================================= */}

        <div>

          <label className="block text-sm font-bold text-white mb-2">
            5. Interview Settings
          </label>


          <div className="grid grid-cols-2 gap-2">

            {[
              [
                'cameraRequired',
                'Camera Required',
              ],
              [
                'micRequired',
                'Microphone Required',
              ],
              [
                'fullscreenRequired',
                'Fullscreen Required',
              ],
              [
                'autoRecording',
                'Auto Recording',
              ],
              [
                'faceAnalysis',
                'Face Analysis',
              ],
              [
                'voiceAnalysis',
                'Voice Analysis',
              ],
              [
                'textAnalysis',
                'Text Analysis',
              ],
            ].map(
              ([key, label]) => (

                <label
                  key={key}
                  className="flex items-center gap-2 text-sm text-slate-100"
                >

                  <input
                    type="checkbox"
                    checked={
                      settings[key]
                    }
                    onChange={() =>
                      toggleSetting(
                        key
                      )
                    }
                  />

                  {label}

                </label>

              )
            )}

          </div>


          <div className="mt-3">

            <label className="block text-xs text-muted mb-1">
              Interview Duration
              {' '}
              (minutes)
            </label>


            <input
              type="number"
              min={5}
              max={120}
              value={
                settings.durationMinutes
              }
              onChange={(event) =>
                setSettings({
                  ...settings,
                  durationMinutes:
                    Number(
                      event.target.value
                    ),
                })
              }
              className="w-32 bg-navy2 border border-border rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue2"
            />

          </div>

        </div>


        {/* =================================================
            SUBMIT
        ================================================= */}

        <button
          disabled={saving}
          className="py-3 rounded-lg bg-blue2 text-white font-bold text-sm disabled:opacity-60"
        >

          {saving
            ? 'Creating...'
            : 'Generate Interview Link'}

        </button>

      </form>

    </AdminLayout>
  );
}