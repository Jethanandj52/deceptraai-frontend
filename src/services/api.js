// import axios from 'axios';
// import { getToken, clearAuth } from '../utils/auth';

// const BASE_URL =
//   process.env.REACT_APP_API_URL || 'http://localhost:8000';

// const client = axios.create({
//   baseURL: `${BASE_URL}/api`,
//   timeout: 20000,
// });


// // Attach recruiter's JWT to every request
// client.interceptors.request.use((config) => {
//   const token = getToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Handle API errors
// client.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       clearAuth();
//     }

//     return Promise.reject(err);
//   }
// );

// /**
//  * Extract friendly error message
//  */
// export function apiErrorMessage(
//   err,
//   fallback = 'Something went wrong. Please try again.'
// ) {
//   return (
//     err?.response?.data?.message ||
//     err?.message ||
//     fallback
//   );
// }


// /* =========================================================
//    AUTH
//    ========================================================= */

// /**
//  * Register recruiter/admin
//  */
// export const registerUser = (payload) =>
//   client
//     .post('/auth/register', payload)
//     .then((r) => r.data);


// /**
//  * Login recruiter/admin
//  */
// export const loginUser = (payload) =>
//   client
//     .post('/auth/login', payload)
//     .then((r) => r.data);


// /**
//  * Get logged-in user
//  */
// export const fetchMe = () =>
//   client
//     .get('/auth/me')
//     .then((r) => r.data);


// /**
//  * Forgot password
//  * Sends OTP to user's email
//  */
// export const forgotPassword = (email) =>
//   client
//     .post('/auth/forgot-password', {
//       email,
//     })
//     .then((r) => r.data);


// /**
//  * Verify OTP
//  *
//  * purpose:
//  * - signup
//  * - forgot-password
//  */
// export const verifyOTP = ({
//   email,
//   otp,
//   purpose,
// }) =>
//   client
//     .post('/auth/verify-otp', {
//       email,
//       otp,
//       purpose,
//     })
//     .then((r) => r.data);


// /**
//  * Resend OTP
//  */
// export const resendOTP = ({
//   email,
//   purpose,
// }) =>
//   client
//     .post('/auth/resend-otp', {
//       email,
//       purpose,
//     })
//     .then((r) => r.data);


// /**
//  * Reset password
//  *
//  * OTP verification is already completed
//  * before reaching this endpoint.
//  */
// export const resetPassword = ({
//   email,
//   password,
//   confirmPassword,
// }) =>
//   client
//     .post('/auth/reset-password', {
//       email,
//       password,
//       confirmPassword,
//     })
//     .then((r) => r.data);


// /* =========================================================
//    CANDIDATES
//    ========================================================= */

// /**
//  * Get all candidates
//  */
// export const listCandidates = () =>
//   client
//     .get('/candidates')
//     .then((r) => r.data);


// /**
//  * Create candidate
//  */
// export const createCandidate = (payload) =>
//   client
//     .post('/candidates', payload)
//     .then((r) => r.data);


// /**
//  * Get candidate by ID
//  */
// export const getCandidate = (id) =>
//   client
//     .get(`/candidates/${id}`)
//     .then((r) => r.data);


// /* =========================================================
//    QUESTION BANK
//    ========================================================= */

// /**
//  * Get questions
//  *
//  * Optional category filter
//  */
// export const listQuestions = (category) =>
//   client
//     .get('/questions', {
//       params: category
//         ? { category }
//         : {},
//     })
//     .then((r) => r.data);


// /**
//  * Create question
//  */
// export const createQuestion = (payload) =>
//   client
//     .post('/questions', payload)
//     .then((r) => r.data);


// /**
//  * Delete question
//  */
// export const deleteQuestion = (id) =>
//   client
//     .delete(`/questions/${id}`)
//     .then((r) => r.data);


// /* =========================================================
//    INTERVIEWS
//    ========================================================= */

// /**
//  * Get all interviews
//  *
//  * Optional status filter
//  */
 


// /**
//  * Create interview
//  */
 


// /**
//  * Get interview by ID
//  */
 


// /**
//  * Dashboard statistics
//  */
 


// /**
//  * Interview chart data
//  *
//  * Default: last 7 days
//  */
 


// /**
//  * Assessment distribution
//  */
 


// /* =========================================================
//    PUBLIC CANDIDATE INTERVIEW
//    ========================================================= */

// /**
//  * Get interview invitation
//  *
//  * No recruiter authentication required.
//  */
 


// /**
//  * Start public interview
//  */
 


// /**
//  * Submit candidate answer
//  *
//  * Supports:
//  * - image
//  * - transcript
//  * - audio
//  */
 


// /**
//  * Complete public interview
//  */
 

    
 

// /* =========================================================
//    INTERVIEWS
//    ========================================================= */

// export const listInterviews = (status) =>
//   client
//     .get('/interviews', {
//       params: status
//         ? { status }
//         : {},
//     })
//     .then((r) => r.data);

// export const createInterview = (payload) =>
//   client
//     .post('/interviews', payload)
//     .then((r) => r.data);

