module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'imgbg': 'url("/images/bg.avif")',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  mode: 'jit'
}