/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#063D2F',
          50: '#E8F5F0',
          100: '#C3E6D8',
          200: '#9DD6BF',
          300: '#77C6A6',
          400: '#51B68D',
          500: '#2B9E73',
          600: '#1A7E5A',
          700: '#0D5E41',
          800: '#063D2F',
          900: '#021F18',
        },
        leaf: {
          DEFAULT: '#2E7D32',
          light: '#4CAF50',
          dark: '#1B5E20',
        },
        sage: {
          DEFAULT: '#A8C66C',
          light: '#C5D99A',
          dark: '#7BA040',
        },
        gold: {
          DEFAULT: '#F2B233',
          light: '#F7CC70',
          dark: '#D4920F',
        },
        cream: {
          DEFAULT: '#F4F2E8',
          dark: '#E8E4D0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #063D2F 0%, #0D5E41 30%, #1A7E5A 60%, #063D2F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F2B233 0%, #F7CC70 50%, #D4920F 100%)',
        'eco-gradient': 'linear-gradient(180deg, #063D2F 0%, #0D5E41 50%, #2E7D32 100%)',
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(6, 61, 47, 0.4)',
        'glow-gold': '0 0 30px rgba(242, 178, 51, 0.4)',
        'glow-sage': '0 0 20px rgba(168, 198, 108, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 24px rgba(6, 61, 47, 0.08)',
        'card-hover': '0 12px 40px rgba(6, 61, 47, 0.18)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(242, 178, 51, 0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(242, 178, 51, 0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
