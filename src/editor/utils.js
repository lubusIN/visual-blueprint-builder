/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from "@wordpress/blocks";
import { useCallback } from '@wordpress/element';
import { dispatch, useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { PLAYGROUND_BLUEPRINT_SCHEMA_URL, PLAYGROUND_BLUEPRINT_SCHEMA_URL_FETCH } from './constant';

/**
 * External dependencies
 */
import Ajv from 'ajv';

/**
 * Utility function to convert a camelCase string to kebab-case with special handling for "WordPress".
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
 * Updates deprecated fields in blueprint steps before validation.
 * Replaces `pluginZipFile` with `pluginData` and `themeZipFile` with `themeData`.
 */
const updateDeprecatedFields = (jsonData) => {
    if (!jsonData || !jsonData.steps) {
        return jsonData;
    }

    const updatedSteps = jsonData.steps.map((step) => {
        if (step.step === 'installPlugin' && step.pluginZipFile) {
            return {
                ...step,
                pluginData: step.pluginZipFile,
                pluginZipFile: undefined, // Remove deprecated field
            };
        }

        if (step.step === 'installTheme' && step.themeZipFile) {
            return {
                ...step,
                themeData: step.themeZipFile,
                themeZipFile: undefined, // Remove deprecated field
            };
        }

        return step;
    });

    return {
        ...jsonData,
        steps: updatedSteps,
    };
};

/**
 * Validates a JSON blueprint against a schema.
 * Whether the data is valid.
 */
const validateAgainstSchema = async (data, createNotice) => {
    try {
        const response = await fetch(PLAYGROUND_BLUEPRINT_SCHEMA_URL_FETCH);
        if (!response.ok) {
            throw new Error('Failed to fetch schema.');
        }
        const schema = await response.json();

        const ajv = new Ajv({
            allErrors: true, // Collect all errors instead of stopping at the first
            strict: false,   // Disable strict mode
            allowMatchingProperties: true, // Allow properties to overlap (optional)
        });

        const validate = ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
            const errors = validate.errors
                .map((err) => `${err.instancePath} ${err.message}`)
                .join(', ');
            createNotice('error', `${__('Schema validation failed:')} ${errors}`, {
                id: 'wp-playground-blueprint-editor',
            });
            return false;
        }

        return true;
    } catch (error) {
        createNotice('error', `${__('Error validating against schema:')} ${error.message}`, {
            id: 'wp-playground-blueprint-editor',
        });
        return false;
    }
};

/**
 * Processes JSON blueprint data, validates it, and inserts valid blocks into the WordPress editor.
 * jsonData - The parsed JSON data from the openJson and Gallery.
 * createNotice - Function to create notices in the WordPress admin.
 *  onSubmitData - Optional callback for additional data handling.
 * @param {Function} updateBlueprintConfig - Function to update blueprint config in post meta.
 */

export const handleBlueprintData = async (jsonData, createNotice, updateBlueprintConfig) => {
    if (!jsonData) {
        createNotice('error', __('Invalid blueprint schema.', 'wp-playground-blueprint-editor'));
        return;
    }

    try {
        // Update deprecated fields in steps
        const updatedData = updateDeprecatedFields(jsonData);

        // Validate updated JSON against schema
        const isValid = await validateAgainstSchema(updatedData, createNotice);
        if (!isValid) {
            return;
        }

        const { meta, ...filteredData } = updatedData; // Exclude metadata
        const { steps } = filteredData;

        const { validBlocks, invalidSteps } = validateBlueprintSteps(steps);

        if (validBlocks.length > 0) {
            dispatch('core/block-editor').insertBlocks(
                validBlocks,
                undefined,
                undefined,
                false,
                null
            );
            createNotice(
                'success',
                __('Blueprint imported successfully.', 'wp-playground-blueprint-editor'),
                {
                    type: 'snackbar'
                }
            );
        }

        if (invalidSteps.length > 0) {
            const errorDetails = invalidSteps
                .map(({ stepIndex, stepData, error }) => `Step ${stepIndex}: ${stepData.step} (${error})`)
                .join(', ');
            createNotice('warning', __(`Some steps are invalid: ${errorDetails}.`, 'wp-playground-blueprint-editor'));
        }
        handleJsonDataSubmit(filteredData, updateBlueprintConfig, createNotice);

    } catch (err) { return err; }
};


