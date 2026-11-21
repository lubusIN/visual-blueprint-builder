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
import OpenJson from '../../../src/components/sidebar/open-json';
import * as editorUtils from '../../../src/editor/utils';

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

describe( 'OpenJson Component', () => {
	let container;
	let root;
	let registry;
	let mockCreateNotice;

	beforeEach( () => {
		jest.clearAllMocks();
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
	} );

	const renderComponent = ( props = {} ) => {
		act( () => {
			root.render(
				<RegistryProvider value={ registry }>
					<OpenJson { ...props } />
				</RegistryProvider>
			);
		} );
	};

	it( 'renders file upload control with Import JSON text', () => {
		renderComponent();

		expect( container.textContent ).toContain( 'Import JSON' );
		const fileInput = container.querySelector( 'input[type="file"]' );
		expect( fileInput ).not.toBeNull();
		expect( fileInput.getAttribute( 'accept' ) ).toBe( 'application/json' );
	} );

	it( 'rejects non-json files with an error notice', () => {
		renderComponent();

		const fileInput = container.querySelector( 'input[type="file"]' );
		const invalidFile = new File( [ 'image data' ], 'picture.png', {
			type: 'image/png',
		} );

		act( () => {
			Object.defineProperty( fileInput, 'files', {
				value: [ invalidFile ],
				configurable: true,
			} );
			fileInput.dispatchEvent( new Event( 'change', { bubbles: true } ) );
		} );

		expect( mockCreateNotice ).toHaveBeenCalledWith(
			'error',
			'Please upload a valid JSON file.'
		);
		expect( editorUtils.handleBlueprintData ).not.toHaveBeenCalled();
	} );

	it( 'processes valid json file and calls handleBlueprintData', async () => {
		const handleCloseMock = jest.fn();
		renderComponent( { handleClose: handleCloseMock } );

		const fileInput = container.querySelector( 'input[type="file"]' );
		const validJson = JSON.stringify( {
			landingPage: '/wp-admin/',
			steps: [],
		} );
		const validFile = new File( [ validJson ], 'blueprint.json', {
			type: 'application/json',
		} );

		await act( async () => {
			Object.defineProperty( fileInput, 'files', {
				value: [ validFile ],
				configurable: true,
			} );
			fileInput.dispatchEvent( new Event( 'change', { bubbles: true } ) );

			// Wait for FileReader onload
			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		expect( editorUtils.handleBlueprintData ).toHaveBeenCalledWith(
			{ landingPage: '/wp-admin/', steps: [] },
			expect.any( Function ),
			mockUpdateBlueprintConfig
		);
		expect( handleCloseMock ).toHaveBeenCalled();
	} );

	it( 'handles malformed JSON file content with an error notice', async () => {
		renderComponent();

		const fileInput = container.querySelector( 'input[type="file"]' );
		const malformedFile = new File( [ '{ not valid json }' ], 'bad.json', {
			type: 'application/json',
		} );

		await act( async () => {
			Object.defineProperty( fileInput, 'files', {
				value: [ malformedFile ],
				configurable: true,
			} );
			fileInput.dispatchEvent( new Event( 'change', { bubbles: true } ) );

			await new Promise( ( resolve ) => setTimeout( resolve, 50 ) );
		} );

		expect( mockCreateNotice ).toHaveBeenCalledWith(
			'error',
			'Invalid JSON file.'
		);
	} );
} );
