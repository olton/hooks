import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress';

const production = process.env.NODE_ENV === 'production',
    sourcemap = !production

const banner = `
/*!
 * HooksJS - The set of hooks  (https://hooks.io)
 * Copyright ${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 !*/
`

export default [
    {
        input: 'src/index.js',
        watch: {
            clearScreen: false
        },
        plugins: [
            progress({ clearLine: true, }),
        ],
        output: {
            file: production ? 'lib/hooks.min.js' : 'lib/hooks.js',
            format: 'iife',
            name: 'Hooks',
            sourcemap,
            banner,
            plugins: [
                production && terser({
                    keep_classnames: true,
                    keep_fnames: true
                })
            ]
        }
    },
    {
        input: 'src/index.js',
        plugins: [
            progress({ clearLine: true, }),
        ],
        output: {
            file: 'dist/hooks.cjs.js',
            format: 'cjs',
            banner,
        }
    },
    {
        input: 'src/index.js',
        plugins: [
            progress({ clearLine: true, }),
        ],
        output: {
            file: 'dist/hooks.esm.js',
            format: 'esm',
            banner,
        }
    },
]