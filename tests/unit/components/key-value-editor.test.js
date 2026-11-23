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
import KeyValueEditor, {
	addKeyValuePair,
	updateKeyValuePair,
	removeKeyValuePair,
	checkAddButtonDisabled,
	hasDuplicateNames,
	hasDuplicateKeys,
	keyValuePairsToObject,
} from '../../../src/components/key-value-editor';

describe( 'KeyValueEditor Component Utilities', () => {
	describe( 'addKeyValuePair', () => {
		it( 'adds a new blank key-value pair to the list', () => {
			const list = [ [ 'key1', 'value1' ] ];
			const updateMock = jest.fn();

			addKeyValuePair( list, updateMock );

			expect( updateMock ).toHaveBeenCalledWith( [
				[ 'key1', 'value1' ],
				[ '', '' ],
			] );
		} );

		it( 'does not add a new pair if an empty pair already exists', () => {
			const list = [
				[ 'key1', 'value1' ],
				[ '', '' ],
			];
			const updateMock = jest.fn();

			addKeyValuePair( list, updateMock );

			expect( updateMock ).not.toHaveBeenCalled();
		} );
	} );

	describe( 'updateKeyValuePair', () => {
		it( 'updates the key of a specific row without changing the value', () => {
			const list = [
				[ 'oldKey', 'val1' ],
				[ 'key2', 'val2' ],
			];
			const updateMock = jest.fn();

			updateKeyValuePair( list, updateMock, 0, 'key', 'newKey' );

			expect( updateMock ).toHaveBeenCalledWith( [
				[ 'newKey', 'val1' ],
				[ 'key2', 'val2' ],
			] );
		} );

		it( 'updates the value of a specific row without changing the key', () => {
			const list = [
				[ 'key1', 'oldVal' ],
				[ 'key2', 'val2' ],
			];
			const updateMock = jest.fn();

			updateKeyValuePair( list, updateMock, 0, 'value', 'newVal' );

			expect( updateMock ).toHaveBeenCalledWith( [
				[ 'key1', 'newVal' ],
				[ 'key2', 'val2' ],
			] );
		} );
	} );

	describe( 'removeKeyValuePair', () => {
		it( 'removes the item at the specified index', () => {
			const list = [
				[ 'key1', 'val1' ],
				[ 'key2', 'val2' ],
				[ 'key3', 'val3' ],
			];
			const updateMock = jest.fn();

			removeKeyValuePair( list, updateMock, 1 );

			expect( updateMock ).toHaveBeenCalledWith( [
				[ 'key1', 'val1' ],
				[ 'key3', 'val3' ],
			] );
		} );
	} );

	describe( 'checkAddButtonDisabled', () => {
		it( 'returns true when the last item has an empty key or value', () => {
			expect( checkAddButtonDisabled( [ [ 'key1', '' ] ] ) ).toBe( true );
			expect( checkAddButtonDisabled( [ [ '', 'val1' ] ] ) ).toBe( true );
			expect( checkAddButtonDisabled( [ [ '', '' ] ] ) ).toBe( true );
		} );

		it( 'returns false when the last item is completely filled', () => {
			expect( checkAddButtonDisabled( [ [ 'key1', 'val1' ] ] ) ).toBe(
				false
			);
			expect(
				checkAddButtonDisabled( [
					[ 'key1', 'val1' ],
					[ 'key2', 'val2' ],
				] )
			).toBe( false );
		} );

		it( 'returns false when list is empty', () => {
			expect( checkAddButtonDisabled( [] ) ).toBe( false );
		} );
	} );

	describe( 'hasDuplicateNames', () => {
		it( 'returns false for unique names or empty lists', () => {
			expect( hasDuplicateNames( [] ) ).toBe( false );
			expect(
				hasDuplicateNames( [
					[ 'key1', 'val1' ],
					[ 'key2', 'val2' ],
				] )
			).toBe( false );
			expect( hasDuplicateKeys( [] ) ).toBe( false );
		} );

		it( 'returns false for multiple blank or whitespace keys', () => {
			expect(
				hasDuplicateNames( [
					[ '', '' ],
					[ '', '' ],
				] )
			).toBe( false );
			expect(
				hasDuplicateNames( [
					[ '   ', 'val1' ],
					[ '   ', 'val2' ],
				] )
			).toBe( false );
		} );

		it( 'returns true when duplicate names exist', () => {
			expect(
				hasDuplicateNames( [
					[ 'key1', 'val1' ],
					[ 'key1', 'val2' ],
				] )
			).toBe( true );
			expect(
				hasDuplicateNames( [
					[ 'key1', 'val1' ],
					[ ' key1 ', 'val2' ],
				] )
			).toBe( true );
		} );

		it( 'returns false for invalid inputs', () => {
			expect( hasDuplicateNames( null ) ).toBe( false );
			expect( hasDuplicateNames( undefined ) ).toBe( false );
		} );
	} );

	describe( 'keyValuePairsToObject', () => {
		it( 'converts valid pairs array into key-value object', () => {
			const list = [
				[ 'siteTitle', 'My Blueprint' ],
				[ 'postsPerPage', '10' ],
			];

			expect( keyValuePairsToObject( list ) ).toEqual( {
				siteTitle: 'My Blueprint',
				postsPerPage: '10',
			} );
		} );

		it( 'returns null if duplicate names are detected', () => {
			const list = [
				[ 'dupKey', 'val1' ],
				[ 'dupKey', 'val2' ],
			];

			expect( keyValuePairsToObject( list ) ).toBeNull();
		} );

		it( 'discards empty, whitespace-only, null, or undefined keys', () => {
			const list = [
				[ 'validKey', 'validValue' ],
				[ '', 'val' ],
				[ '   ', 'val' ],
				[ null, 'val' ],
				[ undefined, 'val' ],
				[ 'anotherKey', '' ],
			];

			expect( keyValuePairsToObject( list ) ).toEqual( {
				validKey: 'validValue',
				anotherKey: '',
			} );
		} );

		it( 'returns empty object for invalid inputs', () => {
			expect( keyValuePairsToObject( null ) ).toEqual( {} );
			expect( keyValuePairsToObject( undefined ) ).toEqual( {} );
			expect( keyValuePairsToObject( 'invalid' ) ).toEqual( {} );
		} );
	} );

	describe( 'KeyValueEditor Component', () => {
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

		it( 'shows duplicate-name error and does not emit when duplicate keys are entered', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<KeyValueEditor
						data={ { key1: 'val1', key2: 'val2' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			onChangeMock.mockClear();

			// Inputs are [Name0, Value0, Name1, Value1]
			const inputs = container.querySelectorAll( 'input[type="text"]' );
			expect( inputs.length ).toBe( 4 );

			// Update second key input from 'key2' to 'key1' to cause duplicate
			act( () => {
				const nameInput1 = inputs[ 2 ];
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( nameInput1, 'key1' );
				nameInput1.dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			// Duplicate-name error notice should be visible
			expect(
				container.textContent.includes(
					'Duplicate names are not allowed.'
				)
			).toBe( true );

			// onChange should NOT have been called while duplicate exists
			expect( onChangeMock ).not.toHaveBeenCalled();

			// Now resolve duplicate by renaming second key to 'key3'
			const updatedInputs =
				container.querySelectorAll( 'input[type="text"]' );
			act( () => {
				const nameInput1 = updatedInputs[ 2 ];
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( nameInput1, 'key3' );
				nameInput1.dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			// Duplicate-name error notice should disappear
			expect(
				container.textContent.includes(
					'Duplicate names are not allowed.'
				)
			).toBe( false );

			// Normal conversion should resume and emit the unique object
			expect( onChangeMock ).toHaveBeenCalledWith( {
				key1: 'val1',
				key3: 'val2',
			} );
		} );
	} );
} );
