/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { brush } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for activate-theme block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { themeFolderName } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ brush }
			isSelected={ isSelected }
			summary={
				themeFolderName ||
				__( 'Theme Folder Name', 'visual-blueprint-builder' )
			}
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'themeFolderName',
						label: __(
							'Theme Folder Name',
							'visual-blueprint-builder'
						),
						type: 'text',
						placeholder: __(
							'The name of the theme folder located in wp-content/themes/',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'themeFolderName' ],
				} }
				onChange={ setAttributes }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: brush,
	edit: Edit,
} );
