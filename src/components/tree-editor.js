/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { pencil, plus, trash } from '@wordpress/icons';
import {
	Button,
	Modal,
	SelectControl,
	TextControl,
	TextareaControl,
	__experimentalTreeGrid as TreeGrid,
	__experimentalTreeGridRow as TreeGridRow,
	__experimentalTreeGridCell as TreeGridCell,
} from '@wordpress/components';
import { Stack, Text } from '@wordpress/ui';

let uniqueNodeId = 0;

/**
 * Convert object to tree structure for TreeGrid
 */
export function objectToTreeData( obj, parentPath = '' ) {
	const treeData = [];

	Object.entries( obj || {} ).forEach( ( [ key, value ] ) => {
		const currentPath = parentPath ? `${ parentPath }.${ key }` : key;
		const isObject =
			typeof value === 'object' &&
			value !== null &&
			! Array.isArray( value );

		treeData.push( {
			id: `node_${ ++uniqueNodeId }`,
			key,
			value: isObject ? '' : value,
			type: isObject ? 'object' : 'string',
			path: currentPath,
			hasChildren: isObject,
			children: isObject ? objectToTreeData( value, currentPath ) : [],
		} );
	} );

	return treeData;
}

/**
 * Convert tree data back to object structure
 */
export function treeDataToObject( treeData ) {
	const result = {};

	treeData.forEach( ( item ) => {
		if ( item.hasChildren ) {
			result[ item.key ] = treeDataToObject( item.children );
		} else {
			result[ item.key ] = item.value;
		}
	} );

	return result;
}

/**
 * Render tree row recursively
 */
