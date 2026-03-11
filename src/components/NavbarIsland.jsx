import { useEffect } from 'react';

export default function NavbarIsland() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero-section');
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('mobile-menu-close');

    if (!navbar) return;

    let observer = null;
    let isMenuOpen = false;

    // Scroll morph: When hero is visible, navbar transparent; when scrolled past, opaque
    const logoDark = navbar.querySelector('[data-logo-dark]');
    const logoLight = navbar.querySelector('[data-logo-light]');

    function setTransparent() {
      navbar.style.backgroundColor = 'transparent';
      navbar.style.borderColor = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.webkitBackdropFilter = 'none';
      navbar.style.boxShadow = 'none';
      navbar.querySelectorAll('[data-nav-link]').forEach((el) => {
        el.style.color = 'rgba(255,255,255,0.8)';
      });
      if (hamburger) hamburger.style.color = '#fff';
      if (logoDark) logoDark.style.opacity = '1';
      if (logoLight) logoLight.style.opacity = '0';
    }

    function setOpaque() {
      if (isMenuOpen) return; // Keep transparent if menu is open
      navbar.style.backgroundColor = 'rgba(250,250,247,0.9)';
      navbar.style.borderColor = 'rgba(26,26,26,0.05)';
      navbar.style.backdropFilter = 'blur(24px)';
      navbar.style.webkitBackdropFilter = 'blur(24px)';
      navbar.style.boxShadow = '';
      navbar.querySelectorAll('[data-nav-link]').forEach((el) => {
        el.style.color = '';
      });
      if (hamburger) hamburger.style.color = '';
      if (logoDark) logoDark.style.opacity = '0';
      if (logoLight) logoLight.style.opacity = '1';
    }

    let isHeroVisible = true;

    if (hero) {
      setTransparent();

      observer = new IntersectionObserver(
        ([entry]) => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible) {
            setTransparent();
          } else {
            setOpaque();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(hero);
    } else {
      isHeroVisible = false;
      setOpaque();
    }

    // Hamburger toggle (all screen sizes)
    const toggleMenu = () => {
      isMenuOpen = mobileMenu?.classList.toggle('is-open');
      hamburger?.classList.toggle('is-open');
      hamburger?.setAttribute('aria-expanded', isMenuOpen);
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
      
      if (isMenuOpen) {
        setTransparent();
      } else {
        if (!isHeroVisible) setOpaque();
      }
    };
    hamburger?.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    // Close on link click
    mobileMenu?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('is-open');
        hamburger?.classList.remove('is-open');
        hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (!isHeroVisible) setOpaque();
      });
    });

    return () => {
      observer?.disconnect();
      hamburger?.removeEventListener('click', toggleMenu);
      if (closeMenu) closeMenu.removeEventListener('click', toggleMenu);
      document.body.style.overflow = '';
    };
  }, []);

  return null; // This island controls existing DOM, renders nothing
}
