/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { wordpress } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	TextControl,
	ToggleControl,
	__experimentalVStack as VStack,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
	const { wordPressFilesZip: { url } } = attributes;

	const handleInputChange = (value) => {
		setAttributes({
			wordPressFilesZip: value
		});
	};

	return (
		<div {...useBlockProps()}>
			<Placeholder
				icon={wordpress}
				label="Import WordPress Files"
				instructions={
					!isSelected && `from ${url || '{zip url}'}`
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
									type: 'text'
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
