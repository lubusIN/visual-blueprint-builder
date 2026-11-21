/**
 * External dependencies
 */
import { act } from 'react';

/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { getPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import '../../../src/editor/sidebar';

const mockUpdateBlueprintConfig = jest.fn();

jest.mock( '../../../src/editor/utils', () => {
	const actual = jest.requireActual( '../../../src/editor/utils' );
	return {
		...actual,
		useBlueprintData: () => ( {
			blueprintConfig: {
				landing_page: '/wp-admin/',
				php_version: '8.2',
				wp_version: '6.7',
				networking: true,
				intl: false,
				login: true,
				extraLibraries: false,
				meta: { title: 'Test Meta' },
				siteOptions: { blogname: 'Test Site' },
				plugins: [ 'woocommerce' ],
				constants: { WP_DEBUG: true },
			},
			updateBlueprintConfig: mockUpdateBlueprintConfig,
		} ),
		usePlaygroundVersions: () => ( {
			phpVersions: [
				{ label: '8.2', value: '8.2' },
				{ label: '8.3', value: '8.3' },
			],
			wpVersions: [
				{ label: '6.7', value: '6.7' },
				{ label: 'nightly', value: 'nightly' },
			],
		} ),
	};
} );

// Mock PluginDocumentSettingPanel and PluginPostStatusInfo from @wordpress/editor
jest.mock( '@wordpress/editor', () => ( {
	PluginDocumentSettingPanel: ( { title, children } ) => (
		<div data-testid="panel-document-setting">
			<h2>{ title }</h2>
			{ children }
		</div>
	),
	PluginPostStatusInfo: ( { children } ) => (
		<div data-testid="panel-post-status">{ children }</div>
	),
} ) );

describe( 'Sidebar Settings Panel Plugin', () => {
	let container;
	let root;

	beforeEach( () => {
		jest.clearAllMocks();
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		root = createRoot( container );
	} );

	afterEach( () => {
		act( () => {
			root.unmount();
		} );
		container.remove();
	} );

	it( 'registers blueprint-version-control plugin', () => {
		const plugin = getPlugin( 'blueprint-version-control' );
		expect( plugin ).toBeDefined();
		expect( typeof plugin.render ).toBe( 'function' );
	} );

	it( 'renders sidebar document setting panel and setting rows', () => {
		const plugin = getPlugin( 'blueprint-version-control' );
		const Component = plugin.render;

		act( () => {
			root.render( <Component /> );
		} );

		expect( container.textContent ).toContain( 'Playground Settings' );
		expect( container.textContent ).toContain( 'Blueprint Metadata' );
		expect( container.textContent ).toContain( 'Site Options' );
		expect( container.textContent ).toContain( 'Plugins' );
		expect( container.textContent ).toContain( 'WP Config Constants' );
	} );
} );
