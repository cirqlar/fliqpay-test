const generateColor = (varName) => {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--${varName}), ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(--${varName}), var(${opacityVariable}, 1))`
    }
    return `rgb(var(--${varName}))`
  }
}

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          grayed: generateColor('color-primary-grayed'),
          muted: generateColor('color-primary-muted'),
          DEFAULT: generateColor('color-primary'),
          tint: generateColor('color-primary-tint'),
          accent: generateColor('color-primary-accent'),
        },
        secondary: {
          DEFAULT: generateColor('color-secondary'),
        },
        gray: {
          lightest: generateColor('bg-gray-lightest'),
          light: generateColor('bg-gray-light'),
          base: generateColor('bg-gray-base'),
          dark: generateColor('bg-gray-dark'),
        },
      },
      borderColor: {
        gray: {
          lightest: generateColor('border-gray-lightest'),
          light: generateColor('border-gray-light'),
          base: generateColor('border-gray-base'),
          dark: generateColor('border-gray-dark'),
        },
      },
      textColor: {
        gray: {
          light: generateColor('text-gray-light'),
          base: generateColor('text-gray-base'),
          dark: generateColor('text-gray-dark'),
          darkest: generateColor('text-gray-darkest'),
        },
      },
      backgroundColor: {
        gray: {
          lightest: generateColor('bg-gray-lightest'),
          light: generateColor('bg-gray-light'),
          base: generateColor('bg-gray-base'),
          dark: generateColor('bg-gray-dark'),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
