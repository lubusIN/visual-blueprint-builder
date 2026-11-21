/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { archive } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for unzip block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { zipFile = {}, extractToPath } = attributes;
	const { path } = zipFile;

	const handleInputChange = ( value ) => {
		const key = Object.keys( value )[ 0 ];

		if ( 'path' === key ) {
			setAttributes( {
				zipFile: {
					...zipFile,
					...value,
				},
			} );
		} else {
			setAttributes( value );
		}
	};

	const summary = sprintf(
		/* translators: 1: zip file path, 2: extract folder path */
		__( 'from %1$s to %2$s', 'visual-blueprint-builder' ),
		path || __( '{zip path}', 'visual-blueprint-builder' ),
		extractToPath || __( '{folder path}', 'visual-blueprint-builder' )
	);

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ archive }
			isSelected={ isSelected }
			summary={ summary }
		>
			<DataForm
				data={ {
					path,
					extractToPath,
				} }
				fields={ [
					{
						id: 'path',
						label: __( 'Path', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'The path of the zip file to extract',
							'visual-blueprint-builder'
						),
					},
					{
						id: 'extractToPath',
						label: __(
							'Extract To Path',
							'visual-blueprint-builder'
						),
						type: 'text',
						placeholder: __(
							'The path to extract the zip file to',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'path', 'extractToPath' ],
				} }
				onChange={ handleInputChange }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: archive,
	edit: Edit,
} );
