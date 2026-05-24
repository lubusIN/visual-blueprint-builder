/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { reusableBlock } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Icon,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { StepWrapper } from '../../components';
import metadata from './block.json';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
function Edit() {

	return (
		<StepWrapper 
			title={metadata.title} 
			icon={reusableBlock} 
			isSelected={false} 
			summary={
				<Text weight={600}>
					{__('Delete WordPress posts and comments', 'wp-playground-blueprint-editor')}
				</Text>
			}
		/>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: reusableBlock,
	edit: Edit,
});