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
 * Constants Settings Component
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.attributes - The block's attributes, containing `constants.
 * @param {Function} props.setAttributes - Function to update the block's attributes.
 * 
 * @returns {JSX.Element} The ConstantsSettings component.
 */
function ConstantsSettings({ attributes = {}, setAttributes, }) {
    const { constants } = attributes;
    const [isModalOpen, setModalOpen] = useState(false);
    const [constantsList, updateConstantsList] = useState(Object.entries(constants || {}));

    // Sync local state with attributes when constants updates
    useEffect(() => {
        updateConstantsList(Object.entries(constants || {}));
    }, [constants]);

    /**
     * Add new option
     */
    const addOption = () => {
        // Prevent adding duplicate empty entries
        if (constantsList.some(([key, value]) => key === '' && value === '')) {
            return;
        }
        updateConstantsList([...constantsList, ['', '']]);
    };

    /**
     * Update option
     */
    const updateOption = (index, field, fieldValue) => {
        const updatedList = constantsList.map(([key, value], i) => {
            if (i === index) {
                return field === 'key' ? [fieldValue, value] : [key, fieldValue];
            }
            return [key, value];
        });
        updateConstantsList(updatedList);
    };

    /**
     * Delete option
     */
    const deleteOption = (key) => {
        updateConstantsList(constantsList.filter((_, index) => index !== key));
    };

    const saveOptions = () => {
        const filteredOptions = constantsList.filter(([key, value]) => key.trim() !== '' && value.trim() !== '');
        setAttributes({ constants: Object.fromEntries(filteredOptions) });
        updateConstantsList(filteredOptions);
        setModalOpen(false);
    };

    // Check if the last entry has an empty key or value
    const isAddButtonDisabled = constantsList.length > 0 && (constantsList[constantsList.length - 1][0] === '' || constantsList[constantsList.length - 1][1] === '');

    return (
        <>
            {/* Trigger Button */}
            <Button icon={cog} iconSize={30} onClick={() => setModalOpen(true)} />
            {isModalOpen && (
                <Modal
                    title={__('WP Config Constants', 'wp-playground-blueprint-editor')}
                    onRequestClose={() => saveOptions()}
                    size='medium'
                >
                    <VStack spacing={4}>
                        {constantsList.map(([key, value], index) => (
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
                                    label={__('Delete Constant', 'wp-playground-blueprint-editor')}
                                    onClick={() => deleteOption(index)}
                                    style={{ width: '40px', marginTop: '24px' }}
                                />
                            </HStack>
                        ))}
                        <Button
                            icon={plus}
                            variant={'secondary'}
                            label={__('Add Constant', 'wp-playground-blueprint-editor')}
                            onClick={addOption}
                            disabled={isAddButtonDisabled}
                        />
                    </VStack>
                </Modal>
            )}
        </>
    );
}

export default ConstantsSettings;
