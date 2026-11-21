/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { copy } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for cp block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { fromPath, toPath } = attributes;
	const summary =
		fromPath && toPath
			? sprintf(
					/* translators: 1: source path, 2: destination path */
					__(
						'Copy all files and folders from "%1$s" to "%2$s".',
						'visual-blueprint-builder'
					),
					fromPath,
					toPath
			  )
			: __(
					'Copy all files and folders from the "From Path" location to the "To Path" location.',
					'visual-blueprint-builder'
			  );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ copy }
			isSelected={ isSelected }
			summary={ summary }
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'fromPath',
						label: __( 'From Path', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'The path to the file or directory to copy',
							'visual-blueprint-builder'
						),
					},
					{
						id: 'toPath',
						label: __( 'To Path', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'The path to the destination directory',
							'visual-blueprint-builder'
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

registerBlockType( metadata.name, {
	icon: copy,
	edit: Edit,
} );
