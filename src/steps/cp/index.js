/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { copy } from '@wordpress/icons';
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
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
	const { fromPath, toPath } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				preview={
					<VStack style={{ width: '100%' }}>
						<HStack justify='left' align={'center'} spacing={3}>
							<Icon icon={copy} size={28} className='step-icon' />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
								{!isSelected && (
									<Text weight={600}>
										{fromPath && toPath
											? __(
												`Copy all files and folders from “${fromPath}” to “${toPath}”.`,
												'wp-playground-blueprint-editor'
											)
											: __(
												'Copy all files and folders from the "From Path" location to the "To Path" location.',
												'wp-playground-blueprint-editor'
											)}
									</Text>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<DataForm
								data={attributes}
								fields={[
									{
										id: 'fromPath',
										label: __('From Path', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('Enter source path', 'wp-playground-blueprint-editor'),
									},
									{
										id: 'toPath',
										label: __('To Path', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('Enter destination path', 'wp-playground-blueprint-editor'),
									},
								]}
								form={{
									fields: [
										'fromPath',
										'toPath'
									]
								}}
								onChange={setAttributes}
							/>
						)}
					</VStack>
				}
			/>
		</p>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: copy,
	edit: Edit,
});
