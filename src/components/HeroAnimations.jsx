import { useEffect } from 'react';
import gsap from 'gsap';

export default function HeroAnimations() {
  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('[data-hero-animate]');
      if (!elements.length) return;

      gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
