/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js, tsx, jsx, ts}",
    "./src/components/navbar.js",
    "./src/components/footer.js",
    "./src/pages/Home.js",
    "./src/pages/PastData.js",
    "./src/pages/LoginForm.js",
    "./src/pages/SignupForm.js",
    "./src/poseNet/pose.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

