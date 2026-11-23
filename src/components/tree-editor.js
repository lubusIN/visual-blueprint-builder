/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { pencil, plus, trash } from '@wordpress/icons';
import {
	Button,
	Modal,
	Notice,
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
export function objectToTreeData( obj, parentPath = '', parentSegments = [] ) {
	const treeData = [];

	Object.entries( obj || {} ).forEach( ( [ key, value ] ) => {
		const currentPath = parentPath ? `${ parentPath }.${ key }` : key;
		const currentSegments = [ ...parentSegments, key ];
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
			pathSegments: currentSegments,
			hasChildren: isObject,
			children: isObject
				? objectToTreeData( value, currentPath, currentSegments )
				: [],
		} );
	} );

	return treeData;
}

/**
 * Check if any sibling nodes in treeData have duplicate keys.
 *
 * @param {Array} items Tree nodes to inspect.
 * @return {boolean} True if duplicate sibling keys exist, false otherwise.
 */
export function hasDuplicateSiblingKeys( items ) {
	if ( ! Array.isArray( items ) ) {
		return false;
	}
	const keys = items
		.map( ( item ) =>
			item.key !== null && item.key !== undefined
				? String( item.key ).trim()
				: ''
		)
		.filter( ( k ) => k !== '' );

	if ( new Set( keys ).size !== keys.length ) {
		return true;
	}

	for ( const item of items ) {
		if ( item.children && item.children.length > 0 ) {
			if ( hasDuplicateSiblingKeys( item.children ) ) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Convert tree data back to object structure
 */
export function treeDataToObject( treeData ) {
	if ( ! Array.isArray( treeData ) ) {
		return {};
	}

	if ( hasDuplicateSiblingKeys( treeData ) ) {
		return null;
	}

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
								help={
									item.hasConflict
										? __(
												'Duplicate name among sibling items.',
												'visual-blueprint-builder'
										  )
										: undefined
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
 * Search the entire tree for an item matching the given ID.
 *
 * @param {Array}  items Tree nodes to search.
 * @param {string} id    Node ID to find.
 * @return {Object|null} Matching tree item or null.
 */
export function findItemById( items, id ) {
	if ( ! id || ! Array.isArray( items ) ) {
		return null;
	}
	for ( const item of items ) {
		if ( item.id === id ) {
			return item;
		}
		if ( item.children && item.children.length > 0 ) {
			const found = findItemById( item.children, id );
			if ( found ) {
				return found;
			}
		}
	}
	return null;
}

/**
 * Resolve an item in the tree by its structural key segments.
 *
 * @param {Array} items    Tree nodes to search.
 * @param {Array} segments Array of key strings from root to target.
 * @return {Object|null} Matching tree item or null.
 */
export function findItemBySegments( items, segments ) {
	if (
		! Array.isArray( items ) ||
		! Array.isArray( segments ) ||
		segments.length === 0
	) {
		return null;
	}

	let currentItems = items;
	let currentItem = null;

	for ( let i = 0; i < segments.length; i++ ) {
		const seg = segments[ i ];
		currentItem = currentItems.find( ( item ) => item.key === seg );
		if ( ! currentItem ) {
			return null;
		}
		if ( i < segments.length - 1 ) {
			currentItems = currentItem.children || [];
		}
	}

	return currentItem;
}

/**
 * Find an item in the tree by its id or structural path.
 *
 * @param {Array}  items      Tree nodes to search.
 * @param {Object} targetItem Target item with id or path.
 * @return {Object|null} Matching tree item or null.
 */
export function findTreeItem( items, targetItem ) {
	if ( ! targetItem || ! Array.isArray( items ) ) {
		return null;
	}

	// 1. Search the entire tree for a matching ID first.
	if ( targetItem.id ) {
		const itemById = findItemById( items, targetItem.id );
		if ( itemById ) {
			return itemById;
		}
	}

	const hasStructuralIdentity =
		Array.isArray( targetItem.pathSegments ) ||
		Array.isArray( targetItem.path );

	// 2. When IDs have been regenerated and structural identity is present, resolve by key segments.
	if ( hasStructuralIdentity ) {
		const segments = Array.isArray( targetItem.pathSegments )
			? targetItem.pathSegments
			: targetItem.path;

		if ( segments && segments.length > 0 ) {
			const itemBySegments = findItemBySegments( items, segments );
			if ( itemBySegments ) {
				return itemBySegments;
			}
		}

		return null;
	}

	// 3. Fallback check for legacy targets without structural identity.
	if ( typeof targetItem.path === 'string' && targetItem.path.length > 0 ) {
		const segments = targetItem.path.split( '.' );
		if ( segments.length > 0 ) {
			const itemBySegments = findItemBySegments( items, segments );
			if ( itemBySegments ) {
				return itemBySegments;
			}
		}

		const findByPath = ( nodes ) => {
			for ( const node of nodes ) {
				if ( node.path === targetItem.path ) {
					return node;
				}
				if ( node.children && node.children.length > 0 ) {
					const found = findByPath( node.children );
					if ( found ) {
						return found;
					}
				}
			}
			return null;
		};
		const itemByPath = findByPath( items );
		if ( itemByPath ) {
			return itemByPath;
		}
	}

	return null;
}

/**
 * Recursively synchronize the path and pathSegments of an item and all its descendants.
 *
 * @param {Object} item           Tree node.
 * @param {string} parentPath     Parent path string.
 * @param {Array}  parentSegments Parent key segments.
 * @return {Object} Synchronized tree node.
 */
function syncDescendantPaths( item, parentPath = '', parentSegments = [] ) {
	const currentPath = parentPath ? `${ parentPath }.${ item.key }` : item.key;
	const currentSegments = [ ...parentSegments, item.key ];

	return {
		...item,
		path: currentPath,
		pathSegments: currentSegments,
		children: ( item.children || [] ).map( ( child ) =>
			syncDescendantPaths( child, currentPath, currentSegments )
		),
	};
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

	const hasConflict = hasDuplicateSiblingKeys( treeData );

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
			if (
				newOptions !== null &&
				dataString !== JSON.stringify( newOptions || {} )
			) {
				setTreeData( objectToTreeData( data || {} ) );
			}
			return;
		}

		if ( dataString !== prevDataString ) {
			prevDataRef.current = data;
		}

		const newOptions = treeDataToObject( treeData );
		if (
			newOptions !== null &&
			dataString !== JSON.stringify( newOptions || {} )
		) {
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
			newOptions !== null &&
			JSON.stringify( data || {} ) !== JSON.stringify( newOptions || {} )
		) {
			setTreeData( objectToTreeData( data || {} ) );
		}
	}, [ data, treeData ] );

	const updateTreeItem = ( id, field, value ) => {
		const updateItem = ( items, parentPath = '', parentSegments = [] ) => {
			const mappedItems = items.map( ( item ) => {
				const currentPath = parentPath
					? `${ parentPath }.${ item.key }`
					: item.key;
				const currentSegments = [ ...parentSegments, item.key ];

				if ( item.id === id ) {
					if ( field === 'key' ) {
						const newKey = value;
						const newPath = parentPath
							? `${ parentPath }.${ newKey }`
							: newKey;
						const newSegments = [ ...parentSegments, newKey ];

						const trimmedNewKey = String( newKey ).trim();
						const itemHasConflict =
							trimmedNewKey !== '' &&
							items.some(
								( sibling ) =>
									sibling.id !== item.id &&
									String( sibling.key ).trim() ===
										trimmedNewKey
							);

						return {
							...item,
							key: newKey,
							hasConflict: itemHasConflict,
							path: newPath,
							pathSegments: newSegments,
							children: ( item.children || [] ).map( ( child ) =>
								syncDescendantPaths(
									child,
									newPath,
									newSegments
								)
							),
						};
					}
					return { ...item, [ field ]: value };
				}
				if ( item.children && item.children.length > 0 ) {
					return {
						...item,
						children: updateItem(
							item.children,
							item.path || currentPath,
							item.pathSegments || currentSegments
						),
					};
				}
				return item;
			} );

			// If renaming a key at this sibling level, update hasConflict for all siblings in mappedItems
			if ( field === 'key' && items.some( ( i ) => i.id === id ) ) {
				return mappedItems.map( ( item ) => {
					const trimmedKey = String( item.key ).trim();
					const siblingHasConflict =
						trimmedKey !== '' &&
						mappedItems.some(
							( other ) =>
								other.id !== item.id &&
								String( other.key ).trim() === trimmedKey
						);
					return { ...item, hasConflict: siblingHasConflict };
				} );
			}

			return mappedItems;
		};

		const nextTreeData = updateItem( treeData );
		setTreeData( nextTreeData );

		// Keep active modal targeting aligned with the renamed node
		if ( activeModalItem && field === 'key' ) {
			const matched = findItemById( nextTreeData, activeModalItem.id );
			if ( matched ) {
				setActiveModalItem( matched );
			}
		}
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
												pathSegments: [
													...( item.pathSegments || [
														item.key,
													] ),
													'',
												],
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
			const filtered = items.filter( ( item ) => item.id !== id );
			return filtered.map( ( item ) => {
				const trimmedKey = String( item.key ).trim();
				const itemHasConflict =
					trimmedKey !== '' &&
					filtered.some(
						( other ) =>
							other.id !== item.id &&
							String( other.key ).trim() === trimmedKey
					);
				const updatedChildren =
					item.children && item.children.length > 0
						? removeItem( item.children )
						: item.children;
				return {
					...item,
					hasConflict: itemHasConflict,
					children: updatedChildren,
				};
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
						pathSegments: [
							...( item.pathSegments || [ item.key ] ),
							'',
						],
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
			pathSegments: [ '' ],
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
				{ hasConflict && (
					<Notice status="error" isDismissible={ false }>
						{ __(
							'Duplicate names are not allowed among items with the same parent.',
							'visual-blueprint-builder'
						) }
					</Notice>
				) }
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
