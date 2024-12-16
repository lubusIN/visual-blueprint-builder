import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch,  useDispatch } from '@wordpress/data';
import { Button, FormFileUpload, __experimentalVStack as VStack, DropZone } from '@wordpress/components';
import Ajv from 'ajv';
import { store as noticesStore } from '@wordpress/notices';

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
    const { createNotice } = useDispatch(noticesStore);

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

                        if (valid.length > 0) {
                            dispatch('core/block-editor').insertBlocks(valid);
                            createNotice('success', __('Blueprint blocks inserted successfully.'));
                        }

                        if (invalid.length > 0) {
                            const invalidStepDetails = invalid
                                .map(({ stepIndex, stepData, error }) => `Step ${stepIndex}: ${stepData.step}${error}`)
                                .join(', ');
                            createNotice(
                                'warning',
                                __(`Some steps are invalid: ${invalidStepDetails}.`)
                            );
                        }
                        const dataToPass = {
                            landingPage,
                            preferredVersions,
                            phpExtensionBundles,
                            features,
                        };
                        if (onSubmitData) {
                            onSubmitData(dataToPass);
                        }
                    } else {
                        createNotice('error', __('Invalid blueprint schema.'));
                    }
                } catch (err) {
                    createNotice('error', __('Invalid JSON file.'));
                }
            };
            reader.readAsText(file);
        } else {
            createNotice('error', __('Please upload a valid JSON file.'));
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
        <VStack alignment="stretch" >
            <FormFileUpload
                __next50pxDefaultSize
                accept="application/json"
                onChange={handleFileSelect}
                style={{ width: '100%' }}
            >
                <Button
                    __next50pxDefaultSize
                    style={{
                        position: 'relative',
                        border: '1px solid #CCCCCC',
                        minWidth: '232px',
                        minHeight:'50px',
                        justifyContent: 'center'
                    }}
                >
                    Open JSON Blueprint
                    <DropZone
                        onFilesDrop={handleDrop}
                        accept="application/json"
                        style={{ position: 'absolute', minHeight:'50px' }}
                    />
                </Button>
            </FormFileUpload>

        </VStack>
    );
};

export default JsonFileUpload;
