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
    __experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { handleBlueprintData } from './utils';

function Gallery({ onSubmitData }) {
    const { createNotice } = useDispatch(noticesStore);
    const [isModalOpen, setModalOpen] = useState(false);
    const [blueprintList, setBlueprintList] = useState(null);


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
                createNotice('error', __('Error fetching blueprint list:', error, 'wp-playground-blueprint-editor'));
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
            if (!response.ok) throw new Error(`Failed to fetch blueprint details: ${response.statusText}`);
            const data = await response.json();

            // Replace 'mu-plugins' with 'plugins' in the blueprint data
            const updatedSteps = data.steps.map((step) => {
                if (step.path?.includes('mu-plugins')) {
                    return { ...step, path: step.path.replace('mu-plugins', 'plugins') };
                }
                return step;
            });
            handleBlueprintData({ ...data, steps: updatedSteps }, createNotice, onSubmitData);
        } catch (error) {
            createNotice('error', __('Error fetching blueprint from Gallery', 'wp-playground-blueprint-editor') + `: ${error.message}`);
        }
    };

    return (
        <>
            {/* Open modal button */}
            <Button
                className='blueprint_gallery_json'
                onClick={() => setModalOpen(true)}>
                {__('Gallery', 'wp-playground-blueprint-editor')}
            </Button>

            {/* Blueprint gallery modal */}
            {isModalOpen && (
                <Modal
                    title={__('Blueprint Gallery', 'wp-playground-blueprint-editor')}
                    onRequestClose={() => setModalOpen(false)}
                    shouldCloseOnClickOutside
                    shouldCloseOnEsc
                    size="large"
                >
                    {blueprintList ? (
                        <Grid columns={2} gap={6}>
                            {Object.entries(blueprintList).map(([blueprintName, blueprintDetails], index) => (
                                <Card
                                    key={index}
                                    elevation={3}
                                >
                                    <CardBody style={{ height: '100%', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                                        {/* Blueprint Info */}
                                        <VStack align='start' spacing={4} >
                                            <Heading level={4}>
                                                {blueprintDetails.title}
                                            </Heading>
                                            <Text>
                                                {__('By', 'wp-playground-blueprint-editor')} {blueprintDetails.author}
                                            </Text>
                                            <Text
                                                lineHeight={'1.5em'}
                                                size={15}   
                                                color='#777'
                                            >
                                                {blueprintDetails.description}
                                            </Text>
                                            </VStack>
                                      

                                        {/* Action Button */}
                                        <Button
                                            variant="secondary"
                                            style={{
                                                borderRadius: '4px',
                                                alignSelf: 'flex-end',
                                                
                                            }}
                                            onClick={() => fetchBlueprintDetails(blueprintName)}
                                        >
                                            {__('Import', 'wp-playground-blueprint-editor')}
                                        </Button>
                                        
                                    </CardBody>
                                </Card>
                            ))}
                        </Grid>
                    ) : (
                        <Text>{__('Loading blueprints...', 'wp-playground-blueprint-editor')}</Text>
                    )}
                </Modal>
            )}
        </>
    );
}

export default Gallery;