/**
 * React hook to retrieve and manage the blueprint configuration from post meta.
 * @returns {{
 *   schema: Object,
 *   prepareSchema: Function,
 *   updateBlueprintConfig: Function,
 *   blueprint_config: Object
 * }}
 */
export const useBlueprintData = () => {
    const { editPost } = useDispatch('core/editor');
    const blocks = useSelect((select) => select('core/block-editor').getBlocks(), []);
    const blueprint_config = useSelect((select) => {
        return select('core/editor').getEditedPostAttribute('meta')['_blueprint_config'] || {};
    });

    const schema = {
        $schema: PLAYGROUND_BLUEPRINT_SCHEMA_URL,
        landingPage: blueprint_config.landing_page,
        preferredVersions: {
            php: blueprint_config.php_version,
            wp: blueprint_config.wp_version,
        },
        features: blueprint_config.networking ? { networking: true } : {},
        login: blueprint_config.login,
        siteOptions: blueprint_config.siteOptions,
        extraLibraries: blueprint_config.extra_libraries,
        plugins: blueprint_config.plugins,
        steps: [],
    };

    /**
     * Prepares the schema by extracting attributes from blocks.
     * Blocks' metadata is excluded to keep the schema clean.
     */

    const prepareSchema = useCallback(() => {
        const blockAttributes = blocks.map((block) => {
            const { metadata, ...rest } = block.attributes;
            return rest;
        });

        schema.steps = blockAttributes;

        // Add constants as a defineWpConfigConsts step if they exist
        if (blueprint_config.constants && Object.keys(blueprint_config.constants).length > 0) {
            schema.steps.push({
                step: 'defineWpConfigConsts',
                consts: blueprint_config.constants
            });
        }

        const cleanedSchema = {
            ...schema,
            login: blueprint_config.login,
            siteOptions: blueprint_config.siteOptions && Object.keys(blueprint_config.siteOptions).length > 0
                ? blueprint_config.siteOptions : undefined,
            extraLibraries: blueprint_config.extra_libraries && ['wp-cli'],
            plugins: blueprint_config.plugins && Object.keys(blueprint_config.plugins).length > 0
                ? blueprint_config.plugins : undefined
        };

        return JSON.stringify(cleanedSchema, null, 2);
    }, [blocks, schema, blueprint_config]);

    /**
     * Updates the blueprint configuration stored in the post meta.
     * @param {Object} updatedValues - Partial blueprint configuration to update.
     */
    const updateBlueprintConfig = (updatedValues) => {
        editPost({ meta: { _blueprint_config: { ...blueprint_config, ...updatedValues } } });
    };

    return {
        schema,
        prepareSchema,
        updateBlueprintConfig,
        blueprint_config,
    };
};

/**
 * Updates the post meta with data from parsed JSON and triggers success/failure notices.
 *
 * @param {Object} data - Parsed JSON data from blueprint file.
 * @param {Function} updateBlueprintConfig - Function to save new config.
 * @param {Function} createNotice - Function to show admin notices.
 */

const handleJsonDataSubmit = (data, updateBlueprintConfig, createNotice) => {
    if (!data) {
        createNotice('error', __('Failed to update Blueprint configuration.', 'wp-playground-blueprint-editor'));
        return;
    }

    updateBlueprintConfig({
        landing_page: data.landingPage,
        php_version: data.preferredVersions.php,
        wp_version: data.preferredVersions.wp,
        networking: data.features.networking || false,
        login: data.login || false,
        siteOptions: data.siteOptions || undefined,
        extraLibraries: data.extraLibraries || false,
        plugins: data.plugins || undefined,
    });
};

