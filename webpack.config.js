const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const path = require('path');
const glob = require('glob');

const entries = {
    ...getWebpackEntryPoints(),
    editor: './src/editor/index.js',
};

glob.sync('./src/steps/**/index.js').forEach((filePath) => {
    const name = path
        .relative('./src', filePath)
        .replace(/\.js$/, '');
    entries[name] = filePath;
});

module.exports = {
    ...defaultConfig,
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    }
};