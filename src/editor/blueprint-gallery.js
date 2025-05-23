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
import { handleBlueprintData, useBlueprintData } from './utils';

function Gallery({ label = 'Gallery', icon = null, handleClose }) {
    const { updateBlueprintConfig } = useBlueprintData();
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
     * defaultValues - Default values are used to ensure that the blueprint data has all the required properties.
     */
    const defaultValues = {
        preferredVersions: {
            php: 'latest',
            wp: 'nightly',
        },
        features: {
            networking: true,
        },
        steps: []
    };

    const fetchBlueprintDetails = async (blueprintName) => {
        const blueprintUrl = `https://raw.githubusercontent.com/WordPress/blueprints/trunk/${blueprintName}`;
        try {
            const response = await fetch(blueprintUrl);
            if (!response.ok) throw new Error(`Failed to fetch blueprint details: ${response.statusText}`);
            const data = await response.json();

            // Ensure default values for required properties
            const validatedData = {
                preferredVersions: data.preferredVersions || defaultValues.preferredVersions,
                features: data.features || defaultValues.features,
                steps: data.steps || defaultValues.steps,
                ...data, // Merge in other properties from the fetched data
            };

            // Merge the updated steps and other data with default values
            const mergedData = {
                ...defaultValues,
                ...validatedData,
            };

            // Pass the processed data to the handler
            handleBlueprintData(mergedData, createNotice, updateBlueprintConfig);
        } catch (error) {
            createNotice('error', __('Error fetching blueprint from Gallery', 'wp-playground-blueprint-editor') + `: ${error.message}`);
        }
    };

    return (
        <>
            {/* Open modal button */}
            <Button
                className='blueprint_gallery_json'
                onClick={() => setModalOpen(true)}
                icon={icon}
                style={{
                    height: '100%',
                    flexDirection: 'column',
                    padding: '13px'
                }}
            >
                {__(label, 'wp-playground-blueprint-editor')}
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
                                                style={{wordBreak: 'break-word'}}
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
                                            onClick={() => { fetchBlueprintDetails(blueprintName); handleClose(); }}
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