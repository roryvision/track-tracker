/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-133': 'linear-gradient(133deg, var(--tw-gradient-stops))',
      },
      colors: {
        'moonlight': '#ededed',
        'midnight': '#000000',
        'tt-mint': '#5affe1',
        'tt-green': '#00ffa3',
        'tt-blue': '#00f0ff',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
