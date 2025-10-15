/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { plugins } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	TextControl,
	ToggleControl,
	Icon,
	__experimentalVStack as VStack,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalHStack as HStack,
	__experimentalText as Text,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { Picker } from '../../components';

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
	const { pluginData, options } = attributes;
	const { resource, path, url, slug, ref } = pluginData;
	const { activate } = options;

	const handleResourceChange = (newResource) => {
		let newAttributes = {
			resource: newResource
		};

		// Conditionally add attributes based on the selected resource
		if (newResource === 'vfs') {
			newAttributes.path = '';
		} else if (newResource === 'url') {
			newAttributes.url = '';
		} else if (newResource === 'wordpress.org/plugins') {
			newAttributes.slug = '';
		} else if (newResource === 'git:directory') {
			newAttributes.ref = '';
			newAttributes.path = '';
			newAttributes.url = '';
		}

		setAttributes({
			pluginData: newAttributes
		});
	};

	const handleInputChange = (field, value) => {
		setAttributes({
			pluginData: {
				...pluginData,
				[field]: value
			}
		});
	};

	const getResourceInfo = (resource) => {
		switch (resource) {
			case 'url':
				return url;
			case 'vfs':
				return path;
			case 'git:directory':
				return path ? `${path} (Ref: ${ref || 'default branch'})` : (ref ? `Ref: ${ref}` : 'Git Repository');
			default:
				return slug;
		}
	}

	return (
		<div {...useBlockProps()}>
			<Placeholder
				preview={
					<VStack style={{ width: '100%' }}>
						<HStack justify='left' align={'center'} spacing={3}>
							<Icon icon={plugins} size={28} className='step-icon' />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
								{!isSelected && (
									<Text weight={600}>
										{`${resource} > ${getResourceInfo(resource)} > ${activate ? __('Activate', 'wp-playground-blueprint-editor') : __('Install and keep Inactive', 'wp-playground-blueprint-editor')}`}
									</Text>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<>
								<ToggleGroupControl
									label={__('Resource', 'wp-playground-blueprint-editor')}
									__nextHasNoMarginBottom
									value={resource}
									isBlock
									onChange={handleResourceChange}
								>
									<ToggleGroupControlOption value="url" label={__('URL', 'wp-playground-blueprint-editor')} />
									<ToggleGroupControlOption value="wordpress.org/plugins" label={__('Plugin', 'wp-playground-blueprint-editor')} />
									<ToggleGroupControlOption value="vfs" label={__('VFS', 'wp-playground-blueprint-editor')} />
									<ToggleGroupControlOption value="git:directory" label={__('Git Directory', 'wp-playground-blueprint-editor')} />
								</ToggleGroupControl>

								{resource === 'vfs' && (
									<TextControl
										label={__('Path', 'wp-playground-blueprint-editor')}
										__next40pxDefaultSize
										value={path}
										placeholder={__('Enter the file path for the plugin ZIP', 'wp-playground-blueprint-editor')}
										onChange={(newPath) => handleInputChange('path', newPath)}
									/>
								)}
								{(resource === 'url' || resource === 'git:directory') && (
									<TextControl
										label={__('Url', 'wp-playground-blueprint-editor')}
										__next40pxDefaultSize
										value={url}
										placeholder={__('Enter the URL of the plugin ZIP file', 'wp-playground-blueprint-editor')}
										onChange={(newPath) => handleInputChange('url', newPath)}
									/>
								)}
								{resource === 'wordpress.org/plugins' && (
									<InputControl
										style={{ width: '100%', paddingBottom: '8px' }}
										__next40pxDefaultSize
										label={__('Slug', 'wp-playground-blueprint-editor')}
										value={slug}
										placeholder={__('Enter plugin slug', 'wp-playground-blueprint-editor')}
										onChange={(value) => handleInputChange('slug', value)}
										suffix={<Picker type="plugins"
											onSelect={(selectedSlug) => handleInputChange('slug', selectedSlug)} />}
									/>
								)}
								{/* Future Feature: Git Directory - To be implemented */}
								{resource === 'git:directory' && (
									<>
										<TextControl
											label={__('Reference (Optional branch, tag, or commit SHA)', 'wp-playground-blueprint-editor')}
											__next40pxDefaultSize
											value={ref}
											placeholder={__('Enter the git reference (branch, tag, or commit SHA)', 'wp-playground-blueprint-editor')}
											onChange={(newRef) => handleInputChange('ref', newRef)}
										/>
										<TextControl
											label={__('Directory Path (Optional subdirectory inside the repository)', 'wp-playground-blueprint-editor')}
											__next40pxDefaultSize
											value={path}
											placeholder={__('Enter the directory path inside the repository', 'wp-playground-blueprint-editor')}
											onChange={(newPath) => handleInputChange('path', newPath)}
										/>
									</>
								)}
								<ToggleControl
									label={__('Activate', 'wp-playground-blueprint-editor')}
									checked={activate}
									onChange={() => setAttributes({
										options: { activate: !activate }
									})}
								/>
							</>
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
	icon: plugins,
	edit: Edit,
});