function TreeRow( {
	item,
	level = 1,
	positionInSet,
	setSize,
	onUpdate,
	onDelete,
	onTypeChange,
	onAddChild,
	typeOptions,
	placeholders,
	addChildButtonLabel,
	deleteButtonLabel,
	valueModal,
	onOpenValueModal,
	valueModalButtonLabel,
} ) {
	let buttonLabel;
	if ( typeof valueModalButtonLabel === 'function' ) {
		buttonLabel = valueModalButtonLabel( item );
	} else if ( valueModalButtonLabel ) {
		buttonLabel = valueModalButtonLabel;
	} else if ( item.value ) {
		buttonLabel = __( 'Edit Content', 'visual-blueprint-builder' );
	} else {
		buttonLabel = __( 'Add Content', 'visual-blueprint-builder' );
	}

	return (
		<>
			<TreeGridRow
				level={ level }
				positionInSet={ positionInSet }
				setSize={ setSize }
				isExpanded={ item.hasChildren ? true : undefined }
			>
				<TreeGridCell>
					{ ( props ) => (
						<Stack
							direction="row"
							align="center"
							gap="xs"
							className="vpb-tree-children-key"
							style={ {
								paddingInlineStart:
									level > 1
										? `${ ( level - 1 ) * 20 }px`
										: undefined,
							} }
						>
							{ level > 1 && (
								<span
									aria-hidden="true"
									style={ {
										display: 'flex',
										color: 'var(--wpds-color-fg-content-neutral-weak, #757575)',
										userSelect: 'none',
										flexShrink: 0,
									} }
								>
									├{ ' ' }
								</span>
							) }
							<TextControl
								{ ...props }
								value={ item.key }
								placeholder={
									placeholders?.key ||
									__( 'Name', 'visual-blueprint-builder' )
								}
								onChange={ ( value ) =>
									onUpdate( item.id, 'key', value )
								}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						</Stack>
					) }
				</TreeGridCell>
				<TreeGridCell>
					{ ( props ) => (
						<SelectControl
							{ ...props }
							label={ __( 'Type', 'visual-blueprint-builder' ) }
							hideLabelFromVision
							value={ item.type }
							options={
								typeOptions || [
									{
										label: __(
											'String',
											'visual-blueprint-builder'
										),
										value: 'string',
									},
									{
										label: __(
											'Object',
											'visual-blueprint-builder'
										),
										value: 'object',
									},
								]
							}
							onChange={ ( value ) =>
								onTypeChange( item.id, value )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					) }
				</TreeGridCell>
				<TreeGridCell>
					{ ( props ) => {
						if ( item.type !== 'string' ) {
							return (
								<Stack
									direction="row"
									align="center"
									gap="sm"
									style={ { minHeight: '40px' } }
								>
									<Text
										variant="body-sm"
										style={ {
											color: 'var(--wpds-color-fg-content-neutral-weak, #757575)',
										} }
										{ ...props }
									>
										{ item.children.length }{ ' ' }
										{ item.children.length === 1
											? __(
													'item',
													'visual-blueprint-builder'
											  )
											: __(
													'items',
													'visual-blueprint-builder'
											  ) }
									</Text>
									<Button
										variant="tertiary"
										size="small"
										icon={ plus }
										onClick={ () => onAddChild( item.id ) }
										label={
											addChildButtonLabel ||
											__(
												'Add Child',
												'visual-blueprint-builder'
											)
										}
									/>
								</Stack>
							);
						}

						if ( valueModal ) {
							return (
								<Button
									{ ...props }
									variant="secondary"
									icon={ pencil }
									onClick={ () => onOpenValueModal( item ) }
									label={ buttonLabel }
									__next40pxDefaultSize
								>
									{ buttonLabel }
								</Button>
							);
						}

						return (
							<TextControl
								{ ...props }
								value={ item.value }
								placeholder={
									placeholders?.value ||
									__( 'Value', 'visual-blueprint-builder' )
								}
								onChange={ ( value ) =>
									onUpdate( item.id, 'value', value )
								}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						);
					} }
				</TreeGridCell>
				<TreeGridCell>
					{ ( props ) => (
						<Button
							{ ...props }
							isDestructive
							variant="tertiary"
							label={
								deleteButtonLabel ||
								__(
									'Delete Option',
									'visual-blueprint-builder'
								)
							}
							icon={ trash }
							onClick={ () => onDelete( item.id ) }
							__next40pxDefaultSize
						/>
					) }
				</TreeGridCell>
			</TreeGridRow>
			{ item.hasChildren &&
				item.children.map( ( child, index ) => (
					<TreeRow
						key={ child.id }
						item={ child }
						level={ level + 1 }
						positionInSet={ index + 1 }
						setSize={ item.children.length }
						onUpdate={ onUpdate }
						onDelete={ onDelete }
						onTypeChange={ onTypeChange }
						onAddChild={ onAddChild }
						typeOptions={ typeOptions }
						placeholders={ placeholders }
						addChildButtonLabel={ addChildButtonLabel }
						deleteButtonLabel={ deleteButtonLabel }
						valueModal={ valueModal }
						onOpenValueModal={ onOpenValueModal }
						valueModalButtonLabel={ valueModalButtonLabel }
					/>
				) ) }
		</>
	);
}

/**
 * Find an item in the tree by its id or path.
 *
 * @param {Array}  items      Tree nodes to search.
 * @param {Object} targetItem Target item with id or path.
 * @return {Object|null} Matching tree item or null.
 */
export function findTreeItem( items, targetItem ) {
	if ( ! targetItem || ! Array.isArray( items ) ) {
		return null;
	}
	for ( const item of items ) {
		if (
			item.id === targetItem.id ||
			( targetItem.path && item.path === targetItem.path )
		) {
			return item;
		}
		if ( item.children && item.children.length > 0 ) {
			const found = findTreeItem( item.children, targetItem );
			if ( found ) {
				return found;
			}
		}
	}
	return null;
}

/**
 * A reusable component for editing deeply nested JSON object structures
 * via a TreeGrid UI.
 *
 * @param {Object} props Component properties.
 * @param {Object} props.data The object to edit.
 * @param {Function} props.onChange Callback fired when the object changes.
 * @return {JSX.Element} TreeEditor component.
 */
export default function TreeEditor( {
	data,
	onChange,
	headerLabels = {
		key: __( 'Name', 'visual-blueprint-builder' ),
		type: __( 'Type', 'visual-blueprint-builder' ),
		value: __( 'Value', 'visual-blueprint-builder' ),
	},
	typeOptions,
	placeholders,
	addButtonLabel,
	addChildButtonLabel,
	deleteButtonLabel,
	valueModal = false,
	valueModalTitle,
	valueModalButtonLabel,
	valueModalSaveLabel,
} ) {
	const [ treeData, setTreeData ] = useState( () =>
		objectToTreeData( data || {} )
	);
	const [ activeModalItem, setActiveModalItem ] = useState( null );
	const [ modalValue, setModalValue ] = useState( '' );
	const isInternalUpdate = useRef( false );
	const prevDataRef = useRef( data );
	const lastEmittedRef = useRef( null );

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
			const newOptions = treeDataToObject( treeData );
			if ( dataString !== JSON.stringify( newOptions || {} ) ) {
				setTreeData( objectToTreeData( data || {} ) );
			}
			return;
		}

		if ( dataString !== prevDataString ) {
			prevDataRef.current = data;
		}

		const newOptions = treeDataToObject( treeData );
		if ( dataString !== JSON.stringify( newOptions || {} ) ) {
			lastEmittedRef.current = newOptions;
			isInternalUpdate.current = true;
			onChange( newOptions );
		}
	}, [ treeData, data, onChange ] );

	useEffect( () => {
		if ( isInternalUpdate.current ) {
			isInternalUpdate.current = false;
			return;
		}
		const newOptions = treeDataToObject( treeData );
		if (
			JSON.stringify( data || {} ) !== JSON.stringify( newOptions || {} )
		) {
			setTreeData( objectToTreeData( data || {} ) );
		}
	}, [ data, treeData ] );

	const updateTreeItem = ( id, field, value ) => {
		const updateItem = ( items ) => {
			return items.map( ( item ) => {
				if ( item.id === id ) {
					return { ...item, [ field ]: value };
				}
				if ( item.children.length > 0 ) {
					return { ...item, children: updateItem( item.children ) };
				}
				return item;
			} );
		};
		setTreeData( updateItem( treeData ) );
	};

	const changeItemType = ( id, newType ) => {
		const updateItem = ( items ) => {
			return items.map( ( item ) => {
				if ( item.id === id ) {
					if ( newType === 'object' ) {
						return {
							...item,
							type: 'object',
							hasChildren: true,
							value: '',
							children:
								item.children.length === 0
									? [
											{
												id: `node_${ ++uniqueNodeId }`,
												key: '',
												value: '',
												type: 'string',
												path: `${
													item.path
												}.new_${ Date.now() }`,
												hasChildren: false,
												children: [],
											},
									  ]
									: item.children,
						};
					}
					return {
						...item,
						type: 'string',
						hasChildren: false,
						children: [],
						value: item.value || '',
					};
				}
				if ( item.children.length > 0 ) {
					return { ...item, children: updateItem( item.children ) };
				}
				return item;
			} );
		};
		setTreeData( updateItem( treeData ) );
	};

	const deleteTreeItem = ( id ) => {
		const removeItem = ( items ) => {
			return items.filter( ( item ) => {
				if ( item.id === id ) {
					return false;
				}
				if ( item.children.length > 0 ) {
					item.children = removeItem( item.children );
				}
				return true;
			} );
		};
		setTreeData( removeItem( treeData ) );
	};

	const addChildItem = ( parentId ) => {
		const addChild = ( items ) => {
			return items.map( ( item ) => {
				if ( item.id === parentId ) {
					const newChild = {
						id: `node_${ ++uniqueNodeId }`,
						key: '',
						value: '',
						type: 'string',
						path: `${ item.path }.new_${ Date.now() }`,
						hasChildren: false,
						children: [],
					};
					return {
						...item,
						children: [ ...item.children, newChild ],
					};
				}
				if ( item.children.length > 0 ) {
					return { ...item, children: addChild( item.children ) };
				}
				return item;
			} );
		};
		setTreeData( addChild( treeData ) );
	};

	const addNewItem = () => {
		const newItem = {
			id: `node_${ ++uniqueNodeId }`,
			key: '',
			value: '',
			type: 'string',
			path: `new_${ Date.now() }`,
			hasChildren: false,
			children: [],
		};
		setTreeData( [ ...treeData, newItem ] );
	};

	const handleOpenValueModal = ( item ) => {
		setActiveModalItem( item );
		setModalValue( item.value || '' );
	};

	const handleCloseValueModal = () => {
		setActiveModalItem( null );
		setModalValue( '' );
	};

	const handleSaveValueModal = () => {
		if ( activeModalItem ) {
			const target = findTreeItem( treeData, activeModalItem );
			if ( ! target ) {
				return;
			}
			updateTreeItem( target.id, 'value', modalValue );
		}
		setActiveModalItem( null );
		setModalValue( '' );
	};

	return (
		<>
			<Stack direction="column" gap="md">
				<TreeGrid
					style={ { width: '100%' } }
					className="vpb-object-tree"
				>
					<TreeGridRow
						level={ 1 }
						positionInSet={ 1 }
						setSize={ treeData.length + 1 }
					>
						<TreeGridCell>
							{ ( props ) => (
								<span
									{ ...props }
									style={ { fontWeight: 600 } }
								>
									{ headerLabels?.key ||
										__(
											'Name',
											'visual-blueprint-builder'
										) }
								</span>
							) }
						</TreeGridCell>
						<TreeGridCell>
							{ ( props ) => (
								<span
									{ ...props }
									style={ { fontWeight: 600 } }
								>
									{ headerLabels?.type ||
										__(
											'Type',
											'visual-blueprint-builder'
										) }
								</span>
							) }
						</TreeGridCell>
						<TreeGridCell>
							{ ( props ) => (
								<span
									{ ...props }
									style={ { fontWeight: 600 } }
								>
									{ headerLabels?.value ||
										__(
											'Value',
											'visual-blueprint-builder'
										) }
								</span>
							) }
						</TreeGridCell>
						<TreeGridCell>
							{ ( props ) => <span { ...props }></span> }
						</TreeGridCell>
					</TreeGridRow>
					{ treeData.map( ( item, index ) => (
						<TreeRow
							key={ item.id }
							item={ item }
							level={ 1 }
							positionInSet={ index + 1 }
							setSize={ treeData.length }
							onUpdate={ updateTreeItem }
							onDelete={ deleteTreeItem }
							onTypeChange={ changeItemType }
							onAddChild={ addChildItem }
							typeOptions={ typeOptions }
							placeholders={ placeholders }
							addChildButtonLabel={ addChildButtonLabel }
							deleteButtonLabel={ deleteButtonLabel }
							valueModal={ valueModal }
							onOpenValueModal={ handleOpenValueModal }
							valueModalButtonLabel={ valueModalButtonLabel }
						/>
					) ) }
				</TreeGrid>
				<Button
					icon={ plus }
					variant="secondary"
					label={
						addButtonLabel ||
						__( 'Add Option', 'visual-blueprint-builder' )
					}
					onClick={ addNewItem }
				/>
			</Stack>

			{ activeModalItem && (
				<Modal
					title={
						typeof valueModalTitle === 'function'
							? valueModalTitle( activeModalItem )
							: valueModalTitle ||
							  sprintf(
									/* translators: %s: file or item name */
									__(
										'Edit Content: %s',
										'visual-blueprint-builder'
									),
									activeModalItem.key ||
										__(
											'Untitled',
											'visual-blueprint-builder'
										)
							  )
					}
					onRequestClose={ handleCloseValueModal }
					size="large"
					className="vbb-content-modal"
				>
					<Stack direction="column" gap="md">
						<TextareaControl
							label={
								headerLabels?.value ||
								__( 'Content', 'visual-blueprint-builder' )
							}
							hideLabelFromVision
							value={ modalValue }
							onChange={ setModalValue }
							rows={ 16 }
							className="vbb-content-modal-textarea"
							placeholder={
								placeholders?.value ||
								__(
									'Enter file content…',
									'visual-blueprint-builder'
								)
							}
							__nextHasNoMarginBottom
						/>
						<Stack direction="row" justify="flex-end" gap="sm">
							<Button
								variant="tertiary"
								onClick={ handleCloseValueModal }
							>
								{ __( 'Cancel', 'visual-blueprint-builder' ) }
							</Button>
							<Button
								variant="primary"
								onClick={ handleSaveValueModal }
							>
								{ valueModalSaveLabel ||
									__(
										'Save Content',
										'visual-blueprint-builder'
									) }
							</Button>
						</Stack>
					</Stack>
				</Modal>
			) }
		</>
	);
}
