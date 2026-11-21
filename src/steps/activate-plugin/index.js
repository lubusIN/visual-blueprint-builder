/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { plugins } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for activate-plugin block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { pluginName, pluginPath } = attributes;
	const summary = `${
		pluginName || __( 'Plugin Name', 'visual-blueprint-builder' )
	} > ${ pluginPath || __( 'Plugin Path', 'visual-blueprint-builder' ) }`;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ plugins }
			isSelected={ isSelected }
			summary={ summary }
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'pluginName',
						label: __( 'Plugin Name', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter plugin name',
							'visual-blueprint-builder'
						),
					},
					{
						id: 'pluginPath',
						label: __( 'Plugin Path', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter the full path to the plugin',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'pluginName', 'pluginPath' ],
				} }
				onChange={ setAttributes }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: plugins,
	edit: Edit,
} );