// export const getInterview = (id) =>
//   client
//     .get(`/interviews/${id}`)
//     .then((r) => r.data);

// export const sendInterviewEmail = (id) =>
//   client
//     .post(`/interviews/${id}/send-email`)
//     .then((r) => r.data);

// export const getDashboardStats = () =>
//   client
//     .get('/interviews/stats/summary')
//     .then((r) => r.data);

// export const getInterviewsChart = (days = 7) =>
//   client
//     .get('/interviews/stats/chart', {
//       params: {
//         days,
//       },
//     })
//     .then((r) => r.data);

// export const getAssessmentDistribution = () =>
//   client
//     .get('/interviews/stats/distribution')
//     .then((r) => r.data);


// /* =========================================================
//    PUBLIC CANDIDATE INTERVIEW
//    ========================================================= */

// export const getInvitation = (token) =>
//   client
//     .get(`/public/interview/${token}`)
//     .then((r) => r.data);


// /**
//  * Verify candidate email + interview token
//  */
// export const verifyInterviewCandidate = (
//   token,
//   email,
//   interviewToken
// ) =>
//   client
//     .post(
//       `/public/interview/${token}/verify`,
//       {
//         email,
//         token: interviewToken,
//       }
//     )
//     .then((r) => r.data);


// /**
//  * Start public interview
//  */
 


// /**
//  * Submit candidate answer
//  *
//  * Supports:
//  * - image
//  * - transcript
//  * - answer
//  * - selectedOption
//  * - audio
//  */
 
// /**
//  * Complete public interview
//  */
 
//     /* =========================================================
//    PUBLIC CANDIDATE INTERVIEW
//    ========================================================= */

// /**
//  * Verify candidate by email + token only.
//  * No token in URL — token comes purely from the form.
//  */
// export const verifyInterviewByToken = (email, token) =>
//   client
//     .post('/public/interview/verify', {
//       email,
//       token,
//     })
//     .then((r) => r.data);

// /**
//  * Start public interview
//  */
// export const startPublicInterview = (token) =>
//   client
//     .post(`/public/interview/${token}/start`)
//     .then((r) => r.data);

// /**
//  * Submit candidate answer
//  */
// export const submitPublicAnswer = (
//   token,
//   { questionIndex, image, transcript, answer, selectedOption, audioBlob }
// ) => {
//   const form = new FormData();

//   form.append('questionIndex', questionIndex);

//   if (image) form.append('image', image);
//   if (transcript) form.append('transcript', transcript);
//   if (answer) form.append('answer', answer);
//   if (selectedOption) form.append('selectedOption', selectedOption);
//   if (audioBlob) form.append('audio', audioBlob, 'answer.webm');

//   return client
//     .post(`/public/interview/${token}/answer`, form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     })
//     .then((r) => r.data);
// };

// /**
//  * Complete public interview
//  */
// export const completePublicInterview = (token) =>
//   client
//     .post(`/public/interview/${token}/complete`)
//     .then((r) => r.data);


 import axios from 'axios';
import { getToken, clearAuth } from '../utils/auth';

const BASE_URL =
  process.env.REACT_APP_API_URL ||
  'https://deceptraai-backend.vercel.app';

const client = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 20000,

  // Allows browser to send/receive backend session cookie
  withCredentials: true,
});


// =========================================================
// Attach recruiter's JWT to requests
// =========================================================

client.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// =========================================================
// Handle API errors
// =========================================================

client.interceptors.response.use(
  (res) => res,

  (err) => {
    if (err.response?.status === 401) {
      clearAuth();
    }

    return Promise.reject(err);
  }
);


// =========================================================
// Error Message
// =========================================================

export function apiErrorMessage(
  err,
  fallback = 'Something went wrong. Please try again.'
) {
  return (
    err?.response?.data?.message ||
    err?.message ||
    fallback
  );
}


// =========================================================
// AUTH
// =========================================================

export const registerUser = (payload) =>
  client
    .post('/auth/register', payload)
    .then((r) => r.data);


export const loginUser = (payload) =>
  client
    .post('/auth/login', payload)
    .then((r) => r.data);


export const fetchMe = () =>
  client
    .get('/auth/me')
    .then((r) => r.data);


export const forgotPassword = (email) =>
  client
    .post('/auth/forgot-password', {
      email,
    })
    .then((r) => r.data);


export const verifyOTP = ({
  email,
  otp,
  purpose,
}) =>
  client
    .post('/auth/verify-otp', {
      email,
      otp,
      purpose,
    })
    .then((r) => r.data);


export const resendOTP = ({
  email,
  purpose,
}) =>
  client
    .post('/auth/resend-otp', {
      email,
      purpose,
    })
    .then((r) => r.data);


export const resetPassword = ({
  email,
  password,
  confirmPassword,
}) =>
  client
    .post('/auth/reset-password', {
      email,
      password,
      confirmPassword,
    })
    .then((r) => r.data);


// =========================================================
// CANDIDATES
// =========================================================

