/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import {
	PluginDocumentSettingPanel,
	PluginPostStatusInfo,
} from '@wordpress/editor';
import { DataForm } from '@wordpress/dataviews';
import { ToggleControl } from '@wordpress/components';
import { Stack, Text } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import {
	Gallery,
	OpenJson,
	SiteOptionsSettings,
	PluginSettings,
	ConstantsSettings,
	MetaSettings,
} from '../components/sidebar';
import { useBlueprintData, usePlaygroundVersions } from './utils';

/**
 * Component for displaying blueprint sidebar setting.
 */
const ToggleEdit = ( { field, onChange, data, hideLabelFromVision } ) => {
	const { id, getValue } = field;
	return (
		<ToggleControl
			__nextHasNoMarginBottom
			label={ hideLabelFromVision ? '' : field.label }
			checked={ getValue( { item: data } ) }
			onChange={ () =>
				onChange( {
					[ id ]: ! getValue( {
						item: data,
					} ),
				} )
			}
		/>
	);
};

/**
 * Sidebar Setting Row wrapper.
 */
const SidebarSettingRow = ( { label, children } ) => (
	<Stack
		direction="row"
		justify="space-between"
		align="center"
		style={ { marginTop: '6px' } }
	>
		<Text variant="body-md" className="vbb-sidebar-label">
			{ label }
		</Text>
		{ children }
	</Stack>
);

/**
 * Main component for displaying blueprint sidebar setting.
 */
function BlueprintSidebarSettings() {
	const { updateBlueprintConfig, blueprintConfig } = useBlueprintData();
	const { phpVersions, wpVersions } =
		usePlaygroundVersions( blueprintConfig );

	return (
		<>
			<PluginPostStatusInfo className="playground-blueprint-sidebar">
				<div className="vbb-sidebar-top-actions">
					<OpenJson />
					<Gallery />
				</div>
			</PluginPostStatusInfo>
			<PluginDocumentSettingPanel
				name="playground-settings"
				title={ __(
					'Playground Settings',
					'visual-blueprint-builder'
				) }
			>
				<DataForm
					data={ {
						php_version: blueprintConfig.php_version,
						wp_version: blueprintConfig.wp_version,
						landing_page: blueprintConfig.landing_page,
						networking: blueprintConfig.networking || false,
						intl: blueprintConfig.intl || false,
						login: blueprintConfig.login || false,
						extraLibraries: Array.isArray(
							blueprintConfig.extraLibraries
						)
							? blueprintConfig.extraLibraries.length > 0
							: Boolean( blueprintConfig.extraLibraries ),
					} }
					fields={ [
						{
							elements: phpVersions,
							id: 'php_version',
							label: __(
								'PHP Version',
								'visual-blueprint-builder'
							),
							type: 'text',
						},
						{
							elements: wpVersions,
							id: 'wp_version',
							label: __(
								'WP Version',
								'visual-blueprint-builder'
							),
							type: 'text',
						},
						{
							id: 'landing_page',
							label: __(
								'Landing Page',
								'visual-blueprint-builder'
							),
							type: 'text',
						},
						{
							id: 'networking',
							label: __(
								'Networking',
								'visual-blueprint-builder'
							),
							type: 'integer',
							Edit: ToggleEdit,
						},
						{
							id: 'intl',
							label: __(
								'Intl Extension',
								'visual-blueprint-builder'
							),
							type: 'integer',
							Edit: ToggleEdit,
						},
						{
							id: 'login',
							label: __( 'Login', 'visual-blueprint-builder' ),
							type: 'integer',
							Edit: ToggleEdit,
						},
						{
							id: 'extraLibraries',
							label: __(
								'Extra Libraries (WP-CLI)',
								'visual-blueprint-builder'
							),
							type: 'integer',
							Edit: ToggleEdit,
						},
					] }
					form={ {
						fields: [
							'php_version',
							'wp_version',
							'landing_page',
							{
								id: 'networking',
								layout: 'regular',
								labelPosition: 'side',
							},
							{
								id: 'intl',
								layout: 'regular',
								labelPosition: 'side',
							},
							{
								id: 'login',
								layout: 'regular',
								labelPosition: 'side',
							},
							{
								id: 'extraLibraries',
								layout: 'regular',
								labelPosition: 'side',
							},
						],
						type: 'panel',
					} }
					onChange={ updateBlueprintConfig }
				/>
				<SidebarSettingRow
					label={ __(
						'Blueprint Metadata',
						'visual-blueprint-builder'
					) }
				>
					<MetaSettings
						attributes={ { meta: blueprintConfig.meta } }
						setAttributes={ updateBlueprintConfig }
					/>
				</SidebarSettingRow>
				<SidebarSettingRow
					label={ __( 'Site Options', 'visual-blueprint-builder' ) }
				>
					<SiteOptionsSettings
						attributes={ {
							siteOptions: blueprintConfig.siteOptions,
						} }
						setAttributes={ updateBlueprintConfig }
					/>
				</SidebarSettingRow>
				<SidebarSettingRow
					label={ __( 'Plugins', 'visual-blueprint-builder' ) }
				>
					<PluginSettings
						attributes={ { plugins: blueprintConfig.plugins } }
						setAttributes={ updateBlueprintConfig }
					/>
				</SidebarSettingRow>
				<SidebarSettingRow
					label={ __(
						'WP Config Constants',
						'visual-blueprint-builder'
					) }
				>
					<ConstantsSettings
						attributes={ {
							constants: blueprintConfig.constants,
						} }
						setAttributes={ updateBlueprintConfig }
					/>
				</SidebarSettingRow>
			</PluginDocumentSettingPanel>
		</>
	);
}

/**
 * Registers the 'blueprint-version-control' plugin.
 */
registerPlugin( 'blueprint-version-control', {
	render: BlueprintSidebarSettings,
} );