/**
 * Remove empty steps from a prepared schema JSON string.
 */
export const sanitizePreparedSchemaString = (schemaStr) => {
    try {
        const obj = JSON.parse(schemaStr);
        if (!obj?.steps || (Array.isArray(obj.steps) && obj.steps.length === 0)) {
            delete obj.steps;
        }
        return JSON.stringify(obj);
    } catch (e) {
        return schemaStr;
    }
}

/**
 * Utility functions for managing key-value pairs.
 */

/**
 * Add a new key-value pair to the list if no empty pairs exist.
 * 
 * @param {Array} list - Array of [key, value] pairs
 * @param {Function} updateFunction - Function to update the list state
 * @return {void}
 */
export const addKeyValuePair = (list, updateFunction) => {
    // Check if there's already an empty pair
    if (list.some(([key, value]) => key === '' && value === '')) {
        return;
    }
    // Add new empty pair
    updateFunction([...list, ['', '']]);
};

/**
 * Update a specific key-value pair in the list.
 * 
 * @param {Array} list - Array of [key, value] pairs
 * @param {Function} updateFunction - Function to update the list state
 * @param {number} index - Index of the pair to update
 * @param {string} field - Field to update ('key' or 'value')
 * @param {string} fieldValue - New value for the field
 * @return {void}
 */
export const updateKeyValuePair = (list, updateFunction, index, field, fieldValue) => {
    const updatedList = list.map(([key, value], i) => {
        if (i === index) {
            return field === 'key' ? [fieldValue, value] : [key, fieldValue];
        }
        return [key, value];
    });
    updateFunction(updatedList);
};

/**
 * Remove a key-value pair from the list by index.
 * 
 * @param {Array} list - Array of [key, value] pairs
 * @param {Function} updateFunction - Function to update the list state
 * @param {number} index - Index of the pair to remove
 * @return {void}
 */
export const removeKeyValuePair = (list, updateFunction, index) => {
    updateFunction(list.filter((_, i) => i !== index));
};

/**
 * Filter out empty key-value pairs (where either key or value is empty/whitespace).
 * 
 * @param {Array} list - Array of [key, value] pairs
 * @param {Function} updateFunction - Function to update the list state
 * @return {void}
 */
export const filterEmptyKeyValuePairs = (list, updateFunction) => {
    const filtered = list.filter(([key, value]) => {
        const keyStr = String(key || '').trim();
        const valueStr = String(value || '').trim();
        return keyStr !== '' && valueStr !== '';
    });
    updateFunction(filtered);
};

/**
 * Check if the add button should be disabled.
 * Disabled when the last entry has an empty key or value.
 * 
 * @param {Array} list - Array of [key, value] pairs
 * @return {boolean} Whether the add button should be disabled
 */
export const isAddButtonDisabled = (list) => {
    return list.length > 0 &&
        (list[list.length - 1][0] === '' || list[list.length - 1][1] === '');
};

/**
 * Convert key-value pairs array to object and filter out empty pairs.
 * 
 * @param {Array} list - Array of [key, value] pairs
 * @return {Object} Object with filtered key-value pairs
 */
export const keyValuePairsToObject = (list) => {
    if (!Array.isArray(list)) {
        return {};
    }

    const filtered = list.filter((item) => {
        // Ensure item is an array with at least 2 elements
        if (!Array.isArray(item) || item.length < 2) return false;

        const [key, value] = item;

        // Handle null/undefined values
        if (key == null || value == null) return false;

        try {
            // Convert to string safely and trim
            const keyStr = String(key).trim();
            const valueStr = String(value).trim();
            return keyStr !== '' && valueStr !== '';
        } catch (error) {
            // If String conversion fails for some reason, skip this item
            console.warn('Error converting key-value pair to string:', error);
            return false;
        }
    });

    return Object.fromEntries(filtered);
};