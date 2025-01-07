/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    Button,
    Modal,
    Card,
    CardBody,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    __experimentalGrid as Grid,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { dataBlueprint } from './BlueprintGalleryData';
import BlueprintJsonUpload from './Open-Json';


// BlueprintPicker 
function BlueprintPicker() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [sourceData, setSourceData] = useState(null);

    // Function to open and close the modal
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    // Handle the click to open the source JSON URL
    const handleSourceClick = async (blueprintName) => {
        const sourceUrl = `https://raw.githubusercontent.com/wordpress/blueprints/trunk/${blueprintName}`;
        try {
            const response = await fetch(sourceUrl);
            const data = await response.json();
            // Modify the path dynamically to replace 'mu-plugins' with 'plugins'
            const modifiedData = data.steps.map(step => {
                if (step.path && step.path.includes('mu-plugins')) {
                    step.path = step.path.replace('mu-plugins', 'plugins');
                }
                return step;
            });
            setSourceData({ ...data, steps: modifiedData });
            console.log('Fetched blueprint source data:', data);
        } catch {
            console.error('Failed to fetch blueprint source data');
        }
    };

    return (
        <>
            {/* Button to open the modal */}
            <Button
                variant="secondary"
                onClick={openModal}>
                Open Blueprint Gallery
            </Button>

            {/* Modal for displaying blueprints */}
            {isModalOpen && (
                <Modal
                    title="Blueprints"
                    onRequestClose={closeModal}
                    shouldCloseOnClickOutside={true}
                    size="large"
                >
                    <Grid columns={2} gap={5}>
                        {/* Display the blueprints in a grid of cards */}
                        {Object.entries(dataBlueprint[0]).map(([blueprintObjectName, blueprintData], index) => (
                            <Card key={index} size="small">
                                <CardBody>
                                    <VStack>
                                        <Heading level={4}>{blueprintData.title}</Heading>
                                        <Text>  By {<a>{blueprintData.author}</a>}</Text>
                                        <Text>{blueprintData.description}</Text>
                                    </VStack>
                                    <HStack>
                                        {/* Button to get json data stored in state for now */}
                                        <Button
                                            variant="link"
                                            onClick={() => handleSourceClick(blueprintObjectName)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Import Blueprint
                                        </Button>
                                    </HStack>
                                </CardBody>
                            </Card>
                        ))}
                    </Grid>
                     {/* Pass the sourceData to BlueprintJsonUpload */}
                     {sourceData && (
                        <BlueprintJsonUpload
                            sourceData={sourceData}
                            onSubmitData={(data) => console.log('Validated Blueprint:', data)}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}

export default BlueprintPicker;
