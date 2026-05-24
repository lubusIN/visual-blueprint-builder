/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { trash } from '@wordpress/icons';
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
	const { path } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ trash }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ __( 'at', 'wp-playground-blueprint-editor' ) }{ ' ' }
					{ ` ${ path || '{path}' }` }
				</Text>
			}
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'path',
						label: __(
							'File Path',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							'Enter the directory path to remove (e.g., /wp-content/uploads/old-files)',
							'wp-playground-blueprint-editor'
						),
					},
				] }
				form={ {
					fields: [ 'path' ],
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
	icon: trash,
	edit: Edit,
} );
