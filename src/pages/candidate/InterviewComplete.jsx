import React, {
  useEffect,
} from 'react';

import CandidateShell from '../../components/CandidateShell';


export default function InterviewComplete() {

  useEffect(() => {

    // Remove only temporary candidate data
    sessionStorage.removeItem(
      'interviewEmail'
    );

    sessionStorage.removeItem(
      'candidateName'
    );

  }, []);


  return (
    <CandidateShell>

      <div className="text-center">

        <div className="text-success text-3xl mb-3">
          ✓
        </div>


        <h1 className="text-lg font-bold text-white mb-2">
          Interview Completed
        </h1>


        <p className="text-muted text-sm mb-1">
          Thank you for completing the interview.
        </p>


        <p className="text-muted text-sm">
          Your responses have been submitted
          successfully. The interview has been
          sent to the interviewer for review.
        </p>

      </div>

    </CandidateShell>
  );
}