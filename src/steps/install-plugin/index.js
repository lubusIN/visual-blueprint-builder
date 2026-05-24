/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { plugins } from '@wordpress/icons';
import {
	ToggleControl,
	__experimentalText as Text,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, ResourceSelector } from '../../components';

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { pluginData, options } = attributes;
	const { resource, path, url, slug, ref } = pluginData;
	const { activate } = options;

	const getResourceInfo = ( resource ) => {
		switch ( resource ) {
			case 'url':
				return url;
			case 'vfs':
				return path;
			case 'git:directory':
				return path
					? `${ path } (Ref: ${ ref || 'default branch' })`
					: ref
					? `Ref: ${ ref }`
					: 'Git Repository';
			default:
				return slug;
		}
	};

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ plugins }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ `${ resource } > ${ getResourceInfo( resource ) } > ${
						activate
							? __( 'Activate', 'wp-playground-blueprint-editor' )
							: __(
									'Install and keep Inactive',
									'wp-playground-blueprint-editor'
							  )
					}` }
				</Text>
			}
		>
			<>
				<ResourceSelector
					type="plugin"
					data={ pluginData }
					onChange={ ( newPluginData ) =>
						setAttributes( { pluginData: newPluginData } )
					}
				/>
				<ToggleControl
					label={ __( 'Activate', 'wp-playground-blueprint-editor' ) }
					checked={ activate }
					onChange={ () =>
						setAttributes( {
							options: { activate: ! activate },
						} )
					}
				/>
			</>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: plugins,
	edit: Edit,
} );
