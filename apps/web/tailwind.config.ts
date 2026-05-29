import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        velvet: {
          light: '#F8E8EC',
          DEFAULT: '#BE2C54', // Velvet Rose profundo e sedutor
          dark: '#8D1E3A',
        },
        champagne: {
          light: '#FBF7F0',
          DEFAULT: '#E3C89B', // Dourado Champagne requintado
          dark: '#B09160',
        },
        chocolate: {
          light: '#2E221F',
          DEFAULT: '#19110F', // Marrom escuro chocolate de luxo
          dark: '#0E0908',
        },
        cream: {
          light: '#FCFAF7',
          DEFAULT: '#f4eedc', // Creme de confeitaria suave
          dark: '#EFE7DA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(190, 44, 84, 0.08)',
        premium: '0 20px 50px rgba(0, 0, 0, 0.05)',
        gold: '0 10px 30px rgba(227, 200, 155, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
export default config;
