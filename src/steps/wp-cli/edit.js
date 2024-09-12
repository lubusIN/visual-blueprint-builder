/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { listItem } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	TextareaControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';

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
export default function Edit({ attributes, setAttributes, isSelected }) {
	const { command } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={listItem}
				label="wp-cli"
				instructions={!isSelected && (command || '{command to run}' )}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<TextareaControl
							__nextHasNoMarginBottom
							label="Command"
							onChange={(value) => setAttributes({ command: value })}
							placeholder=""
							value={command}
						/>
					</VStack>
				)}
			</Placeholder>
		</p>
	);
}
