import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    num: "01",
    title: "Get Your Free Quote",
    desc: "Call or submit a request. We'll have a quick phone conversation to understand your project, and in most cases we can quote right over the phone. If needed, we're happy to schedule a free site visit.",
    image: "/images/gallery/stone-home-decorative-curbing-mulch-bed-utah.jpg",
    alt: "Stone home exterior in Utah with decorative concrete curbing bordering mulch beds"
  },
  {
    num: "02",
    title: "We Design It Together on Install Day",
    desc: "When we arrive, we walk the yard with you step-by-step to finalize the exact layout and design. You choose your colors and patterns, and we make sure everything looks exactly how you want it.",
    image: "/images/gallery/paver-patio-curbing-backyard-aerial-utah.jpg",
    alt: "Aerial view of a Utah backyard with cobblestone paver patio and concrete curbing"
  },
  {
    num: "03",
    title: "Professional Installation & Cleanup",
    desc: "Once the design is approved, our crew preps the area, mixes the concrete on site, and extrudes the curbing to your exact specifications. We clean up every scrap of material and walk you through the finished product.",
    image: "/images/gallery/hexagonal-paver-walkway-charcoal-utah.jpg",
    alt: "Completed charcoal hexagonal paver walkway with white rock border in a Utah backyard"
  }
];

export default function ProtocolSticky() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stickyTop, setStickyTop] = useState(0);
  const imageContainerRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    // Compute top so the image CENTER sticks at 50vh
    const updateStickyTop = () => {
      if (imageContainerRef.current) {
        const h = imageContainerRef.current.offsetHeight;
        setStickyTop(Math.max(0, window.innerHeight / 2 - h / 2));
      }
    };
    updateStickyTop();
    window.addEventListener('resize', updateStickyTop);

    // Active-step observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 }
    );

    const currentRefs = stepRefs.current;
    currentRefs.forEach((ref) => { if (ref) observer.observe(ref); });

    return () => {
      currentRefs.forEach((ref) => { if (ref) observer.unobserve(ref); });
      window.removeEventListener('resize', updateStickyTop);
    };
  }, []);

  return (
    <div className="relative">
      {/* Mobile Layout (Stacked sequentially, no sticky) */}
      <div className="flex flex-col gap-16 md:hidden">
        {STEPS.map((step, i) => (
          <article key={i} className="flex flex-col gap-6">
            <div>
              <span className="font-data mb-3 block text-sm font-bold text-[#fcc33c]">{step.num}</span>
              <h3 className="font-drama mb-4 text-3xl text-dark leading-tight">{step.title}</h3>
              <p className="font-body text-base leading-relaxed text-dark/70">{step.desc}</p>
            </div>
            <img 
              src={step.image} 
              alt={step.alt} 
              className="aspect-[4/3] w-full rounded-none object-cover shadow-sm"
            />
          </article>
        ))}
      </div>

      {/* Desktop Layout (2-Column Sticky Scroll) */}
      <div className="hidden md:flex md:gap-16 lg:gap-24 relative items-start">
        
        {/* Left Column - Scrolling Text */}
        <div className="w-1/2 pb-[30vh]">
          {STEPS.map((step, i) => (
            <div 
              key={i} 
              ref={el => stepRefs.current[i] = el}
              data-index={i}
              className={`flex flex-col justify-center min-h-[70vh] transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-30'}`}
            >
              <span className="font-data mb-4 block text-sm font-bold text-[#fcc33c]">{step.num}</span>
              <h3 className="font-drama mb-6 text-4xl lg:text-5xl text-dark leading-[1.1]">{step.title}</h3>
              <p className="font-body text-lg leading-relaxed text-dark/70 max-w-lg">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Right Column - Sticky Image Container */}
        <div
          ref={imageContainerRef}
          className="w-1/2 sticky aspect-[4/3] rounded-none shadow-sm overflow-hidden bg-dark/5"
          style={{ top: stickyTop }}
        >
          {STEPS.map((step, i) => (
            <img
              key={i}
              src={step.image}
              alt={step.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}