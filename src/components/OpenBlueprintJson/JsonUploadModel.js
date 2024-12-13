import { useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import { Button, FormFileUpload, __experimentalVStack as VStack, __experimentalHStack as HStack, DropZone } from '@wordpress/components';
import Ajv from 'ajv';

const ajv = new Ajv();

const blueprintSchema = {
    type: 'object',
    properties: {
        landingPage: { type: 'string' },
        preferredVersions: {
            type: 'object',
            properties: {
                php: { type: 'string' },
                wp: { type: 'string' },
            },
        },
        phpExtensionBundles: {
            type: 'array',
            items: { type: 'string' },
        },
        features: {
            type: 'object',
            properties: {
                networking: { type: 'boolean' },
            },
        },
        steps: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    step: { type: 'string' },
                    attributes: { type: 'object' },
                },
                required: ['step'],
            },
        },
    },
    required: ['landingPage', 'preferredVersions', 'phpExtensionBundles', 'features', 'steps'],
};

const JsonFileUpload = ({ onSubmitData }) => {
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [invalidBlocks, setInvalidBlocks] = useState([]);

    const camelToKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const validateSteps = (steps) => {
        const valid = [];
        const invalid = [];

        steps.forEach((step, index) => {
            const blockType = `playground-step/${camelToKebab(step.step)}`;
            try {
                const block = createBlock(blockType, step.attributes || {});
                valid.push(block);
            } catch (err) {
                invalid.push({
                    stepIndex: index + 1,
                    stepData: step,
                    error: err.message,
                });
            }
        });

        return { valid, invalid };
    };

    const processFile = (file) => {
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    const validate = ajv.compile(blueprintSchema);

                    if (validate(jsonData)) {
                        const { steps, landingPage, preferredVersions, phpExtensionBundles, features } = jsonData;
                        const { valid, invalid } = validateSteps(steps);
                        setInvalidBlocks(invalid);

                        if (valid.length > 0) {
                            dispatch('core/block-editor').insertBlocks(valid);
                            setMessage('Valid blocks inserted into the editor.');
                            setMessageType('success');
                        }

                        if (invalid.length > 0) {
                            setMessage('Some steps are invalid. Check details below.');
                            setMessageType('warning');
                        }
                        const dataToPass = {
                            landingPage,
                            preferredVersions,
                            phpExtensionBundles,
                            features,
                        };
                        // Pass the data to the sidebar via the onSubmitData 
                        if (onSubmitData) {
                            onSubmitData(dataToPass);
                        }
                    } else {
                        setMessage('Invalid blueprint schema.');
                        setMessageType('error');
                    }
                } catch (err) {
                    setMessage('Invalid JSON file.');
                    setMessageType('error');
                }
            };
            reader.readAsText(file);
        } else {
            setMessage('Please upload a valid JSON file.');
            setMessageType('error');
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDrop = (files) => {
        const file = files[0];
        if (file) {
            processFile(file);
        }
    };

    return (
        <VStack>
            <HStack>
                <DropZone onFilesDrop={handleDrop} accept="application/json" />
                <FormFileUpload
                    __next40pxDefaultSize
                    accept="application/json"
                    onChange={handleFileSelect}>
                    <Button
                        __next40pxDefaultSize
                        variant="secondary"
                    >Open Json Blueprint / Dropfile</Button>
                </FormFileUpload>
            </HStack>

            {message && (
                <div style={{ marginTop: '10px', color: messageType === 'success' ? 'green' : messageType === 'warning' ? 'orange' : 'red' }}>
                    {message}
                </div>
            )}

            {invalidBlocks.length > 0 && (
                <div style={{ marginTop: '20px', color: 'orange' }}>
                    <h4>Invalid Steps:</h4>
                    <ul>
                        {invalidBlocks.map((block, index) => (
                            <li key={index}>
                                <strong>Step {block.stepIndex}:</strong> {block.error}
                                <pre>{JSON.stringify(block.stepData, null, 2)}</pre>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </VStack>
    );
};

export default JsonFileUpload;
