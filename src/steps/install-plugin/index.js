/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { plugins } from '@wordpress/icons';
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
 * Edit function for install-plugin block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { pluginData = {}, options = {}, ifAlreadyInstalled } = attributes;
	const { resource = 'wordpress.org/plugins' } = pluginData;
	const { activate = true, onError, targetFolderName } = options;

	const summary = `${ resource } > ${ getResourceSummary(
		'plugin',
		pluginData
	) } > ${
		activate
			? __( 'Activate', 'visual-blueprint-builder' )
			: __( 'Install and keep Inactive', 'visual-blueprint-builder' )
	}`;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ plugins }
			isSelected={ isSelected }
			summary={ summary }
		>
			<Stack direction="column" gap="md">
				<ResourceSelector
					type="plugin"
					data={ pluginData }
					onChange={ ( newPluginData ) =>
						setAttributes( { pluginData: newPluginData } )
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
								'Skip plugin on error',
								'visual-blueprint-builder'
							),
							value: 'skip-plugin',
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
						'Auto-detect from plugin data',
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
	icon: plugins,
	edit: Edit,
} );
