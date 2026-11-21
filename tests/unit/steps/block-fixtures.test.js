/**
 * Node dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * WordPress dependencies
 */
import {
	registerBlockType,
	unregisterBlockType,
	createBlock,
	parse,
	serialize,
} from '@wordpress/blocks';

const STEPS_DIR = path.resolve( __dirname, '../../../src/steps' );

describe( 'Step Blocks Fixtures & Serialization Roundtrip', () => {
	const stepDirs = fs
		.readdirSync( STEPS_DIR, { withFileTypes: true } )
		.filter( ( dirent ) => dirent.isDirectory() && dirent.name !== 'test' )
		.map( ( dirent ) => dirent.name );

	const registeredBlocks = [];

	beforeAll( () => {
		stepDirs.forEach( ( dir ) => {
			const blockJsonPath = path.join( STEPS_DIR, dir, 'block.json' );
			if ( fs.existsSync( blockJsonPath ) ) {
				const metadata = JSON.parse(
					fs.readFileSync( blockJsonPath, 'utf8' )
				);
				registerBlockType( metadata.name, {
					...metadata,
					category: 'widgets',
					save: () => null,
				} );
				registeredBlocks.push( metadata.name );
			}
		} );
	} );

	afterAll( () => {
		registeredBlocks.forEach( ( name ) => {
			unregisterBlockType( name );
		} );
	} );

	test.each( stepDirs )(
		'block "%s" serializes and parses without invalidation',
		( dirName ) => {
			const blockName = `playground-step/${ dirName }`;
			const blockJsonPath = path.join( STEPS_DIR, dirName, 'block.json' );
			const metadata = JSON.parse(
				fs.readFileSync( blockJsonPath, 'utf8' )
			);

			// 1. Create a block with default attributes
			const block = createBlock( blockName, {} );
			expect( block.name ).toBe( blockName );

			// 2. Serialize block to comment delimiter format
			const serialized = serialize( [ block ] );
			expect( typeof serialized ).toBe( 'string' );
			expect( serialized ).toContain( `<!-- wp:${ blockName }` );

			// 3. Parse serialized string back into block object
			const parsedBlocks = parse( serialized );
			expect( parsedBlocks ).toHaveLength( 1 );

			const [ parsedBlock ] = parsedBlocks;

			// 4. Assert block is strictly valid (no block invalidation)
			expect( parsedBlock.isValid ).toBe( true );
			expect( parsedBlock.name ).toBe( blockName );
			expect( parsedBlock.attributes.step ).toBe(
				metadata.attributes?.step?.default
			);

			// 5. Roundtrip idempotence: serializing parsed block produces identical markup
			const roundtripSerialized = serialize( parsedBlocks );
			expect( roundtripSerialized ).toBe( serialized );
		}
	);

	describe( 'Populated Attributes Serialization & Parsing', () => {
		const populatedFixtures = [
			{
				name: 'playground-step/set-site-options',
				attributes: {
					options: {
						blogname: 'Visual Blueprint Builder',
						users_can_register: 1,
					},
				},
			},
			{
				name: 'playground-step/wp-cli',
				attributes: {
					command: 'wp post create --post_title="Hello World"',
					wpCliPath: '/usr/local/bin/wp',
				},
			},
			{
				name: 'playground-step/run-php',
				attributes: {
					code: '<?php echo phpversion(); ?>',
				},
			},
			{
				name: 'playground-step/install-plugin',
				attributes: {
					pluginData: {
						resource: 'wordpress.org/plugins',
						slug: 'woocommerce',
					},
					ifAlreadyInstalled: 'skip',
				},
			},
			{
				name: 'playground-step/write-files',
				attributes: {
					writeToPath: '/wordpress',
					filesTree: {
						name: 'files',
						files: {
							'custom.php': '<?php phpinfo(); ?>',
						},
					},
				},
			},
			{
				name: 'playground-step/update-user-meta',
				attributes: {
					userId: 1,
					meta: { admin_color: 'coffee' },
				},
			},
			{
				name: 'playground-step/define-wp-config-consts',
				attributes: {
					consts: {
						WP_DEBUG: true,
						SCRIPT_DEBUG: true,
					},
				},
			},
		];

		test.each( populatedFixtures )(
			'preserves complex attributes for $name',
			( { name, attributes } ) => {
				const block = createBlock( name, attributes );
				const serialized = serialize( [ block ] );
				const [ parsedBlock ] = parse( serialized );

				expect( parsedBlock.isValid ).toBe( true );
				Object.entries( attributes ).forEach( ( [ key, value ] ) => {
					expect( parsedBlock.attributes[ key ] ).toEqual( value );
				} );

				// Serializing again matches original serialization
				expect( serialize( [ parsedBlock ] ) ).toBe( serialized );
			}
		);
	} );

	describe( 'Block Invalidation Detection', () => {
		it( 'correctly detects corrupted or mismatched markup as invalid', () => {
			// A block whose save returns null must not contain unexpected HTML inner content
			const corruptedMarkup = `<!-- wp:playground-step/run-php {"code":"<?php ?>"} --><p>Unexpected inner HTML</p><!-- /wp:playground-step/run-php -->`;
			const [ parsedBlock ] = parse( corruptedMarkup );

			expect( console ).toHaveErrored();
			expect( console ).toHaveWarned();
			expect( parsedBlock.isValid ).toBe( false );
		} );
	} );
} );
