/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import {
    Button,
    Modal,
    Card,
    CardBody,
    Spinner,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    __experimentalGrid as Grid,
    __experimentalVStack as VStack,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';
import { search as searchIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { handleBlueprintData, useBlueprintData } from '../../editor/utils';

/**
 * Blueprints Gallery component.
 *
 * @param {object} props - Component props.
 * @param {JSX.Element} props.icon - Icon to display in the button.
 * @param {function} props.handleClose - Callback function to close the modal.
 */
function Gallery({ icon = null, handleClose }) {
    const { updateBlueprintConfig } = useBlueprintData();
    const { createNotice } = useDispatch(noticesStore);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isFetchingList, setIsFetchingList] = useState(false);
    const [blueprintList, setBlueprintList] = useState(null);
    const [importingBlueprint, setImportingBlueprint] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    // Debounce search input (200ms)
    useEffect(() => {
        const t = setTimeout(() => setDebouncedTerm(searchTerm.trim().toLowerCase()), 200);
        return () => clearTimeout(t);
    }, [searchTerm]);

    /**
     * Fetches the list of blueprints from the remote JSON file.
     */
    useEffect(() => {
        const fetchBlueprintList = async () => {
            setIsFetchingList(true);
            const apiUrl = 'https://raw.githubusercontent.com/WordPress/blueprints/trunk/index.json';
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch blueprints');
                const data = await response.json();
                setBlueprintList(data);
            } catch (error) {
                createNotice(
                    'error',
                    `${__('Error fetching blueprint list', 'wp-playground-blueprint-editor')}: ${error.message}`
                );
            } finally {
                setIsFetchingList(false);
            }
        };
        fetchBlueprintList();
    }, []);

    /**
     * Default blueprint values
     */
    const defaultValues = {
        preferredVersions: { php: 'latest', wp: 'nightly' },
        features: { networking: true },
        steps: [],
    };

    /**
     * Fetch details for a selected blueprint.
     */
    const fetchBlueprintDetails = async (blueprintName) => {
        setImportingBlueprint(blueprintName);

        const blueprintUrl = `https://raw.githubusercontent.com/WordPress/blueprints/trunk/${blueprintName}`;
        try {
            const response = await fetch(blueprintUrl);
            if (!response.ok) throw new Error(`Failed to fetch blueprint details: ${response.statusText}`);
            const data = await response.json();

            const validatedData = {
                preferredVersions: data.preferredVersions || defaultValues.preferredVersions,
                features: data.features || defaultValues.features,
                steps: Array.isArray(data.steps) ? data.steps : defaultValues.steps,
                ...data,
            };

            const mergedData = { ...defaultValues, ...validatedData };

            if (!Array.isArray(mergedData.steps) || mergedData.steps.length === 0) {
                createNotice('warning', __('The imported blueprint does not contain any steps. Please check the sidebar for shorthands and other settings.', 'wp-playground-blueprint-editor'));
            }

            await handleBlueprintData(mergedData, createNotice, updateBlueprintConfig);
        } catch (error) {
            createNotice(
                'error',
                `${__('Error fetching blueprint from Gallery', 'wp-playground-blueprint-editor')}: ${error.message}`
            );
        } finally {
            setImportingBlueprint(null);
            setModalOpen(false);
            if (handleClose) handleClose();
        }
    };

    /**
     * Flatten index map array and filter by debounced term.
     */
    const filteredBlueprints = useMemo(() => {
        if (!blueprintList) return [];
        const items = Object.entries(blueprintList).map(([fileName, meta]) => ({
            fileName,
            title: meta?.title || '',
            author: meta?.author || '',
            description: meta?.description || '',
        }));

        if (!debouncedTerm) return items;

        const tokens = debouncedTerm.split(/\s+/).filter(Boolean);

        const norm = (s) => (s || '').toString().toLowerCase();

        return items.filter((item) => {
            const haystack = `${norm(item.title)} ${norm(item.author)} ${norm(item.description)} ${norm(item.fileName)}`;
            // All tokens must be present (simple AND search)
            return tokens.every((tk) => haystack.includes(tk));
        });
    }, [blueprintList, debouncedTerm]);

    return (
        <>
            <Button className="blueprint_gallery_json" onClick={() => setModalOpen(true)} icon={icon}>
                {__('Gallery', 'wp-playground-blueprint-editor')}
            </Button>

            {isModalOpen && (
                <Modal
                    title={__('Blueprint Gallery', 'wp-playground-blueprint-editor')}
                    onRequestClose={() => setModalOpen(false)}
                    shouldCloseOnClickOutside
                    shouldCloseOnEsc
                    size="large"
                >
                    <VStack spacing={6} justify='space-between'>
                        <InputControl
                            __next40pxDefaultSize
                            placeholder={__('Search by name or author', 'wp-playground-blueprint-editor')}
                            value={searchTerm}
                            onChange={setSearchTerm}
                            suffix={
                                <Button
                                    variant="link"
                                    onClick={() => setDebouncedTerm(searchTerm.trim().toLowerCase())}
                                    style={{ textDecoration: 'none' }}
                                    icon={searchIcon}
                                    aria-label={__('Search', 'wp-playground-blueprint-editor')}
                                />
                            }
                        />

                        {isFetchingList && (
                            <VStack alignment="center" spacing={3} style={{ marginTop: 16 }}>
                                <Spinner />
                                <Text>{__('Loading blueprints...', 'wp-playground-blueprint-editor')}</Text>
                            </VStack>
                        )}

                        {!isFetchingList && blueprintList && filteredBlueprints.length > 0 && (
                            <Grid columns={2} gap={6}>
                                {filteredBlueprints.map((blueprintDetails, index) => (
                                    <Card key={`${blueprintDetails.fileName}-${index}`}>
                                        <CardBody
                                            style={{
                                                height: '100%',
                                                justifyContent: 'space-between',
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <VStack align="start" spacing={4}>
                                                <Heading level={4}>{blueprintDetails.title}</Heading>
                                                <Text>
                                                    {__('By', 'wp-playground-blueprint-editor')} {blueprintDetails.author}
                                                </Text>
                                                <Text
                                                    lineHeight={'1.5em'}
                                                    size={15}
                                                    color="#777"
                                                    style={{ wordBreak: 'break-word' }}
                                                >
                                                    {blueprintDetails.description}
                                                </Text>
                                            </VStack>

                                            <Button
                                                variant="secondary"
                                                style={{ borderRadius: '4px', alignSelf: 'flex-end', marginTop: '16px' }}
                                                onClick={() => fetchBlueprintDetails(blueprintDetails.fileName)}
                                                disabled={importingBlueprint === blueprintDetails.fileName}
                                            >
                                                {importingBlueprint === blueprintDetails.fileName ? (
                                                    <>
                                                        <Spinner />{' '}
                                                        {__('Importing...', 'wp-playground-blueprint-editor')}
                                                    </>
                                                ) : (
                                                    __('Import', 'wp-playground-blueprint-editor')
                                                )}
                                            </Button>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Grid>
                        )}

                        {!isFetchingList && blueprintList && filteredBlueprints.length === 0 && (
                            <Text>{__('No blueprints found for your search.', 'wp-playground-blueprint-editor')}</Text>
                        )}

                        {!isFetchingList && !blueprintList && (
                            <Text>{__('Unable to load blueprints.', 'wp-playground-blueprint-editor')}</Text>
                        )}
                    </VStack>
                </Modal>
            )}
        </>
    );
}

export default Gallery;
