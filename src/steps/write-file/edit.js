/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { page } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	TextControl,
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
	const { path, data } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={page}
				label="Write File"
				instructions={!isSelected && `write file at ${path}`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<TextControl
							label={__('Path', 'write-file')}
							value={path}
							placeholder='The path of the file to write to'
							onChange={(value) => setAttributes({ path: value })}
						/>
						<TextareaControl
							__nextHasNoMarginBottom
							label="Data"
							onChange={(value) => setAttributes({ data: value })}
							placeholder="The data to write"
							value={data}
						/>
					</VStack>
				)}
			</Placeholder>
		</p>
	);
}
