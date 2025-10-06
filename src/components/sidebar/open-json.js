/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { FormFileUpload, DropZone, Spinner } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { handleBlueprintData, useBlueprintData } from '../../editor/utils'

/**
 * Renders an OpenJson component.
 *
 * The component renders a form file upload component that accepts JSON files.
 * When a valid JSON file is uploaded, the component processes the file content
 * and updates the blueprint config in the WordPress editor.
 *
 * The component also renders a spinner when the JSON file is being processed.
 *
 * @param {Object} props - Component props.
 * @param {ReactElement} [props.icon=null] - The icon of the component.
 * @param {Function} [props.handleClose] - A function to be called when the component is closed.
 */
const OpenJson = ({ icon = null, handleClose }) => {
    const { createNotice } = useDispatch(noticesStore);
    const { updateBlueprintConfig } = useBlueprintData();
    const [isUploadingJson, setIsUploadingJson] = useState(false);

    // Process JSON file content
    const processJsonFile = async (file) => {
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    setIsUploadingJson(true); // Show spinner
                    await handleBlueprintData(jsonData, createNotice, updateBlueprintConfig);
                    if (handleClose) handleClose();
                }
                catch (err) {
                    createNotice('error', __('Invalid JSON file.', 'wp-playground-blueprint-editor'));
                }
                finally {
                    setIsUploadingJson(false); // Hide spinner
                }
            };
            reader.readAsText(file);
        } else {
            createNotice('error', __('Please upload a valid JSON file.', 'wp-playground-blueprint-editor'));
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
            accept="application/json"
            onChange={handleFileSelection}
            icon={null}
        >
            {!isUploadingJson && (<>
                {icon && (
                    <span style={{ width: 24, height: 24, display: 'inline-block' }}>
                        {icon}
                    </span>
                )}
                {__('Import JSON', 'wp-playground-blueprint-editor')}
            </>)}
            {isUploadingJson && (<Spinner style={{ margin: 0 }} />)}
            <DropZone
                onFilesDrop={handleFileDrop}
                accept="application/json"
            />
        </FormFileUpload>
    );
};

export default OpenJson;