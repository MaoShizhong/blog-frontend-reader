import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            jost: ['Jost', 'sans-serif', 'system-ui'],
        },
        extend: {
            scale: {
                98: '0.98',
                120: '1.2',
            },
            maxWidth: {
                prose: '72ch',
            },
            width: {
                form: 'min(90vw,900px)',
                main: 'min(90vw,1100px)',
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '72ch',
                        marginInline: 'auto',
                        color: '#111111',
                        overflowWrap: 'anywhere',
                    },
                },
            },
            animation: {
                'left-bounce': 'left-bounce 1s infinite',
            },
            keyframes: {
                'left-bounce': {
                    '0%, 100%': {
                        transform: 'translateX(-35%)',
                        animationTimingFunction: 'cubic-bezier(1, 0, 1, 1.5)',
                    },
                    '50%': {
                        transform: 'translateX(0)',
                        animationTimingFunction: 'cubic-bezier(0, -2, -2, 1.5)',
                    },
                },
            },
        },
    },
    plugins: [tailwindTypography],
};
