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
            padding: {
                scroll: 'calc(100vw - 100%)',
            },
            animation: {
                'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1) once',
            },
            keyframes: {
                bounce: {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                    '50%': {
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                },
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
        },
    },
    plugins: [tailwindTypography],
};
