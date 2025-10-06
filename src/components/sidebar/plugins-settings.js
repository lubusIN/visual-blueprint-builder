/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { plus, trash, cog } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import {
    Modal,
    Button,
    __experimentalInputControl as InputControl,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Plugin Settings Component
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.attributes - The block's attributes, containing `plugins`.
 * @param {Function} props.setAttributes - Function to update the block's attributes.
 * 
 * @returns {JSX.Element} The PluginSettings component.
 */
function PluginSettings({ attributes = {}, setAttributes }) {
    const { plugins } = attributes;
    const [isModalOpen, setModalOpen] = useState(false);
    const [pluginList, setPluginList] = useState(plugins || []);

    // Sync local state with attributes when plugins update
    useEffect(() => {
        setPluginList(plugins || []);
    }, [plugins]);

    /**
     * Add new plugin
     */
    const addPlugin = () => {
        if (pluginList.some((plugin) => plugin === '')) {
            return;
        }
        setPluginList([...pluginList, '']); // Add a new empty plugin entry
    };

    /**
     * Update a plugin entry
     */
    const updatePlugin = (index, value) => {
        const updatedList = pluginList.map((plugin, i) => (i === index ? value : plugin));
        setPluginList(updatedList);
    };

    /**
     * Delete a plugin entry
     */
    const deletePlugin = (index) => {
        setPluginList(pluginList.filter((_, i) => i !== index));
    };

    /**
     * Save plugins to attributes
     */
    const savePlugins = () => {
        const filteredList = pluginList.filter((plugin) => plugin.trim() !== '');
        setAttributes({ plugins: filteredList });
        setPluginList(filteredList);
        setModalOpen(false);
    };

    // Disable the "Add Plugin" button if the last plugin is empty
    const isAddButtonDisabled = pluginList.some((plugin) => plugin.trim() === '');

    return (
        <>
            {/* Trigger Button */}
            <Button icon={cog} iconSize={30} onClick={() => setModalOpen(true)} />
            {isModalOpen && (
                <Modal
                    title={__('Plugins', 'wp-playground-blueprint-editor')}
                    onRequestClose={() => savePlugins()}
                    size="medium"
                >
                    <VStack spacing={4}>
                        {pluginList.map((plugin, index) => (
                            <HStack key={index} justify="space-between" alignment="center">
                                <InputControl
                                    label={__('Plugin', 'wp-playground-blueprint-editor')}
                                    hideLabelFromVision
                                    value={plugin}
                                    placeholder={__('Enter plugin slug or URL', 'wp-playground-blueprint-editor')}
                                    __next40pxDefaultSize
                                    __unstableInputWidth={'400px'}
                                    onChange={(value) => updatePlugin(index, value)}
                                />
                                <Button
                                    isDestructive
                                    icon={trash}
                                    label={__('Delete Plugin', 'wp-playground-blueprint-editor')}
                                    onClick={() => deletePlugin(index)}
                                    style={{ width: '40px' }}
                                />
                            </HStack>
                        ))}

                        <Button
                            icon={plus}
                            variant="secondary"
                            label={__('Add Plugin', 'wp-playground-blueprint-editor')}
                            onClick={addPlugin}
                            disabled={isAddButtonDisabled}
                        />
                    </VStack>
                </Modal>
            )}
        </>
    );
}

export default PluginSettings;
