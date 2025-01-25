import {build, context} from "esbuild";
import progress from "@olton/esbuild-plugin-progress";
import {replace} from "esbuild-plugin-replace";
import pkg from "./package.json" with {type: "json"};

const production = process.env.MODE === "production"
const version = pkg.version

const banner = `
/*!
 * Hooks v${version} (@olton/hooks)
 * Copyright ${new Date().getFullYear()} by Serhii Pimenov <serhii@pimenov.com.ua>
 * Built: ${new Date().toLocaleString()}
 * Licensed under MIT
 */
`

const options = {
    bundle: true,
    minify: true,
    sourcemap: false,
    banner: {
        js: banner
    },
}

if (production) {
    await build({
        ...options,
        entryPoints: ["src/index.ts"],
        outfile: "dist/hooks.js",
        plugins: [
            progress({
                text: 'Building Hooks for NPM...',
                succeedText: 'Built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': new Date().getFullYear(),
            })
        ]
    }).catch(() => process.exit(1))

    await build({
        ...options,
        entryPoints: ["src/browser.ts"],
        outfile: "lib/hooks.js",
        plugins: [
            progress({
                text: 'Building Hooks for Browser...',
                succeedText: 'Built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': new Date().getFullYear(),
            })
        ]
    }).catch(() => process.exit(1))
} else {
    const ctxEsm = await context({
        ...options,
        entryPoints: ["src/index.ts"],
        outfile: "dist/hooks.js",
        plugins: [
            progress({
                text: 'Building Hooks for NPM...',
                succeedText: 'Built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': new Date().getFullYear(),
            })
        ]
    })

    const ctxLib = await context({
        ...options,
        entryPoints: ["src/browser.ts"],
        outfile: "lib/hooks.js",
        plugins: [
            progress({
                text: 'Building Hooks for Browser...',
                succeedText: 'Built successfully in %s ms!'
            }),
            replace({
                '__BUILD_TIME__': new Date().toLocaleString(),
                '__VERSION__': new Date().getFullYear(),
            })
        ]
    })

    await Promise.all([
        ctxEsm.watch(), 
        ctxLib.watch()
    ]).catch(() => process.exit(1))
}