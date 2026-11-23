/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';
import { Button, Modal, Notice, TextControl } from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Utility functions for managing key-value pairs locally inside KeyValueEditor.
 */
export const addKeyValuePair = ( list, updateFunction ) => {
	if ( list.some( ( [ key, value ] ) => key === '' && value === '' ) ) {
		return;
	}
	updateFunction( [ ...list, [ '', '' ] ] );
};

export const updateKeyValuePair = (
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

export const removeKeyValuePair = ( list, updateFunction, index ) => {
	updateFunction( list.filter( ( _, i ) => i !== index ) );
};

export const checkAddButtonDisabled = ( list ) => {
	return (
		list.length > 0 &&
		( list[ list.length - 1 ][ 0 ] === '' ||
			list[ list.length - 1 ][ 1 ] === '' )
	);
};

export const hasDuplicateNames = ( list ) => {
	if ( ! Array.isArray( list ) ) {
		return false;
	}
	const keys = list
		.filter(
			( item ) =>
				Array.isArray( item ) &&
				item.length >= 1 &&
				item[ 0 ] !== null &&
				item[ 0 ] !== undefined &&
				String( item[ 0 ] ).trim() !== ''
		)
		.map( ( [ key ] ) => String( key ).trim() );
	return new Set( keys ).size !== keys.length;
};

export const hasDuplicateKeys = hasDuplicateNames;

export const keyValuePairsToObject = ( list ) => {
	if ( ! Array.isArray( list ) ) {
		return {};
	}
	const filtered = list.filter( ( item ) => {
		if ( ! Array.isArray( item ) || item.length < 2 ) {
			return false;
		}
		const [ key ] = item;
		if ( key === null || key === undefined ) {
			return false;
		}
		return String( key ).trim() !== '';
	} );

	if ( hasDuplicateNames( filtered ) ) {
		return null;
	}

	return Object.fromEntries( filtered );
};

/**
 * A reusable component for editing a list of key-value pairs.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.data The key-value object to edit.
 * @param {Function} props.onChange Callback fired when the object changes.
 * @param {string} [props.addButtonLabel] Label for the "Add" button.
 * @param {string} [props.deleteButtonLabel] Label for the "Delete" button.
 * @return {JSX.Element} KeyValueEditor component.
 */
export default function KeyValueEditor( {
	data,
	onChange,
	addButtonLabel = __( 'Add Item', 'visual-blueprint-builder' ),
	deleteButtonLabel = __( 'Delete Item', 'visual-blueprint-builder' ),
} ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ list, updateList ] = useState( () => Object.entries( data || {} ) );
	const [ selectedIndex, setSelectedIndex ] = useState( undefined );
	const isInternalUpdate = useRef( false );
	const prevDataRef = useRef( data );
	const lastEmittedRef = useRef( null );

	const hasDuplicate = hasDuplicateNames( list );

	// Sync local list to parent object when list changes internally
	useEffect( () => {
		const dataString = JSON.stringify( data || {} );
		const prevDataString = JSON.stringify( prevDataRef.current || {} );
		const lastEmittedString =
			lastEmittedRef.current !== null
				? JSON.stringify( lastEmittedRef.current || {} )
				: null;

		const isExternalChange =
			dataString !== prevDataString && dataString !== lastEmittedString;

		if ( isExternalChange ) {
			prevDataRef.current = data;
			const obj = keyValuePairsToObject( list );
			if ( obj !== null && dataString !== JSON.stringify( obj || {} ) ) {
				updateList( Object.entries( data || {} ) );
			}
			return;
		}

		if ( dataString !== prevDataString ) {
			prevDataRef.current = data;
		}

		const obj = keyValuePairsToObject( list );
		if ( obj !== null && dataString !== JSON.stringify( obj || {} ) ) {
			lastEmittedRef.current = obj;
			isInternalUpdate.current = true;
			onChange( obj );
		}
	}, [ list, data, onChange ] );

	// Listen for external resets/changes
	useEffect( () => {
		if ( isInternalUpdate.current ) {
			isInternalUpdate.current = false;
			return;
		}
		const obj = keyValuePairsToObject( list );
		if (
			obj !== null &&
			JSON.stringify( data || {} ) !== JSON.stringify( obj || {} )
		) {
			updateList( Object.entries( data || {} ) );
		}
	}, [ data, list ] );

	const handleAdd = () => {
		addKeyValuePair( list, updateList );
	};

	const handleUpdate = ( index, field, value ) => {
		updateKeyValuePair( list, updateList, index, field, value );
	};

	const handleRemove = () => {
		if ( selectedIndex !== undefined ) {
			removeKeyValuePair( list, updateList, selectedIndex );
		}
		setSelectedIndex( undefined );
		setIsOpen( false );
	};

	const handleClose = () => {
		setSelectedIndex( undefined );
		setIsOpen( false );
	};

	const isAddButtonDisabled = checkAddButtonDisabled( list );

	return (
		<>
			<Stack direction="column" gap="md">
				{ hasDuplicate && (
					<Notice status="error" isDismissible={ false }>
						{ __(
							'Duplicate names are not allowed.',
							'visual-blueprint-builder'
						) }
					</Notice>
				) }
				{ list.map( ( [ key, value ], index ) => (
					<Stack
						key={ index }
						direction="row"
						align="flex-end"
						gap="sm"
					>
						<TextControl
							label={ __( 'Name', 'visual-blueprint-builder' ) }
							value={ key }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							style={ { flex: 1 } }
							onChange={ ( val ) =>
								handleUpdate( index, 'key', val )
							}
						/>
						<TextControl
							label={ __( 'Value', 'visual-blueprint-builder' ) }
							value={ value }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							style={ { flex: 1 } }
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
							style={ { width: '40px' } }
						/>
					</Stack>
				) ) }
				<Button
					icon={ plus }
					variant="secondary"
					label={ addButtonLabel }
					onClick={ handleAdd }
					disabled={ isAddButtonDisabled }
				/>
			</Stack>

			{ isOpen && (
				<Modal
					title={ __(
						'Confirm Deletion',
						'visual-blueprint-builder'
					) }
					onRequestClose={ handleClose }
					size="small"
				>
					<Stack direction="column" gap="lg">
						<p>
							{ __(
								'Are you sure you want to delete this item?',
								'visual-blueprint-builder'
							) }
						</p>
						<Stack
							direction="row"
							justify="flex-end"
							align="center"
							gap="xs"
						>
							<Button variant="tertiary" onClick={ handleClose }>
								{ __( 'Cancel', 'visual-blueprint-builder' ) }
							</Button>
							<Button
								isDestructive
								variant="primary"
								onClick={ handleRemove }
							>
								{ __( 'Delete', 'visual-blueprint-builder' ) }
							</Button>
						</Stack>
					</Stack>
				</Modal>
			) }
		</>
	);
}
