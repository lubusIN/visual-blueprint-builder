/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { brush } from '@wordpress/icons';
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
 * Edit function for the theme installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { themeData, options } = attributes;
	const { resource, path, url, slug, ref } = themeData;
	const { activate, importStarterContent } = options;

	const getResourceInfo = ( resource ) => {
		switch ( resource ) {
			case 'url':
				return url;
			case 'vfs':
				return path;
			case 'git:directory':
				return `${ ref || 'latest' }${ path ? ` > ${ path }` : '' }`;
			default:
				return slug;
		}
	};

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ brush }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>{ `${ resource } > ${
					getResourceInfo( resource ) || 'undefined'
				} > ${
					activate
						? __( 'Activate', 'wp-playground-blueprint-editor' )
						: __(
								'Install and keep Inactive',
								'wp-playground-blueprint-editor'
						  )
				} > ${
					importStarterContent
						? __( 'with', 'wp-playground-blueprint-editor' )
						: __( 'without', 'wp-playground-blueprint-editor' )
				} ${ __(
					'starter content',
					'wp-playground-blueprint-editor'
				) }` }</Text>
			}
		>
			<>
				<ResourceSelector
					type="theme"
					data={ themeData }
					onChange={ ( newThemeData ) =>
						setAttributes( { themeData: newThemeData } )
					}
				/>

				<ToggleControl
					label={ __( 'Activate', 'wp-playground-blueprint-editor' ) }
					checked={ activate }
					onChange={ () =>
						setAttributes( {
							options: {
								...options,
								activate: ! activate,
							},
						} )
					}
				/>

				<ToggleControl
					label={ __(
						'Import Starter Content',
						'wp-playground-blueprint-editor'
					) }
					checked={ importStarterContent }
					onChange={ () =>
						setAttributes( {
							options: {
								...options,
								importStarterContent: ! importStarterContent,
							},
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
	icon: brush,
	edit: Edit,
} );
