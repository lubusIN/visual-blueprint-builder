/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { brush } from '@wordpress/icons';
import {
	ToggleControl,
	SelectControl,
	TextControl,
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

				<SelectControl
					label={ __(
						'If Already Installed',
						'visual-blueprint-builder'
					) }
					value={ ifAlreadyInstalled || '' }
					options={ [
						{
							label: __(
								'Default (Playground default)',
								'visual-blueprint-builder'
							),
							value: '',
						},
						{
							label: __(
								'Overwrite',
								'visual-blueprint-builder'
							),
							value: 'overwrite',
						},
						{
							label: __( 'Skip', 'visual-blueprint-builder' ),
							value: 'skip',
						},
						{
							label: __(
								'Error (Abort)',
								'visual-blueprint-builder'
							),
							value: 'error',
						},
					] }
					onChange={ ( val ) =>
						setAttributes( {
							ifAlreadyInstalled: val || undefined,
						} )
					}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>

				<SelectControl
					label={ __( 'On Error', 'visual-blueprint-builder' ) }
					value={ onError || '' }
					options={ [
						{
							label: __(
								'Default (Throw / Abort)',
								'visual-blueprint-builder'
							),
							value: '',
						},
						{
							label: __(
								'Skip theme on error',
								'visual-blueprint-builder'
							),
							value: 'skip-theme',
						},
						{
							label: __(
								'Abort Blueprint (throw)',
								'visual-blueprint-builder'
							),
							value: 'throw',
						},
					] }
					onChange={ ( val ) =>
						setAttributes( {
							options: {
								...options,
								onError: val || undefined,
							},
						} )
					}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>

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
