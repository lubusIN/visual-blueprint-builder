/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { code as codeIcon } from '@wordpress/icons';
import { TextareaControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for run-php block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { code } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ codeIcon }
			isSelected={ isSelected }
			summary={ __( 'Code Snippet', 'visual-blueprint-builder' ) }
		>
			<TextareaControl
				__nextHasNoMarginBottom
				help={ __(
					'When running WordPress functions, the code key must first load wp-load.php and start with "<?php require_once \'wordpress/wp-load.php\'; "',
					'visual-blueprint-builder'
				) }
				label={ __( 'Code', 'visual-blueprint-builder' ) }
				onChange={ ( value ) => setAttributes( { code: value } ) }
				placeholder="<?php ?>"
				value={ code }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: codeIcon,
	edit: Edit,
} );