export const listCandidates = () =>
  client
    .get('/candidates')
    .then((r) => r.data);


export const createCandidate = (payload) =>
  client
    .post('/candidates', payload)
    .then((r) => r.data);


export const getCandidate = (id) =>
  client
    .get(`/candidates/${id}`)
    .then((r) => r.data);


// =========================================================
// QUESTION BANK
// =========================================================

export const listQuestions = (category) =>
  client
    .get('/questions', {
      params: category
        ? { category }
        : {},
    })
    .then((r) => r.data);


export const createQuestion = (payload) =>
  client
    .post('/questions', payload)
    .then((r) => r.data);


export const deleteQuestion = (id) =>
  client
    .delete(`/questions/${id}`)
    .then((r) => r.data);


// =========================================================
// INTERVIEWS
// =========================================================

export const listInterviews = (status) =>
  client
    .get('/interviews', {
      params: status
        ? { status }
        : {},
    })
    .then((r) => r.data);


export const createInterview = (payload) =>
  client
    .post('/interviews', payload)
    .then((r) => r.data);


export const getInterview = (id) =>
  client
    .get(`/interviews/${id}`)
    .then((r) => r.data);


export const sendInterviewEmail = (id) =>
  client
    .post(`/interviews/${id}/send-email`)
    .then((r) => r.data);


export const getDashboardStats = () =>
  client
    .get('/interviews/stats/summary')
    .then((r) => r.data);


export const getInterviewsChart = (days = 7) =>
  client
    .get('/interviews/stats/chart', {
      params: {
        days,
      },
    })
    .then((r) => r.data);


export const getAssessmentDistribution = () =>
  client
    .get('/interviews/stats/distribution')
    .then((r) => r.data);


// =========================================================
// PUBLIC CANDIDATE INTERVIEW
// =========================================================

/**
 * Open public interview page.
 *
 * Candidate opens:
 * /interview
 *
 * No token is required.
 */
export const getInvitation = () =>
  client
    .get('/public/interview')
    .then((r) => r.data);


/**
 * Send 6-digit verification code
 * to candidate email.
 *
 * Backend:
 * POST /api/public/interview/send-code
 */
export const sendInterviewVerificationCode = (
  email
) =>
  client
    .post(
      '/public/interview/send-code',
      {
        email,
      }
    )
    .then((r) => r.data);


/**
 * Verify candidate using:
 *
 * email + 6-digit verification code
 *
 * Backend stores interviewId
 * inside express-session.
 *
 * Backend:
 * POST /api/public/interview/verify
 */
export const verifyInterviewCandidate = (
  email,
  verificationCode
) =>
  client
    .post(
      '/public/interview/verify',
      {
        email,
        verificationCode,
      }
    )
    .then((r) => r.data);


/**
 * Start public interview.
 *
 * Backend gets interviewId
 * from express-session.
 *
 * Backend:
 * POST /api/public/interview/start
 *
 * Response should contain questions.
 */
export const startPublicInterview = () =>
  client
    .post('/public/interview/start')
    .then((r) => r.data);


/**
 * Submit candidate answer.
 *
 * IMPORTANT:
 * interviewId is NOT sent from frontend.
 *
 * Backend gets interviewId from:
 *
 * req.session.interviewId
 *
 * Backend:
 * POST /api/public/interview/answers
 *
 * Supported answer types:
 *
 * MCQ
 * Paragraph
 * Voice
 *
 * MCQ:
 * - selectedOption
 *
 * Paragraph:
 * - textAnswer
 *
 * Voice:
 * - audio
 * - audioDuration
 */

export const submitPublicAnswer = ({
  questionIndex,
  answer,
  selectedOption,
  transcript,
  audioBlob,
}) => {
  if (
    questionIndex === undefined ||
    questionIndex === null
  ) {
    return Promise.reject(
      new Error("Question index is missing.")
    );
  }

  const form = new FormData();

  // ==========================================
  // Question Index
  // ==========================================

  form.append(
    "questionIndex",
    String(questionIndex)
  );

  // ==========================================
  // Paragraph Answer
  // ==========================================

  if (answer) {
    form.append(
      "answer",
      answer
    );
  }

  // ==========================================
  // MCQ Answer
  // ==========================================

  if (selectedOption) {
    form.append(
      "selectedOption",
      selectedOption
    );
  }

  // ==========================================
  // Voice Transcript
  // ==========================================

  if (transcript) {
    form.append(
      "transcript",
      transcript
    );
  }

  // ==========================================
  // Voice Audio
  // ==========================================

  if (audioBlob) {
    form.append(
      "audio",
      audioBlob,
      "answer.webm"
    );
  }

  // ==========================================
  // Backend endpoint
  // ==========================================

  return client
    .post(
      "/public/interview/answer",
      form
    )
    .then((r) => r.data);
};



/**
 * Complete public interview.
 *
 * Backend gets interviewId from session.
 *
 * Backend:
 * POST /api/public/interview/complete
 */
export const completePublicInterview = () =>
  client
    .post('/public/interview/complete')
    .then((r) => r.data);