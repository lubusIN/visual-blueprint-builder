/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { plugins } from '@wordpress/icons';
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
	const { pluginName, pluginPath } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				preview={
					<VStack style={{ width: '100%' }}>
						<HStack justify='left' align={'center'} spacing={3}>
							<Icon icon={plugins} size={28} className='step-icon' />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
								{!isSelected && (
									<Text weight={600}>
										{__(
											`${pluginName || __('Plugin Name', 'wp-playground-blueprint-editor')} > ${pluginPath || __('Plugin Path', 'wp-playground-blueprint-editor')}`,
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
										id: 'pluginName',
										label: __('Plugin Name', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('Enter plugin name', 'wp-playground-blueprint-editor'),
									},
									{
										id: 'pluginPath',
										label: __('Plugin Path', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('Enter the full path to the plugin', 'wp-playground-blueprint-editor'),
									},
								]}
								form={{
									fields: [
										'pluginName',
										'pluginPath'
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
	icon: plugins,
	edit: Edit,
});
