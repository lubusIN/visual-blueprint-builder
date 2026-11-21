/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { reusableBlock } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import { StepWrapper } from '../../components';
import metadata from './block.json';

/**
 * Edit function for reset-data block.
 */
function Edit() {
	return (
		<StepWrapper
			title={ metadata.title }
			icon={ reusableBlock }
			isSelected={ false }
			summary={ __(
				'Delete WordPress posts and comments',
				'visual-blueprint-builder'
			) }
		/>
	);
}

registerBlockType( metadata.name, {
	icon: reusableBlock,
	edit: Edit,
} );
