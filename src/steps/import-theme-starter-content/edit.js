/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { receipt } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

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
	const { themeSlug } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={receipt}
				label="Import Theme Starter Content"
				instructions={!isSelected && `for ${themeSlug || '{THEME SLUG}'}`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={attributes}
							fields={[
								{
									id: 'themeSlug',
									label: 'Theme Slug',
									type: 'text'
								}
							]}
							form={{
								fields: [
									'themeSlug'
								]
							}}
							onChange={setAttributes}
						/>
					</VStack>
				)}
			</Placeholder>
		</p>
	);
}
