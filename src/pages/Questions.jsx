
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import {
  listQuestions,
  createQuestion,
  deleteQuestion,
  apiErrorMessage,
} from '../services/api';

const CATEGORIES = [
  'Technical',
  'Behavioral',
  'HR',
  'General',
];

const QUESTION_TYPES = [
  'MCQ',
  'Paragraph',
  'Voice',
];

/**
 * Questions
 *
 * Question bank supports:
 * - MCQ
 * - Paragraph
 * - Voice
 */
export default function Questions() {
  const [questions, setQuestions] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [text, setText] = useState('');

  const [category, setCategory] =
    useState('Technical');

  const [type, setType] =
    useState('Paragraph');

  const [options, setOptions] = useState([
    '',
    '',
  ]);

  const [error, setError] = useState('');

  const [saving, setSaving] =
    useState(false);


  // =========================================================
  // Load Questions
  // =========================================================

  const load = () => {
    listQuestions()
      .then(setQuestions)
      .catch(() => {});
  };


  useEffect(() => {
    load();
  }, []);


  // =========================================================
  // Reset Form
  // =========================================================

  const resetForm = () => {
    setText('');
    setCategory('Technical');
    setType('Paragraph');
    setOptions(['', '']);
    setError('');
  };


  // =========================================================
  // Close Modal
  // =========================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };


  // =========================================================
  // Question Type Change
  // =========================================================

  const handleTypeChange = (value) => {
    setType(value);
    setError('');

    if (value === 'MCQ') {
      setOptions([
        '',
        '',
      ]);
    } else {
      setOptions([]);
    }
  };


  // =========================================================
  // MCQ Option Change
  // =========================================================

  const handleOptionChange = (index, value) => {
    setOptions((prev) =>
      prev.map((option, i) =>
        i === index
          ? value
          : option
      )
    );
  };


  // =========================================================
  // Add MCQ Option
  // =========================================================

  const addOption = () => {
    if (options.length >= 6) {
      return;
    }

    setOptions((prev) => [
      ...prev,
      '',
    ]);
  };


  // =========================================================
  // Remove MCQ Option
  // =========================================================

  const removeOption = (index) => {
    if (options.length <= 2) {
      return;
    }

    setOptions((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };


  // =========================================================
  // Add Question
  // =========================================================

  const handleAdd = async (e) => {
    e.preventDefault();

    setError('');
    setSaving(true);

    try {
      const cleanText = text.trim();

      if (!cleanText) {
        throw new Error(
          'Question text is required.'
        );
      }


      // ==========================================
      // Prepare MCQ Options
      // ==========================================

      let cleanOptions = [];

      if (type === 'MCQ') {
        cleanOptions = options
          .map((option) =>
            option.trim()
          )
          .filter(Boolean);

        if (cleanOptions.length < 2) {
          throw new Error(
            'MCQ questions must have at least 2 options.'
          );
        }
      }


      // ==========================================
      // Create Question
      // ==========================================

      await createQuestion({
        text: cleanText,
        category,
        type,
        options: cleanOptions,
      });


      // ==========================================
      // Reset + Reload
      // ==========================================

      setShowModal(false);

      resetForm();

      load();
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          'Unable to create question.'
        )
      );
    } finally {
      setSaving(false);
    }
  };


  // =========================================================
  // Delete Question
  // =========================================================

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      load();
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          'Unable to delete question.'
        )
      );
    }
  };


  // =========================================================
  // Render
  // =========================================================

  return (
    <AdminLayout title="Question Bank">

      {/* =====================================================
          Add Question Button
      ====================================================== */}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 rounded-lg bg-blue2 text-white text-sm font-bold"
        >
          + Add Question
        </button>
      </div>


      {/* =====================================================
          Question Categories
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {CATEGORIES.map((cat) => {
          const items = questions.filter(
            (q) => q.category === cat
          );

          return (
            <div
              key={cat}
              className="bg-card border border-border rounded-xl p-5"
            >

              <h3 className="text-sm font-bold text-white mb-3">
                {cat} Questions
              </h3>

              <ul className="flex flex-col gap-2">

                {items.map((q, i) => (
                  <li
                    key={q._id}
                    className="flex items-start justify-between gap-3 text-sm bg-white/[0.03] rounded-lg px-3 py-2"
                  >

                    <div className="min-w-0">

                      <div className="flex items-center gap-2 mb-1">

                        <span className="text-xs text-blue-300 font-semibold">
                          {q.type || 'Paragraph'}
                        </span>

                      </div>

                      <span className="text-slate-100">
                        {i + 1}. {q.text}
                      </span>


                      {/* MCQ Options */}

                      {q.type === 'MCQ' &&
                        Array.isArray(q.options) &&
                        q.options.length > 0 && (

                          <ul className="mt-2 ml-4 flex flex-col gap-1">

                            {q.options.map(
                              (option, optionIndex) => (
                                <li
                                  key={`${q._id}-${optionIndex}`}
                                  className="text-xs text-slate-400"
                                >
                                  {String.fromCharCode(
                                    65 + optionIndex
                                  )}. {option}
                                </li>
                              )
                            )}

                          </ul>

                        )}

                    </div>


                    <button
                      onClick={() =>
                        handleDelete(q._id)
                      }
                      className="text-muted hover:text-danger text-xs flex-shrink-0"
                    >
                      Remove
                    </button>

                  </li>
                ))}


                {items.length === 0 && (
                  <li className="text-muted text-sm">
                    No questions yet.
                  </li>
                )}

              </ul>

            </div>
          );
        })}

      </div>


      {/* =====================================================
          Add Question Modal
      ====================================================== */}

      {showModal && (
        <Modal
          title="Add Question"
          onClose={closeModal}
        >

          {error && (
            <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2 mb-3">
              {error}
            </div>
          )}


          <form
            onSubmit={handleAdd}
            className="flex flex-col gap-3"
          >

            {/* Question Text */}

            <textarea
              required
              placeholder="Question text"
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              className="bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2 min-h-[80px]"
            />


            {/* Category */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
            >

              {CATEGORIES.map((c) => (
                <option
                  key={c}
                  value={c}
                >
                  {c}
                </option>
              ))}

            </select>


            {/* Question Type */}

            <select
              value={type}
              onChange={(e) =>
                handleTypeChange(
                  e.target.value
                )
              }
              className="bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
            >

              {QUESTION_TYPES.map((questionType) => (
                <option
                  key={questionType}
                  value={questionType}
                >
                  {questionType}
                </option>
              ))}

            </select>


            {/* =================================================
                MCQ Options
            ================================================== */}

            {type === 'MCQ' && (

              <div className="flex flex-col gap-2">

                <div className="flex items-center justify-between">

                  <label className="text-xs font-semibold text-slate-300">
                    MCQ Options
                  </label>

                  <span className="text-[11px] text-muted">
                    Minimum 2 options
                  </span>

                </div>


                {options.map(
                  (option, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >

                      <span className="w-6 text-xs text-muted text-center">
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <input
                        type="text"
                        required
                        value={option}
                        placeholder={`Option ${String.fromCharCode(
                          65 + index
                        )}`}
                        onChange={(e) =>
                          handleOptionChange(
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 bg-navy2 border border-border rounded-lg px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue2"
                      />


                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeOption(index)
                          }
                          className="text-muted hover:text-danger text-xs"
                        >
                          Remove
                        </button>
                      )}

                    </div>

                  )
                )}


                {options.length < 6 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="self-start text-xs text-blue-300 hover:text-blue-200"
                  >
                    + Add Option
                  </button>
                )}

              </div>

            )}


            {/* Submit */}

            <button
              disabled={saving}
              className="mt-1 py-2.5 rounded-lg bg-blue2 text-white font-bold text-sm disabled:opacity-60"
            >
              {saving
                ? 'Saving…'
                : 'Add Question'}
            </button>

          </form>

        </Modal>
      )}

    </AdminLayout>
  );
}
