/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from "@wordpress/blocks";
import { dispatch, useSelect, useDispatch } from '@wordpress/data';
import { PLAYGROUND_BLUEPRINT_SCHEMA_URL } from './constant';
import { useCallback } from '@wordpress/element';

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
        const response = await fetch(PLAYGROUND_BLUEPRINT_SCHEMA_URL);
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
            dispatch('core/block-editor').insertBlocks(validBlocks);
            createNotice('success', __('Blueprint imported successfully.', 'wp-playground-blueprint-editor'));
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
        phpExtensionBundles: [blueprint_config.php_extension_bundles],
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

        const cleanedSchema = {
            ...schema,
            login: blueprint_config.login || undefined,
            siteOptions: blueprint_config.siteOptions && Object.keys(blueprint_config.siteOptions).length > 0
                ? blueprint_config.siteOptions : undefined,
            extraLibraries: blueprint_config.extra_libraries && ['wp-cli'] || undefined,
            plugins: blueprint_config.plugins && Object.keys(blueprint_config.plugins).length > 0
                ? blueprint_config.plugins : undefined,
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
        php_extension_bundles: data.phpExtensionBundles,
        networking: data.features.networking || false,
        login: data.login || false,
        siteOptions: data.siteOptions || undefined,
        extra_libraries: data.extraLibraries || undefined,
        plugins: data.plugins || undefined,
    });
    createNotice('success', __('Blueprint configuration updated successfully!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
};