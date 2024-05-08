import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress'
import pkg from "./package.json" assert {type: "json"}
import fs from "node:fs"

const production = process.env.NODE_ENV === 'production',
    sourcemap = !production

const banner = `
/*!
 * HooksJS - The set of hooks  (https://hooks.io)
 * Copyright ${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 !*/
`

let txt = fs.readFileSync(`src/index.js`, 'utf8')
txt = txt.replace(/version = ".+"/g, `version = "${pkg.version}"`)
txt = txt.replace(/build_time = ".+"/g, `build_time = "${new Date().toLocaleString()}"`)
fs.writeFileSync(`src/index.js`, txt, { encoding: 'utf8', flag: 'w+' })

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
            file: 'lib/hooks.js',
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