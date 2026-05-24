/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import Picker from './picker';

/**
 * Resource Selector Component for themes and plugins.
 *
 * @param {Object} props Component properties.
 * @param {string} props.type 'plugin' or 'theme'.
 * @param {Object} props.data The current resource data.
 * @param {Function} props.onChange Callback when data changes.
 * @return {Element} Element to render.
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

	return (
		<>
			<ToggleGroupControl
				label={ __( 'Resource', 'wp-playground-blueprint-editor' ) }
				__nextHasNoMarginBottom
				value={ resource }
				isBlock
				onChange={ handleResourceChange }
			>
				<ToggleGroupControlOption
					value="url"
					label={ __( 'URL', 'wp-playground-blueprint-editor' ) }
				/>
				<ToggleGroupControlOption
					value={ orgType }
					label={
						type === 'plugin'
							? __( 'Plugin', 'wp-playground-blueprint-editor' )
							: __( 'Theme', 'wp-playground-blueprint-editor' )
					}
				/>
				<ToggleGroupControlOption
					value="vfs"
					label={ __( 'VFS', 'wp-playground-blueprint-editor' ) }
				/>
				<ToggleGroupControlOption
					value="git:directory"
					label={ __(
						'Git Directory',
						'wp-playground-blueprint-editor'
					) }
				/>
			</ToggleGroupControl>

			{ resource === 'vfs' && (
				<TextControl
					label={ __( 'Path', 'wp-playground-blueprint-editor' ) }
					__next40pxDefaultSize
					value={ path }
					placeholder={ __(
						`Enter the file path for the ${ type } ZIP`,
						'wp-playground-blueprint-editor'
					) }
					onChange={ ( newPath ) =>
						handleInputChange( 'path', newPath )
					}
				/>
			) }
			{ ( resource === 'url' || resource === 'git:directory' ) && (
				<TextControl
					label={ __( 'Url', 'wp-playground-blueprint-editor' ) }
					__next40pxDefaultSize
					value={ url }
					placeholder={ __(
						resource === 'git:directory'
							? 'Enter Repository URL (https://, ssh git@..., etc.)'
							: `Enter the URL of the ${ type } ZIP file`,
						'wp-playground-blueprint-editor'
					) }
					onChange={ ( newPath ) =>
						handleInputChange( 'url', newPath )
					}
				/>
			) }
			{ resource === orgType && (
				<InputControl
					style={ { width: '100%', paddingBottom: '8px' } }
					__next40pxDefaultSize
					label={ __( 'Slug', 'wp-playground-blueprint-editor' ) }
					value={ slug }
					placeholder={ __(
						`Enter ${ type } slug`,
						'wp-playground-blueprint-editor'
					) }
					onChange={ ( value ) => handleInputChange( 'slug', value ) }
					suffix={
						<Picker
							type={ pluralType }
							onSelect={ ( selectedSlug ) =>
								handleInputChange( 'slug', selectedSlug )
							}
						/>
					}
				/>
			) }
			{ resource === 'git:directory' && (
				<>
					<TextControl
						label={ __(
							'Reference (Optional branch, tag, or commit SHA)',
							'wp-playground-blueprint-editor'
						) }
						__next40pxDefaultSize
						value={ ref }
						placeholder={ __(
							'Enter the git reference (branch, tag, or commit SHA)',
							'wp-playground-blueprint-editor'
						) }
						onChange={ ( newRef ) =>
							handleInputChange( 'ref', newRef )
						}
					/>
					<TextControl
						label={ __(
							'Directory Path (Optional subdirectory inside the repository)',
							'wp-playground-blueprint-editor'
						) }
						__next40pxDefaultSize
						value={ path }
						placeholder={ __(
							'Enter the directory path inside the repository',
							'wp-playground-blueprint-editor'
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
