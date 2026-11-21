/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { globe } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for define-site-url block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { siteUrl } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ globe }
			isSelected={ isSelected }
			summary={ siteUrl || __( 'Site Url', 'visual-blueprint-builder' ) }
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'siteUrl',
						label: __( 'Site URL', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'The URL of the site',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'siteUrl' ],
				} }
				onChange={ setAttributes }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: globe,
	edit: Edit,
} );
