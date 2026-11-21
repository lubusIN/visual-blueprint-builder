/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { blockMeta } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import { StepWrapper } from '../../components';
import metadata from './block.json';

/**
 * Edit function for enable-multisite block.
 */
function Edit( { isSelected } ) {
	return (
		<StepWrapper
			title={ metadata.title }
			icon={ blockMeta }
			isSelected={ isSelected }
			summary={ __(
				'Activate Multisite Network',
				'visual-blueprint-builder'
			) }
		/>
	);
}

registerBlockType( metadata.name, {
	icon: blockMeta,
	edit: Edit,
} );
