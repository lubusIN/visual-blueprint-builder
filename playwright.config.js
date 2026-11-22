const baseConfig = require( '@wordpress/scripts/config/playwright.config' );

module.exports = {
	...baseConfig,
	testDir: './tests/e2e',
	webServer: {
		...baseConfig.webServer,
		command: 'npx @wordpress/env start',
		reuseExistingServer: true,
	},
};
