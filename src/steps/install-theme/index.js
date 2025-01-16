/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { brush } from '@wordpress/icons';
import {
	useBlockProps
} from '@wordpress/block-editor';
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
 * Edit function for the theme installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
	const { themeZipFile, options } = attributes;
	const { resource, path, url, slug } = themeZipFile;
	const { activate, importStarterContent } = options;

	const handleResourceChange = (newResource) => {
		let newAttributes = {
			resource: newResource
		};

		// Conditionally add attributes based on the selected resource
		if (newResource === 'vfs') {
			newAttributes.path = themeZipFile.path || '';
		} else if (newResource === 'url') {
			newAttributes.url = themeZipFile.url || '';
		} else if (newResource === 'wordpress.org/themes') {
			newAttributes.slug = themeZipFile.slug || '';
		}

		setAttributes({
			themeZipFile: newAttributes
		});
	};

	const handleInputChange = (field, value) => {
		setAttributes({
			themeZipFile: {
				...themeZipFile,
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
							<Icon icon={brush} size={28} className='step-icon' />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
								{!isSelected && (
									<Text weight={600}>{`${resource} > ${getResourceInfo(resource) || 'undefined'} > ${activate ? __('Activate', 'wp-playground-blueprint-editor') : __('Install and keep Inactive', 'wp-playground-blueprint-editor')} > ${importStarterContent ? __('with', 'wp-playground-blueprint-editor') : __('without', 'wp-playground-blueprint-editor')} ${__('starter content', 'wp-playground-blueprint-editor')}`}</Text>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<>
								<ToggleGroupControl
									label={__('Resource', 'wp-playground-blueprint-editor')}
									value={resource}
									isBlock
									onChange={handleResourceChange}
								>
									<ToggleGroupControlOption value="url" label={__('URL', 'wp-playground-blueprint-editor')} />
									<ToggleGroupControlOption value="wordpress.org/themes" label={__('Theme', 'wp-playground-blueprint-editor')} />
									<ToggleGroupControlOption value="vfs" label={__('VFS', 'wp-playground-blueprint-editor')} />
								</ToggleGroupControl>

								{resource === 'vfs' && (
									<TextControl
										label={__('Path', 'wp-playground-blueprint-editor')}
										value={path}
										placeholder={__('Enter the file path for the theme ZIP', 'wp-playground-blueprint-editor')}
										onChange={(newPath) => handleInputChange('path', newPath)}
									/>
								)}
								{resource === 'url' && (
									<TextControl
										label={__('Url', 'wp-playground-blueprint-editor')}
										value={url}
										placeholder={__('Enter the URL of the theme ZIP file', 'wp-playground-blueprint-editor')}
										onChange={(newPath) => handleInputChange('url', newPath)}
									/>
								)}
								{resource === 'wordpress.org/themes' && (
									<InputControl
										style={{ width: '100%', paddingBottom: '8px' }}
										label={__('Slug', 'wp-playground-blueprint-editor')}
										value={slug}
										placeholder={__('Enter theme slug', 'wp-playground-blueprint-editor')}
										onChange={(value) => handleInputChange('slug', value)}
										suffix={<Picker type="themes"
											onSelect={(selectedSlug) => handleInputChange('slug', selectedSlug)}
											text={__('Picker', 'wp-playground-blueprint-editor')} />}
									/>
								)}

								<ToggleControl
									label={__('Activate', 'wp-playground-blueprint-editor')}
									checked={activate}
									onChange={() => setAttributes({
										options: {
											...options,
											activate: !activate
										}
									})}
								/>

								<ToggleControl
									label={__('Import Starter Content', 'wp-playground-blueprint-editor')}
									checked={importStarterContent}
									onChange={() => setAttributes({
										options: {
											...options,
											importStarterContent: !importStarterContent
										}
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
 *
 */
registerBlockType(metadata.name, {
	icon: brush,
	edit: Edit,
});
