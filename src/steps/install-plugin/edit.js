/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { plugins } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Icon,
	Card,
	CardBody,
	Placeholder,
	TextControl,
	ToggleControl,
	__experimentalText as Text,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalHStack as HStack,
} from '@wordpress/components';

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
	const { pluginZipFile, options } = attributes;
	const { resource, path, url, slug } = pluginZipFile;
	const { activate } = options;

	const handleResourceChange = (newResource) => {
		let newAttributes = {
			resource: newResource
		};

		// Conditionally add attributes based on the selected resource
		if (newResource === 'vfs') {
			newAttributes.path = pluginZipFile.path || '';
		} else if (newResource === 'url') {
			newAttributes.url = pluginZipFile.url || '';
		} else if (newResource === 'wordpress.org/plugins') {
			newAttributes.slug = pluginZipFile.slug || '';
		}

		setAttributes({
			pluginZipFile: newAttributes
		});
	};

	const handleInputChange = (field, value) => {
		setAttributes({
			pluginZipFile: {
				...pluginZipFile,
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
			{!isSelected && (
				<Placeholder
					icon={plugins}
					label="Install Plugin"
					instructions={
						`${resource} > ${getResourceInfo(resource)} > ${activate ? 'Activate' : 'Install and keep Inactive'}`
					} />
			)
			}

			{isSelected && (
				<Card>
					<CardBody>
						<HStack alignment="left" style={{ marginBottom: '10px' }}>
							<Icon icon={plugins}></Icon>
							<Text weight={600}>Install Plugin</Text>
						</HStack>
						<ToggleGroupControl
							label="Resource"
							value={resource}
							isBlock
							onChange={handleResourceChange}
						>
							<ToggleGroupControlOption value="url" label="URL" />
							<ToggleGroupControlOption value="wordpress.org/plugins" label="Plugin" />
							<ToggleGroupControlOption value="vfs" label="VFS" />
						</ToggleGroupControl>

						{resource === 'vfs' && (
							<TextControl
								label={__('Path', 'install-plugin')}
								value={path}
								onChange={(newPath) => handleInputChange('path', newPath)}
							/>
						)}
						{resource === 'url' && (
							<TextControl
								label={__('Url', 'install-plugin')}
								value={url}
								onChange={(newPath) => handleInputChange('url', newPath)}
							/>
						)}
						{resource === 'wordpress.org/plugins' && (
							<TextControl
								label={__('Slug', 'install-plugin')}
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
					</CardBody>
				</Card>
			)}
		</div>
	);
}
