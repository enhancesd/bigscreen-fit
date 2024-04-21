const { defineConfig } = require('@efox/emp');
const vue2 = require('@efox/plugin-vue-2');
const path = require('path');

module.exports = defineConfig(({ env }) => {

    return {
        appEntry: 'main.ts',
        base: '../',
        splitCss: false,
        plugins: [vue2],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'packages': path.resolve(__dirname, './packages'),
            }
        },
        build: {
            createTs: true,
            outDir: 'dist',
            typesOutDir: 'dist/types',
            chunkIds: 'deterministic',
            lib: env === 'dev' ? undefined : {
                name: 'BigscreenFit',
                entry: path.resolve(__dirname, 'packages/index.ts'),
                fileName: 'js/index.js',
                formats: ['esm'],
                external: {
                    vue: 'Vue',
                }
            }
        }
    }
});