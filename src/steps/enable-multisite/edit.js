/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { blockMeta } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {Placeholder} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
export default function Edit() {

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={blockMeta}
				label="Enable Multisite"
				instructions="Activate Multisite Network" />
		</p>
	);
}
