import { __ } from '@wordpress/i18n';
import {  useDispatch } from '@wordpress/data';
import { FormFileUpload, DropZone } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import {handleBlueprintData} from './utils'

const OpenJson = ({ onSubmitData }) => {
    const { createNotice } = useDispatch(noticesStore);

    // Process JSON file content
    const processJsonFile = (file) => {
        if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    handleBlueprintData(jsonData , createNotice, onSubmitData); 
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
            {__('Open', 'wp-playground-blueprint-editor')}
            <DropZone
                onFilesDrop={handleFileDrop}
                accept="application/json"
            />
        </FormFileUpload>
    );
};

export default OpenJson;