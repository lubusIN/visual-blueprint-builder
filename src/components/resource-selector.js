/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import Picker from './picker';

/**
 * Formats a summary string for a given resource data object.
 *
 * @param {string} type 'plugin' or 'theme'.
 * @param {Object} data The current resource data.
 * @return {string} Formatted summary text.
 */
export const getResourceSummary = ( type, data = {} ) => {
	const { resource, path, url, slug, ref } = data;
	switch ( resource ) {
		case 'url':
			return url || __( '{ZIP URL}', 'visual-blueprint-builder' );
		case 'vfs':
			return path || __( '{VFS Path}', 'visual-blueprint-builder' );
		case 'git:directory':
			if ( path && ref ) {
				return `${ path } (Ref: ${ ref })`;
			}
			if ( path ) {
				return path;
			}
			if ( ref ) {
				return `Ref: ${ ref }`;
			}
			return __( 'Git Repository', 'visual-blueprint-builder' );
		default:
			return slug || __( '{slug}', 'visual-blueprint-builder' );
	}
};

/**
 * Resource Selector Component for themes and plugins.
 *
 * @param {Object} props Component properties.
 * @param {string} props.type 'plugin' or 'theme'.
 * @param {Object} props.data The current resource data.
 * @param {Function} props.onChange Callback when data changes.
 * @return {JSX.Element} Element to render.
 */
export default function ResourceSelector( { type, data, onChange } ) {
	const { resource, path, url, slug, ref } = data;

	const pluralType = type === 'plugin' ? 'plugins' : 'themes';
	const orgType = `wordpress.org/${ pluralType }`;

	const handleResourceChange = ( newResource ) => {
		const newAttributes = {
			resource: newResource,
		};

		if ( newResource === 'vfs' ) {
			newAttributes.path = '';
		} else if ( newResource === 'url' ) {
			newAttributes.url = '';
		} else if ( newResource === orgType ) {
			newAttributes.slug = '';
		} else if ( newResource === 'git:directory' ) {
			newAttributes.ref = '';
			newAttributes.path = '';
			newAttributes.url = '';
		}

		onChange( newAttributes );
	};

	const handleInputChange = ( field, value ) => {
		onChange( {
			...data,
			[ field ]: value,
		} );
	};

	const vfsPlaceholder =
		type === 'plugin'
			? __(
					'Enter the file path for the plugin ZIP',
					'visual-blueprint-builder'
			  )
			: __(
					'Enter the file path for the theme ZIP',
					'visual-blueprint-builder'
			  );

	let urlPlaceholder;
	if ( resource === 'git:directory' ) {
		urlPlaceholder = __(
			'Enter Repository URL (https://, ssh git@…, etc.)',
			'visual-blueprint-builder'
		);
	} else if ( type === 'plugin' ) {
		urlPlaceholder = __(
			'Enter the URL of the plugin ZIP file',
			'visual-blueprint-builder'
		);
	} else {
		urlPlaceholder = __(
			'Enter the URL of the theme ZIP file',
			'visual-blueprint-builder'
		);
	}

	const slugPlaceholder =
		type === 'plugin'
			? __( 'Enter plugin slug', 'visual-blueprint-builder' )
			: __( 'Enter theme slug', 'visual-blueprint-builder' );

	return (
		<>
			<ToggleGroupControl
				label={ __( 'Resource', 'visual-blueprint-builder' ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				value={ resource }
				isBlock
				onChange={ handleResourceChange }
			>
				<ToggleGroupControlOption
					value="url"
					label={ __( 'URL', 'visual-blueprint-builder' ) }
				/>
				<ToggleGroupControlOption
					value={ orgType }
					label={
						type === 'plugin'
							? __( 'Plugin', 'visual-blueprint-builder' )
							: __( 'Theme', 'visual-blueprint-builder' )
					}
				/>
				<ToggleGroupControlOption
					value="vfs"
					label={ __( 'VFS', 'visual-blueprint-builder' ) }
				/>
				<ToggleGroupControlOption
					value="git:directory"
					label={ __( 'Git Directory', 'visual-blueprint-builder' ) }
				/>
			</ToggleGroupControl>

			{ resource === 'vfs' && (
				<TextControl
					label={ __( 'Path', 'visual-blueprint-builder' ) }
					__next40pxDefaultSize
					value={ path }
					placeholder={ vfsPlaceholder }
					onChange={ ( newPath ) =>
						handleInputChange( 'path', newPath )
					}
				/>
			) }
			{ ( resource === 'url' || resource === 'git:directory' ) && (
				<TextControl
					label={ __( 'Url', 'visual-blueprint-builder' ) }
					__next40pxDefaultSize
					value={ url }
					placeholder={ urlPlaceholder }
					onChange={ ( newPath ) =>
						handleInputChange( 'url', newPath )
					}
				/>
			) }
			{ resource === orgType && (
				<Stack
					direction="row"
					align="flex-end"
					gap="sm"
					className="vbb-resource-slug-row"
				>
					<TextControl
						label={ __( 'Slug', 'visual-blueprint-builder' ) }
						__next40pxDefaultSize
						value={ slug }
						placeholder={ slugPlaceholder }
						style={ { flex: 1 } }
						onChange={ ( value ) =>
							handleInputChange( 'slug', value )
						}
					/>
					<Picker
						type={ pluralType }
						selectedSlug={ slug }
						onSelect={ ( selectedSlug ) =>
							handleInputChange( 'slug', selectedSlug )
						}
					/>
				</Stack>
			) }
			{ resource === 'git:directory' && (
				<>
					<TextControl
						label={ __(
							'Reference (Optional branch, tag, or commit SHA)',
							'visual-blueprint-builder'
						) }
						__next40pxDefaultSize
						value={ ref }
						placeholder={ __(
							'Enter the git reference (branch, tag, or commit SHA)',
							'visual-blueprint-builder'
						) }
						onChange={ ( newRef ) =>
							handleInputChange( 'ref', newRef )
						}
					/>
					<TextControl
						label={ __(
							'Directory Path (Optional subdirectory inside the repository)',
							'visual-blueprint-builder'
						) }
						__next40pxDefaultSize
						value={ path }
						placeholder={ __(
							'Enter the directory path inside the repository',
							'visual-blueprint-builder'
						) }
						onChange={ ( newPath ) =>
							handleInputChange( 'path', newPath )
						}
					/>
				</>
			) }
		</>
	);
}
