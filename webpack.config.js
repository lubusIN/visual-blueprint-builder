const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        ...getWebpackEntryPoints(),
        'settings': './src/settings/index.js',
        'steps/install-plugin/index': './src/steps/install-plugin/index.js',
        'steps/define-site-url/index': './src/steps/define-site-url/index.js',
        'steps/login/index': './src/steps/login/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    }
};