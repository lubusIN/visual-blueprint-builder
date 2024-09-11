/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { language } from '@wordpress/icons';
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
	const { language: lang } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={language}
				label="Set Site Language"
				instructions={!isSelected && `to ${lang || '{language code}'}`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={attributes}
							fields={[
								{
									id: 'language',
									label: 'Language',
									type: 'text',
									placeholder: 'e.g. \'en_US\''
								}
							]}
							form={{
								fields: [
									'language'
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
