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

/**
 * Internal dependencies
 */
import Gallery from '../../../src/components/sidebar/blueprint-gallery';
import * as editorUtils from '../../../src/editor/utils';
import {
	BLUEPRINTS_GALLERY_API_URL,
	BLUEPRINTS_GALLERY_BASE_URL,
} from '../../../src/editor/constant';

const mockUpdateBlueprintConfig = jest.fn();

jest.mock( '../../../src/editor/utils', () => {
	const actual = jest.requireActual( '../../../src/editor/utils' );
	return {
		...actual,
		useBlueprintData: () => ( {
			updateBlueprintConfig: mockUpdateBlueprintConfig,
		} ),
		handleBlueprintData: jest.fn(),
	};
} );

const mockGalleryList = {
	'demo-blueprint.json': {
		title: 'WooCommerce Demo',
		author: 'automattic',
		description: 'A pre-configured WooCommerce store in Playground.',
	},
	'testing-blueprint.json': {
		title: 'PHPUnit Testing Site',
		author: 'wordpress',
		description: 'Quick environment for core tests.',
	},
};

describe( 'Blueprint Gallery Component', () => {
	let container;
	let root;
	let registry;
	let mockCreateNotice;
	let originalFetch;

	beforeEach( () => {
		jest.clearAllMocks();
		originalFetch = global.fetch;

		mockCreateNotice = jest.fn();
		registry = createRegistry();
		registry.register( noticesStore );
		jest.spyOn(
			registry.dispatch( noticesStore ),
			'createNotice'
		).mockImplementation( mockCreateNotice );

		container = document.createElement( 'div' );
		document.body.appendChild( container );
		root = createRoot( container );
	} );

	afterEach( () => {
		act( () => {
			root.unmount();
		} );
		container.remove();
		document
			.querySelectorAll( '.components-modal__screen-overlay' )
			.forEach( ( el ) => el.remove() );
		global.fetch = originalFetch;
	} );

	const renderComponent = ( props = {} ) => {
		act( () => {
			root.render(
				<RegistryProvider value={ registry }>
					<Gallery { ...props } />
				</RegistryProvider>
			);
		} );
	};

	it( 'renders Gallery button', () => {
		renderComponent();
		const button = container.querySelector( '.blueprint_gallery_json' );
		expect( button ).not.toBeNull();
		expect( button.textContent ).toContain( 'Gallery' );
	} );

	it( 'opens modal, fetches gallery list, and displays blueprint cards', async () => {
		global.fetch = jest.fn().mockResolvedValue( {
			ok: true,
			json: async () => mockGalleryList,
		} );

		renderComponent();

		const button = container.querySelector( '.blueprint_gallery_json' );
		await act( async () => {
			button.click();
			// Wait for fetchBlueprintList
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		expect( global.fetch ).toHaveBeenCalledWith(
			BLUEPRINTS_GALLERY_API_URL
		);

		const modal = document.querySelector(
			'.components-modal__screen-overlay'
		);
		expect( modal ).not.toBeNull();
		expect( modal.textContent ).toContain( 'WooCommerce Demo' );
		expect( modal.textContent ).toContain( 'PHPUnit Testing Site' );
		expect( modal.textContent ).toContain( 'automattic' );
	} );

	it( 'filters cards based on search input', async () => {
		global.fetch = jest.fn().mockResolvedValue( {
			ok: true,
			json: async () => mockGalleryList,
		} );

		renderComponent();

		const button = container.querySelector( '.blueprint_gallery_json' );
		await act( async () => {
			button.click();
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		const modal = document.querySelector(
			'.components-modal__screen-overlay'
		);
		const searchInput = modal.querySelector( 'input[type="search"]' );
		expect( searchInput ).not.toBeNull();

		// Search for PHPUnit
		await act( async () => {
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value'
			).set;
			nativeInputValueSetter.call( searchInput, 'PHPUnit' );
			searchInput.dispatchEvent(
				new Event( 'input', { bubbles: true } )
			);
		} );

		expect( modal.textContent ).toContain( 'PHPUnit Testing Site' );
		expect( modal.textContent ).not.toContain( 'WooCommerce Demo' );

		// Search for non-existent blueprint shows empty state
		await act( async () => {
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value'
			).set;
			nativeInputValueSetter.call( searchInput, 'NonExistentXYZ' );
			searchInput.dispatchEvent(
				new Event( 'input', { bubbles: true } )
			);
		} );

		expect( modal.textContent ).toContain( 'No blueprints found' );
	} );

	it( 'fetches blueprint details, warns if no steps, and imports via handleBlueprintData', async () => {
		const mockBlueprintJson = {
			landingPage: '/wp-admin/',
			steps: [],
		};

		global.fetch = jest.fn().mockImplementation( ( url ) => {
			if ( url === BLUEPRINTS_GALLERY_API_URL ) {
				return Promise.resolve( {
					ok: true,
					json: async () => mockGalleryList,
				} );
			}
			if (
				url === `${ BLUEPRINTS_GALLERY_BASE_URL }demo-blueprint.json`
			) {
				return Promise.resolve( {
					ok: true,
					json: async () => mockBlueprintJson,
				} );
			}
			return Promise.reject( new Error( 'Unknown URL' ) );
		} );

		const handleCloseMock = jest.fn();
		renderComponent( { handleClose: handleCloseMock } );

		const button = container.querySelector( '.blueprint_gallery_json' );
		await act( async () => {
			button.click();
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		const modal = document.querySelector(
			'.components-modal__screen-overlay'
		);
		const importButtons = modal.querySelectorAll( 'button' );
		const demoImportBtn = Array.from( importButtons ).find(
			( b ) => b.textContent.trim() === 'Import'
		);
		expect( demoImportBtn ).toBeDefined();

		await act( async () => {
			demoImportBtn.click();
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		// Warns since steps is empty
		expect( mockCreateNotice ).toHaveBeenCalledWith(
			'warning',
			expect.stringContaining( 'does not contain any steps' )
		);

		// Passes normalized data to handleBlueprintData
		expect( editorUtils.handleBlueprintData ).toHaveBeenCalledWith(
			{ landingPage: '/wp-admin/', steps: [] },
			expect.any( Function ),
			mockUpdateBlueprintConfig
		);
		expect( handleCloseMock ).toHaveBeenCalled();
	} );

	it( 'handles fetch gallery list error gracefully', async () => {
		global.fetch = jest
			.fn()
			.mockRejectedValue( new Error( 'Network error' ) );

		renderComponent();

		const button = container.querySelector( '.blueprint_gallery_json' );
		await act( async () => {
			button.click();
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		expect( mockCreateNotice ).toHaveBeenCalledWith(
			'error',
			expect.stringContaining( 'Error fetching blueprint list' )
		);
	} );
} );
