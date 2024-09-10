/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { brush } from '@wordpress/icons';
import {
	useBlockProps
} from '@wordpress/block-editor';
import {
	Placeholder,
	TextControl,
	ToggleControl,
	__experimentalVStack as VStack,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import './editor.scss';

/**
 * Edit function for the theme installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected}) {
	const { themeZipFile, options } = attributes;
	const { resource, path, url, slug } = themeZipFile;
	const { activate } = options;

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
				icon={brush}
				label="Install Theme"
				instructions={
					!isSelected && `${resource} > ${getResourceInfo(resource) || 'undefined'} > ${activate ? 'Activate' : 'Install and keep Inactive'}`
				}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<ToggleGroupControl
							label="Resource"
							value={resource}
							isBlock
							onChange={handleResourceChange}
						>
							<ToggleGroupControlOption value="url" label="URL" />
							<ToggleGroupControlOption value="wordpress.org/themes" label="Theme" />
							<ToggleGroupControlOption value="vfs" label="VFS" />
						</ToggleGroupControl>

						{resource === 'vfs' && (
							<TextControl
								label={__('Path', 'install-theme')}
								value={path}
								onChange={(newPath) => handleInputChange('path', newPath)}
							/>
						)}
						{resource === 'url' && (
							<TextControl
								label={__('Url', 'install-theme')}
								value={url}
								onChange={(newPath) => handleInputChange('url', newPath)}
							/>
						)}
						{resource === 'wordpress.org/themes' && (
							<TextControl
								label={__('Slug', 'install-theme')}
								value={slug}
								onChange={(newPath) => handleInputChange('slug', newPath)}
							/>
						)}

						<ToggleControl
							label="Activate"
							checked={activate}
							onChange={() => setAttributes({
								options: { activate: !activate }
							})}
						/>
					</VStack>
				)}
			</Placeholder>
		</div>
	);
}
