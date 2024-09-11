module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],

  theme: {
    extend: {
      colors: {
        'hussien-green': '#198754',
        'navbarcolor': '#1F2937',
      },
    },
  },

}