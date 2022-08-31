/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        'twitter-chirp': ['TwitterChirp', 'sans-serif'],
        'twitter-chirp-extended': ['TwitterChirpExtendedHeavy', 'sans-serif']
      },
      colors: {
        secondary: '#71767B',
        'accent-blue': '#1A8CD8',
        'accent-secondary-blue': '#8ECDF8',
        'border-color': '#2F3336',
        'hover-color': '#181818'
      },
      animation: {},
      keyframes: {}
    }
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('inner', '& > *');
    }
  ]
};
