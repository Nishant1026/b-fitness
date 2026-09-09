/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // ─── Light / White palette (fuaark-inspired) ───
          bg: '#FFFFFF',        // page background
          surface: '#F6F6F6',        // cards, alt sections
          surface2: '#EFEFEF',        // deeper surface
          border: '#E5E5E5',        // dividers
          'border-2': '#D0D0D0',        // stronger borders
          text: '#0A0A0A',        // main headings
          body: '#3D3D3D',        // body text
          muted: '#767676',        // muted / placeholder
          subtle: '#ABABAB',        // very muted
          // ─── Dark surfaces (for hero, topbar, CTA) ───
          dark: '#111111',
          charcoal: '#1A1A1A',
          'dark-2': '#222222',
          // ─── Accent ───
          red: '#E8192E',
          'red-dark': '#C0102A',
          'red-light': '#FF445A',
          'red-tint': 'rgba(232,25,46,0.08)',
          gold: '#D4A84B',
          'gold-light': '#E8C26A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['11.5px', { lineHeight: '1.5' }],
        'sm': ['13px', { lineHeight: '1.6' }],
        'base': ['15px', { lineHeight: '1.75' }],
        'lg': ['17px', { lineHeight: '1.6' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['38px', { lineHeight: '1.2' }],
        '5xl': ['50px', { lineHeight: '1.1' }],
        '6xl': ['62px', { lineHeight: '1.05' }],
        '7xl': ['76px', { lineHeight: '1' }],
      },
      maxWidth: {
        'container': '1380px',
        '8xl': '88rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '25': '6.25rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 6px 32px rgba(0,0,0,0.14)',
        'header': '0 1px 0 #E5E5E5',
        'red-glow': '0 0 24px rgba(232,25,46,0.20)',
        'sm': '0 1px 6px rgba(0,0,0,0.07)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(20,20,20,0.50) 50%, rgba(10,10,10,0.80) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'marquee': 'marquee 28s linear infinite',
        'marquee2': 'marquee2 28s linear infinite',
        'scroll-x': 'scrollX 40s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
