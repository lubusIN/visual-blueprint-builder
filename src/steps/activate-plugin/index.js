/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { plugins } from '@wordpress/icons';
import { __experimentalText as Text } from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { pluginName, pluginPath } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ plugins }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ __(
						`${
							pluginName ||
							__(
								'Plugin Name',
								'wp-playground-blueprint-editor'
							)
						} > ${
							pluginPath ||
							__(
								'Plugin Path',
								'wp-playground-blueprint-editor'
							)
						}`,
						'wp-playground-blueprint-editor'
					) }
				</Text>
			}
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'pluginName',
						label: __(
							'Plugin Name',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							'Enter plugin name',
							'wp-playground-blueprint-editor'
						),
					},
					{
						id: 'pluginPath',
						label: __(
							'Plugin Path',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							'Enter the full path to the plugin',
							'wp-playground-blueprint-editor'
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

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: plugins,
	edit: Edit,
} );
