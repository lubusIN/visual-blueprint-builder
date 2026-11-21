/**
 * Node dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import { convertToKebabCase } from '../../editor/utils';

const STEPS_DIR = path.resolve( __dirname, '../' );

describe( 'Step Blocks Schema & Registration Integrity', () => {
	const stepDirs = fs
		.readdirSync( STEPS_DIR, { withFileTypes: true } )
		.filter( ( dirent ) => dirent.isDirectory() && dirent.name !== 'test' )
		.map( ( dirent ) => dirent.name );

	it( 'has step blocks defined', () => {
		expect( stepDirs.length ).toBeGreaterThan( 0 );
	} );

	test.each( stepDirs )(
		'block "%s" has valid block.json and matches conventions',
		( dirName ) => {
			const blockJsonPath = path.join( STEPS_DIR, dirName, 'block.json' );
			const indexPath = path.join( STEPS_DIR, dirName, 'index.js' );

			expect( fs.existsSync( blockJsonPath ) ).toBe( true );
			expect( fs.existsSync( indexPath ) ).toBe( true );

			const metadata = JSON.parse(
				fs.readFileSync( blockJsonPath, 'utf8' )
			);

			// WordPress 6.9+ requires apiVersion: 3
			expect( metadata.apiVersion ).toBe( 3 );

			// Name must follow playground-step/<folder-name>
			expect( metadata.name ).toBe( `playground-step/${ dirName }` );

			// Textdomain must match the plugin textdomain
			expect( metadata.textdomain ).toBe( 'visual-blueprint-builder' );

			// Must define attributes.step with default string
			expect( metadata.attributes?.step?.default ).toBeDefined();

			// Casing must convert correctly to the directory name
			const stepAttr = metadata.attributes.step.default;
			expect( convertToKebabCase( stepAttr ) ).toBe( dirName );
		}
	);
} );
