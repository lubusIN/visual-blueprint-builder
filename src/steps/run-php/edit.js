/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { code as codeIcon } from '@wordpress/icons';
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
	const { code } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={codeIcon}
				label="Run PHP"
				instructions={!isSelected && `code snippet`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<TextareaControl
							__nextHasNoMarginBottom
							help={`When running WordPress functions, the code key must first load wp-load.php and start with "<?php require_once 'wordpress/wp-load.php'; "`}
							label="Code"
							onChange={(value) => setAttributes({ code: value })}
							placeholder="<?php ?>"
							value={code}
						/>
					</VStack>
				)}
			</Placeholder>
		</p>
	);
}
