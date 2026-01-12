/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#8B5CF6', // Violet 500
                    dark: '#7C3AED', // Violet 600
                    light: '#A78BFA', // Violet 400
                },
                background: '#0F172A', // Slate 900
                surface: '#1E293B', // Slate 800
            }
        },
    },
    plugins: [],
}
