/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { tool } from '@wordpress/icons';
import { TextareaControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for wp-cli block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { command } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ tool }
			isSelected={ isSelected }
			summary={
				command || __( '{command to run}', 'visual-blueprint-builder' )
			}
		>
			<TextareaControl
				__nextHasNoMarginBottom
				label={ __( 'Command', 'visual-blueprint-builder' ) }
				onChange={ ( value ) => setAttributes( { command: value } ) }
				placeholder=""
				value={ command }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: tool,
	edit: Edit,
} );
