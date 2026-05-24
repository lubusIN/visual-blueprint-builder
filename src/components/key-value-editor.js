/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';
import {
	Button,
	__experimentalInputControl as InputControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalConfirmDialog as ConfirmDialog,
} from '@wordpress/components';

/**
 * Utility functions for managing key-value pairs locally inside KeyValueEditor.
 */

const addKeyValuePair = ( list, updateFunction ) => {
	if ( list.some( ( [ key, value ] ) => key === '' && value === '' ) ) return;
	updateFunction( [ ...list, [ '', '' ] ] );
};

const updateKeyValuePair = (
	list,
	updateFunction,
	index,
	field,
	fieldValue
) => {
	const updatedList = list.map( ( [ key, value ], i ) => {
		if ( i === index ) {
			return field === 'key'
				? [ fieldValue, value ]
				: [ key, fieldValue ];
		}
		return [ key, value ];
	} );
	updateFunction( updatedList );
};

const removeKeyValuePair = ( list, updateFunction, index ) => {
	updateFunction( list.filter( ( _, i ) => i !== index ) );
};

const filterEmptyKeyValuePairs = ( list, updateFunction ) => {
	const filtered = list.filter( ( [ key, value ] ) => {
		const keyStr = String( key || '' ).trim();
		const valueStr = String( value || '' ).trim();
		return keyStr !== '' && valueStr !== '';
	} );
	updateFunction( filtered );
};

const checkAddButtonDisabled = ( list ) => {
	return (
		list.length > 0 &&
		( list[ list.length - 1 ][ 0 ] === '' ||
			list[ list.length - 1 ][ 1 ] === '' )
	);
};

const keyValuePairsToObject = ( list ) => {
	if ( ! Array.isArray( list ) ) return {};
	const filtered = list.filter( ( item ) => {
		if ( ! Array.isArray( item ) || item.length < 2 ) return false;
		const [ key, value ] = item;
		if ( key == null || value == null ) return false;
		try {
			const keyStr = String( key ).trim();
			const valueStr = String( value ).trim();
			return keyStr !== '' && valueStr !== '';
		} catch ( error ) {
			return false;
		}
	} );
	return Object.fromEntries( filtered );
};

/**
 * A reusable component for editing a list of key-value pairs.
 *
 * @param {Object} props
 * @param {Object} props.data - The key-value object to edit.
 * @param {Function} props.onChange - Callback fired when the object changes.
 * @param {string} props.addButtonLabel - Label for the "Add" button.
 * @param {string} props.deleteButtonLabel - Label for the "Delete" button.
 * @param {boolean} props.useGrid - Whether to use a Grid layout or HStack (for update-user-meta).
 */
export default function KeyValueEditor( {
	data,
	onChange,
	addButtonLabel = __( 'Add Item', 'wp-playground-blueprint-editor' ),
	deleteButtonLabel = __( 'Delete Item', 'wp-playground-blueprint-editor' ),
} ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ list, updateList ] = useState( Object.entries( data || {} ) );
	const [ selectedIndex, setSelectedIndex ] = useState( undefined );

	// Sync local list to parent object
	useEffect( () => {
		const obj = keyValuePairsToObject( list );
		if ( JSON.stringify( data ) !== JSON.stringify( obj ) ) {
			onChange( obj );
		}
	}, [ list ] );

	// Listen for external resets/changes
	useEffect( () => {
		const obj = keyValuePairsToObject( list );
		if ( JSON.stringify( data ) !== JSON.stringify( obj ) ) {
			updateList( Object.entries( data || {} ) );
		}
	}, [ data ] );

	const handleAdd = () => {
		addKeyValuePair( list, updateList );
	};

	const handleUpdate = ( index, field, value ) => {
		updateKeyValuePair( list, updateList, index, field, value );
	};

	const handleRemove = () => {
		removeKeyValuePair( list, updateList, selectedIndex );
		setSelectedIndex( undefined );
		setIsOpen( false );
	};

	// Cleanup on dialog close
	const handleClose = () => {
		filterEmptyKeyValuePairs( list, updateList );
		setSelectedIndex( undefined );
		setIsOpen( false );
	};

	const isAddButtonDisabled = checkAddButtonDisabled( list );

	return (
		<>
			<VStack spacing={ 4 }>
				{ list.map( ( [ key, value ], index ) => (
					<HStack
						key={ index }
						justify="space-between"
						alignment="center"
					>
						<InputControl
							label={ __(
								'Name',
								'wp-playground-blueprint-editor'
							) }
							value={ key }
							__next40pxDefaultSize
							__unstableInputWidth="100%"
							style={ { minWidth: '150px' } }
							onChange={ ( val ) =>
								handleUpdate( index, 'key', val )
							}
						/>
						<InputControl
							label={ __(
								'Value',
								'wp-playground-blueprint-editor'
							) }
							value={ value }
							__next40pxDefaultSize
							__unstableInputWidth="100%"
							style={ { minWidth: '150px' } }
							onChange={ ( val ) =>
								handleUpdate( index, 'value', val )
							}
						/>
						<Button
							isDestructive
							icon={ trash }
							label={ deleteButtonLabel }
							onClick={ () => {
								setSelectedIndex( index );
								setIsOpen( true );
							} }
							style={ { width: '40px', marginTop: '24px' } }
						/>
					</HStack>
				) ) }
				<Button
					icon={ plus }
					variant="secondary"
					label={ addButtonLabel }
					onClick={ handleAdd }
					disabled={ isAddButtonDisabled }
				/>
			</VStack>

			<ConfirmDialog
				isOpen={ isOpen }
				onConfirm={ handleRemove }
				onCancel={ handleClose }
			>
				{ __( 'Delete this item?', 'wp-playground-blueprint-editor' ) }
			</ConfirmDialog>
		</>
	);
}
