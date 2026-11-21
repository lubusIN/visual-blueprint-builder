/**
 * WordPress dependencies
 */
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	convertToKebabCase,
	getStepDocAnchor,
	extractPhpVersionsFromSchema,
	updateDeprecatedFields,
	sanitizePreparedSchemaString,
	validateBlueprintSteps,
} from '../utils';

describe( 'Blueprint Editor Utilities', () => {
	describe( 'convertToKebabCase', () => {
		it( 'converts standard camelCase to kebab-case', () => {
			expect( convertToKebabCase( 'setSiteOptions' ) ).toBe(
				'set-site-options'
			);
			expect( convertToKebabCase( 'activatePlugin' ) ).toBe(
				'activate-plugin'
			);
			expect( convertToKebabCase( 'defineWpConfigConsts' ) ).toBe(
				'define-wp-config-consts'
			);
		} );

		it( 'handles special cases like WordPress, PHP, and WXR correctly', () => {
			expect( convertToKebabCase( 'importWordPressFiles' ) ).toBe(
				'import-wordpress-files'
			);
			expect( convertToKebabCase( 'runPHP' ) ).toBe( 'run-php' );
			expect( convertToKebabCase( 'importWxr' ) ).toBe( 'import-wxr' );
		} );

		it( 'preserves already kebab-cased or single-word strings', () => {
			expect( convertToKebabCase( 'wp-cli' ) ).toBe( 'wp-cli' );
			expect( convertToKebabCase( 'login' ) ).toBe( 'login' );
			expect( convertToKebabCase( 'mkdir' ) ).toBe( 'mkdir' );
		} );
	} );

	describe( 'getStepDocAnchor', () => {
		it( 'returns documentation anchor hash for valid playground step blocks', () => {
			expect( getStepDocAnchor( 'playground-step/install-plugin' ) ).toBe(
				'installplugin'
			);
			expect(
				getStepDocAnchor( 'playground-step/define-wp-config-consts' )
			).toBe( 'definewpconfigconsts' );
			expect(
				getStepDocAnchor( 'playground-step/set-site-options' )
			).toBe( 'setsiteoptions' );
		} );

		it( 'preserves hyphen for wp-cli anchor', () => {
			expect( getStepDocAnchor( 'playground-step/wp-cli' ) ).toBe(
				'wp-cli'
			);
		} );

		it( 'returns null for non-step blocks or invalid inputs', () => {
			expect( getStepDocAnchor( 'core/paragraph' ) ).toBeNull();
			expect( getStepDocAnchor( '' ) ).toBeNull();
			expect( getStepDocAnchor( null ) ).toBeNull();
			expect( getStepDocAnchor( 123 ) ).toBeNull();
		} );
	} );

	describe( 'extractPhpVersionsFromSchema', () => {
		it( 'returns fallback options when schema definitions are missing', () => {
			const versions = extractPhpVersionsFromSchema( {} );
			expect( versions ).toEqual( [
				{ label: 'Latest', value: 'latest' },
			] );
		} );

		it( 'extracts supported, legacy, and dev PHP versions correctly', () => {
			const mockSchema = {
				definitions: {
					SupportedPHPVersion: { enum: [ '8.2', '8.3' ] },
					LegacyPHPVersion: { enum: [ '7.4', '8.0' ] },
					PHPNextVersion: { const: '8.4' },
				},
			};

			const versions = extractPhpVersionsFromSchema( mockSchema );

			expect( versions ).toEqual( [
				{ label: 'Latest', value: 'latest' },
				{ label: '8.2', value: '8.2' },
				{ label: '8.3', value: '8.3' },
				{ label: '7.4 (Legacy)', value: '7.4' },
				{ label: '8.0 (Legacy)', value: '8.0' },
				{ label: 'Next (Dev)', value: '8.4' },
			] );
		} );
	} );

	describe( 'updateDeprecatedFields', () => {
		it( 'removes phpExtensionBundles and normalizes description to meta.description', () => {
			const input = {
				phpExtensionBundles: [ 'kitchen-sink' ],
				description: 'My cool blueprint',
				meta: {
					title: 'Custom Title',
				},
			};

			const output = updateDeprecatedFields( input );

			expect( output.phpExtensionBundles ).toBeUndefined();
			expect( output.meta.title ).toBe( 'Custom Title' );
			expect( output.meta.author ).toBe( 'WordPress' );
			expect( output.meta.description ).toBe( 'My cool blueprint' );
		} );

		it( 'normalizes deprecated installPlugin and installTheme zip file fields', () => {
			const input = {
				steps: [
					{
						step: 'installPlugin',
						pluginZipFile: {
							resource: 'url',
							url: 'https://example.com/p.zip',
						},
					},
					{
						step: 'installTheme',
						themeZipFile: {
							resource: 'url',
							url: 'https://example.com/t.zip',
						},
					},
				],
			};

			const output = updateDeprecatedFields( input );

			expect( output.steps[ 0 ].pluginZipFile ).toBeUndefined();
			expect( output.steps[ 0 ].pluginData ).toEqual( {
				resource: 'url',
				url: 'https://example.com/p.zip',
			} );
			expect( output.steps[ 1 ].themeZipFile ).toBeUndefined();
			expect( output.steps[ 1 ].themeData ).toEqual( {
				resource: 'url',
				url: 'https://example.com/t.zip',
			} );
		} );

		it( 'normalizes deprecated unzip zipPath to zipFile resource', () => {
			const input = {
				steps: [
					{
						step: 'unzip',
						zipPath: '/wordpress/wp-content/file.zip',
					},
				],
			};

			const output = updateDeprecatedFields( input );

			expect( output.steps[ 0 ].zipPath ).toBeUndefined();
			expect( output.steps[ 0 ].zipFile ).toEqual( {
				resource: 'vfs',
				path: '/wordpress/wp-content/file.zip',
			} );
		} );

		it( 'strips empty password in login step and virtualize in defineWpConfigConsts', () => {
			const input = {
				steps: [
					{ step: 'login', username: 'admin', password: '' },
					{
						step: 'defineWpConfigConsts',
						consts: { WP_DEBUG: true },
						virtualize: true,
					},
					{
						step: 'importWxr',
						file: 'content.xml',
						importer: 'wordpress',
					},
				],
			};

			const output = updateDeprecatedFields( input );

			expect( output.steps[ 0 ].password ).toBeUndefined();
			expect( output.steps[ 1 ].virtualize ).toBeUndefined();
			expect( output.steps[ 2 ].importer ).toBeUndefined();
		} );

		it( 'normalizes string sql in runSql and filesTree in writeFiles', () => {
			const input = {
				steps: [
					{ step: 'runSql', sql: 'SELECT * FROM wp_options;' },
					{ step: 'writeFiles', filesTree: { files: {} } },
				],
			};

			const output = updateDeprecatedFields( input );

			expect( output.steps[ 0 ].sql ).toEqual( {
				resource: 'literal',
				name: 'query.sql',
				contents: 'SELECT * FROM wp_options;',
			} );
			expect( output.steps[ 1 ].filesTree.name ).toBe( 'files' );
		} );
	} );

	describe( 'sanitizePreparedSchemaString', () => {
		it( 'removes empty steps array from schema JSON string', () => {
			const raw = JSON.stringify( {
				landingPage: '/wp-admin/',
				steps: [],
			} );

			const sanitized = sanitizePreparedSchemaString( raw );
			const parsed = JSON.parse( sanitized );

			expect( parsed.steps ).toBeUndefined();
			expect( parsed.landingPage ).toBe( '/wp-admin/' );
		} );

		it( 'preserves steps array if it has steps', () => {
			const raw = JSON.stringify( {
				steps: [ { step: 'login' } ],
			} );

			const sanitized = sanitizePreparedSchemaString( raw );
			const parsed = JSON.parse( sanitized );

			expect( parsed.steps ).toHaveLength( 1 );
		} );

		it( 'returns original string if input is invalid JSON', () => {
			expect( sanitizePreparedSchemaString( 'invalid json' ) ).toBe(
				'invalid json'
			);
		} );
	} );

	describe( 'validateBlueprintSteps', () => {
		const testBlockType = 'playground-step/test-step';

		beforeAll( () => {
			registerBlockType( testBlockType, {
				apiVersion: 3,
				title: 'Test Step',
				category: 'widgets',
				attributes: {
					step: { type: 'string' },
				},
				save: () => null,
			} );
		} );

		afterAll( () => {
			unregisterBlockType( testBlockType );
		} );

		it( 'creates valid block for registered steps and captures invalid ones', () => {
			const steps = [ { step: 'testStep', value: '123' } ];

			const { validBlocks, invalidSteps } =
				validateBlueprintSteps( steps );

			expect( validBlocks ).toHaveLength( 1 );
			expect( validBlocks[ 0 ].name ).toBe( testBlockType );
			expect( invalidSteps ).toHaveLength( 0 );
		} );
	} );
} );
