import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophyReveal() {
  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('[data-philosophy-reveal]');

      elements.forEach(el => {
        // Split text into words, preserving HTML
        const html = el.innerHTML;
        const wrapped = html.replace(/(\S+)/g, '<span class="inline-block" style="will-change:transform">$1</span>');
        el.innerHTML = wrapped;

        const words = el.querySelectorAll('span.inline-block');

        gsap.from(words, {
          opacity: 0,
          y: 15,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
