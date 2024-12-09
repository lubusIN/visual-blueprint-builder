import { useState } from '@wordpress/element';
import {
    Button, 
    FormFileUpload,
    __experimentalVStack as VStack,
} from '@wordpress/components';

const JsonFileUpload = () => {
    const [message, setMessage] = useState(null); 
    const [messageType, setMessageType] = useState(null); 

    // Handle File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            const JsonReader = new FileReader();
            JsonReader.onload = (e) => {
                try {
                    JSON.parse(e.target.result); 
                    setMessage('File successfully added!');
                    setMessageType('success');
                } catch (err) {
                    setMessage('Invalid JSON file.');
                    setMessageType('error');
                }
            };
            JsonReader.readAsText(file);
        } else {
            setMessage('Please upload a valid JSON file.');
            setMessageType('error');
        }
    };

    return (
        <VStack>
            <FormFileUpload accept="application/json" onChange={handleFileUpload}>
                <Button variant="secondary">Open JSON</Button>
            </FormFileUpload>
            {message && (
                <p style={{ color: messageType === 'success' ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
        </VStack>
    );
};

export default JsonFileUpload;
