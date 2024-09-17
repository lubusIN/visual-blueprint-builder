/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { details } from '@wordpress/icons';
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
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const { file } = attributes;
	const { url } = file;

	console.log(attributes)

	const handleInputChange = (value) => {
		setAttributes({
			file: {
				...file,
				...value
			}
		});
	};

	return (
		<div {...useBlockProps()}>
			<Placeholder
				icon={details}
				label="Import Wxr"
				instructions={
					!isSelected && `from ${url || '{wxr url}'}`
				} >
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={{
								url
							}}
							fields={[
								{
									id: 'url',
									label: 'Url',
									type: 'text',
									placeholder: 'e.g, https://your-site.com/starter-content.wxr'
								}
							]}
							form={{
								fields: [
									'url'
								]
							}}
							onChange={handleInputChange}
						/>
					</VStack>
				)}
			</Placeholder>
		</div>
	);
}
