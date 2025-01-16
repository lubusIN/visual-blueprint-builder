import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useDispatch } from '@wordpress/data';
import { FormFileUpload, DropZone } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { useEffect } from '@wordpress/element';


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
};

const BlueprintJsonUpload = ({ onSubmitData, sourceData }) => {
    const { createNotice } = useDispatch(noticesStore);

    const camelToKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const validateSteps = (steps) => {
        const valid = [];
        const invalid = [];

        steps.forEach((step, index) => {
            const blockType = `playground-step/${camelToKebab(step.step)}`;
            try {
                const block = createBlock(blockType, step || {});
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

    const processJsonData = (jsonData) => {
        const validate = ajv.compile(blueprintSchema);

        if (validate(jsonData)) {
            const { steps } = jsonData;
            const { valid, invalid } = validateSteps(steps);

            if (valid.length > 0) {
                dispatch('core/block-editor').insertBlocks(valid);
                createNotice('success', __('Blueprint blocks inserted successfully.'));
            }

            if (invalid.length > 0) {
                const invalidStepDetails = invalid
                    .map(({ stepIndex, stepData, error }) => `Step ${stepIndex}: ${stepData.step} (${error})`)
                    .join(', ');
                createNotice(
                    'warning',
                    __(`Some steps are invalid: ${invalidStepDetails}.`)
                );
            }
            if (onSubmitData) {
                onSubmitData(jsonData);
            }
        } else {
            createNotice('error', __('Invalid blueprint schema.'));
        }
    };

    const processFile = (file) => {
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    processJsonData(jsonData);
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

    // Only process sourceData if it's not already processed
    useEffect(() => {
        if (sourceData) {
            processJsonData(sourceData);
        }
    }, [sourceData]); // Runs when sourceData changes

    return (
        <div>
            <FormFileUpload
                className='upload_blueprint_json'
                __next40pxDefaultSize
                accept="application/json"
                onChange={handleFileSelect}
            >
                Open JSON Blueprint
            </FormFileUpload>
            <DropZone onFilesDrop={handleDrop} accept="application/json" />
        </div>
    );
};

export default BlueprintJsonUpload;
