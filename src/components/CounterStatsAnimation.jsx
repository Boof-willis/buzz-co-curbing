import { useEffect } from 'react';

export default function CounterStatsAnimation() {
  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseFloat(el.dataset.countTarget);
      const suffix = el.dataset.countSuffix || '';
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = target * eased;

        if (isDecimal) {
          el.textContent = current.toFixed(1) + suffix;
        } else if (target >= 1000) {
          el.textContent = Math.round(current).toLocaleString() + suffix;
        } else {
          el.textContent = Math.round(current) + suffix;
        }

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counters.forEach(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = counters[0]?.closest('section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return null;
}
