/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                maple: "#c46316",
            },
        },
    },
    plugins: [daisyui],
};
