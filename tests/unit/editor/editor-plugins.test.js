/**
 * External dependencies
 */
import { act } from 'react';

/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { createRegistry, RegistryProvider } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { getPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import '../../../src/editor/disable-block-directory';
import '../../../src/editor/on-boarding';
import '../../../src/editor/block-appender';

jest.mock( '@wordpress/block-editor', () => ( {
	ButtonBlockAppender: () => (
		<button data-testid="button-block-appender">Add Block</button>
	),
} ) );

jest.mock( '../../../src/components/sidebar', () => ( {
	OpenJson: ( props ) => (
		<button data-testid="mock-open-json" onClick={ props.handleClose }>
			OpenJson
		</button>
	),
	Gallery: ( props ) => (
		<button data-testid="mock-gallery" onClick={ props.handleClose }>
			Gallery
		</button>
	),
} ) );

const emptyBlocks = [];
const filledBlocks = [ { clientId: 'b1' } ];

describe( 'Editor Plugins and Filters', () => {
	let container;
	let root;
	let registry;

	beforeEach( () => {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		root = createRoot( container );

		registry = createRegistry();
	} );

	afterEach( () => {
		act( () => {
			root.unmount();
		} );
		container.remove();
		document
			.querySelectorAll( '.components-modal__screen-overlay' )
			.forEach( ( el ) => el.remove() );
	} );

	describe( 'on-boarding plugin', () => {
		it( 'registers wp-blueprint-onboarding plugin', () => {
			const plugin = getPlugin( 'wp-blueprint-onboarding' );
			expect( plugin ).toBeDefined();
			expect( typeof plugin.render ).toBe( 'function' );
		} );

		it( 'displays onboarding modal when post is new and has no blocks', async () => {
			registry.registerStore( 'core/editor', {
				reducer: () => ( {} ),
				selectors: {
					isCleanNewPost: () => true,
					getBlocks: () => emptyBlocks,
				},
			} );

			const plugin = getPlugin( 'wp-blueprint-onboarding' );
			const Component = plugin.render;

			act( () => {
				root.render(
					<RegistryProvider value={ registry }>
						<Component />
					</RegistryProvider>
				);
			} );

			const modal = document.querySelector(
				'.wp-playground-onboarding-modal'
			);
			expect( modal ).not.toBeNull();
			expect( modal.textContent ).toContain( 'Start Blueprint From' );
			expect( modal.textContent ).toContain( 'Blank' );

			// Clicking Blank closes modal
			const blankBtn = Array.from(
				modal.querySelectorAll( 'button' )
			).find( ( b ) => b.textContent.includes( 'Blank' ) );
			expect( blankBtn ).toBeDefined();

			await act( async () => {
				blankBtn.click();
				await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
			} );

			expect(
				document.querySelector( '.wp-playground-onboarding-modal' )
			).toBeNull();
		} );

		it( 'does not display modal when post has blocks', () => {
			registry.registerStore( 'core/editor', {
				reducer: () => ( {} ),
				selectors: {
					isCleanNewPost: () => true,
					getBlocks: () => filledBlocks,
				},
			} );

			const plugin = getPlugin( 'wp-blueprint-onboarding' );
			const Component = plugin.render;

			act( () => {
				root.render(
					<RegistryProvider value={ registry }>
						<Component />
					</RegistryProvider>
				);
			} );

			expect(
				document.querySelector( '.wp-playground-onboarding-modal' )
			).toBeNull();
		} );
	} );

	describe( 'block-appender filter', () => {
		it( 'wraps BlockEdit component and renders ButtonBlockAppender when last block', () => {
			const blockOrder = [ 'b1' ];
			registry.registerStore( 'core/block-editor', {
				reducer: () => ( {} ),
				selectors: {
					getBlockOrder: () => blockOrder,
					getBlockRootClientId: () => null,
				},
			} );

			const DummyBlockEdit = ( props ) => (
				<div data-testid="dummy-block-edit">{ props.clientId }</div>
			);

			const FilteredBlockEdit = applyFilters(
				'editor.BlockEdit',
				DummyBlockEdit
			);
			expect( FilteredBlockEdit ).toBeDefined();

			act( () => {
				root.render(
					<RegistryProvider value={ registry }>
						<FilteredBlockEdit clientId="b1" />
					</RegistryProvider>
				);
			} );

			expect(
				container.querySelector( '.block-list-appender' )
			).not.toBeNull();
		} );
	} );
} );
