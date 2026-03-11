/*
 * Buzz Co Curbing — Derived Design System (Preset F: Custom Direction)
 *
 * Identity: Confident, masculine, craftsmanlike. A well-maintained job site
 * meets a sharp brand lookbook. Bold gold/yellow on black with clean sans-serif.
 * Warm but direct. Professional but not stiff.
 *
 * Palette:
 *   Primary Gold:    #fcc33c  — brand gold, headings highlights, primary buttons
 *   Accent Deep Gold:#d4a012  — hover states, active elements, richer gold
 *   Background:      #fafaf7  — warm white, main page background
 *   Secondary:       #f0eeea  — card surfaces, alternate section backgrounds
 *   Dark/Text:       #1a1a1a  — primary text, dark section backgrounds
 *
 * Typography:
 *   Headings: Poppins (bold, tight tracking) — brand continuity
 *   Drama:    Playfair Display Italic — cinematic hero contrast
 *   Body:     Manrope — clean, modern, readable
 *   Data:     JetBrains Mono — monospace labels, stats, system indicators
 *
 * Image Mood: Clean concrete curves, green lawns, Utah mountain backdrops,
 *   suburban yards, morning/golden hour light, precision edges, earth tones
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#fcc33c',
          50: '#fffdf0',
          100: '#fff9d6',
          200: '#fff0a8',
          300: '#ffe375',
          400: '#fcc33c',
          500: '#d4a012',
          600: '#b8860b',
          700: '#8b6914',
          800: '#5c4a1a',
          900: '#3a2f12',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#bdbdbd',
          300: '#9e9e9e',
          400: '#757575',
          500: '#616161',
          600: '#424242',
          700: '#303030',
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
        warm: {
          white: '#fafaf7',
          gray: '#f0eeea',
          muted: '#a8a49c',
        },
        accent: {
          DEFAULT: '#d4a012',
          hover: '#b8860b',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        drama: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        data: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero-label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '500' }],
        'hero-intro': ['1.125rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'hero-drama': ['clamp(2.5rem, 8vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'section-heading': ['clamp(1.875rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'card': '0',
        'card-lg': '0',
        'pill': '0',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
