import { __ } from '@wordpress/i18n';
import { createBlock } from "@wordpress/blocks";
import { dispatch } from '@wordpress/data';
/**
 * Utility function to convert a camelCase string to kebab-case with special handling for "WordPress".
 *
 */
export const convertToKebabCase = (str) => {
    return str
        .replace(/WordPress/g, 'Wordpress') // Temporarily normalize "WordPress" casing
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
        .replace(/Wordpress/g, 'wordpress') // Convert "Wordpress" back to "wordpress"
        .toLowerCase(); // Convert the entire string to lowercase
};

/**
 * Validates steps from a JSON schema and creates valid WordPress blocks.
 *
 */
export const validateBlueprintSteps = (steps) => {
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

/**
 * Processes JSON blueprint data, validates it, and inserts valid blocks into the WordPress editor.
 *
 * jsonData - The parsed JSON data from the openJson and Gallery.
 * createNotice - Function to create notices in the WordPress admin.
 *  onSubmitData - Optional callback for additional data handling.
 */
export const handleBlueprintData = (jsonData, createNotice, onSubmitData) => {
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

