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

      <div className="flex justify-end mb-4 sm:mb-5">
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
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
          + Add Question
        </button>
      </div>


      {/* =====================================================
          Question Categories
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3 sm:gap-4
        "
      >

        {CATEGORIES.map((cat) => {
          const items = questions.filter(
            (q) => q.category === cat
          );

          return (
            <div
              key={cat}
              className="
                bg-[var(--bg-secondary)]
                border border-[var(--border-color)]
                rounded-xl
                p-4 sm:p-5
                min-w-0
                transition-colors duration-300
              "
            >

              <div className="flex items-center justify-between gap-3 mb-3">
                <h3
                  className="
                    text-sm
                    font-bold
                    text-[var(--text-primary)]
                    break-words
                  "
                >
                  {cat} Questions
                </h3>

                <span
                  className="
                    shrink-0
                    px-2 py-1
                    rounded-md
                    bg-blue2/10
                    border border-blue2/20
                    text-blue2
                    text-[10px]
                    font-semibold
                  "
                >
                  {items.length}
                </span>
              </div>

              <ul className="flex flex-col gap-2">

                {items.map((q, i) => (
                  <li
                    key={q._id}
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                      text-sm
                      bg-slate-500/[0.04]
                      dark:bg-white/[0.03]
                      border border-[var(--border-color)]/60
                      rounded-lg
                      px-3
                      py-2.5
                      min-w-0
                      transition-colors duration-300
                    "
                  >

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2 mb-1">

                        <span
                          className="
                            text-[10px]
                            sm:text-xs
                            text-blue2
                            font-semibold
                            px-1.5
                            py-0.5
                            rounded
                            bg-blue2/10
                            border border-blue2/15
                          "
                        >
                          {q.type || 'Paragraph'}
                        </span>

                      </div>

                      <span
                        className="
                          block
                          text-[var(--text-primary)]
                          leading-relaxed
                          break-words
                        "
                      >
                        {i + 1}. {q.text}
                      </span>


                      {/* MCQ Options */}

                      {q.type === 'MCQ' &&
                        Array.isArray(q.options) &&
                        q.options.length > 0 && (

                          <ul
                            className="
                              mt-2
                              ml-3 sm:ml-4
                              flex
                              flex-col
                              gap-1
                            "
                          >

                            {q.options.map(
                              (option, optionIndex) => (
                                <li
                                  key={`${q._id}-${optionIndex}`}
                                  className="
                                    text-xs
                                    text-[var(--text-secondary)]
                                    break-words
                                  "
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
                      className="
                        shrink-0
                        text-[var(--text-secondary)]
                        hover:text-danger
                        text-xs
                        transition-colors
                        whitespace-nowrap
                      "
                    >
                      Remove
                    </button>

                  </li>
                ))}


                {items.length === 0 && (
                  <li
                    className="
                      text-[var(--text-secondary)]
                      text-sm
                      py-2
                    "
                  >
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
            <div
              className="
                text-xs
                text-rose-600
                dark:text-rose-300
                bg-rose-500/10
                border border-rose-500/25
                rounded-lg
                px-3 py-2
                mb-3
                break-words
              "
            >
              {error}
            </div>
          )}


          <form
            onSubmit={handleAdd}
            className="
              flex
              flex-col
              gap-3
            "
          >

            {/* Question Text */}

            <textarea
              required
              placeholder="Question text"
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              className="
                w-full
                bg-[var(--input-bg)]
                border border-[var(--border-color)]
                rounded-lg
                px-3 py-2.5
                text-sm
                text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]
                outline-none
                focus:border-blue2
                min-h-[100px]
                resize-y
                transition-colors
              "
            />


            {/* Category */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                w-full
                bg-[var(--input-bg)]
                border border-[var(--border-color)]
                rounded-lg
                px-3 py-2.5
                text-sm
                text-[var(--text-primary)]
                outline-none
                focus:border-blue2
                transition-colors
              "
            >

              {CATEGORIES.map((c) => (
                <option
                  key={c}
                  value={c}
                  className="bg-[var(--bg-secondary)]"
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
              className="
                w-full
                bg-[var(--input-bg)]
                border border-[var(--border-color)]
                rounded-lg
                px-3 py-2.5
                text-sm
                text-[var(--text-primary)]
                outline-none
                focus:border-blue2
                transition-colors
              "
            >

              {QUESTION_TYPES.map((questionType) => (
                <option
                  key={questionType}
                  value={questionType}
                  className="bg-[var(--bg-secondary)]"
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

                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-1
                    sm:gap-2
                  "
                >

                  <label
                    className="
                      text-xs
                      font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    MCQ Options
                  </label>

                  <span
                    className="
                      text-[11px]
                      text-[var(--text-secondary)]
                    "
                  >
                    Minimum 2 options
                  </span>

                </div>


                {options.map(
                  (option, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-2
                        min-w-0
                      "
                    >

                      <span
                        className="
                          w-6
                          shrink-0
                          text-xs
                          text-[var(--text-secondary)]
                          text-center
                        "
                      >
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
                        className="
                          flex-1
                          min-w-0
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


                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeOption(index)
                          }
                          className="
                            shrink-0
                            text-[var(--text-secondary)]
                            hover:text-danger
                            text-xs
                            whitespace-nowrap
                            transition-colors
                          "
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
                    className="
                      self-start
                      text-xs
                      text-blue2
                      hover:opacity-80
                      transition-opacity
                    "
                  >
                    + Add Option
                  </button>
                )}

              </div>

            )}


            {/* Submit */}

            <button
              disabled={saving}
              className="
                w-full
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