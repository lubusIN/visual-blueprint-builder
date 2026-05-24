/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { wordpress } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Icon,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
	const { wordPressFilesZip } = attributes;
	const { url } = wordPressFilesZip;

	const handleInputChange = (value) => {
		setAttributes({
			wordPressFilesZip: {
				...wordPressFilesZip,
				...value
			}
		});
	};

	return (
		<StepWrapper 
			title={metadata.title} 
			icon={wordpress} 
			isSelected={isSelected} 
			summary={
				<Text weight={600}>
										{__(
											`from ${url || '{zip url}'}`,
											'wp-playground-blueprint-editor'
										)}
									</Text>
			}
		>
			<DataForm
								data={{
									url
								}}
								fields={[
									{
										id: 'url',
										label: __('Url', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('Enter the URL of the zip file', 'wp-playground-blueprint-editor'),
									},
								]}
								form={{
									fields: [
										'url'
									]
								}}
								onChange={handleInputChange}
							/>
		</StepWrapper>
);