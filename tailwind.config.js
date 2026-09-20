// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // שורה זו קריטית לזיהוי הקבצים ב-src
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
