const baseConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...baseConfig,
	transformIgnorePatterns: [
		'node_modules/(?!(@wordpress|uuid|parsel-js)/)',
	],
};
