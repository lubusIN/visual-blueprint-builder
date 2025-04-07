/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { archive } from '@wordpress/icons';
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

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
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
				preview={
					<VStack style={{ width: '100%' }}>
						<HStack justify='left' align={'center'} spacing={3}>
							<Icon icon={archive} size={28} className='step-icon' />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
								{!isSelected && (
									<Text weight={600}>
										{`from ${path || __('{zip path}', 'wp-playground-blueprint-editor')} to ${extractToPath || __('{folder path}', 'wp-playground-blueprint-editor')}`}
									</Text>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<DataForm
								data={{
									path,
									extractToPath
								}}
								fields={[
									{
										id: 'path',
										label: __('Path', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('The path of the zip file to extract', 'wp-playground-blueprint-editor')
									},
									{
										id: 'extractToPath',
										label: __('Extract To Path', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('The path to extract the zip file to', 'wp-playground-blueprint-editor')
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
						)}
					</VStack>
				}
			/>
		</div>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: archive,
	edit: Edit,
});
