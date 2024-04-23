const { defineConfig } = require('@efox/emp');
const vue = require('@efox/plugin-vue-3');
const path = require('path');

module.exports = defineConfig(({ env }) => {

    return {
        appEntry: 'main.ts',
        splitCss: false,
        plugins: [vue],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'packages': path.resolve(__dirname, './src/packages'),
            }
        },
        build: {
            createTs: true,
            outDir: 'dist',
            typesOutDir: 'dist/types',
            lib: env === 'dev' ? undefined : {
                entry: 'index.ts',
                fileName: 'js/index.js',
                formats: ['esm'],
                external: {
                    vue: 'vue',
                    lodash: 'lodash',
                    'vue-demi': 'vue-demi',
                    '@vue/runtime-dom': '@vue/runtime-dom',
                    'resize-observer-polyfill': 'resize-observer-polyfill',
                }
            }
        }
    }
});