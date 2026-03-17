import { useState, useEffect } from 'react';

const STEPS = [
  'Free Phone Quote',
  'Custom Layout & Prep',
  'Seamless Concrete Install',
  'Zero-Mess Cleanup'
];

export default function FeatureProcessTracker() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= STEPS.length + 1) return 0; // Reset after holding complete state
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const fillPercentage = activeStep === 0 ? 0 : Math.min((activeStep / (STEPS.length - 1)) * 100, 100);

  return (
    <div className="relative flex h-full min-h-[160px] flex-col justify-between rounded-none border border-dark/[0.08] bg-white p-5 shadow-sm">
      
      {/* Track Container */}
      <div className="absolute bottom-[30px] left-[29px] top-[30px] w-[2px] bg-dark/[0.04]">
        {/* Track Fill */}
        <div 
          className="absolute left-0 top-0 w-full bg-gold transition-all duration-500 ease-in-out"
          style={{ height: `${fillPercentage}%` }}
        />
      </div>

      {STEPS.map((step, i) => {
        const isCompleted = activeStep > i;
        const isActive = activeStep === i;

        return (
          <div key={i} className="relative z-10 flex items-center gap-4">
            <div 
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-[2px] bg-white transition-all duration-300 ${
                isCompleted 
                  ? 'border-gold bg-gold text-dark' 
                  : isActive 
                    ? 'border-gold shadow-[0_0_0_4px_rgba(252,195,60,0.15)]' 
                    : 'border-dark/[0.08]'
              }`}
            >
              {isCompleted && (
                <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7.5L5.5 10L11 4" />
                </svg>
              )}
              {isActive && (
                <div className="h-2 w-2 rounded-full bg-gold" />
              )}
            </div>
            <div>
              <p 
                className={`font-heading text-[13px] leading-tight transition-all duration-300 ${
                  isCompleted ? 'font-medium text-dark/70' : 
                  isActive ? 'font-bold text-dark' : 
                  'font-medium text-dark/30'
                }`}
              >
                {step}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
