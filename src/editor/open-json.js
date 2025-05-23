import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { FormFileUpload, DropZone } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { handleBlueprintData, useBlueprintData } from './utils'

const OpenJson = ({ label = 'Open', icon = null, handleClose }) => {
    const { createNotice } = useDispatch(noticesStore);
    const { updateBlueprintConfig } = useBlueprintData();

    // Process JSON file content
    const processJsonFile = (file) => {
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    handleBlueprintData(jsonData, createNotice, updateBlueprintConfig);
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

    // Handle file selection from input
    const handleFileSelection = (event) => {
        const file = event.target.files[0];
        if (file) {
            processJsonFile(file);
            handleClose();
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
            icon={icon}
            style={{
                height: '100%',
                flexDirection: 'column',
                padding:'13px'
            }}
            >
            {__(label, 'wp-playground-blueprint-editor')}

            <DropZone
                onFilesDrop={handleFileDrop}
                accept="application/json"
            />
        </FormFileUpload>
    );
};

export default OpenJson;