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
import SiteOptionsSettings from '../../../src/components/sidebar/site-options-settings';
import ConstantsSettings from '../../../src/components/sidebar/constants-settings';
import PluginSettings from '../../../src/components/sidebar/plugins-settings';
import MetaSettings from '../../../src/components/sidebar/meta-settings';

describe( 'Sidebar Settings Components', () => {
	let container;
	let root;

	beforeEach( () => {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		root = createRoot( container );
	} );

	afterEach( () => {
		act( () => {
			root.unmount();
		} );
		container.remove();
		// Clean up any stray modals in body
		document
			.querySelectorAll( '.components-modal__screen-overlay' )
			.forEach( ( el ) => el.remove() );
	} );

	describe( 'SiteOptionsSettings', () => {
		it( 'renders configuration button with label', () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<SiteOptionsSettings
						attributes={ { siteOptions: { blogname: 'Test' } } }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			expect( button ).not.toBeNull();
			expect( button.getAttribute( 'aria-label' ) ).toBe(
				'Configure Site Options'
			);
		} );

		it( 'opens modal on button click and saves on modal close', async () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<SiteOptionsSettings
						attributes={ { siteOptions: { blogname: 'Test' } } }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			act( () => {
				button.click();
			} );

			const modal = document.querySelector(
				'.components-modal__screen-overlay'
			);
			expect( modal ).not.toBeNull();

			// Close modal
			const closeButton = modal.querySelector(
				'button[aria-label="Close dialog"], button[aria-label="Close"]'
			);
			expect( closeButton ).not.toBeNull();
			await act( async () => {
				closeButton.click();
				await new Promise( ( resolve ) => setTimeout( resolve, 250 ) );
			} );

			expect( setAttributesMock ).toHaveBeenCalledWith( {
				siteOptions: { blogname: 'Test' },
			} );
		} );
	} );

	describe( 'ConstantsSettings', () => {
		it( 'renders configuration button with label', () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<ConstantsSettings
						attributes={ { constants: { WP_DEBUG: true } } }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			expect( button ).not.toBeNull();
			expect( button.getAttribute( 'aria-label' ) ).toBe(
				'Configure Constants'
			);
		} );

		it( 'opens modal on button click and saves on modal close', async () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<ConstantsSettings
						attributes={ { constants: { WP_DEBUG: true } } }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			act( () => {
				button.click();
			} );

			const modal = document.querySelector(
				'.components-modal__screen-overlay'
			);
			expect( modal ).not.toBeNull();

			// Close modal
			const closeButton = modal.querySelector(
				'button[aria-label="Close dialog"], button[aria-label="Close"]'
			);
			expect( closeButton ).not.toBeNull();
			await act( async () => {
				closeButton.click();
				await new Promise( ( resolve ) => setTimeout( resolve, 250 ) );
			} );

			expect( setAttributesMock ).toHaveBeenCalledWith( {
				constants: { WP_DEBUG: true },
			} );
		} );
	} );

	describe( 'PluginSettings', () => {
		it( 'renders configuration button with label', () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<PluginSettings
						attributes={ { plugins: [ 'woocommerce' ] } }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			expect( button ).not.toBeNull();
			expect( button.getAttribute( 'aria-label' ) ).toBe(
				'Configure Plugins'
			);
		} );

		it( 'opens modal on button click, displays plugins, allows add and delete, and saves on close', async () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<PluginSettings
						attributes={ { plugins: [ 'woocommerce', 'jetpack' ] } }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			act( () => {
				button.click();
			} );

			const modal = document.querySelector(
				'.components-modal__screen-overlay'
			);
			expect( modal ).not.toBeNull();

			const inputs = modal.querySelectorAll( 'input' );
			expect( inputs.length ).toBe( 2 );
			expect( inputs[ 0 ].value ).toBe( 'woocommerce' );
			expect( inputs[ 1 ].value ).toBe( 'jetpack' );

			// Delete the first plugin (woocommerce)
			const deleteButtons = modal.querySelectorAll(
				'button[aria-label="Delete Plugin"]'
			);
			expect( deleteButtons.length ).toBe( 2 );
			act( () => {
				deleteButtons[ 0 ].click();
			} );

			expect( modal.querySelectorAll( 'input' ).length ).toBe( 1 );

			// Add a new empty plugin
			const addButton = modal.querySelector(
				'button[aria-label="Add Plugin"]'
			);
			expect( addButton ).not.toBeNull();
			act( () => {
				addButton.click();
			} );

			// Now 2 inputs: jetpack and empty string
			const updatedInputs = modal.querySelectorAll( 'input' );
			expect( updatedInputs.length ).toBe( 2 );

			// Update the second input
			act( () => {
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call(
					updatedInputs[ 1 ],
					'contact-form-7'
				);
				updatedInputs[ 1 ].dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			// Close modal
			const closeButton = modal.querySelector(
				'button[aria-label="Close dialog"], button[aria-label="Close"]'
			);
			await act( async () => {
				closeButton.click();
				await new Promise( ( resolve ) => setTimeout( resolve, 250 ) );
			} );

			expect( setAttributesMock ).toHaveBeenCalledWith( {
				plugins: [ 'jetpack', 'contact-form-7' ],
			} );
		} );
	} );

	describe( 'MetaSettings', () => {
		it( 'renders configuration button with label', () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<MetaSettings
						attributes={ {
							meta: {
								title: 'My Blueprint',
								author: 'john',
							},
						} }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			expect( button ).not.toBeNull();
			expect( button.getAttribute( 'aria-label' ) ).toBe(
				'Configure Blueprint Metadata'
			);
		} );

		it( 'opens modal on button click, allows editing fields, and saves clean metadata', () => {
			const setAttributesMock = jest.fn();

			act( () => {
				root.render(
					<MetaSettings
						attributes={ {
							meta: {
								title: 'Initial Title',
								author: 'john',
								description: 'Initial Description',
								categories: [ 'Testing' ],
							},
						} }
						setAttributes={ setAttributesMock }
					/>
				);
			} );

			const button = container.querySelector( 'button' );
			act( () => {
				button.click();
			} );

			const modal = document.querySelector(
				'.components-modal__screen-overlay'
			);
			expect( modal ).not.toBeNull();

			const titleInput = modal.querySelector(
				'input[placeholder="A clear name for your Blueprint"]'
			);
			expect( titleInput.value ).toBe( 'Initial Title' );

			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value'
			).set;

			act( () => {
				nativeInputValueSetter.call(
					titleInput,
					'  Updated Blueprint Title  '
				);
				titleInput.dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			// Click "Save Metadata" button
			const saveButton = Array.from(
				modal.querySelectorAll( 'button' )
			).find( ( b ) => b.textContent.includes( 'Save Metadata' ) );
			expect( saveButton ).toBeDefined();

			act( () => {
				saveButton.click();
			} );

			expect( setAttributesMock ).toHaveBeenCalledWith( {
				meta: {
					title: 'Updated Blueprint Title',
					author: 'john',
					description: 'Initial Description',
					categories: [ 'Testing' ],
				},
			} );
		} );
	} );
} );
