/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';
import {
	Button,
	SelectControl,
	TextControl,
	__experimentalTreeGrid as TreeGrid,
	__experimentalTreeGridRow as TreeGridRow,
	__experimentalTreeGridCell as TreeGridCell,
} from '@wordpress/components';
import { Stack, Text } from '@wordpress/ui';

let uniqueNodeId = 0;

/**
 * Convert object to tree structure for TreeGrid
 */
function objectToTreeData( obj, parentPath = '' ) {
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
function treeDataToObject( treeData ) {
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
} ) {
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
						>
							{ level > 1 && (
								<span
									aria-hidden="true"
									style={ { display: 'flex' } }
								>
									&nbsp;&nbsp;&nbsp;&nbsp;├{ ' ' }
								</span>
							) }
							<TextControl
								{ ...props }
								value={ item.key }
								placeholder={ __(
									'Name',
									'visual-blueprint-builder'
								) }
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
							value={ item.type }
							options={ [
								{ label: 'String', value: 'string' },
								{ label: 'Object', value: 'object' },
							] }
							onChange={ ( value ) =>
								onTypeChange( item.id, value )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					) }
				</TreeGridCell>
				<TreeGridCell>
					{ ( props ) =>
						item.type === 'string' ? (
							<TextControl
								{ ...props }
								value={ item.value }
								placeholder={ __(
									'Value',
									'visual-blueprint-builder'
								) }
								onChange={ ( value ) =>
									onUpdate( item.id, 'value', value )
								}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						) : (
							<Stack direction="row" align="center" gap="sm">
								<Text
									variant="body-sm"
									style={ {
										color: 'var(--wpds-color-fg-content-neutral-weak, #757575)',
									} }
									{ ...props }
								>
									{ item.children.length }{ ' ' }
									{ item.children.length === 1
										? 'item'
										: 'items' }
								</Text>
								<Button
									variant="tertiary"
									size="small"
									icon={ plus }
									onClick={ () => onAddChild( item.id ) }
									label={ __(
										'Add Child',
										'visual-blueprint-builder'
									) }
								/>
							</Stack>
						)
					}
				</TreeGridCell>
				<TreeGridCell style={ { width: '40px' } }>
					{ ( props ) => (
						<Button
							{ ...props }
							isDestructive
							variant="tertiary"
							label={ __(
								'Delete Option',
								'visual-blueprint-builder'
							) }
							icon={ trash }
							onClick={ () => onDelete( item.id ) }
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
					/>
				) ) }
		</>
	);
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
export default function TreeEditor( { data, onChange } ) {
	const [ treeData, setTreeData ] = useState( () =>
		objectToTreeData( data || {} )
	);
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

	return (
		<Stack direction="column" gap="md">
			<TreeGrid style={ { width: '100%' } } className="vpb-object-tree">
				<TreeGridRow
					level={ 1 }
					positionInSet={ 1 }
					setSize={ treeData.length + 1 }
				>
					<TreeGridCell>
						{ ( props ) => (
							<span { ...props } style={ { fontWeight: 600 } }>
								{ __( 'Name', 'visual-blueprint-builder' ) }
							</span>
						) }
					</TreeGridCell>
					<TreeGridCell>
						{ ( props ) => (
							<span { ...props } style={ { fontWeight: 600 } }>
								{ __( 'Type', 'visual-blueprint-builder' ) }
							</span>
						) }
					</TreeGridCell>
					<TreeGridCell>
						{ ( props ) => (
							<span { ...props } style={ { fontWeight: 600 } }>
								{ __( 'Value', 'visual-blueprint-builder' ) }
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
					/>
				) ) }
			</TreeGrid>
			<Button
				icon={ plus }
				variant="secondary"
				label={ __( 'Add Option', 'visual-blueprint-builder' ) }
				onClick={ addNewItem }
			/>
		</Stack>
	);
}
