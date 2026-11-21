/**
 * External dependencies
 */
import { act } from 'react';

/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { createRegistry, RegistryProvider } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { getPlugin } from '@wordpress/plugins';
import * as blob from '@wordpress/blob';

/**
 * Internal dependencies
 */
import '../../../src/editor/blueprint-header-actions';
import {
	PLAYGROUND_BUILDER_BASE,
	PLAYGROUND_BASE,
} from '../../../src/editor/constant';

const mockPrepareSchema = jest.fn( () => '{"landingPage":"/","steps":[]}' );

jest.mock( '@wordpress/blob', () => ( {
	downloadBlob: jest.fn(),
} ) );

jest.mock( '../../../src/editor/utils', () => {
	const actual = jest.requireActual( '../../../src/editor/utils' );
	return {
		...actual,
		useBlueprintData: () => ( {
			prepareSchema: mockPrepareSchema,
		} ),
	};
} );

describe( 'Blueprint Header Actions', () => {
	let container;
	let root;
	let registry;
	let mockCreateSuccessNotice;
	let mockCreateErrorNotice;
	let headerSettings;

	beforeEach( () => {
		jest.clearAllMocks();

		mockCreateSuccessNotice = jest.fn();
		mockCreateErrorNotice = jest.fn();

		registry = createRegistry();
		registry.register( noticesStore );
		jest.spyOn(
			registry.dispatch( noticesStore ),
			'createSuccessNotice'
		).mockImplementation( mockCreateSuccessNotice );
		jest.spyOn(
			registry.dispatch( noticesStore ),
			'createErrorNotice'
		).mockImplementation( mockCreateErrorNotice );

		// Register core/editor mock store
		registry.registerStore( 'core/editor', {
			reducer: () => ( {} ),
			selectors: {
				getEditedPostAttribute: () => ( attr ) => {
					if ( attr === 'type' ) {
						return 'blueprint';
					}
					return null;
				},
			},
		} );

		// Setup editor header in DOM
		headerSettings = document.createElement( 'div' );
		headerSettings.className = 'editor-header__settings';
		const pinnedItems = document.createElement( 'div' );
		pinnedItems.className = 'interface-pinned-items';
		headerSettings.appendChild( pinnedItems );
		document.body.appendChild( headerSettings );

		container = document.createElement( 'div' );
		document.body.appendChild( container );
		root = createRoot( container );
	} );

	afterEach( () => {
		act( () => {
			root.unmount();
		} );
		container.remove();
		headerSettings.remove();
		document
			.querySelectorAll( '.components-popover' )
			.forEach( ( el ) => el.remove() );
	} );

	it( 'registers the blueprint-header-dropdown plugin', () => {
		const plugin = getPlugin( 'blueprint-header-dropdown' );
		expect( plugin ).toBeDefined();
		expect( typeof plugin.render ).toBe( 'function' );
	} );

	it( 'mounts dropdown into header and renders menu items', async () => {
		const plugin = getPlugin( 'blueprint-header-dropdown' );
		const Component = plugin.render;

		act( () => {
			root.render(
				<RegistryProvider value={ registry }>
					<Component />
				</RegistryProvider>
			);
		} );

		const mountEl = headerSettings.querySelector(
			'.wp-playground-blueprint-header-dropdown'
		);
		expect( mountEl ).not.toBeNull();

		const toggleButton = mountEl.querySelector(
			'button[aria-label="Blueprint actions"]'
		);
		expect( toggleButton ).not.toBeNull();

		// Open dropdown
		await act( async () => {
			toggleButton.click();
		} );

		// Verify menu items exist
		const popover = document.querySelector( '.components-popover' );
		expect( popover ).not.toBeNull();
		expect( popover.textContent ).toContain( 'Download JSON' );
		expect( popover.textContent ).toContain( 'Copy JSON' );
		expect( popover.textContent ).toContain( 'Open in Builder' );
		expect( popover.textContent ).toContain( 'Playground' );

		// Check links
		const links = Array.from( popover.querySelectorAll( 'a' ) );
		const builderLink = links.find( ( a ) =>
			a.textContent.includes( 'Open in Builder' )
		);
		expect( builderLink ).toBeDefined();
		expect( builderLink.getAttribute( 'href' ) ).toContain(
			PLAYGROUND_BUILDER_BASE
		);

		const playgroundLink = links.find( ( a ) =>
			a.textContent.includes( 'Playground' )
		);
		expect( playgroundLink ).toBeDefined();
		expect( playgroundLink.getAttribute( 'href' ) ).toContain(
			PLAYGROUND_BASE
		);
	} );

	it( 'triggers downloadBlob when clicking Download JSON', async () => {
		const plugin = getPlugin( 'blueprint-header-dropdown' );
		const Component = plugin.render;

		act( () => {
			root.render(
				<RegistryProvider value={ registry }>
					<Component />
				</RegistryProvider>
			);
		} );

		const mountEl = headerSettings.querySelector(
			'.wp-playground-blueprint-header-dropdown'
		);
		const toggleButton = mountEl.querySelector( 'button' );
		await act( async () => {
			toggleButton.click();
		} );

		const popover = document.querySelector( '.components-popover' );
		const downloadButton = Array.from(
			popover.querySelectorAll( 'button' )
		).find( ( b ) => b.textContent.includes( 'Download JSON' ) );
		expect( downloadButton ).toBeDefined();

		await act( async () => {
			downloadButton.click();
		} );

		expect( blob.downloadBlob ).toHaveBeenCalledWith(
			'playground-blueprint.json',
			'{"landingPage":"/"}',
			'application/json'
		);
		expect( mockCreateSuccessNotice ).toHaveBeenCalledWith(
			'Preparing Blueprint for download!',
			{ type: 'snackbar' }
		);
	} );
} );
