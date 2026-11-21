/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { plugins } from '@wordpress/icons';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, ResourceSelector } from '../../components';
import { getResourceSummary } from '../../components/resource-selector';

/**
 * Edit function for install-plugin block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { pluginData = {}, options = {} } = attributes;
	const { resource = 'wordpress.org/plugins' } = pluginData;
	const { activate } = options;

	const summary = `${ resource } > ${ getResourceSummary(
		'plugin',
		pluginData
	) } > ${
		activate
			? __( 'Activate', 'visual-blueprint-builder' )
			: __( 'Install and keep Inactive', 'visual-blueprint-builder' )
	}`;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ plugins }
			isSelected={ isSelected }
			summary={ summary }
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
			</>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: plugins,
	edit: Edit,
} );
