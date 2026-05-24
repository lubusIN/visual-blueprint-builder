/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { copy } from '@wordpress/icons';
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
	const { fromPath, toPath } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ copy }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ fromPath && toPath
						? __(
								`Copy all files and folders from “${ fromPath }” to “${ toPath }”.`,
								'wp-playground-blueprint-editor'
						  )
						: __(
								'Copy all files and folders from the "From Path" location to the "To Path" location.',
								'wp-playground-blueprint-editor'
						  ) }
				</Text>
			}
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'fromPath',
						label: __(
							'From Path',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							'Enter source path',
							'wp-playground-blueprint-editor'
						),
					},
					{
						id: 'toPath',
						label: __(
							'To Path',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							'Enter destination path',
							'wp-playground-blueprint-editor'
						),
					},
				] }
				form={ {
					fields: [ 'fromPath', 'toPath' ],
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
	icon: copy,
	edit: Edit,
} );
