import { useState, useEffect } from '@wordpress/element';
import {
    Button,
    Modal,
    Spinner,
    Card,
    CardBody,
    ExternalLink,
    __experimentalText as Text,
    __experimentalGrid as Grid,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';

export default function Picker({ type, onSelect }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [isLoading, setLoading] = useState(false);

    // API endpoint based on type
    const fetchItems = async (query = '') => {
        setLoading(true);
        const isSearch = !!query.trim();
        const url = `https://api.wordpress.org/${type}/info/1.2/?action=query_${type}${isSearch ? `&request[search]=${query}` : `&request[popular]=1`}`;


        try {
            const response = await fetch(url);
            const data = await response.json();
            if (isSearch) {
                setResults(data[type] || []);
            } else {
                setPopularItems(data[type] || []);
            }
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isModalOpen && !searchTerm) {
            fetchItems();
        }
    }, [isModalOpen, searchTerm]);

    // Modal handlers
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div>
            <Button
                variant="secondary"
                onClick={openModal}
                style={{
                    height: '32px'
                }}
            >
                {__(`Browse`, 'picker')}
            </Button>
            {isModalOpen && (
                <Modal
                    title={__(`Browse ${type[0].toUpperCase()}${type.slice(1)}`, 'picker')}
                    onRequestClose={closeModal}
                    shouldCloseOnClickOutside={false}
                    style={{
                        width: '70%',
                        minHeight: '70%',
                        padding: '0 10px 0 10px'
                    }} >
                    <VStack style={{ width: '40%' }} >
                        <InputControl
                            placeholder={__('Search by name or author', 'picker')}
                            value={searchTerm}
                            onChange={(value) => {
                                setSearchTerm(value);
                                fetchItems(value);
                            }}
                            suffix={<Button
                                variant="link"
                                onClick={() => fetchItems(searchTerm)}
                                disabled={isLoading}
                                style={{
                                    textDecoration: 'none', // Removes underline
                                    color: '#0073aa', // Matches theme
                                }}
                                icon={<span aria-hidden="true" className="dashicons dashicons-search"></span>}
                            />}
                        />
                    </VStack>
                    {/* Loader */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                    }} >
                        {isLoading && <Spinner style={{ width: '60px', height: '60px' }} />}

                    </div>

                    {!isLoading && (
                        <VStack>
                            <h3>
                                {searchTerm
                                    ? __('Search Results', 'picker')
                                    : __('Popular Items', 'picker')}
                            </h3>
                            {/* Conditional rendering for different layouts */}
                            {type === 'themes' && (
                                <Grid columns={3} gap={10}>
                                    {(searchTerm ? results : popularItems).map((item) => (
                                        <Card key={item.slug} size="large"
                                            style={{
                                                position: 'relative',
                                                overflow: 'hidden',
                                                borderRadius: '4px',
                                                height: '100%',
                                            }}>
                                            <CardBody style={{ padding: '0' }}>
                                                <div
                                                    style={{
                                                        position: 'relative',
                                                        width: '100%',
                                                        paddingBottom: '75%',
                                                        backgroundImage: `url(${item.screenshot_url})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        borderTopLeftRadius: '4px',
                                                        borderTopRightRadius: '4px',
                                                        height: '100%',
                                                    }}
                                                />
                                                <VStack spacing={2} align="stretch" style={{ padding: '12px' }}>

                                                    <HStack>
                                                        <strong>{item.name}</strong>


                                                        <Button
                                                            variant="secondary"
                                                            style={{
                                                                borderRadius: '4px'
                                                            }}
                                                            onClick={() => {
                                                                onSelect(item.slug);
                                                                closeModal();
                                                            }}
                                                        >
                                                            {__('Select', 'picker')}
                                                        </Button>
                                                    </HStack>
                                                </VStack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </Grid>
                            )}
                            {type === 'plugins' && (
                                <Grid
                                    columns={2}
                                    gap="30px" // Adjusted for better uniform gaps
                                    style={{
                                        rowGap: '30px', // Vertical gap
                                        columnGap: '65px', // Horizontal gap
                                        justifyContent: 'center', // Center align grid content
                                        maxWidth: '100%', // Optional: Limit max width for better layout
                                        margin: '0 auto', // Center the grid container horizontally
                                    }}
                                >
                                    {(searchTerm ? results : popularItems).map((item) => (
                                        <Card
                                            key={item.slug}
                                            size="large"
                                            style={{
                                                width: '100%',
                                                maxWidth: '400px', // Ensure consistent card width
                                                minHeight: '270px', // Ensures consistent card height
                                                paddingBottom: '60px', // Space for button
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-evenly',
                                                borderRadius: '4px', // Rounded corners
                                                margin: '0 auto', // Center the card within the grid
                                            }}
                                        >
                                            <CardBody>
                                                <VStack align="start" spacing={4} style={{ flex: 1 }}>
                                                    {/* Icon and Name Section */}
                                                    <HStack
                                                        justify="start"
                                                        spacing={4}
                                                        style={{
                                                            minHeight: '70px',
                                                            width: '100%',
                                                            marginBottom: '8px',
                                                        }}
                                                    >
                                                        <img
                                                            src={item.icons['1x'] || item.icons.default}
                                                            alt={`${item.name} Icon`}
                                                            style={{
                                                                minWidth: '70px',
                                                                maxHeight: '70px',
                                                                objectFit: 'contain',
                                                                borderRadius: '4px',
                                                            }} />
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '1em',
                                                            color: '#0073aa',
                                                            cursor: 'pointer',
                                                        }}
                                                            onClick={() => window.open(item.homepage, '_blank')}
                                                        >
                                                            <ExternalLink>{decodeEntities(item.name)}</ExternalLink>
                                                        </Text>
                                                    </HStack>
                                                    {/* Description */}
                                                    <Text
                                                        style={{
                                                            color: '#555',
                                                            fontSize: '0.9em',
                                                            textAlign: 'left',
                                                            lineHeight: '1.5em',
                                                        }}  >
                                                        {item.short_description || __('No description available', 'picker')}
                                                    </Text>
                                                    <HStack spacing={10}>
                                                        <Text style={{ fontSize: '0.9em', color: '#666' }}>
                                                            {item.active_installs
                                                                ? `${item.active_installs}+ active installations`
                                                                : 'No data available'}
                                                        </Text>
                                                        <Text style={{ fontSize: '0.9em', color: '#666' }}>
                                                            {__('Tested with', 'picker')} {item.tested || __('Unknown', 'picker')}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </CardBody>
                                            {/* Fixed Button */}
                                            <Button
                                                variant="secondary"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '15px', // Button at the bottom of the card
                                                    left: '50%',
                                                    transform: 'translateX(-50%)', // Center the button
                                                    padding: '10px 20px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.9em',
                                                }}
                                                onClick={() => {
                                                    onSelect(item.slug);
                                                    closeModal();
                                                }} >
                                                {__('Select', 'picker')}
                                            </Button>
                                        </Card>
                                    ))}
                                </Grid>
                            )}
                        </VStack>
                    )}
                </Modal>
            )}
        </div>
    );
}
