/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { brush } from '@wordpress/icons';
import {
	ToggleControl,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, ResourceSelector } from '../../components';
import { getResourceSummary } from '../../components/resource-selector';

/**
 * Edit function for install-theme block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { themeData = {}, options = {}, ifAlreadyInstalled } = attributes;
	const { resource = 'wordpress.org/themes' } = themeData;
	const {
		activate = true,
		importStarterContent = false,
		onError,
		targetFolderName,
	} = options;

	const summary = `${ resource } > ${ getResourceSummary(
		'theme',
		themeData
	) } > ${
		activate
			? __( 'Activate', 'visual-blueprint-builder' )
			: __( 'Install and keep Inactive', 'visual-blueprint-builder' )
	} > ${
		importStarterContent
			? __( 'with starter content', 'visual-blueprint-builder' )
			: __( 'without starter content', 'visual-blueprint-builder' )
	}`;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ brush }
			isSelected={ isSelected }
			summary={ summary }
		>
			<Stack direction="column" gap="md">
				<ResourceSelector
					type="theme"
					data={ themeData }
					onChange={ ( newThemeData ) =>
						setAttributes( { themeData: newThemeData } )
					}
				/>

				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Activate', 'visual-blueprint-builder' ) }
					checked={ activate }
					onChange={ () =>
						setAttributes( {
							options: {
								...options,
								activate: ! activate,
							},
						} )
					}
				/>

				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Import Starter Content',
						'visual-blueprint-builder'
					) }
					checked={ importStarterContent }
					onChange={ () =>
						setAttributes( {
							options: {
								...options,
								importStarterContent: ! importStarterContent,
							},
						} )
					}
				/>

				<ToggleGroupControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					isBlock
					label={ __(
						'If Already Installed',
						'visual-blueprint-builder'
					) }
					value={ ifAlreadyInstalled || '' }
					onChange={ ( val ) =>
						setAttributes( {
							ifAlreadyInstalled: val || undefined,
						} )
					}
				>
					<ToggleGroupControlOption
						value=""
						label={ __( 'Default', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="overwrite"
						label={ __( 'Overwrite', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="skip"
						label={ __( 'Skip', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="error"
						label={ __( 'Error', 'visual-blueprint-builder' ) }
					/>
				</ToggleGroupControl>

				<ToggleGroupControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					isBlock
					label={ __( 'On Error', 'visual-blueprint-builder' ) }
					value={ onError || '' }
					onChange={ ( val ) =>
						setAttributes( {
							options: {
								...options,
								onError: val || undefined,
							},
						} )
					}
				>
					<ToggleGroupControlOption
						value=""
						label={ __( 'Default', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="skip-theme"
						label={ __( 'Skip Theme', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="throw"
						label={ __( 'Throw', 'visual-blueprint-builder' ) }
					/>
				</ToggleGroupControl>

				<TextControl
					label={ __(
						'Target Folder Name (Optional)',
						'visual-blueprint-builder'
					) }
					value={ targetFolderName || '' }
					placeholder={ __(
						'Auto-detect from theme data',
						'visual-blueprint-builder'
					) }
					onChange={ ( val ) =>
						setAttributes( {
							options: {
								...options,
								targetFolderName: val || undefined,
							},
						} )
					}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: brush,
	edit: Edit,
} );
