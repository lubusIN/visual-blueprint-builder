/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
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
 * Internal dependencies
 */
import OpenJson from './open-json';

function BlueprintGallery() {
    const { createNotice } = useDispatch(noticesStore);
    const [isModalOpen, setModalOpen] = useState(false);
    const [blueprintList, setBlueprintList] = useState(null);
    const [selectedBlueprintData, setSelectedBlueprintData] = useState(null);


    /**
     * Fetches the list of blueprints from the remote JSON file.
     */
    useEffect(() => {
        const fetchBlueprintList = async () => {
            const apiUrl = 'https://raw.githubusercontent.com/WordPress/blueprints/trunk/index.json';
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch blueprints');
                const data = await response.json();
                setBlueprintList(data);
            } catch (error) {
                createNotice('error', __('Error fetching blueprint list:',error, 'wp-playground-blueprint-editor'));
            }
        };

        fetchBlueprintList();
    }, []);

    /**
     * Fetches details for a selected blueprint.
     * @param {string} blueprintName - The name of the blueprint to fetch.
     */
    const fetchBlueprintDetails = async (blueprintName) => {
        const blueprintUrl = `https://raw.githubusercontent.com/WordPress/blueprints/trunk/${blueprintName}`;
        try {
            const response = await fetch(blueprintUrl);
            if (!response.ok) throw new Error('Failed to fetch blueprint details');
            const data = await response.json();

            // Replace 'mu-plugins' with 'plugins' in the blueprint data
            const updatedSteps = data.steps.map((step) => {
                if (step.path?.includes('mu-plugins')) {
                    return { ...step, path: step.path.replace('mu-plugins', 'plugins') };
                }
                return step;
            });

            setSelectedBlueprintData({ ...data, steps: updatedSteps });
        } catch (error) {
            createNotice('error', __('Error fetching blueprint from Gallery', 'wp-playground-blueprint-editor'));
        }
    };

    return (
        <>
            {/* Open modal button */}
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
                {__('Open Blueprint Gallery', 'text-domain')}
            </Button>

            {/* Blueprint gallery modal */}
            {isModalOpen && (
                <Modal
                    title={__('Blueprint Gallery', 'text-domain')}
                    onRequestClose={() => setModalOpen(false)}
                    shouldCloseOnClickOutside
                    shouldCloseOnEsc
                    size="large"
                >
                    {blueprintList ? (
                        <Grid columns={2} gap={5}>
                            {Object.entries(blueprintList).map(([blueprintName, blueprintDetails], index) => (
                                <Card key={index} size="small">
                                    <CardBody>
                                        <VStack>
                                            <Heading level={4}>{blueprintDetails.title}</Heading>
                                            <Text>{__('By', 'text-domain')} {blueprintDetails.author}</Text>
                                            <Text>{blueprintDetails.description}</Text>
                                        </VStack>
                                        <HStack>
                                            <Button
                                                variant="link"
                                                onClick={() => fetchBlueprintDetails(blueprintName)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                {__('Import Blueprint', 'text-domain')}
                                            </Button>
                                        </HStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </Grid>
                    ) : (
                        <Text>{__('Loading blueprints...', 'text-domain')}</Text>
                    )}

                    {/* Pass selected blueprint data to child component */}
                    {selectedBlueprintData && (
                        <OpenJson
                            galleryData={selectedBlueprintData}
                            onSubmitData={(data) => console.log('Validated Blueprint:', data)}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}

export default BlueprintGallery;