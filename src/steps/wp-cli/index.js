/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { listItem } from '@wordpress/icons';
import {
	TextareaControl,
	__experimentalText as Text,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { command } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ listItem }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ command ||
						__(
							'{command to run}',
							'wp-playground-blueprint-editor'
						) }
				</Text>
			}
		>
			<TextareaControl
				__nextHasNoMarginBottom
				label={ __( 'Command', 'wp-playground-blueprint-editor' ) }
				onChange={ ( value ) => setAttributes( { command: value } ) }
				placeholder=""
				value={ command }
			/>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: listItem,
	edit: Edit,
} );
