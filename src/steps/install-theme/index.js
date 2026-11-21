/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { brush } from '@wordpress/icons';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, ResourceSelector } from '../../components';
import { getResourceSummary } from '../../components/resource-selector';

/**
 * Edit function for install-theme block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { themeData = {}, options = {} } = attributes;
	const { resource = 'wordpress.org/themes' } = themeData;
	const { activate, importStarterContent } = options;

	const summary = `${ resource } > ${ getResourceSummary(
		'theme',
		themeData
	) } > ${
		activate
			? __( 'Activate', 'visual-blueprint-builder' )
			: __( 'Install and keep Inactive', 'visual-blueprint-builder' )
	} > ${
		importStarterContent
			? __( 'with starter content', 'visual-blueprint-builder' )
			: __( 'without starter content', 'visual-blueprint-builder' )
	}`;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ brush }
			isSelected={ isSelected }
			summary={ summary }
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
					__nextHasNoMarginBottom
					label={ __( 'Activate', 'visual-blueprint-builder' ) }
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
					__nextHasNoMarginBottom
					label={ __(
						'Import Starter Content',
						'visual-blueprint-builder'
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

registerBlockType( metadata.name, {
	icon: brush,
	edit: Edit,
} );
