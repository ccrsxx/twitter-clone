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
        primary: '#E7E9EA',
        secondary: '#71767B',
        'icon-background': '#D6D9DB',
        'accent-blue': '#1A8CD8',
        'accent-blue-secondary': '#1D9BF0',
        'accent-blue-focus': '#8ECDF8',
        'border-color': '#2F3336',
        'border-color-secondary': '#536471',
        'hover-color': '#181818',
        'search-background': '#202327',
        'search-close-background': '#1D9BF0',
        'sidebar-background': '#16181C',
        'sidebar-hover-color': '#1D1F23',
        'tooltips-background': '#4B5C6B',
        'follow-button-background': '#EFF3F4',
        'follow-text-color': '#0F1419',
        'image-preview-hover-color': '#272C30',
        'login-button-color': '#0F1419'
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
