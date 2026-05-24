/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { moveTo } from '@wordpress/icons';
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
			icon={ moveTo }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ __( 'from', 'wp-playground-blueprint-editor' ) }{ ' ' }
					{ ` ${ fromPath || '{from path}' }` }{ ' ' }
					{ __( 'to', 'wp-playground-blueprint-editor' ) }{ ' ' }
					{ ` ${ toPath || '{to path}' }` }
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
							'Enter the current path of the file or directory',
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
							'Enter the new path where the file or directory should be moved',
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
	icon: moveTo,
	edit: Edit,
} );
