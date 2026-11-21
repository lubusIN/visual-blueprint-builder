/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { language } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for set-site-language block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { language: lang } = attributes;
	const summary = lang
		? sprintf(
				/* translators: %s: language code */
				__( 'to %s', 'visual-blueprint-builder' ),
				lang
		  )
		: __( 'to {language code}', 'visual-blueprint-builder' );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ language }
			isSelected={ isSelected }
			summary={ summary }
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'language',
						label: __( 'Language', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter the language code to set as the site language (e.g. "en_US")',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'language' ],
				} }
				onChange={ setAttributes }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: language,
	edit: Edit,
} );
