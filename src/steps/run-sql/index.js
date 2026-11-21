/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
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
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { sql = {} } = attributes;
	const resource = sql.resource || 'literal';
	const contents = sql.contents || '';
	const path = sql.path || '';
	const url = sql.url || '';

	const handleResourceChange = ( newResource ) => {
		if ( newResource === 'literal' ) {
			setAttributes( {
				sql: {
					resource: 'literal',
					name: sql.name || 'schema.sql',
					contents: contents || '',
				},
			} );
		} else if ( newResource === 'vfs' ) {
			setAttributes( {
				sql: {
					resource: 'vfs',
					path: path || '',
				},
			} );
		} else if ( newResource === 'url' ) {
			setAttributes( {
				sql: {
					resource: 'url',
					url: url || '',
				},
			} );
		}
	};

	let summary = __( 'SQL Query', 'visual-blueprint-builder' );
	if ( resource === 'literal' && contents ) {
		const firstLine = contents.trim().split( '\n' )[ 0 ];
		summary =
			firstLine.length > 40
				? `${ firstLine.substring( 0, 40 ) }...`
				: firstLine;
	} else if ( resource === 'vfs' ) {
		summary = path || __( '{VFS Path}', 'visual-blueprint-builder' );
	} else if ( resource === 'url' ) {
		summary = url || __( '{SQL URL}', 'visual-blueprint-builder' );
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
					label={ __( 'Source', 'visual-blueprint-builder' ) }
					value={ resource }
					isBlock
					onChange={ handleResourceChange }
					__nextHasNoMarginBottom
				>
					<ToggleGroupControlOption
						value="literal"
						label={ __( 'Query', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="vfs"
						label={ __( 'VFS File', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="url"
						label={ __( 'URL', 'visual-blueprint-builder' ) }
					/>
				</ToggleGroupControl>

				{ resource === 'literal' && (
					<>
						<TextControl
							label={ __(
								'File Name (Optional)',
								'visual-blueprint-builder'
							) }
							value={ sql.name || 'schema.sql' }
							onChange={ ( val ) =>
								setAttributes( {
									sql: {
										...sql,
										name: val || 'schema.sql',
									},
								} )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextareaControl
							label={ __(
								'SQL Queries',
								'visual-blueprint-builder'
							) }
							value={ contents }
							placeholder="DELETE FROM wp_posts WHERE post_type = 'post';"
							help={ __(
								'Supports multiline queries, comments, and queries separated by semicolons. Executed using $wpdb.',
								'visual-blueprint-builder'
							) }
							onChange={ ( val ) =>
								setAttributes( {
									sql: {
										...sql,
										resource: 'literal',
										contents: val,
									},
								} )
							}
							rows={ 6 }
							__nextHasNoMarginBottom
						/>
					</>
				) }

				{ resource === 'vfs' && (
					<TextControl
						label={ __(
							'VFS File Path',
							'visual-blueprint-builder'
						) }
						value={ path }
						placeholder="/wordpress/schema.sql"
						onChange={ ( val ) =>
							setAttributes( {
								sql: {
									resource: 'vfs',
									path: val,
								},
							} )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				) }

				{ resource === 'url' && (
					<TextControl
						label={ __(
							'SQL File URL',
							'visual-blueprint-builder'
						) }
						value={ url }
						placeholder="https://example.com/database.sql"
						onChange={ ( val ) =>
							setAttributes( {
								sql: {
									resource: 'url',
									url: val,
								},
							} )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
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
