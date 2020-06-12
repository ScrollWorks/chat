/* eslint-disable */
const LiveReload = require('webpack-livereload-plugin');

module.exports = function (env, argv) {
    const devMode = argv.mode !== 'production';
    const LiveReloadPlugin = devMode ? [new LiveReload({ appendScriptTag: true })] : [];
    return {
        entry: './src/index.tsx',
        output: {
            path: __dirname,
            filename: './dist/bundle.js'
        },
        devtool: devMode && 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
            ]
        },
        plugins: [
            ...LiveReloadPlugin
        ]
    };
};