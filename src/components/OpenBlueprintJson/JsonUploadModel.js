import { useState } from '@wordpress/element';
import {
    Modal, 
    Button, 
    FormFileUpload,
    __experimentalHeading as Heading,
    __experimentalVStack as VStack,
    __experimentalText as Text,
} from '@wordpress/components';

const JsonUploadModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jsonContent, setJsonContent] = useState(null);
    const [error, setError] = useState(null);

    // Handle File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            const Jsonreader = new FileReader();
            Jsonreader.onload = (e) => {
                try {
                    const content = JSON.parse(e.target.result);
                    setJsonContent(content);
                    setError(null); 
                } catch (err) {
                    setError('Invalid JSON file');
                    setJsonContent(null);
                }
            };
            Jsonreader.readAsText(file);
        } else {
            setError('Please upload a valid JSON file.');
            setJsonContent(null);
        }
    };

    // Render JSON in a readable format
    const renderJsonContent = (json) => {
        return (
            <VStack >
                <Heading>Parsed JSON Content:</Heading>
                <pre>{JSON.stringify(json, null, 2)}</pre>
            </VStack>
        );
    };

    return (
        <>
            <Button variant='secondary' style={{ justifyContent: "center" }} onClick={() => setIsModalOpen(true)} text='Open Json' />
            {isModalOpen && (
                <Modal
                    title="Upload JSON File"
                    onRequestClose={() => setIsModalOpen(false)}
                    size='large'
                    style={{ height: '70%' }}
                >
                    <p>Select a JSON file from your computer:</p>
                    <FormFileUpload
                        __next40pxDefaultSize
                        accept="application/json"
                        onChange={handleFileUpload}
                    >
                       <Button variant='tertiary' text='Select file'/>
                    </FormFileUpload>
                    {(error || jsonContent) && (
                        <VStack>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {jsonContent && renderJsonContent(jsonContent)}
                        </VStack>
                    )}
                </Modal>
            )}
        </>
    );
};

export default JsonUploadModal;