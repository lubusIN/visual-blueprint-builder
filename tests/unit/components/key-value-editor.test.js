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

		it( 'replaces local list on external change even when local duplicate keys exist', () => {
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

			// External update passes new data
			act( () => {
				root.render(
					<KeyValueEditor
						data={ { resetKey: 'resetVal' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			// Duplicate-name error notice should disappear and list should sync with external data
			expect(
				container.textContent.includes(
					'Duplicate names are not allowed.'
				)
			).toBe( false );

			const updatedInputs =
				container.querySelectorAll( 'input[type="text"]' );
			expect( updatedInputs.length ).toBe( 2 );
			expect( updatedInputs[ 0 ].value ).toBe( 'resetKey' );
			expect( updatedInputs[ 1 ].value ).toBe( 'resetVal' );
		} );

		it( 'applies external B after conflict and external C without emitting C through onChange', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<KeyValueEditor
						data={ { key1: 'val1' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			// Emit and acknowledge B: edit value to 'valB'
			const inputs = container.querySelectorAll( 'input[type="text"]' );
			act( () => {
				const valInput = inputs[ 1 ];
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( valInput, 'valB' );
				valInput.dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			expect( onChangeMock ).toHaveBeenCalledWith( {
				key1: 'valB',
			} );

			// Parent acknowledges B
			act( () => {
				root.render(
					<KeyValueEditor
						data={ { key1: 'valB' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			onChangeMock.mockClear();

			// Add a second item with duplicate key 'key1' to create conflict
			const addButton = container.querySelector(
				'button[aria-label="Add Item"]'
			);
			act( () => {
				addButton.click();
			} );

			const inputsAfterAdd =
				container.querySelectorAll( 'input[type="text"]' );
			act( () => {
				const newKeyInput = inputsAfterAdd[ 2 ];
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( newKeyInput, 'key1' );
				newKeyInput.dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			expect(
				container.textContent.includes(
					'Duplicate names are not allowed.'
				)
			).toBe( true );
			expect( onChangeMock ).not.toHaveBeenCalled();

			// Supply external C
			act( () => {
				root.render(
					<KeyValueEditor
						data={ { keyC: 'valC' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			expect(
				container.textContent.includes(
					'Duplicate names are not allowed.'
				)
			).toBe( false );
			expect( onChangeMock ).not.toHaveBeenCalled();

			// Supply external B
			act( () => {
				root.render(
					<KeyValueEditor
						data={ { key1: 'valB' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			// List must show B
			const finalInputs =
				container.querySelectorAll( 'input[type="text"]' );
			expect( finalInputs.length ).toBe( 2 );
			expect( finalInputs[ 0 ].value ).toBe( 'key1' );
			expect( finalInputs[ 1 ].value ).toBe( 'valB' );

			// onChange must NOT have emitted C
			expect( onChangeMock ).not.toHaveBeenCalled();
		} );

		it( 'closes deletion confirmation dialog and resets selectedIndex on external data replacement', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<KeyValueEditor
						data={ { key1: 'val1', key2: 'val2' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			// Click delete button for second item (index 1)
			const deleteButtons = container.querySelectorAll(
				'button[aria-label="Delete Item"]'
			);
			act( () => {
				deleteButtons[ 1 ].click();
			} );

			// Modal should be open
			expect(
				document.body.textContent.includes( 'Confirm Deletion' )
			).toBe( true );

			// Parent supplies replacement data externally
			act( () => {
				root.render(
					<KeyValueEditor
						data={ { newKey: 'newVal' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			// Modal should be closed
			expect(
				document.body.textContent.includes( 'Confirm Deletion' )
			).toBe( false );

			// The list is replaced by newKey
			const inputs = container.querySelectorAll( 'input[type="text"]' );
			expect( inputs.length ).toBe( 2 );
			expect( inputs[ 0 ].value ).toBe( 'newKey' );
			expect( inputs[ 1 ].value ).toBe( 'newVal' );
		} );

		it( 'preserves existing confirmation and deletion flow when no external replacement occurs', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<KeyValueEditor
						data={ { key1: 'val1', key2: 'val2' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			// Click delete button for first item (index 0)
			const deleteButtons = container.querySelectorAll(
				'button[aria-label="Delete Item"]'
			);
			act( () => {
				deleteButtons[ 0 ].click();
			} );

			// Confirm dialog should be open
			expect(
				document.body.textContent.includes( 'Confirm Deletion' )
			).toBe( true );

			// Click Delete button inside modal
			const confirmDeleteButton = Array.from(
				document.body.querySelectorAll( 'button' )
			).find( ( btn ) => btn.textContent.trim() === 'Delete' );
			expect( confirmDeleteButton ).toBeDefined();

			act( () => {
				confirmDeleteButton.click();
			} );

			// Dialog should close and item should be deleted
			expect(
				document.body.textContent.includes( 'Confirm Deletion' )
			).toBe( false );
			expect( onChangeMock ).toHaveBeenCalledWith( {
				key2: 'val2',
			} );
		} );
	} );
} );
