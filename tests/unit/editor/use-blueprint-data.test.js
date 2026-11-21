/**
 * External dependencies
 */
import { act } from 'react';

/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { createRegistry, RegistryProvider } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useBlueprintData } from '../../../src/editor/utils';

const mockBlocks = [
	{
		name: 'playground-step/login',
		attributes: { step: 'login', username: 'admin' },
	},
];

const mockMeta = {
	_blueprint_config: {
		landing_page: '/custom-landing/',
		php_version: '8.2',
		meta: {
			title: 'Custom Blueprint',
		},
	},
};

const mockUser = { slug: 'author-slug', name: 'Author Name' };

describe( 'useBlueprintData hook', () => {
	let container;
	let root;
	let registry;
	let mockEditPost;
	let hookResult;

	function TestConsumer() {
		hookResult = useBlueprintData();
		return null;
	}

	beforeEach( () => {
		jest.clearAllMocks();
		mockEditPost = jest.fn();

		registry = createRegistry();

		// Register core/editor
		registry.registerStore( 'core/editor', {
			reducer: () => ( {} ),
			actions: {
				editPost: ( payload ) => {
					mockEditPost( payload );
					return { type: 'EDIT_POST', payload };
				},
			},
			selectors: {
				getEditedPostAttribute: ( state, attr ) => {
					if ( attr === 'title' ) {
						return 'Test Blueprint Post';
					}
					if ( attr === 'author' ) {
						return 42;
					}
					if ( attr === 'meta' ) {
						return mockMeta;
					}
					return null;
				},
			},
		} );

		// Register core store for getUser
		registry.registerStore( 'core', {
			reducer: () => ( {} ),
			selectors: {
				getUser: ( state, id ) => {
					if ( id === 42 ) {
						return mockUser;
					}
					return null;
				},
			},
		} );

		// Register core/block-editor
		registry.registerStore( 'core/block-editor', {
			reducer: () => ( {} ),
			selectors: {
				getBlocks: () => mockBlocks,
			},
		} );

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

	it( 'prepares blueprint schema using blocks and post meta', () => {
		act( () => {
			root.render(
				<RegistryProvider value={ registry }>
					<TestConsumer />
				</RegistryProvider>
			);
		} );

		expect( hookResult ).toBeDefined();
		expect( typeof hookResult.prepareSchema ).toBe( 'function' );

		const schemaString = hookResult.prepareSchema();
		const parsed = JSON.parse( schemaString );

		expect( parsed.landingPage ).toBe( '/custom-landing/' );
		expect( parsed.preferredVersions?.php ).toBe( '8.2' );
		expect( parsed.meta?.author ).toBe( 'author-slug' );
		expect( parsed.steps ).toEqual( [
			{ step: 'login', username: 'admin' },
		] );
	} );

	it( 'updates blueprint config via editPost action', () => {
		act( () => {
			root.render(
				<RegistryProvider value={ registry }>
					<TestConsumer />
				</RegistryProvider>
			);
		} );

		act( () => {
			hookResult.updateBlueprintConfig( {
				php_version: '8.3',
				login: true,
			} );
		} );

		expect( mockEditPost ).toHaveBeenCalledWith( {
			meta: {
				_blueprint_config: {
					landing_page: '/custom-landing/',
					php_version: '8.3',
					login: true,
					meta: {
						title: 'Custom Blueprint',
					},
				},
			},
		} );
	} );
} );
