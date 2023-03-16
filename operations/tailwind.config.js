/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#B4CD25',
                },
                secondary: {
                    500: '#03495c',
                },
                tertiary: {
                    500: '#959595',
                },
                ultraLightGrey: '#ececec',
            },
        },
    },
    plugins: [require('prettier-plugin-tailwindcss')],
};
