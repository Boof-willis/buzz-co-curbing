import { useState, useEffect } from 'react';

const REVIEW_TEXT = `"Clean edges, perfect color match, and zero mess left behind. The crew was incredibly professional. Highly recommend!"`;

export default function FeatureReviewTypewriter() {
  const [charCount, setCharCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setCharCount(0);
      }, 3500);
      return () => clearTimeout(timeout);
    }

    if (charCount >= REVIEW_TEXT.length) {
      setIsPaused(true);
      return;
    }

    const timeout = setTimeout(() => {
      setCharCount((prev) => prev + 1);
    }, 20 + Math.random() * 20); // slightly randomized typing speed
    
    return () => clearTimeout(timeout);
  }, [charCount, isPaused]);

  const displayText = REVIEW_TEXT.slice(0, charCount);

  return (
    <div className="relative flex min-h-[160px] flex-col rounded-none border border-dark/[0.08] bg-white p-4 shadow-sm">
      {/* Reviewer Info */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-xs font-bold text-dark">
            JD
          </div>
          <div>
            <div className="font-heading text-sm font-semibold leading-tight text-dark">John D.</div>
            <div className="font-body text-[10px] text-dark/60">Verified Homeowner</div>
          </div>
        </div>
        {/* Stars */}
        <div className="flex gap-0.5 text-gold shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Body */}
      <div className="flex-1 font-body text-[13px] leading-relaxed text-dark/80">
        {displayText}
        <span
          className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-pulse bg-gold align-middle"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
