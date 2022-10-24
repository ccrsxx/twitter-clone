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
        'icon-color': '#1DA1F2',
        'icon-background': '#D6D9DB',
        'accent-blue': '#1D9BF0',
        'accent-blue-focus': '#8ECDF8',
        'accent-red': '#F4212E',
        'accent-yellow': '#FFD400',
        'accent-purple': '#7856FF',
        'accent-orange': '#FF7A00',
        'accent-green': '#00BA7C',
        'accent-pink': '#F91880',
        'border-color': '#2F3336',
        'border-color-secondary': '#536471',
        'search-background': '#202327',
        'sidebar-background': '#16181C',
        'tooltips-background': '#4B5C6B',
        'follow-button-background': '#EFF3F4',
        'follow-text-color': '#0F1419',
        'image-preview-hover-color': '#272C30',
        'modal-backdrop-color': '#5B7083',
        'line-reply-color': '#333639',
        'cover-placeholder-background': '#183B4B'
      }
    },
    groups: ['inner'],
    groupVariants: ['hover', 'focus-visible']
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('inner', '& > *');
    },
    ({ addVariant, theme }) => {
      const groups = theme('groups') ?? [];
      const groupVariants = theme('groupVariants') ?? [];

      groups.forEach((group) =>
        groupVariants.forEach((variant) =>
          addVariant(
            `group-${group}-${variant}`,
            () => `:merge(.group-${group}):${variant} &`
          )
        )
      );
    }
  ]
};
