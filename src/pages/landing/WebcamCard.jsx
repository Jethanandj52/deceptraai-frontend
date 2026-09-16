import React from 'react';
import Webcam from 'react-webcam';
import ScoreGauge, { scoreColor } from './ScoreGauge';

/** WebcamCard — live camera preview, frame capture, and the face score bar. */
export default function WebcamCard({ webcamRef, capturedImage, showCamScan, faceScore, onCapture, onRetake }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 font-bold text-[0.82rem] mb-3.5 text-slate-100">
        <span className="text-base">👁️</span> Face Analysis
      </div>

      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black border border-border relative">
        {capturedImage ? (
          <img src={capturedImage} alt="captured frame" className="w-full h-full object-cover" />
        ) : (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ width: 480, height: 360, facingMode: 'user' }}
          />
        )}

        {showCamScan && !capturedImage && (
          <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan/70 to-transparent animate-cam-scan pointer-events-none" />
        )}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-3.5 h-3.5 top-1.5 left-1.5 border-t-[1.5px] border-l-[1.5px] border-cyan/70" />
          <div className="absolute w-3.5 h-3.5 top-1.5 right-1.5 border-t-[1.5px] border-r-[1.5px] border-cyan/70" />
          <div className="absolute w-3.5 h-3.5 bottom-1.5 left-1.5 border-b-[1.5px] border-l-[1.5px] border-cyan/70" />
          <div className="absolute w-3.5 h-3.5 bottom-1.5 right-1.5 border-b-[1.5px] border-r-[1.5px] border-cyan/70" />
        </div>

        {!capturedImage && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/65 rounded-full px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-live-pulse" />
            <span className="font-mono text-[0.55rem] text-slate-100">LIVE</span>
          </div>
        )}
      </div>

      <button
        onClick={capturedImage ? onRetake : onCapture}
        className="w-full mt-3 py-2.5 rounded-lg cursor-pointer font-mono text-[0.68rem] tracking-wider uppercase bg-cyan/[0.08] border border-cyan/30 text-cyan hover:bg-cyan/[0.15] transition-colors"
      >
        {capturedImage ? '🔄 Retake Photo' : '📸 Capture Frame'}
      </button>

      {faceScore !== null && (
        <div className="mt-3">
          <ScoreGauge label="Face Score" score={faceScore} color={scoreColor(faceScore)} />
        </div>
      )}
    </div>
  );
}
