/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { wordpress } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for import-wordpress-files block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { wordPressFilesZip } = attributes;
	const { url } = wordPressFilesZip || {};

	const handleInputChange = ( value ) => {
		setAttributes( {
			wordPressFilesZip: {
				...wordPressFilesZip,
				...value,
			},
		} );
	};

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ wordpress }
			isSelected={ isSelected }
			summary={ url || __( '{ZIP URL}', 'visual-blueprint-builder' ) }
		>
			<DataForm
				data={ { url } }
				fields={ [
					{
						id: 'url',
						label: __( 'File URL', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter the URL of the WordPress files ZIP',
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
	icon: wordpress,
	edit: Edit,
} );
