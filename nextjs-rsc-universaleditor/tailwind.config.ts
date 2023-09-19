import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            // backgroundImage: {
            //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            //     'gradient-conic':
            //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            // },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'yellow': '#ffea00',
            },
            theme: {
                'sm': '640px',
                // => @media (min-width: 640px) { ... }

                'md': '768px',
                // => @media (min-width: 768px) { ... }

                'lg': '1024px',
                // => @media (min-width: 1024px) { ... }

                'xl': '1165',
                // => @media (min-width: 1165px) { ... }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
export default config
