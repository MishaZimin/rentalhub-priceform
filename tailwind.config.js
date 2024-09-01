/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "10%, 30%, 50%, 70%, 90%": {
                        transform: "translateX(-3px)",
                    },
                    "20%, 40%, 60%, 80%": { transform: "translateX(3px)" },
                },
                slidedown: {
                    "0%": { transform: "translateY(0)", opacity: "0.5" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            animation: {
                shake: "shake 1.2s ease-in",
                slidedown: "slidedown 0.2s ease-out forwards",
            },
            font: {
                inter: ["Inter"],
                lato: ["Lato"],
            },
        },
    },
    plugins: [],
};
