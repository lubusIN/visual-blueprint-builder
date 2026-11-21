/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { details } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for import-wxr block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { file } = attributes;
	const { url } = file || {};

	const handleInputChange = ( value ) => {
		setAttributes( {
			file: {
				...file,
				...value,
			},
		} );
	};

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ details }
			isSelected={ isSelected }
			summary={ url || __( '{WXR URL}', 'visual-blueprint-builder' ) }
		>
			<DataForm
				data={ { url } }
				fields={ [
					{
						id: 'url',
						label: __( 'File URL', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter the URL of the WXR file',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'url' ],
				} }
				onChange={ handleInputChange }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: details,
	edit: Edit,
} );
