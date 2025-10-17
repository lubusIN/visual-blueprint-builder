/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel, PluginPostStatusInfo } from '@wordpress/editor';
import { DataForm } from '@wordpress/dataviews';
import {
    ToggleControl,
    __experimentalGrid as Grid,
    __experimentalText as Text,
    __experimentalHStack as HStack,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { Gallery, OpenJson, SiteOptionsSettings, PluginSettings, ConstantsSettings } from '../components/sidebar';
import { PHP_VERSIONS, WP_VERSIONS } from './constant';
import { useBlueprintData } from './utils';

/**
 * Main component for displaying blueprint sidebar setting.
 */
function BlueprintSidebarSettings() {
    const {
        updateBlueprintConfig,
        blueprint_config
    } = useBlueprintData();

    return (
        <>
            <PluginPostStatusInfo className='playground-blueprint-sidebar'>
                <Grid columns={2}>
                    <OpenJson />
                    <Gallery />
                </Grid>
            </PluginPostStatusInfo>
            <PluginDocumentSettingPanel name='playground-settings' title={__('Playground Settings', 'wp-playground-blueprint-editor')}>
                <DataForm
                    data={{
                        php_version: blueprint_config.php_version,
                        wp_version: blueprint_config.wp_version,
                        landing_page: blueprint_config.landing_page,
                        networking: blueprint_config.networking || false,
                        login: blueprint_config.login || false,
                        extraLibraries: blueprint_config.extraLibraries || false,
                    }}
                    fields={[
                        {
                            elements: PHP_VERSIONS,
                            id: 'php_version',
                            label: __('PHP Version', 'wp-playground-blueprint-editor'),
                            type: 'text'
                        },
                        {
                            elements: WP_VERSIONS,
                            id: 'wp_version',
                            label: __('WP Version', 'wp-playground-blueprint-editor'),
                            type: 'text'
                        },
                        {
                            id: 'landing_page',
                            label: __('Landing Page', 'wp-playground-blueprint-editor'),
                            type: 'text'
                        },
                        {
                            id: 'networking',
                            label: __('Networking', 'wp-playground-blueprint-editor'),
                            type: 'integer',
                            Edit: ({ field, onChange, data, hideLabelFromVision }) => {
                                const { id, getValue } = field;
                                return (
                                    <ToggleControl
                                        __nextHasNoMarginBottom
                                        label={hideLabelFromVision ? '' : field.label}
                                        checked={getValue({ item: data })}
                                        onChange={() =>
                                            onChange({ [id]: !getValue({ item: data }) })
                                        }
                                    />
                                );
                            },
                        },
                        {
                            id: 'login',
                            label: __('Login', 'wp-playground-blueprint-editor'),
                            type: 'integer',
                            Edit: ({ field, onChange, data, hideLabelFromVision }) => {
                                const { id, getValue } = field;
                                return (
                                    <ToggleControl
                                        __nextHasNoMarginBottom
                                        label={hideLabelFromVision ? '' : field.label}
                                        checked={getValue({ item: data })}
                                        onChange={() =>
                                            onChange({ [id]: !getValue({ item: data }) })
                                        }
                                    />
                                );
                            },
                        },
                        {
                            id: 'extraLibraries',
                            label: __('Extra Libraries (WP-CLI)', 'wp-playground-blueprint-editor'),
                            type: 'integer',
                            Edit: ({ field, onChange, data, hideLabelFromVision }) => {
                                const { id, getValue } = field;
                                return (
                                    <ToggleControl
                                        __nextHasNoMarginBottom
                                        label={hideLabelFromVision ? '' : field.label}
                                        checked={getValue({ item: data })}
                                        onChange={() =>
                                            onChange({ [id]: !getValue({ item: data }) })
                                        }
                                    />
                                );
                            },
                        },
                    ]}
                    form={{
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
                    }}
                    onChange={updateBlueprintConfig}
                />
                <HStack style={{
                    justifyContent: 'space-between',
                    marginTop: '6px'
                }}>
                    <Text>Site Options</Text>
                    <SiteOptionsSettings
                        attributes={{ siteOptions: blueprint_config.siteOptions }}
                        setAttributes={(updatedAttributes) =>
                            updateBlueprintConfig(updatedAttributes)
                        }
                    />
                </HStack>
                <HStack>
                    <Text>Plugins</Text>
                    <PluginSettings
                        attributes={{ plugins: blueprint_config.plugins }}
                        setAttributes={(updatedAttributes) =>
                            updateBlueprintConfig({ plugins: updatedAttributes.plugins })
                        }
                    />
                </HStack>
                <HStack>
                    <Text>WP Config Constants</Text>
                    <ConstantsSettings
                        attributes={{ constants: blueprint_config.constants }}
                        setAttributes={(updatedAttributes) =>
                            updateBlueprintConfig(updatedAttributes)
                        }
                    />
                </HStack>
            </PluginDocumentSettingPanel>
        </>
    );
};

/**
 * Registers the 'blueprint-version-control' plugin.
 */
registerPlugin('blueprint-version-control', { render: BlueprintSidebarSettings });