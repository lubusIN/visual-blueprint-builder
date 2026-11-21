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
import ResourceSelector, {
	getResourceSummary,
} from '../../../src/components/resource-selector';

describe( 'ResourceSelector Component', () => {
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
	} );

	describe( 'getResourceSummary', () => {
		it( 'handles url resource summary and fallback', () => {
			expect(
				getResourceSummary( 'plugin', {
					resource: 'url',
					url: 'https://example.com/plugin.zip',
				} )
			).toBe( 'https://example.com/plugin.zip' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'url',
					url: '',
				} )
			).toBe( '{ZIP URL}' );
		} );

		it( 'handles vfs resource summary and fallback', () => {
			expect(
				getResourceSummary( 'theme', {
					resource: 'vfs',
					path: '/wordpress/wp-content/themes/custom.zip',
				} )
			).toBe( '/wordpress/wp-content/themes/custom.zip' );

			expect(
				getResourceSummary( 'theme', {
					resource: 'vfs',
					path: '',
				} )
			).toBe( '{VFS Path}' );
		} );

		it( 'handles git:directory resource summary and fallback', () => {
			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
					path: 'plugins/my-plugin',
					ref: 'main',
				} )
			).toBe( 'plugins/my-plugin (Ref: main)' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
					path: 'plugins/my-plugin',
				} )
			).toBe( 'plugins/my-plugin' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
					ref: 'v1.0.0',
				} )
			).toBe( 'Ref: v1.0.0' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
				} )
			).toBe( 'Git Repository' );
		} );

		it( 'handles default slug resource summary and fallback', () => {
			expect(
				getResourceSummary( 'plugin', {
					resource: 'wordpress.org/plugins',
					slug: 'woocommerce',
				} )
			).toBe( 'woocommerce' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'wordpress.org/plugins',
				} )
			).toBe( '{slug}' );
		} );
	} );

	describe( 'Component Rendering & Interactions', () => {
		it( 'renders for wordpress.org plugin with picker and slug input', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<ResourceSelector
						type="plugin"
						data={ {
							resource: 'wordpress.org/plugins',
							slug: 'woocommerce',
						} }
						onChange={ onChangeMock }
					/>
				);
			} );

			expect( container.textContent ).toContain( 'Resource' );
			expect( container.textContent ).toContain( 'Browse' );

			const input = container.querySelector(
				'input[placeholder="Enter plugin slug"]'
			);
			expect( input ).not.toBeNull();
			expect( input.value ).toBe( 'woocommerce' );

			// Trigger input change
			act( () => {
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( input, 'jetpack' );
				input.dispatchEvent( new Event( 'input', { bubbles: true } ) );
			} );

			expect( onChangeMock ).toHaveBeenCalledWith( {
				resource: 'wordpress.org/plugins',
				slug: 'jetpack',
			} );
		} );

		it( 'renders for vfs resource with path input', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<ResourceSelector
						type="theme"
						data={ {
							resource: 'vfs',
							path: '/wp-content/themes/mytheme.zip',
						} }
						onChange={ onChangeMock }
					/>
				);
			} );

			const input = container.querySelector(
				'input[placeholder="Enter the file path for the theme ZIP"]'
			);
			expect( input ).not.toBeNull();
			expect( input.value ).toBe( '/wp-content/themes/mytheme.zip' );

			act( () => {
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( input, '/new-path.zip' );
				input.dispatchEvent( new Event( 'input', { bubbles: true } ) );
			} );

			expect( onChangeMock ).toHaveBeenCalledWith( {
				resource: 'vfs',
				path: '/new-path.zip',
			} );
		} );

		it( 'renders for url resource with url input', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<ResourceSelector
						type="plugin"
						data={ {
							resource: 'url',
							url: 'https://example.com/plugin.zip',
						} }
						onChange={ onChangeMock }
					/>
				);
			} );

			const input = container.querySelector(
				'input[placeholder="Enter the URL of the plugin ZIP file"]'
			);
			expect( input ).not.toBeNull();
			expect( input.value ).toBe( 'https://example.com/plugin.zip' );
		} );

		it( 'renders for git:directory with all git fields', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<ResourceSelector
						type="plugin"
						data={ {
							resource: 'git:directory',
							url: 'https://github.com/org/repo',
							path: 'plugins/test',
							ref: 'main',
							refType: 'branch',
						} }
						onChange={ onChangeMock }
					/>
				);
			} );

			const inputs = container.querySelectorAll( 'input' );
			expect( inputs.length ).toBeGreaterThanOrEqual( 3 );
			expect( container.textContent ).toContain( 'Git Directory' );
			expect( container.textContent ).toContain( 'Directory' );
			expect( container.textContent ).toContain( 'Reference' );
		} );

		it( 'handles switching resource type via toggle group control', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<ResourceSelector
						type="plugin"
						data={ {
							resource: 'url',
							url: 'https://example.com/plugin.zip',
						} }
						onChange={ onChangeMock }
					/>
				);
			} );

			// Switch to VFS
			const vfsBtn = Array.from(
				container.querySelectorAll( 'button' )
			).find( ( b ) => b.textContent.trim() === 'VFS' );
			expect( vfsBtn ).toBeDefined();
			act( () => {
				vfsBtn.click();
			} );
			expect( onChangeMock ).toHaveBeenCalledWith( {
				resource: 'vfs',
				path: '',
			} );

			// Switch to Plugin (orgType)
			const orgBtn = Array.from(
				container.querySelectorAll( 'button' )
			).find( ( b ) => b.textContent.trim() === 'Plugin' );
			expect( orgBtn ).toBeDefined();
			act( () => {
				orgBtn.click();
			} );
			expect( onChangeMock ).toHaveBeenCalledWith( {
				resource: 'wordpress.org/plugins',
				slug: '',
			} );

			// Switch to Git Directory
			const gitBtn = Array.from(
				container.querySelectorAll( 'button' )
			).find( ( b ) => b.textContent.trim() === 'Git Directory' );
			expect( gitBtn ).toBeDefined();
			act( () => {
				gitBtn.click();
			} );
			expect( onChangeMock ).toHaveBeenCalledWith( {
				resource: 'git:directory',
				ref: '',
				path: '',
				url: '',
			} );
		} );

		it( 'handles updating git:directory fields', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<ResourceSelector
						type="plugin"
						data={ {
							resource: 'git:directory',
							url: 'https://github.com/org/repo',
							path: 'plugins/test',
							ref: 'main',
							refType: 'branch',
						} }
						onChange={ onChangeMock }
					/>
				);
			} );

			const inputs = container.querySelectorAll( 'input' );
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value'
			).set;

			// Update repository url input (first input)
			act( () => {
				nativeInputValueSetter.call(
					inputs[ 0 ],
					'https://github.com/org/new-repo'
				);
				inputs[ 0 ].dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			expect( onChangeMock ).toHaveBeenCalledWith(
				expect.objectContaining( {
					url: 'https://github.com/org/new-repo',
				} )
			);
		} );
	} );
} );
