import { useEffect } from 'react';

export default function FAQAccordion() {
  useEffect(() => {
    const toggles = document.querySelectorAll('[data-faq-toggle]');

    toggles.forEach((toggle) => {
      const answer = toggle.nextElementSibling;
      const icon = toggle.querySelector('[data-faq-icon]');

      // Initial state: all closed
      answer.style.maxHeight = '0px';
      answer.style.overflow = 'hidden';
      answer.style.opacity = '0';
      // Elegant, refined cubic-bezier transition
      answer.style.transition = 'max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      toggle.setAttribute('aria-expanded', 'false');
      
      if (icon) {
        icon.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        icon.style.transform = 'rotate(0deg)';
        icon.textContent = '+';
      }

      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';

        // Close all others
        toggles.forEach((otherToggle) => {
          if (otherToggle !== toggle) {
            const otherAnswer = otherToggle.nextElementSibling;
            const otherIcon = otherToggle.querySelector('[data-faq-icon]');
            otherAnswer.style.maxHeight = '0px';
            otherAnswer.style.opacity = '0';
            otherToggle.setAttribute('aria-expanded', 'false');
            if (otherIcon) {
              otherIcon.style.transform = 'rotate(0deg)';
            }
          }
        });

        // Toggle current
        if (isOpen) {
          answer.style.maxHeight = '0px';
          answer.style.opacity = '0';
          toggle.setAttribute('aria-expanded', 'false');
          if (icon) {
            icon.style.transform = 'rotate(0deg)';
          }
        } else {
          // Set to scrollHeight so it perfectly accommodates content
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.opacity = '1';
          toggle.setAttribute('aria-expanded', 'true');
          if (icon) {
            // Rotating a plus sign 45 degrees makes an elegant X
            icon.style.transform = 'rotate(45deg)';
          }
        }
      });
    });
  }, []);

  return null;
}
