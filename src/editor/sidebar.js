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
    __experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import BlueprintJsonUpload from '../components/blueprint-json-upload';
import { PHP_VERSIONS, WP_VERSIONS, PLAYGROUND_BASE, PLAYGROUND_BUILDER_BASE, PLAYGROUND_BLUEPRINT_SCHEMA_URL } from './constant';

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
        return JSON.stringify(schema, null, 2); // Format the schema as a pretty JSON string
    }, [blocks, schema]);

    /**
     * Handles downloading the prepared schema as a JSON file.
     */
    const handleDownload = () => {
        try {
            const preparedSchema = prepareSchema();
            downloadBlob('playground-blueprint.json', preparedSchema, 'application/json');
            createSuccessNotice(__('Blueprint downloaded successfully!'), { type: 'snackbar' });
        } catch (error) {
            createErrorNotice(__('Failed to download Blueprint JSON.'));
        }
    };

    /**
     * Copies the prepared schema to the clipboard.
     */
    const handleCopy = useCopyToClipboard(() => {
        if (!schema.steps.length) {
            createErrorNotice(__('No Blueprint steps to copy!'));
            return ''; // Return empty string for invalid data
        }
        createSuccessNotice(__('Blueprint schema copied to clipboard!'), { type: 'snackbar' });
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
            createErrorNotice(__('Failed to update Blueprint configuration.'));
            return;
        }
        updateBlueprintConfig({
            landing_page: data.landingPage,
            php_version: data.preferredVersions.php,
            wp_version: data.preferredVersions.wp,
            php_extension_bundles: data.phpExtensionBundles,
            networking: data.features.networking || false,
        });
        createSuccessNotice(__('Blueprint configuration updated successfully!'), { type: 'snackbar' });
    };

    return (
        <>
            <PluginPostStatusInfo>
                <VStack spacing={5} style={{ width: '100%' }}>
                    <BlueprintJsonUpload onSubmitData={handleJsonDataSubmit} />
                    <Toolbar style={{ justifyContent: 'space-between' }}>
                        <ToolbarButton icon={globe} label="Open in playground" href={PLAYGROUND_BASE + prepareSchema()} target="_blank" />
                        <ToolbarButton icon={download} label="Download JSON" onClick={handleDownload} />
                        <ToolbarButton icon={copy} label="Copy JSON" ref={handleCopy} />
                        <ToolbarButton icon={code} label="Open in Builder" href={PLAYGROUND_BUILDER_BASE + prepareSchema()} target="_blank" />
                    </Toolbar>
                </VStack>
            </PluginPostStatusInfo>
            <PluginDocumentSettingPanel name='playground-settings' title='Playground Settings'>
                <DataForm
                    data={{
                        php_version: blueprint_config.php_version,
                        wp_version: blueprint_config.wp_version,
                        landing_page: blueprint_config.landing_page,
                        php_extension_bundles: blueprint_config.php_extension_bundles,
                        networking: blueprint_config.networking
                    }}
                    fields={[
                        {
                            elements: PHP_VERSIONS,
                            id: 'php_version',
                            label: 'PHP Version',
                            type: 'text',
                        },
                        {
                            elements: WP_VERSIONS,
                            id: 'wp_version',
                            label: 'WP Version',
                            type: 'text'
                        },
                        {
                            id: 'landing_page',
                            label: 'Landing Page',
                            type: 'text'
                        },
                        {
                            id: 'php_extension_bundles',
                            label: 'PHP Extension Bundles',
                            type: 'text',
                            elements: [
                                { label: 'Kitchen Sink', value: 'kitchen-sink' },
                                { label: 'Light', value: 'light' },
                            ]
                        },
                        {
                            id: 'networking',
                            label: 'Networking',
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
                        ],
                        type: 'panel',
                    }}
                    onChange={updateBlueprintConfig}
                />
            </PluginDocumentSettingPanel>
        </>
    );
};

/**
 * Registers the 'blueprint-version-control' plugin.
 */
registerPlugin('blueprint-version-control', { render: BlueprintSidebarSettings });
