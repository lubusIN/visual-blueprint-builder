/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { moveTo } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for mv block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { fromPath, toPath } = attributes;
	const summary =
		fromPath && toPath
			? sprintf(
					/* translators: 1: from path, 2: to path */
					__( 'from %1$s to %2$s', 'visual-blueprint-builder' ),
					fromPath,
					toPath
			  )
			: __( 'from {from path} to {to path}', 'visual-blueprint-builder' );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ moveTo }
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
							'The path to the file or directory to move',
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
	icon: moveTo,
	edit: Edit,
} );
