const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        ...getWebpackEntryPoints(),
        'settings': './src/settings/index.js',
        'steps/install-plugin/index': './src/steps/install-plugin/index.js',
        'steps/login/index': './src/steps/login/index.js',
        'steps/copy-file/index': './src/steps/copy-file/index.js'
        'steps/activate-plugin/index': './src/steps/activate-plugin/index.js',
        'steps/login/index': './src/steps/login/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    }
};