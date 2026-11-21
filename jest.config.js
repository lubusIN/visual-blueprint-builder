const baseConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...baseConfig,
	setupFilesAfterEnv: [
		...( baseConfig.setupFilesAfterEnv || [] ),
		'<rootDir>/tests/unit/setup.js',
	],
	transformIgnorePatterns: [
		'node_modules/(?!(@wordpress|uuid|parsel-js)/)',
	],
};
