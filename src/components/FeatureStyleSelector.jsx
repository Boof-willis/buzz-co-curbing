import { useState, useEffect } from 'react';

const STYLES = ['Slant', 'Mower', 'Block'];
const COLORS = [
  { name: 'Clay', hex: '#744538' },
  { name: 'Desert Tan', hex: '#8e7c69' },
  { name: 'Onyx', hex: '#494949' }
];

export default function FeatureStyleSelector() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -20, y: 180 }); // Start offscreen
  const [activeStyle, setActiveStyle] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [clickedItem, setClickedItem] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const runSequence = async () => {
      if (isCancelled) return;

      // Reset state
      setCursorVisible(false);
      setCursorPos({ x: -20, y: 180 });
      setActiveStyle(0);
      setActiveColor(0);
      setClickedItem(null);

      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      await wait(500);
      if (isCancelled) return;

      // 1. Move to Style 2 (Mower)
      setCursorVisible(true);
      setCursorPos({ x: 140, y: 48 }); 
      
      await wait(700);
      if (isCancelled) return;

      // Click Style 2
      setClickedItem('style-1');
      setActiveStyle(1);
      await wait(150);
      if (isCancelled) return;
      setClickedItem(null);

      await wait(500);
      if (isCancelled) return;

      // 2. Move to Color 3 (Charcoal)
      setCursorPos({ x: 230, y: 125 });

      await wait(700);
      if (isCancelled) return;

      // Click Color 3
      setClickedItem('color-2');
      setActiveColor(2);
      await wait(150);
      if (isCancelled) return;
      setClickedItem(null);

      await wait(800);
      if (isCancelled) return;

      // 3. Move to Color 2 (Slate)
      setCursorPos({ x: 140, y: 125 });

      await wait(700);
      if (isCancelled) return;

      // Click Color 2
      setClickedItem('color-1');
      setActiveColor(1);
      await wait(150);
      if (isCancelled) return;
      setClickedItem(null);

      await wait(1200);
      if (isCancelled) return;

      // Move offscreen and hide
      setCursorPos({ x: 300, y: 180 });
      
      await wait(500);
      if (isCancelled) return;
      setCursorVisible(false);
      
      await wait(1000);
      if (!isCancelled) {
        runSequence();
      }
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="relative flex h-full min-h-[160px] flex-col justify-center overflow-hidden rounded-none border border-dark/[0.08] bg-white p-4 shadow-sm select-none">
      
      {/* Styles Section */}
      <div className="mb-4">
        <div className="mb-2 font-data text-[10px] uppercase tracking-widest text-warm-muted">Profile Style</div>
        <div className="flex gap-2">
          {STYLES.map((style, i) => (
            <div
              key={i}
              className={`flex-1 rounded-none border px-1 py-2 text-center text-xs font-medium transition-all duration-200 ${
                activeStyle === i
                  ? 'border-gold bg-gold/15 text-dark shadow-sm'
                  : 'border-dark/[0.08] bg-warm-gray/30 text-dark/60'
              }`}
              style={{
                transform: clickedItem === `style-${i}` ? 'scale(0.92)' : 'scale(1)',
              }}
            >
              {style}
            </div>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div>
        <div className="mb-2 font-data text-[10px] uppercase tracking-widest text-warm-muted">Color Match</div>
        <div className="flex gap-2">
          {COLORS.map((color, i) => (
            <div
              key={i}
              className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-none border px-1 py-2 transition-all duration-200 ${
                activeColor === i
                  ? 'border-gold bg-gold/15 shadow-sm'
                  : 'border-dark/[0.08] bg-warm-gray/30'
              }`}
              style={{
                transform: clickedItem === `color-${i}` ? 'scale(0.92)' : 'scale(1)',
              }}
            >
              <div 
                className="h-5 w-5 rounded-full border border-dark/10 shadow-inner" 
                style={{ backgroundColor: color.hex }}
              />
              <span className={`text-[10px] font-medium leading-none ${activeColor === i ? 'text-dark' : 'text-dark/60'}`}>
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated cursor */}
      <div
        className="pointer-events-none absolute z-20 transition-all duration-500"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          opacity: cursorVisible ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path
            d="M5 3L5 20L10 15L14 21L16 20L12 14L19 14L5 3Z"
            fill="#d4a012"
            stroke="#1a1a1a"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
