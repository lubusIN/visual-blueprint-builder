/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { database } from '@wordpress/icons';
import {
	TextControl,
	TextareaControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for run-sql block.
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Attributes updater.
 * @param {boolean} props.isSelected Whether block is selected.
 * @return {JSX.Element} Edit component.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { sql = {} } = attributes;

	const resourceType = sql?.resource || 'literal';
	const literalContents =
		resourceType === 'literal' ? sql?.contents || '' : '';
	const urlValue = resourceType === 'url' ? sql?.url || '' : '';
	const vfsValue = resourceType === 'vfs' ? sql?.path || '' : '';

	const handleResourceTypeChange = ( newType ) => {
		if ( newType === resourceType ) {
			return;
		}

		if ( newType === 'literal' ) {
			setAttributes( {
				sql: {
					resource: 'literal',
					name: 'query.sql',
					contents: literalContents,
				},
			} );
		} else if ( newType === 'url' ) {
			setAttributes( {
				sql: {
					resource: 'url',
					url: urlValue,
				},
			} );
		} else if ( newType === 'vfs' ) {
			setAttributes( {
				sql: {
					resource: 'vfs',
					path: vfsValue,
				},
			} );
		}
	};

	let summary = __( '{SQL Query}', 'visual-blueprint-builder' );
	if ( resourceType === 'literal' && literalContents.trim() ) {
		const firstLine = literalContents
			.trim()
			.split( '\n' )
			.find(
				( line ) =>
					line.trim().length > 0 && ! line.trim().startsWith( '--' )
			);
		summary = firstLine || literalContents.trim().split( '\n' )[ 0 ];
		if ( summary.length > 50 ) {
			summary = `${ summary.substring( 0, 47 ) }...`;
		}
	} else if ( resourceType === 'url' && urlValue ) {
		summary = sprintf(
			/* translators: %s: SQL file URL */
			__( 'URL: %s', 'visual-blueprint-builder' ),
			urlValue
		);
	} else if ( resourceType === 'vfs' && vfsValue ) {
		summary = sprintf(
			/* translators: %s: SQL file path */
			__( 'VFS: %s', 'visual-blueprint-builder' ),
			vfsValue
		);
	}

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ database }
			isSelected={ isSelected }
			summary={ summary }
		>
			<Stack direction="column" gap="md">
				<ToggleGroupControl
					__nextHasNoMarginBottom
					isBlock
					label={ __( 'SQL Source', 'visual-blueprint-builder' ) }
					value={ resourceType }
					onChange={ handleResourceTypeChange }
				>
					<ToggleGroupControlOption
						value="literal"
						label={ __( 'Inline SQL', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="url"
						label={ __( 'File URL', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="vfs"
						label={ __( 'VFS Path', 'visual-blueprint-builder' ) }
					/>
				</ToggleGroupControl>

				{ resourceType === 'literal' && (
					<TextareaControl
						__nextHasNoMarginBottom
						label={ __(
							'SQL Queries',
							'visual-blueprint-builder'
						) }
						help={ __(
							'Each non-empty line must contain a valid SQL query.',
							'visual-blueprint-builder'
						) }
						placeholder="UPDATE wp_options SET option_value = 'My Site' WHERE option_name = 'blogname';"
						value={ literalContents }
						onChange={ ( val ) =>
							setAttributes( {
								sql: {
									resource: 'literal',
									name: sql?.name || 'query.sql',
									contents: val,
								},
							} )
						}
						rows={ 6 }
					/>
				) }

				{ resourceType === 'url' && (
					<TextControl
						__nextHasNoMarginBottom
						label={ __(
							'SQL File URL',
							'visual-blueprint-builder'
						) }
						type="url"
						placeholder="https://example.com/queries.sql"
						value={ urlValue }
						onChange={ ( val ) =>
							setAttributes( {
								sql: {
									resource: 'url',
									url: val,
								},
							} )
						}
					/>
				) }

				{ resourceType === 'vfs' && (
					<TextControl
						__nextHasNoMarginBottom
						label={ __( 'VFS Path', 'visual-blueprint-builder' ) }
						placeholder="/wordpress/queries.sql"
						value={ vfsValue }
						onChange={ ( val ) =>
							setAttributes( {
								sql: {
									resource: 'vfs',
									path: val,
								},
							} )
						}
					/>
				) }
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: database,
	edit: Edit,
} );
