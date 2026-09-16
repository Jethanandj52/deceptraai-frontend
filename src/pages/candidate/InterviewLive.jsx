import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Webcam from "react-webcam";

import CandidateShell from "../../components/CandidateShell";

import {
  startPublicInterview,
  submitPublicAnswer,
  completePublicInterview,
  apiErrorMessage,
} from "../../services/api";

// =========================================================
// Text To Speech
// =========================================================

function speakQuestion(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(
    utterance
  );
}

// =========================================================
// Speech Recognition
// =========================================================

function createRecognizer(
  onTranscriptUpdate
) {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition =
    new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  let fullTranscript = "";

  recognition.onresult = (event) => {
    for (
      let i = event.resultIndex;
      i < event.results.length;
      i += 1
    ) {
      if (
        event.results[i].isFinal
      ) {
        fullTranscript +=
          ` ${event.results[i][0].transcript}`;

        onTranscriptUpdate(
          fullTranscript.trim()
        );
      }
    }
  };

  recognition.onerror = () => {
    // Speech recognition is optional.
  };

  return recognition;
}

// =========================================================
// Interview Live
// =========================================================

export default function InterviewLive() {
  const navigate = useNavigate();

  // =======================================================
  // Refs
  // =======================================================

  const webcamRef = useRef(null);

  const mediaRecorderRef =
    useRef(null);

  const audioChunksRef =
    useRef([]);

  const recognitionRef =
    useRef(null);

  const timerRef =
    useRef(null);

  const recordingStartTimeRef =
    useRef(null);

  // =======================================================
  // State
  // =======================================================

  const [
    questions,
    setQuestions,
  ] = useState(null);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    error,
    setError,
  ] = useState("");

  const [
    phase,
    setPhase,
  ] = useState("idle");

  const [
    seconds,
    setSeconds,
  ] = useState(0);

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    answer,
    setAnswer,
  ] = useState("");

  const [
    selectedOption,
    setSelectedOption,
  ] = useState("");

  const [
    speechSupported,
    setSpeechSupported,
  ] = useState(true);

  const [
    recordingDuration,
    setRecordingDuration,
  ] = useState(0);

  // =======================================================
  // Start Interview
  // =======================================================

  useEffect(() => {
    let mounted = true;

    startPublicInterview()
      .then((data) => {
        if (!mounted) {
          return;
        }

        // IMPORTANT:
        // Backend does NOT return interviewId.
        // The interview is identified by the
        // server-side session.

        setQuestions(
          data?.questions || []
        );
      })
      .catch((err) => {
        if (!mounted) {
          return;
        }

        setError(
          apiErrorMessage(
            err,
            "Unable to start this interview."
          )
        );
      });

    return () => {
      mounted = false;
    };
  }, []);

  // =======================================================
  // Cleanup
  // =======================================================

  useEffect(() => {
    return () => {
      clearInterval(
        timerRef.current
      );

      recognitionRef.current?.stop();

      if (
        mediaRecorderRef.current
      ) {
        mediaRecorderRef.current
          .stream
          ?.getTracks()
          .forEach((track) =>
            track.stop()
          );
      }

      if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // =======================================================
  // Question Change
  // =======================================================

  useEffect(() => {
    if (
      !questions ||
      !questions[currentIndex]
    ) {
      return;
    }

    const question =
      questions[currentIndex];

    // Reset answer state

    setTranscript("");
    setAnswer("");
    setSelectedOption("");
    setSeconds(0);
    setRecordingDuration(0);
    setPhase("idle");
    setError("");

    clearInterval(
      timerRef.current
    );

    recognitionRef.current?.stop();

    recognitionRef.current = null;

    if (
      mediaRecorderRef.current
    ) {
      mediaRecorderRef.current
        .stream
        ?.getTracks()
        .forEach((track) =>
          track.stop()
        );

      mediaRecorderRef.current =
        null;
    }

    if (
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
    }

    // Voice question

    if (
      question.type === "Voice"
    ) {
      speakQuestion(
        question.text
      );

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      setSpeechSupported(
        Boolean(SpeechRecognition)
      );
    } else {
      setSpeechSupported(true);
    }
  }, [
    questions,
    currentIndex,
  ]);

  // =======================================================
  // Start Answer
  // =======================================================

  const startAnswer = async () => {
    if (
      !questions ||
      !questions[currentIndex]
    ) {
      return;
    }

    setError("");

    const question =
      questions[currentIndex];

    setTranscript("");
    setAnswer("");
    setSelectedOption("");
    setSeconds(0);
    setRecordingDuration(0);

    // =====================================================
    // Camera Snapshot
    // =====================================================

    webcamRef.current?.getScreenshot();

    // =====================================================
    // Voice Recording
    // =====================================================

    if (
      question.type === "Voice"
    ) {
      let audioStream;

      try {
        audioStream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );
      } catch {
        setError(
          "Microphone permission is required for voice questions."
        );

        return;
      }

      try {
        let mimeType =
          "audio/webm";

        if (
          MediaRecorder.isTypeSupported(
            "audio/webm;codecs=opus"
          )
        ) {
          mimeType =
            "audio/webm;codecs=opus";
        }

        audioChunksRef.current =
          [];

        const recorder =
          new MediaRecorder(
            audioStream,
            {
              mimeType,
            }
          );

        recorder.ondataavailable =
          (event) => {
            if (
              event.data &&
              event.data.size > 0
            ) {
              audioChunksRef.current.push(
                event.data
              );
            }
          };

        recorder.start();

        mediaRecorderRef.current =
          recorder;

        recordingStartTimeRef.current =
          Date.now();
      } catch (err) {
        audioStream
          .getTracks()
          .forEach((track) =>
            track.stop()
          );

        setError(
          "Unable to start audio recording."
        );

        return;
      }

      // ===================================================
      // Speech Recognition
      // ===================================================

      const recognizer =
        createRecognizer(
          setTranscript
        );

      if (recognizer) {
        try {
          recognizer.start();

          recognitionRef.current =
            recognizer;
        } catch {
          recognitionRef.current =
            null;
        }
      }
    }

    // =====================================================
    // Timer
    // =====================================================

    clearInterval(
      timerRef.current
    );

    timerRef.current =
      setInterval(() => {
        setSeconds(
          (previous) =>
            previous + 1
        );
      }, 1000);

    setPhase("answering");
  };

  // =======================================================
  // Stop Recording And Get Blob
  // =======================================================

  const stopRecordingAndGetBlob =
    () =>
      new Promise((resolve) => {
        const recorder =
          mediaRecorderRef.current;

        if (!recorder) {
          resolve(null);
          return;
        }

        const finishRecording =
          () => {
            const blob =
              audioChunksRef
                .current.length > 0
                ? new Blob(
                    audioChunksRef.current,
                    {
                      type:
                        recorder.mimeType ||
                        "audio/webm",
                    }
                  )
                : null;

            let duration = 0;

            if (
              recordingStartTimeRef.current
            ) {
              duration =
                Math.max(
                  1,
                  Math.round(
                    (Date.now() -
                      recordingStartTimeRef.current) /
                      1000
                  )
                );

              setRecordingDuration(
                duration
              );
            }

            recorder.stream
              ?.getTracks()
              .forEach((track) =>
                track.stop()
              );

            mediaRecorderRef.current =
              null;

            recordingStartTimeRef.current =
              null;

            resolve({
              blob,
              duration,
            });
          };

        if (
          recorder.state ===
          "inactive"
        ) {
          finishRecording();
          return;
        }

        recorder.onstop =
          finishRecording;

        recorder.stop();
      });

  // =======================================================
  // Validate Answer
  // =======================================================

  const validateAnswer = () => {
    const question =
      questions[currentIndex];

    if (!question) {
      return false;
    }

    // =====================================================
    // MCQ
    // =====================================================

    if (
      question.type === "MCQ"
    ) {
      if (
        !selectedOption.trim()
      ) {
        setError(
          "Please select an option before continuing."
        );

        return false;
      }

      return true;
    }

    // =====================================================
    // Paragraph
    // =====================================================

    if (
      question.type ===
      "Paragraph"
    ) {
      if (
        !answer.trim()
      ) {
        setError(
          "Please enter your answer before continuing."
        );

        return false;
      }

      return true;
    }

    // =====================================================
    // Voice
    // =====================================================

    if (
      question.type === "Voice"
    ) {
      if (
        !mediaRecorderRef.current
      ) {
        setError(
          "Please start your voice answer first."
        );

        return false;
      }

      return true;
    }

    return true;
  };

  // =======================================================
  // Submit Answer
  // =======================================================

  const submitAndAdvance =
    async () => {
      setError("");

      if (
        !validateAnswer()
      ) {
        return;
      }

      setPhase("submitting");

      clearInterval(
        timerRef.current
      );

      // ===================================================
      // Current Question
      // ===================================================

      const question =
        questions[currentIndex];

      // ===================================================
      // Stop Speech Recognition
      // ===================================================

      recognitionRef.current?.stop();

      recognitionRef.current =
        null;

      // ===================================================
      // Voice Audio
      // ===================================================

      let audioBlob = null;

      if (
        question.type === "Voice"
      ) {
        const recording =
          await stopRecordingAndGetBlob();

        audioBlob =
          recording?.blob || null;

        const duration =
          recording?.duration || 0;

        setRecordingDuration(
          duration
        );

        if (!audioBlob) {
          setError(
            "Voice recording was not captured. Please try again."
          );

          setPhase(
            "answering"
          );

          return;
        }
      }

      // ===================================================
      // Submit To Backend
      // ===================================================

      try {
        await submitPublicAnswer({
          // IMPORTANT:
          // Current backend expects questionIndex,
          // NOT interviewId or questionId.

          questionIndex:
            question.index,

          // Paragraph answer
          answer:
            question.type ===
            "Paragraph"
              ? answer.trim()
              : "",

          // MCQ answer
          selectedOption:
            question.type ===
            "MCQ"
              ? selectedOption.trim()
              : "",

          // Voice transcript
          transcript:
            question.type ===
            "Voice"
              ? transcript.trim()
              : "",

          // Voice recording
          audioBlob,
        });

        // =================================================
        // Next Question
        // =================================================

        if (
          currentIndex + 1 <
          questions.length
        ) {
          setCurrentIndex(
            (previousIndex) =>
              previousIndex + 1
          );

          setPhase("idle");
        } else {
          // ===============================================
          // Complete Interview
          // ===============================================

          await completePublicInterview();

          navigate(
            "/interview/complete"
          );
        }
      } catch (err) {
        setError(
          apiErrorMessage(
            err,
            "Something went wrong submitting your answer."
          )
        );

        setPhase(
          "answering"
        );
      }
    };

  // =======================================================
  // Stop Question Speech
  // =======================================================

  const stopQuestionSpeech =
    () => {
      if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }
    };

  // =======================================================
  // Loading
  // =======================================================

  if (
    !questions &&
    !error
  ) {
    return (
      <CandidateShell>
        <p className="text-center text-muted text-sm">
          Loading interview...
        </p>
      </CandidateShell>
    );
  }

  // =======================================================
  // Error
  // =======================================================

  if (
    error &&
    !questions
  ) {
    return (
      <CandidateShell>
        <p className="text-center text-danger text-sm">
          {error}
        </p>
      </CandidateShell>
    );
  }

  // =======================================================
  // No Questions
  // =======================================================

  if (
    !questions ||
    questions.length === 0
  ) {
    return (
      <CandidateShell>
        <p className="text-center text-danger text-sm">
          No interview questions
          are available.
        </p>
      </CandidateShell>
    );
  }

  // =======================================================
  // Current Question
  // =======================================================

  const question =
    questions[currentIndex];

  const questionType =
    question.type ||
    "Paragraph";

  const mm =
    String(
      Math.floor(
        seconds / 60
      )
    ).padStart(2, "0");

  const ss =
    String(
      seconds % 60
    ).padStart(2, "0");

  // =======================================================
  // UI
  // =======================================================

  return (
    <CandidateShell wide>

      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <div className="flex items-center justify-between mb-5">

        <h1 className="text-sm font-bold text-white">
          AI Interview
        </h1>

        <span className="text-muted text-sm font-mono">
          Question{" "}
          {currentIndex + 1}{" "}
          /{" "}
          {questions.length}
        </span>

      </div>

      {/* ================================================= */}
      {/* Main */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* ================================================= */}
        {/* CAMERA */}
        {/* ================================================= */}

        <div>

          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-border">

            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />

          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-muted">

            <span
              className={`w-2 h-2 rounded-full ${
                phase ===
                "answering"
                  ? "bg-danger animate-pulse"
                  : "bg-border"
              }`}
            />

            {phase ===
            "answering"
              ? questionType ===
                "Voice"
                ? "Recording..."
                : "Answering..."
              : "Mic idle"}

          </div>

        </div>

        {/* ================================================= */}
        {/* QUESTION */}
        {/* ================================================= */}

        <div className="flex flex-col">

          <div className="text-muted text-xs font-mono uppercase mb-2">
            Question
          </div>

          <div className="mb-3">

            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue2/10 border border-blue2/20 text-blue2 text-xs font-bold">
              {questionType}
            </span>

          </div>

          <div className="flex items-start gap-3 mb-6">

            <p className="text-slate-100 text-base leading-relaxed flex-1">
              {question.text}
            </p>

            {questionType ===
              "Voice" && (

              <button
                type="button"
                onClick={() =>
                  speakQuestion(
                    question.text
                  )
                }
                className="shrink-0 px-3 py-2 rounded-lg border border-border text-xs text-slate-200 hover:bg-navy2"
              >
                🔊 Listen
              </button>

            )}

          </div>

          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {error && (

            <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2 mb-4">
              {error}
            </div>

          )}

          {/* ================================================= */}
          {/* MCQ */}
          {/* ================================================= */}

          {questionType ===
            "MCQ" && (

            <div className="mb-5">

              <div className="text-muted text-xs mb-3">
                Select one option
              </div>

              <div className="flex flex-col gap-3">

                {(
                  question.options ||
                  []
                ).map(
                  (
                    option,
                    index
                  ) => {

                    const isSelected =
                      selectedOption ===
                      option;

                    return (
                      <label
                        key={`${option}-${index}`}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                          isSelected
                            ? "border-blue2 bg-blue2/10"
                            : "border-border bg-navy2 hover:border-blue2/50"
                        }`}
                      >

                        <input
                          type="radio"
                          name={`question-${currentIndex}`}
                          value={option}
                          checked={
                            isSelected
                          }
                          onChange={(
                            event
                          ) =>
                            setSelectedOption(
                              event
                                .target
                                .value
                            )
                          }
                          disabled={
                            phase !==
                            "answering"
                          }
                        />

                        <span className="text-sm text-slate-100">
                          {option}
                        </span>

                      </label>
                    );
                  }
                )}

              </div>

            </div>
          )}

          {/* ================================================= */}
          {/* PARAGRAPH */}
          {/* ================================================= */}

          {questionType ===
            "Paragraph" && (

            <div className="mb-5">

              <label className="block text-muted text-xs mb-2">
                Your Answer
              </label>

              <textarea
                value={answer}
                onChange={(event) =>
                  setAnswer(
                    event.target.value
                  )
                }
                disabled={
                  phase !==
                  "answering"
                }
                rows={7}
                placeholder="Type your answer here..."
                className="w-full bg-navy2 border border-border rounded-lg px-3 py-3 text-sm text-slate-100 outline-none resize-none focus:border-blue2 disabled:opacity-60"
              />

            </div>
          )}

          {/* ================================================= */}
          {/* VOICE */}
          {/* ================================================= */}

          {questionType ===
            "Voice" && (

            <div className="mb-5">

              <div className="rounded-lg border border-border bg-navy2 p-4">

                <div className="text-sm font-bold text-white mb-2">
                  Voice Answer
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  Click Start Answer
                  and speak your
                  answer clearly.
                  Your actual voice
                  recording will be
                  sent to the backend.
                </p>

                {!speechSupported && (

                  <div className="mt-3 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    Speech-to-text is
                    not supported in
                    this browser. Your
                    actual microphone
                    recording will
                    still be saved.
                  </div>

                )}

                {phase ===
                  "answering" &&
                  transcript && (

                  <div className="mt-4">

                    <div className="text-xs text-muted mb-2">
                      Detected Speech
                    </div>

                    <div className="text-sm text-slate-100 bg-black/20 border border-border rounded-lg p-3 max-h-32 overflow-y-auto">
                      {transcript}
                    </div>

                  </div>

                )}

                {phase ===
                  "answering" && (

                  <div className="mt-4 text-xs text-success">
                    🎙 Microphone recording active
                  </div>

                )}

              </div>

            </div>
          )}

          {/* ================================================= */}
          {/* IDLE */}
          {/* ================================================= */}

          {phase ===
            "idle" && (

            <div className="mt-auto flex flex-col gap-3">

              {questionType ===
                "Voice" && (

                <p className="text-xs text-muted">
                  The question will
                  be spoken aloud
                  when you start.
                </p>

              )}

              <button
                type="button"
                onClick={
                  startAnswer
                }
                className="py-3 rounded-lg bg-blue2 text-white font-bold text-sm hover:opacity-90"
              >
                Start Answer
              </button>

            </div>

          )}

          {/* ================================================= */}
          {/* ANSWERING */}
          {/* ================================================= */}

          {phase ===
            "answering" && (

            <div className="mt-auto flex flex-col gap-3">

              <div className="flex items-center justify-between">

                <div className="text-muted text-sm font-mono">
                  Answer Time:{" "}
                  {mm}:{ss}
                </div>

                {questionType ===
                  "Voice" && (

                  <button
                    type="button"
                    onClick={
                      stopQuestionSpeech
                    }
                    className="text-xs text-muted hover:text-white"
                  >
                    Stop Question
                    Audio
                  </button>

                )}

              </div>

              <button
                type="button"
                onClick={
                  submitAndAdvance
                }
                className="py-3 rounded-lg bg-blue2 text-white font-bold text-sm hover:opacity-90"
              >
                {currentIndex + 1 <
                questions.length
                  ? "Next Question"
                  : "Finish Interview"}
              </button>

            </div>

          )}

          {/* ================================================= */}
          {/* SUBMITTING */}
          {/* ================================================= */}

          {phase ===
            "submitting" && (

            <div className="mt-auto text-center text-muted text-sm py-3">
              Uploading your answer...
            </div>

          )}

        </div>

      </div>

    </CandidateShell>
  );
}