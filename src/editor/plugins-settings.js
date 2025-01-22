/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { plus, trash, cog } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import {
    Modal,
    Button,
    Flex,
    FlexBlock,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';

function PluginSettings({ attributes = [], setAttributes }) {
    const { plugins } = attributes;
    const [isModalOpen, setModalOpen] = useState(false);
    const [pluginList, setPluginList] = useState(plugins || []);
    const [newPlugin, setNewPlugin] = useState('');

    useEffect(() => {
        setPluginList(plugins || []);
    }, [plugins]);
    
    const addPlugin = () => {
        if (newPlugin.trim()) {
            setPluginList([...pluginList, newPlugin]);
            setNewPlugin('');
        }
    };

    const removePlugin = (index) => {
        const updatedList = pluginList.filter((_, i) => i !== index);
        setPluginList(updatedList);
    };

    const savePlugins = () => {
        setAttributes({ plugins: pluginList });
        setModalOpen(false);
    };

    return (
        <div>
            {/* Trigger Button */}
            <Button icon={cog} iconSize={30} onClick={() => setModalOpen(true)} />
            {/* Modal */}
            {isModalOpen && (
                <Modal
                    title={__('Plugins', 'wp-playground-blueprint-editor')}
                    onRequestClose={savePlugins}
                >
                    {/* Add New Plugin */}
                    <Flex align='end'>
                        <FlexBlock>
                            <InputControl
                                label={__('Plugin URL or Slug', 'wp-playground-blueprint-editor')}
                                value={newPlugin}
                                onChange={(value) => setNewPlugin(value)}
                                placeholder={__('Enter plugin slug or URL', 'wp-playground-blueprint-editor')}
                            />
                        </FlexBlock>
                        <Button
                            icon={plus}
                            label={__('Add Plugin', 'wp-playground-blueprint-editor')}
                            onClick={addPlugin}
                        />
                    </Flex>
                    {/* Existing Plugins */}
                    {pluginList.map((plugin, index) => (
                        <Flex align='end'>
                            <FlexBlock>
                                <InputControl
                                    value={plugin}
                                    onChange={(value) => {
                                        const updatedList = [...pluginList];
                                        updatedList[index] = value;
                                        setPluginList(updatedList);
                                    }}
                                /></FlexBlock>
                            <Button
                                isDestructive
                                icon={trash}
                                label={__('Delete Plugin', 'wp-playground-blueprint-editor')}
                                onClick={() => removePlugin(index)}
                            />
                        </Flex>
                    ))}
                </Modal>
            )}
        </div>
    );
}

export default PluginSettings;
