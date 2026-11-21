/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { folder } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for mkdir block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { path } = attributes;
	const summary = path
		? sprintf(
				/* translators: %s: directory path */
				__( 'at %s', 'visual-blueprint-builder' ),
				path
		  )
		: __( 'at {directory path}', 'visual-blueprint-builder' );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ folder }
			isSelected={ isSelected }
			summary={ summary }
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'path',
						label: __( 'Path', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter the directory path to create',
							'visual-blueprint-builder'
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

registerBlockType( metadata.name, {
	icon: folder,
	edit: Edit,
} );
