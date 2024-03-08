//  /** @type {import('tailwindcss').Config} */
// export default {
//   // content: [
//   //   "./index.html",
//   //   "./src/**/*.{html,js,ts,jsx,tsx}",
//   // ],
//   content: [
//     '../pages/**/*.{html,js,jsx}',
//     '../components/**/*.{html,js,jsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [ 
    require('flowbite/plugin'),
  ],
};