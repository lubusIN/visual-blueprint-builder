/**
 * Internal dependencies
 */
import {
	addKeyValuePair,
	updateKeyValuePair,
	removeKeyValuePair,
	checkAddButtonDisabled,
	keyValuePairsToObject,
} from '../key-value-editor';

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
} );
