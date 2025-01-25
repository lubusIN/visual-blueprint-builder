/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel, PluginPostStatusInfo } from '@wordpress/editor';
import { copy, download, globe, code } from '@wordpress/icons';
import { useCallback } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { useCopyToClipboard } from '@wordpress/compose';
import { downloadBlob } from '@wordpress/blob';
import { DataForm } from '@wordpress/dataviews';
import {
    Toolbar,
    ToolbarButton,
    ToggleControl,
    Flex,
    FlexBlock,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
    __experimentalText as Text,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import OpenJson from './open-json';
import { PHP_VERSIONS, WP_VERSIONS, PLAYGROUND_BASE, PLAYGROUND_BUILDER_BASE, PLAYGROUND_BLUEPRINT_SCHEMA_URL } from './constant';
import Gallery from './blueprint-gallery';
import SiteOptionsSettings from './site-options-settings';
import PluginSettings from './plugins-settings';

/**
 * Main component for displaying blueprint sidebar setting.
 */
function BlueprintSidebarSettings() {
    const { createErrorNotice, createSuccessNotice } = useDispatch(noticesStore);
    const { editPost } = useDispatch('core/editor');

    const blocks = useSelect((select) => select('core/block-editor').getBlocks(), []);
    const blueprint_config = useSelect((select) => {
        return select('core/editor').getEditedPostAttribute('meta')['_blueprint_config'] || {}
    });

    const schema = {
        $schema: PLAYGROUND_BLUEPRINT_SCHEMA_URL,
        landingPage: blueprint_config.landing_page,
        preferredVersions: {
            php: blueprint_config.php_version,
            wp: blueprint_config.wp_version
        },
        phpExtensionBundles: [blueprint_config.php_extension_bundles],
        features: blueprint_config.networking ? { networking: true } : {},
        login: blueprint_config.login,
        siteOptions: blueprint_config.siteOptions,
        extraLibraries: blueprint_config.extra_libraries,
        plugins: blueprint_config.plugins,
        steps: []
    };

    /**
     * Prepares the schema by extracting attributes from blocks.
     * Blocks' metadata is excluded to keep the schema clean.
     */
    const prepareSchema = useCallback(() => {
        const blockAttributes = blocks.map((block) => {
            const { metadata, ...rest } = block.attributes; // Exclude metadata
            return rest;
        });
        schema.steps = blockAttributes;
        // Conditionally include the `login` property only if it's true
        const cleanedSchema = {
            ...schema,
            login: blueprint_config.login ? blueprint_config.login : undefined,
            siteOptions: blueprint_config.siteOptions && Object.keys(blueprint_config.siteOptions).length > 0
                ? blueprint_config.siteOptions : undefined, // Include only if siteOptions is non-empty
            extraLibraries: blueprint_config.extra_libraries && ['wp-cli'] || undefined,
            plugins: blueprint_config.plugins && Object(blueprint_config.plugins).length > 0
                ? blueprint_config.plugins : undefined, // Include only if plugins is non-empty
        };
        return JSON.stringify(cleanedSchema, null, 2); // Format the schema as a pretty JSON string
    }, [blocks, schema, blueprint_config]);
    /**
     * Handles downloading the prepared schema as a JSON file.
     */
    const handleDownload = () => {
        try {
            const preparedSchema = prepareSchema();
            downloadBlob('playground-blueprint.json', preparedSchema, 'application/json');
            createSuccessNotice(__('Blueprint downloaded successfully!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
        } catch (error) {
            createErrorNotice(__('Failed to download Blueprint JSON.', 'wp-playground-blueprint-editor'));
        }
    };

    /**
     * Copies the prepared schema to the clipboard.
     */
    const handleCopy = useCopyToClipboard(() => {
        if (!schema.steps.length) {
            createErrorNotice(__('No Blueprint steps to copy!', 'wp-playground-blueprint-editor'));
            return ''; // Return empty string for invalid data
        }
        createSuccessNotice(__('Blueprint schema copied to clipboard!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
        return prepareSchema();
    });

    /**
     * Updates the blueprint configuration stored in the post meta.
     * @param {Object} updatedValues - Partial blueprint configuration to update.
     */
    const updateBlueprintConfig = (updatedValues) => {
        editPost({ meta: { _blueprint_config: { ...blueprint_config, ...updatedValues } } });
    };

    /**
     * Handles JSON data submission from the upload modal.
     * Transforms the uploaded JSON to match the blueprint configuration format.
     * @param {Object} data - Uploaded JSON data.
     */
    const handleJsonDataSubmit = (data) => {
        if (!data) {
            createErrorNotice(__('Failed to update Blueprint configuration.', 'wp-playground-blueprint-editor'));
            return;
        }
        updateBlueprintConfig({
            landing_page: data.landingPage,
            php_version: data.preferredVersions.php,
            wp_version: data.preferredVersions.wp,
            php_extension_bundles: data.phpExtensionBundles,
            networking: data.features.networking || false,
            login: data.login || false,
            siteOptions: data.siteOptions || undefined,
            extra_libraries: data.extraLibraries || undefined,
            plugins: data.plugins || undefined,
        });
        createSuccessNotice(__('Blueprint configuration updated successfully!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
    };

    return (
        <>
            <PluginPostStatusInfo>
                <VStack spacing={5} style={{ width: '100%' }}>
                    <Flex>
                        <FlexBlock>
                            <OpenJson onSubmitData={handleJsonDataSubmit} />
                        </FlexBlock>
                        <FlexBlock>
                            <Gallery onSubmitData={handleJsonDataSubmit} />
                        </FlexBlock>
                    </Flex>
                    <Toolbar style={{ justifyContent: 'space-between' }}>
                        <ToolbarButton icon={globe} label={__('Open in Playground', 'wp-playground-blueprint-editor')} href={PLAYGROUND_BASE + prepareSchema()} target="_blank" />
                        <ToolbarButton icon={download} label={__('Download JSON', 'wp-playground-blueprint-editor')} onClick={handleDownload} />
                        <ToolbarButton icon={copy} label={__('Copy JSON', 'wp-playground-blueprint-editor')} ref={handleCopy} />
                        <ToolbarButton icon={code} label={__('Open in Builder', 'wp-playground-blueprint-editor')} href={PLAYGROUND_BUILDER_BASE + prepareSchema()} target="_blank" />
                    </Toolbar>
                </VStack>
            </PluginPostStatusInfo>
            <PluginDocumentSettingPanel name='playground-settings' title={__('Playground Settings', 'wp-playground-blueprint-editor')}>
                <DataForm
                    data={{
                        php_version: blueprint_config.php_version,
                        wp_version: blueprint_config.wp_version,
                        landing_page: blueprint_config.landing_page,
                        php_extension_bundles: blueprint_config.php_extension_bundles,
                        networking: blueprint_config.networking,
                        login: blueprint_config.login,
                        extra_libraries: blueprint_config.extra_libraries,
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
                            id: 'php_extension_bundles',
                            label: __('PHP Extension Bundles', 'wp-playground-blueprint-editor'),
                            type: 'text',
                            elements: [
                                { label: __('Kitchen Sink', 'wp-playground-blueprint-editor'), value: 'kitchen-sink' },
                                { label: __('Light', 'wp-playground-blueprint-editor'), value: 'light' },
                            ]
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
                            id: 'extra_libraries',
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
                            'php_extension_bundles',
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
                                id: 'extra_libraries',
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
                    {/* Site Options Button */}
                    <SiteOptionsSettings
                        attributes={{ siteOptions: blueprint_config.siteOptions }}
                        setAttributes={(updatedAttributes) =>
                            updateBlueprintConfig(updatedAttributes)
                        }
                    />
                </HStack>
                <HStack>
                    <Text>Plugins</Text>
                    {/* Plugins Button */}
                    <PluginSettings
                        attributes={{ plugins: blueprint_config.plugins }}
                        setAttributes={(updatedAttributes) =>
                            updateBlueprintConfig({ plugins: updatedAttributes.plugins })
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