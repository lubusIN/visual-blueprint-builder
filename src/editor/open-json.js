import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useDispatch } from '@wordpress/data';
import { FormFileUpload, DropZone } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';

const BlueprintJsonUpload = ({ onSubmitData }) => {
    const { createNotice } = useDispatch(noticesStore);

    // Utility to convert camelCase to kebab-case
    const convertToKebabCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    // Validate steps from the JSON schema
    const validateBlueprintSteps = (steps) => {
        const validBlocks = [];
        const invalidSteps = [];

        steps.forEach((step, index) => {
            const blockType = `playground-step/${convertToKebabCase(step.step)}`;
            try {
                const block = createBlock(blockType, step || {});
                validBlocks.push(block);
            } catch (error) {
                invalidSteps.push({
                    stepIndex: index + 1,
                    stepData: step,
                    error: error.message,
                });
            }
        });

        return { validBlocks, invalidSteps };
    };

    // Process JSON file content
    const processJsonFile = (file) => {
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    handleBlueprintData(jsonData);
                }
                catch (err) {
                    createNotice('error', __('Invalid JSON file.', 'wp-playground-blueprint-editor'));
                }
            };
            reader.readAsText(file);
        } else {
            createNotice('error', __('Please upload a valid JSON file.', 'wp-playground-blueprint-editor'));
        }
    };

    // Handle JSON data processing
    const handleBlueprintData = (jsonData) => {
        if (!jsonData) {
            createNotice('error', __('Invalid blueprint schema.', 'wp-playground-blueprint-editor'));
            return;
        }

        const { steps } = jsonData;
        const { validBlocks, invalidSteps } = validateBlueprintSteps(steps);

        if (validBlocks.length > 0) {
            dispatch('core/block-editor').insertBlocks(validBlocks);
            createNotice('success', __('Blueprint imported successfully.', 'wp-playground-blueprint-editor'));
        }

        if (invalidSteps.length > 0) {
            const errorDetails = invalidSteps
                .map(({ stepIndex, stepData, error }) => `Step ${stepIndex}: ${stepData.step} (${error})`)
                .join(', ');
            createNotice('warning', __(`Some steps are invalid: ${errorDetails}.`, 'wp-playground-blueprint-editor'));
        }

        if (onSubmitData) {
            onSubmitData(jsonData);
        }
    };

    // Handle file selection from input
    const handleFileSelection = (event) => {
        const file = event.target.files[0];
        if (file) {
            processJsonFile(file);
        }
    };

    // Handle file drop
    const handleFileDrop = (files) => {
        const file = files[0];
        if (file) {
            processJsonFile(file);
        }
    };


    return (
        <FormFileUpload
            className='upload_blueprint_json'
            __next40pxDefaultSize
            accept="application/json"
            onChange={handleFileSelection}
        >
            {__('Open Blueprint', 'wp-playground-blueprint-editor')}
            <DropZone
                onFilesDrop={handleFileDrop}
                accept="application/json"
            />
        </FormFileUpload>
    );
};

export default BlueprintJsonUpload;