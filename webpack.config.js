const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        ...getWebpackEntryPoints(),
        'editor': './src/editor/index.js',
        'steps/activate-plugin/index': './src/steps/activate-plugin/index.js',
        'steps/activate-theme/index': './src/steps/activate-theme/index.js',
        'steps/cp/index': './src/steps/cp/index.js',
        'steps/define-site-url/index': './src/steps/define-site-url/index.js',
        'steps/define-wp-config-consts/index': './src/steps/define-wp-config-consts/index.js',
        'steps/enable-multisite/index': './src/steps/enable-multisite/index.js',
        'steps/import-theme-starter-content/index': './src/steps/import-theme-starter-content/index.js',
        'steps/import-wordpress-files/index': './src/steps/import-wordpress-files/index.js',
        'steps/import-wxr/index': './src/steps/import-wxr/index.js',
        'steps/install-plugin/index': './src/steps/install-plugin/index.js',
        'steps/install-theme/index': './src/steps/install-theme/index.js',
        'steps/login/index': './src/steps/login/index.js',
        'steps/mkdir/index': './src/steps/mkdir/index.js',
        'steps/mv/index': './src/steps/mv/index.js',
        'steps/reset-data/index': './src/steps/reset-data/index.js',
        'steps/rm/index': './src/steps/rm/index.js',
        'steps/rmdir/index': './src/steps/rmdir/index.js',
        'steps/run-php/index': './src/steps/run-php/index.js',
        'steps/set-site-language/index': './src/steps/set-site-language/index.js',
        'steps/set-site-options/index': './src/steps/set-site-options/index.js',
        'steps/unzip/index': './src/steps/unzip/index.js',
        'steps/update-user-meta/index': './src/steps/update-user-meta/index.js',
        'steps/wp-cli/index': './src/steps/wp-cli/index.js',
        'steps/write-file/index': './src/steps/write-file/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    }
};