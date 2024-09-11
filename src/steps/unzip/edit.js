/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { archive } from '@wordpress/icons';
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
	const { zipFile, extractToPath } = attributes;
	const { path } = zipFile;

	const handleInputChange = (value) => {
		const key = Object.keys(value)[0];

		if ('path' === key) {
			setAttributes({
				zipFile: {
					...zipFile,
					...value
				}
			});
		} else {
			setAttributes(value);
		}
	};

	return (
		<div {...useBlockProps()}>
			<Placeholder
				icon={archive}
				label="Unzip file"
				instructions={
					!isSelected && `from ${path || '{zip path}'} to ${extractToPath || '{folder path}'}`
				} >
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={{
								path,
								extractToPath
							}}
							fields={[
								{
									id: 'path',
									label: 'Path',
									type: 'text',
									placeholder: 'The path of the zip file to extract'
								},
								{
									id: 'extractToPath',
									label: 'Extract To Path',
									type: 'text',
									placeholder: 'The path to extract the zip file to'
								}
							]}
							form={{
								fields: [
									'path',
									'extractToPath'
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
