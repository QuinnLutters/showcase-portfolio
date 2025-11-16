/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        fontFamily: {
            'momo': ['MomoTrust', 'sans-serif'],
            'sf': ['SFProDisplay', 'sans-serif'],
            'sans': ['SFProDisplay', 'sans-serif'], // Default body font
            'times': ['TimesRoman', 'serif'],
        }
        },
    },
    plugins: [],
}