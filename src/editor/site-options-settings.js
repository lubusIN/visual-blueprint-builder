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


function SiteOptionsSettings({ attributes = {}, setAttributes, }) {
    const { siteOptions } = attributes;
    const [isModalOpen, setModalOpen] = useState(false);
    const [optionList, updateOptionList] = useState(Object.entries(siteOptions|| {}));
    const [optionName, setOptionName] = useState('');
    const [optionValue, setOptionValue] = useState('');


    // Sync local state with attributes when siteOptions updates
    useEffect(() => {
        updateOptionList(Object.entries(siteOptions || {}));
    }, [siteOptions]);
    const addOption = () => {
        if (optionName && optionValue) {       
            updateOptionList([...optionList, [optionName, optionValue]]);
            setOptionName('');
            setOptionValue('');
        }
    };

    const updateOption = (index, field, fieldValue) => {
        const updatedList = optionList.map(([key, value], i) => {
            if (i === index) {
                if ('key' === field) {
                    return [fieldValue, value]
                }

                if ('value' === field) {
                    return [key, fieldValue]
                }
            } else {
                return [key, value];
            }
        });
        updateOptionList(updatedList);
    };

    const removeOption = () => {
        updateOptionList(optionList.filter((option, index) => index !== index));
    };

    const saveOptions = () => {
        setAttributes({ siteOptions: Object.fromEntries(optionList) });
        setModalOpen(false);
    };

    return (
        <div>
            {/* Trigger Button */}
            <Button icon={cog} iconSize={30} onClick={()=> setModalOpen(true)}/>
            {/* Modal */}
            {isModalOpen && (
                <Modal
                    title={__('Site Options', 'wp-playground-blueprint-editor')}
                    onRequestClose={() =>{saveOptions()}}
                >
                    <VStack spacing={4}>
                        {/* Add New Option */}
                        <HStack justify='left' alignment='bottom'>
                            <InputControl
                                label={__('Name', 'wp-playground-blueprint-editor')}
                                value={optionName}
                                onChange={(value) => setOptionName(value)}
                            />
                            <InputControl
                                label={__('Value', 'wp-playground-blueprint-editor')}
                                value={optionValue}
                                onChange={(value) => setOptionValue(value)}
                            />
                            <Button
                                icon={plus}
                                label={__('Add Config', 'wp-playground-blueprint-editor')}
                                onClick={addOption}
                            />
                        </HStack>

                        {/* Existing Options */}
                        {optionList.map(([key, value], index) => (
                            <HStack key={index} justify='left' alignment='bottom'>
                                <InputControl
                                    label={__('Name', 'wp-playground-blueprint-editor')}
                                    value={key}
                                    onChange={(value) => updateOption(index, 'key', value)}
                                />
                                <InputControl
                                    label={__('Value', 'wp-playground-blueprint-editor')}
                                    value={value}
                                    onChange={(value) => updateOption(index, 'value', value)}
                                />
                                <Button
                                    isDestructive
                                    icon={trash}
                                    label={__('Delete Config', 'wp-playground-blueprint-editor')}
                                    onClick={() => removeOption(index)}
                                />
                            </HStack>
                        ))}
                    </VStack>
                </Modal>
            )}
        </div>
    );
}

export default SiteOptionsSettings;
