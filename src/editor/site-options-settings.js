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
 * Site Options Settings Component
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.attributes - The block's attributes, containing `siteOptions`.
 * @param {Function} props.setAttributes - Function to update the block's attributes.
 * 
 * @returns {JSX.Element} The SiteOptionsSettings component.
 */
function SiteOptionsSettings({ attributes = {}, setAttributes, }) {
    const { siteOptions } = attributes;
    const [isModalOpen, setModalOpen] = useState(false);
    const [optionList, updateOptionList] = useState(Object.entries(siteOptions || {}));

    // Sync local state with attributes when siteOptions updates
    useEffect(() => {
        updateOptionList(Object.entries(siteOptions || {}));
    }, [siteOptions]);
    /**
     * Add new option
     */
    const addOption = () => {
        // Prevent adding duplicate empty entries
        if (optionList.some(([key, value]) => key === '' && value === '')) {
            return;
        }
        updateOptionList([...optionList, ['', '']]);
    };

    /**
     * Update option
     */
    const updateOption = (index, field, fieldValue) => {
        const updatedList = optionList.map(([key, value], i) => {
            if (i === index) {
                return field === 'key' ? [fieldValue, value] : [key, fieldValue];
            }
            return [key, value];
        });
        updateOptionList(updatedList);
    };

    /**
     * Delete option
     */
    const deleteOption = (key) => {
        updateOptionList(optionList.filter((_, index) => index !== key));
    };

    const saveOptions = () => {
        const filteredOptions = optionList.filter(([key, value]) => key.trim() !== '' && value.trim() !== '');
        setAttributes({ siteOptions: Object.fromEntries(filteredOptions) });
        updateOptionList(filteredOptions);
        setModalOpen(false);
    };

    // Check if the last entry has an empty key or value
    const isAddButtonDisabled = optionList.length > 0 && (optionList[optionList.length - 1][0] === '' || optionList[optionList.length - 1][1] === '');

    return (
        <>
            {/* Trigger Button */}
            <Button icon={cog} iconSize={30} onClick={() => setModalOpen(true)} />
            {isModalOpen && (
                <Modal
                    title={__('Site Options', 'wp-playground-blueprint-editor')}
                    onRequestClose={() => saveOptions()}
                    size='medium'
                >
                    <VStack spacing={4}>
                        {optionList.map(([key, value], index) => (
                            <HStack key={index} justify='space-between' alignment='center'>
                                <InputControl
                                    label={__('Name', 'wp-playground-blueprint-editor')}
                                    value={key}
                                    __next40pxDefaultSize
                                    __unstableInputWidth={'200px'}
                                    onChange={(value) => updateOption(index, 'key', value)}
                                />
                                <InputControl
                                    label={__('Value', 'wp-playground-blueprint-editor')}
                                    value={value}
                                    __next40pxDefaultSize
                                    __unstableInputWidth={'200px'}
                                    onChange={(value) => updateOption(index, 'value', value)}
                                />
                                <Button
                                    isDestructive
                                    icon={trash}
                                    label={__('Delete Config', 'wp-playground-blueprint-editor')}
                                    onClick={() => deleteOption(index)}
                                    style={{ width: '40px', marginTop: '24px' }}
                                />
                            </HStack>
                        ))}
                        <Button
                            icon={plus}
                            variant={'secondary'}
                            label={__('Add Option', 'wp-playground-blueprint-editor')}
                            onClick={addOption}
                            disabled={isAddButtonDisabled}
                        />
                    </VStack>
                </Modal>
            )}
        </>
    );
}

export default SiteOptionsSettings;
