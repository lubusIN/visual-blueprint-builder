/**
 * External dependencies
 */
import { act } from 'react';

/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Picker from '../../../src/components/picker';

const mockPluginResponse = {
	plugins: [
		{
			name: 'WooCommerce',
			slug: 'woocommerce',
			homepage: 'https://woocommerce.com',
			short_description: 'An open-source eCommerce platform.',
			active_installs: 5000000,
			tested: '6.7',
			icons: { '1x': 'https://example.com/woo.png' },
		},
		{
			name: 'Yoast SEO',
			slug: 'wordpress-seo',
			homepage: 'https://yoast.com',
			short_description: 'Improve your WordPress SEO.',
			active_installs: 5000000,
			tested: '6.7',
			icons: { '1x': 'https://example.com/yoast.png' },
		},
	],
};

const mockThemeResponse = {
	themes: [
		{
			name: 'Astra',
			slug: 'astra',
			screenshot_url: 'https://example.com/astra.jpg',
		},
	],
};

describe( 'Picker Component', () => {
	let container;
	let root;
	let originalFetch;

	beforeEach( () => {
		jest.clearAllMocks();
		originalFetch = global.fetch;

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

	it( 'renders the Browse trigger button', () => {
		act( () => {
			root.render( <Picker type="plugins" onSelect={ jest.fn() } /> );
		} );

		const triggerBtn = container.querySelector( 'button' );
		expect( triggerBtn ).not.toBeNull();
		expect( triggerBtn.textContent ).toContain( 'Browse' );
	} );

	it( 'opens modal, fetches plugins, and allows selection', async () => {
		global.fetch = jest.fn().mockResolvedValue( {
			ok: true,
			json: async () => mockPluginResponse,
		} );

		const onSelectMock = jest.fn();

		act( () => {
			root.render(
				<Picker
					type="plugins"
					onSelect={ onSelectMock }
					selectedSlug="wordpress-seo"
				/>
			);
		} );

		const triggerBtn = container.querySelector( 'button' );
		await act( async () => {
			triggerBtn.click();
			// Wait for fetchItems
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		expect( global.fetch ).toHaveBeenCalledWith(
			expect.stringContaining( 'api.wordpress.org/plugins' )
		);

		const modal = document.querySelector(
			'.components-modal__screen-overlay'
		);
		expect( modal ).not.toBeNull();
		expect( modal.textContent ).toContain( 'WooCommerce' );
		expect( modal.textContent ).toContain( 'Yoast SEO' );
		expect( modal.textContent ).toContain( '5.0M+ active installations' );

		// WooCommerce is not selected -> button says "Select"
		// Yoast SEO is selected -> button says "Selected" (disabled)
		const selectButtons = Array.from(
			modal.querySelectorAll( 'button' )
		).filter( ( b ) => b.textContent.trim() === 'Select' );
		expect( selectButtons.length ).toBeGreaterThanOrEqual( 1 );

		await act( async () => {
			selectButtons[ 0 ].click();
		} );

		expect( onSelectMock ).toHaveBeenCalledWith( 'woocommerce' );
	} );

	it( 'renders theme picker correctly and selects theme', async () => {
		global.fetch = jest.fn().mockResolvedValue( {
			ok: true,
			json: async () => mockThemeResponse,
		} );

		const onSelectMock = jest.fn();

		act( () => {
			root.render( <Picker type="themes" onSelect={ onSelectMock } /> );
		} );

		const triggerBtn = container.querySelector( 'button' );
		await act( async () => {
			triggerBtn.click();
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		expect( global.fetch ).toHaveBeenCalledWith(
			expect.stringContaining( 'api.wordpress.org/themes' )
		);

		const modal = document.querySelector(
			'.components-modal__screen-overlay'
		);
		expect( modal.textContent ).toContain( 'Astra' );

		const selectBtn = Array.from( modal.querySelectorAll( 'button' ) ).find(
			( b ) => b.textContent.trim() === 'Select'
		);
		expect( selectBtn ).toBeDefined();

		await act( async () => {
			selectBtn.click();
		} );

		expect( onSelectMock ).toHaveBeenCalledWith( 'astra' );
	} );

	it( 'displays empty state when search returns no items', async () => {
		global.fetch = jest.fn().mockResolvedValue( {
			ok: true,
			json: async () => ( { plugins: [] } ),
		} );

		act( () => {
			root.render( <Picker type="plugins" onSelect={ jest.fn() } /> );
		} );

		const triggerBtn = container.querySelector( 'button' );
		await act( async () => {
			triggerBtn.click();
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		const modal = document.querySelector(
			'.components-modal__screen-overlay'
		);
		const searchInput = modal.querySelector( 'input[type="search"]' );

		await act( async () => {
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value'
			).set;
			nativeInputValueSetter.call( searchInput, 'UnknownPluginSearch' );
			searchInput.dispatchEvent(
				new Event( 'input', { bubbles: true } )
			);
			// Wait for 300ms debounce + fetch
			await new Promise( ( resolve ) => setTimeout( resolve, 350 ) );
		} );

		expect( modal.textContent ).toContain( 'No results found' );
	} );
} );
