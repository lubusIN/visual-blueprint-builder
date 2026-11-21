const wpConfig = require( '@wordpress/eslint-plugin' ).configs.recommended;
const globals = require( 'globals' );

module.exports = [
	{
		ignores: [
			'build/**',
			'vendor/**',
			'node_modules/**',
			'assets/**',
			'*.config.js',
			'*.min.js',
		],
	},
	...wpConfig,
	{
		files: [ '**/test/**', '**/*.test.js' ],
		languageOptions: {
			globals: {
				...globals.jest,
				...globals.node,
			},
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'jsdoc/require-param': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/no-undefined-types': 'off',
			'jsdoc/check-line-alignment': 'off',
			'jsdoc/require-returns': 'off',
			'jsdoc/require-returns-type': 'off',
			'jsdoc/require-returns-description': 'off',
			'jsdoc/check-param-names': 'off',
			'@wordpress/no-unsafe-wp-apis': [
				'error',
				{
					'@wordpress/components': [
						'__experimentalTreeGrid',
						'__experimentalTreeGridRow',
						'__experimentalTreeGridCell',
						'__experimentalToggleGroupControl',
						'__experimentalToggleGroupControlOption',
					],
				},
			],
		},
	},
];
