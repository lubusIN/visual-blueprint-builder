/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { download } from '@wordpress/icons';
import {
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for import-wxr block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		file = {},
		fetchAttachments = true,
		rewriteUrls = true,
		importComments = true,
		defaultAuthorUsername = 'admin',
		authorsMode = 'default-author',
		importUsers = false,
	} = attributes;

	const { url = '' } = file;

	const handleUrlChange = ( newUrl ) => {
		setAttributes( {
			file: {
				...file,
				resource: 'url',
				url: newUrl,
			},
		} );
	};

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ download }
			isSelected={ isSelected }
			summary={ url || __( '{WXR URL}', 'visual-blueprint-builder' ) }
		>
			<Stack direction="column" gap="md">
				<TextControl
					label={ __( 'WXR File URL', 'visual-blueprint-builder' ) }
					value={ url }
					placeholder={ __(
						'Enter the URL of the WXR file',
						'visual-blueprint-builder'
					) }
					onChange={ handleUrlChange }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>

				<ToggleControl
					label={ __(
						'Fetch and import attachments',
						'visual-blueprint-builder'
					) }
					checked={ fetchAttachments }
					onChange={ ( val ) =>
						setAttributes( { fetchAttachments: val } )
					}
					__nextHasNoMarginBottom
				/>

				<ToggleControl
					label={ __(
						'Rewrite URLs to current site URL',
						'visual-blueprint-builder'
					) }
					checked={ rewriteUrls }
					onChange={ ( val ) =>
						setAttributes( { rewriteUrls: val } )
					}
					__nextHasNoMarginBottom
				/>

				<ToggleControl
					label={ __(
						'Import comments',
						'visual-blueprint-builder'
					) }
					checked={ importComments }
					onChange={ ( val ) =>
						setAttributes( { importComments: val } )
					}
					__nextHasNoMarginBottom
				/>

				<ToggleControl
					label={ __(
						'Create local users for authors',
						'visual-blueprint-builder'
					) }
					checked={ importUsers }
					onChange={ ( val ) =>
						setAttributes( { importUsers: val } )
					}
					__nextHasNoMarginBottom
				/>

				<SelectControl
					label={ __( 'Authors Mode', 'visual-blueprint-builder' ) }
					value={ authorsMode }
					options={ [
						{
							label: __(
								'Assign to fallback author',
								'visual-blueprint-builder'
							),
							value: 'default-author',
						},
						{
							label: __(
								'Create new local users',
								'visual-blueprint-builder'
							),
							value: 'create',
						},
						{
							label: __(
								'Map author accounts',
								'visual-blueprint-builder'
							),
							value: 'map',
						},
					] }
					onChange={ ( val ) =>
						setAttributes( { authorsMode: val } )
					}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>

				{ authorsMode === 'default-author' && (
					<TextControl
						label={ __(
							'Default Author Username',
							'visual-blueprint-builder'
						) }
						value={ defaultAuthorUsername }
						placeholder="admin"
						onChange={ ( val ) =>
							setAttributes( { defaultAuthorUsername: val } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				) }
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: download,
	edit: Edit,
} );
