/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '2rem',
                lg: '4rem',
            },
        },

        extend: {
            colors: {
                navy: {
                    DEFAULT: 'var(--c-navy)',
                    dark: 'var(--c-navy-dark)',
                },
                blue: {
                    DEFAULT: 'var(--c-blue)',
                    hover: 'var(--c-blue-hover)',
                },
                surface: 'var(--c-surface)',
                line: 'var(--c-line)',
                success: 'var(--c-success)',
                error: 'var(--c-error)',
            },

            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Manrope', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },

            fontSize: {
                'display-xl': ['80px', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '800' }],
                'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
                'heading-1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'heading-2': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
                'heading-3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
                'body-lead': ['20px', { lineHeight: '1.5', fontWeight: '500' }],
                'body-base': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
                'label': ['12px', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
            },

            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },

            borderRadius: {
                'brand': '4px',
            },

            boxShadow: {
                'brand': '0 1px 3px rgba(0, 31, 63, 0.08)',
                'brand-lg': '0 4px 12px rgba(0, 31, 63, 0.12)',
            },

            transitionDuration: {
                'fast': '100ms',
                'normal': '200ms',
            },
            
            keyframes: {
                shine: {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' },
                }
            },
            animation: {
                shine: 'shine 1s',
            },
        },
    },

    plugins: [],
};
