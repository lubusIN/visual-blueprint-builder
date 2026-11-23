/**
 * Internal dependencies
 */
import {
	buildBlueprintJson,
	handleJsonDataSubmit,
	validateAgainstSchema,
	handleBlueprintData,
} from '../../../src/editor/utils';
import { PLAYGROUND_BLUEPRINT_SCHEMA_URL } from '../../../src/editor/constant';

describe( 'Blueprint Generator & Validation Pipeline', () => {
	describe( 'buildBlueprintJson', () => {
		it( 'generates minimal valid blueprint JSON with default settings', () => {
			const jsonStr = buildBlueprintJson( {} );
			const schema = JSON.parse( jsonStr );

			expect( schema.$schema ).toBe( PLAYGROUND_BLUEPRINT_SCHEMA_URL );
			expect( schema.preferredVersions ).toEqual( {
				php: 'latest',
				wp: 'latest',
			} );
			expect( schema.steps ).toEqual( [] );
			expect( schema.features ).toBeUndefined();
			expect( schema.login ).toBeUndefined();
			expect( schema.siteOptions ).toBeUndefined();
		} );

		it( 'correctly formats features, extraLibraries, and versions', () => {
			const blueprintConfig = {
				landing_page: '/wp-admin/plugins.php',
				php_version: '8.3',
				wp_version: '6.7',
				networking: true,
				intl: true,
				extraLibraries: [ 'wp-cli' ],
				login: true,
			};

			const jsonStr = buildBlueprintJson( { blueprintConfig } );
			const schema = JSON.parse( jsonStr );

			expect( schema.landingPage ).toBe( '/wp-admin/plugins.php' );
			expect( schema.preferredVersions ).toEqual( {
				php: '8.3',
				wp: '6.7',
			} );
			expect( schema.features ).toEqual( {
				networking: true,
				intl: true,
			} );
			expect( schema.extraLibraries ).toEqual( [ 'wp-cli' ] );
			expect( schema.login ).toBe( true );
		} );

		it( 'serializes features.networking as false when networking is explicitly disabled', () => {
			const blueprintConfig = {
				networking: false,
			};

			const jsonStr = buildBlueprintJson( { blueprintConfig } );
			const schema = JSON.parse( jsonStr );

			expect( schema.features ).toEqual( {
				networking: false,
			} );
		} );

		it( 'handles boolean extraLibraries fallback', () => {
			const blueprintConfig = {
				extraLibraries: true,
			};

			const jsonStr = buildBlueprintJson( { blueprintConfig } );
			const schema = JSON.parse( jsonStr );

			expect( schema.extraLibraries ).toEqual( [ 'wp-cli' ] );
		} );

		it( 'formats meta information with fallback to postTitle and postAuthor', () => {
			const blueprintConfig = {
				meta: {
					description: 'My blueprint description',
					categories: [ 'Testing', 'Demo' ],
				},
			};

			const jsonStr = buildBlueprintJson( {
				blueprintConfig,
				postTitle: 'Fallback Post Title',
				postAuthor: 'lubus',
			} );
			const schema = JSON.parse( jsonStr );

			expect( schema.meta ).toEqual( {
				title: 'Fallback Post Title',
				author: 'lubus',
				description: 'My blueprint description',
				categories: [ 'Testing', 'Demo' ],
			} );
		} );

		it( 'preserves explicit meta title and author over postTitle and postAuthor', () => {
			const blueprintConfig = {
				meta: {
					title: 'Explicit Title',
					author: 'Explicit Author',
				},
			};

			const jsonStr = buildBlueprintJson( {
				blueprintConfig,
				postTitle: 'Ignored Title',
				postAuthor: 'Ignored Author',
			} );
			const schema = JSON.parse( jsonStr );

			expect( schema.meta.title ).toBe( 'Explicit Title' );
			expect( schema.meta.author ).toBe( 'Explicit Author' );
		} );

		it( 'cleans step attributes and deprecated fields across blocks', () => {
			const blocks = [
				{
					attributes: {
						step: 'login',
						username: 'admin',
						password: '', // Should be stripped
					},
				},
				{
					attributes: {
						step: 'defineWpConfigConsts',
						consts: { WP_DEBUG: true },
						virtualize: true, // Should be stripped
					},
				},
				{
					attributes: {
						step: 'importWxr',
						file: 'demo.xml',
						importer: 'wordpress', // Should be stripped
					},
				},
				{
					attributes: {
						step: 'unzip',
						zipFile: { resource: 'vfs', path: '/file.zip' },
						zipPath: '/file.zip', // Should be stripped
					},
				},
				{
					attributes: {
						step: 'resetData',
						contentTypes: [], // Should be stripped
					},
				},
				{
					attributes: {
						step: 'installPlugin',
						pluginData: {
							resource: 'wordpress.org/plugins',
							slug: 'akismet',
						},
						ifAlreadyInstalled: '', // Should be stripped
					},
				},
				{
					attributes: {
						step: 'importWordPressFiles',
						zipFile: { resource: 'vfs', path: '/wp.zip' },
						pathInZip: '', // Should be stripped
					},
				},
				{
					attributes: {
						step: 'wp-cli',
						command: 'wp eval "echo 1;"',
						wpCliPath: '', // Should be stripped
					},
				},
				{
					attributes: {
						step: 'runSql',
						sql: 'SELECT 1;', // String sql should be converted to literal object
					},
				},
				{
					attributes: {
						step: 'writeFiles',
						// Missing writeToPath and filesTree name
					},
				},
			];

			const jsonStr = buildBlueprintJson( { blocks } );
			const schema = JSON.parse( jsonStr );

			expect( schema.steps ).toHaveLength( 10 );
			expect( schema.steps[ 0 ].password ).toBeUndefined();
			expect( schema.steps[ 1 ].virtualize ).toBeUndefined();
			expect( schema.steps[ 2 ].importer ).toBeUndefined();
			expect( schema.steps[ 3 ].zipPath ).toBeUndefined();
			expect( schema.steps[ 4 ].contentTypes ).toBeUndefined();
			expect( schema.steps[ 5 ].ifAlreadyInstalled ).toBeUndefined();
			expect( schema.steps[ 6 ].pathInZip ).toBeUndefined();
			expect( schema.steps[ 7 ].wpCliPath ).toBeUndefined();

			// runSql default literal
			expect( schema.steps[ 8 ].sql ).toEqual( {
				resource: 'literal',
				name: 'query.sql',
				contents: 'SELECT 1;',
			} );

			// writeFiles defaults
			expect( schema.steps[ 9 ].writeToPath ).toBe( '/wordpress' );
			expect( schema.steps[ 9 ].filesTree ).toEqual( {
				name: 'files',
				files: {},
			} );
		} );

		it( 'serializes importWxr authorsMap when authorsMode is map, and removes it otherwise', () => {
			const blocks = [
				{
					attributes: {
						step: 'importWxr',
						file: {
							resource: 'url',
							url: 'https://example.com/site.xml',
						},
						authorsMode: 'map',
						authorsMap: { alice: 'admin', bob: 'editor' },
					},
				},
				{
					attributes: {
						step: 'importWxr',
						file: {
							resource: 'url',
							url: 'https://example.com/site.xml',
						},
						authorsMode: 'create',
						authorsMap: { alice: 'admin' },
					},
				},
			];

			const jsonStr = buildBlueprintJson( { blocks } );
			const schema = JSON.parse( jsonStr );

			expect( schema.steps[ 0 ].authorsMap ).toEqual( {
				alice: 'admin',
				bob: 'editor',
			} );
			expect( schema.steps[ 1 ].authorsMap ).toBeUndefined();
		} );
	} );

	describe( 'handleJsonDataSubmit', () => {
		it( 'extracts blueprint config values and calls updateBlueprintConfig', () => {
			const updateMock = jest.fn();
			const noticeMock = jest.fn();

			const testData = {
				landingPage: '/custom-landing',
				preferredVersions: { php: '8.2', wp: '6.6' },
				features: { networking: true, intl: false },
				login: true,
				siteOptions: { blogname: 'Test' },
				constants: { WP_DEBUG: true },
				plugins: [ 'gutenberg' ],
				description: 'A test blueprint',
			};

			handleJsonDataSubmit( testData, updateMock, noticeMock );

			expect( updateMock ).toHaveBeenCalledWith( {
				landing_page: '/custom-landing',
				php_version: '8.2',
				wp_version: '6.6',
				networking: true,
				intl: false,
				login: true,
				siteOptions: { blogname: 'Test' },
				extraLibraries: false,
				plugins: [ 'gutenberg' ],
				constants: { WP_DEBUG: true },
				meta: { description: 'A test blueprint' },
			} );
			expect( noticeMock ).not.toHaveBeenCalled();
		} );

		it( 'triggers error notice when data is null', () => {
			const updateMock = jest.fn();
			const noticeMock = jest.fn();

			handleJsonDataSubmit( null, updateMock, noticeMock );

			expect( noticeMock ).toHaveBeenCalledWith(
				'error',
				'Failed to update Blueprint configuration.'
			);
			expect( updateMock ).not.toHaveBeenCalled();
		} );

		it( 'preserves omitted features.networking as undefined and retains false when set', () => {
			const updateMock = jest.fn();
			const noticeMock = jest.fn();

			// Test omitted networking
			handleJsonDataSubmit(
				{ preferredVersions: { php: '8.2', wp: '6.6' } },
				updateMock,
				noticeMock
			);
			expect( updateMock ).toHaveBeenLastCalledWith(
				expect.objectContaining( {
					networking: undefined,
				} )
			);

			// Test explicit false networking
			handleJsonDataSubmit(
				{ features: { networking: false } },
				updateMock,
				noticeMock
			);
			expect( updateMock ).toHaveBeenLastCalledWith(
				expect.objectContaining( {
					networking: false,
				} )
			);
		} );
	} );

	describe( 'validateAgainstSchema', () => {
		const mockSchema = {
			$schema: 'http://json-schema.org/draft-07/schema#',
			type: 'object',
			required: [ 'landingPage' ],
			properties: {
				landingPage: { type: 'string' },
			},
		};

		it( 'returns false and triggers notice when fetch fails', async () => {
			global.fetch = jest.fn( () =>
				Promise.reject( new Error( 'Network error' ) )
			);

			const noticeMock = jest.fn();
			const isValid = await validateAgainstSchema(
				{ landingPage: '/' },
				noticeMock
			);

			expect( isValid ).toBe( false );
			expect( noticeMock ).toHaveBeenCalledWith(
				'error',
				expect.stringContaining( 'Error validating against schema:' ),
				{ id: 'visual-blueprint-builder' }
			);
		} );

		it( 'returns false and triggers notice when schema validation fails', async () => {
			global.fetch = jest.fn( () =>
				Promise.resolve( {
					ok: true,
					json: () => Promise.resolve( mockSchema ),
				} )
			);

			const noticeMock = jest.fn();
			const isValid = await validateAgainstSchema( {}, noticeMock );

			expect( isValid ).toBe( false );
			expect( noticeMock ).toHaveBeenCalledWith(
				'error',
				expect.stringContaining( 'Schema validation failed:' ),
				{ id: 'visual-blueprint-builder' }
			);
		} );

		it( 'returns true for valid blueprint data', async () => {
			global.fetch = jest.fn( () =>
				Promise.resolve( {
					ok: true,
					json: () => Promise.resolve( mockSchema ),
				} )
			);

			const noticeMock = jest.fn();
			const isValid = await validateAgainstSchema(
				{ landingPage: '/wp-admin/' },
				noticeMock
			);

			expect( isValid ).toBe( true );
			expect( noticeMock ).not.toHaveBeenCalled();
		} );
	} );

	describe( 'handleBlueprintData', () => {
		it( 'triggers error notice when jsonData is falsy', async () => {
			const noticeMock = jest.fn();
			const updateMock = jest.fn();

			await handleBlueprintData( null, noticeMock, updateMock );

			expect( noticeMock ).toHaveBeenCalledWith(
				'error',
				'Invalid blueprint schema.'
			);
		} );
	} );
} );
