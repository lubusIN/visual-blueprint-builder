/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { blockMeta } from '@wordpress/icons';
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
import metadata from './block.json';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
function Edit({ isSelected }) {

	return (
		<p {...useBlockProps()}>
			<Placeholder
				preview={
					<HStack justify='left' align={'center'} spacing={3}>
						<Icon icon={blockMeta} size={28} className='step-icon' />
						<VStack spacing={1}>
							<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
							{!isSelected && (
								<Text weight={600}>
									{__("Activate Multisite Network", 'wp-playground-blueprint-editor')}
								</Text>
							)}
						</VStack>
					</HStack>
				}
			/>
		</p>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: blockMeta,
	edit: Edit,
});
