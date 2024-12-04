import { useState, useEffect } from '@wordpress/element';
import {
    TextControl,
    Button,
    Modal,
    Spinner,
    Card,
    CardBody,
    __experimentalText as Text,
    __experimentalGrid as Grid,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';
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

                    padding: '0 5px'
                }}
            >
                {__(`Browse`, 'picker')}
            </Button>
            {isModalOpen && (
                <Modal
                    title={__(`Browse ${type}`, 'picker')}
                    onRequestClose={closeModal}
                    shouldCloseOnClickOutside={false}
                    style={{
                        width: '70%',
                        minHeight: '70%',

                    }}
                >
                    <VStack style={{ width: '40%' }} >
                        <InputControl
                            placeholder={__('Search by name or author', 'picker')}
                            value={searchTerm}
                            onChange={(value) => {
                                setSearchTerm(value);
                                fetchItems(value);
                            }}
                            suffix={<Button
                                variant="secondary"
                                onClick={() => fetchItems(searchTerm)}
                                disabled={isLoading} >
                                <span aria-hidden="true" className="dashicons dashicons-search"></span>
                            </Button>}
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
                                <Grid columns={3} gap="8">
                                    {(searchTerm ? results : popularItems).map((item) => (
                                        <Card
                                            key={item.slug}
                                            size="large"
                                            style={{
                                                width: '100%',
                                                minWidth: '250px',
                                                maxWidth: '400px',
                                            }}
                                        >
                                            <CardBody>
                                                <VStack align="start" spacing={4} style={{ flex: 1 }}>
                                                    {/* Icon and Name Section */}
                                                    <HStack
                                                        
                                                        justify="start"
                                                        spacing={5}
                                                        style={{
                                                            minHeight: '70px',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <img
                                                            src={item.icons['1x'] || item.icons.default}
                                                            alt={`${item.name} Icon`}
                                                            style={{
                                                                maxWidth: '70px',
                                                                maxHeight: '70px',
                                                                objectFit:'cover', 
                                                                borderRadius: '4px',
                                                                backgroundSize: 'cover',
                                                                display:'block',
                                                            }}
                                                        />
                                                        <Text
                                                            style={{
                                                                fontWeight: 'bold',
                                                                fontSize: '1em',
                                                                color: '#0073aa',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => window.open(item.homepage, '_blank')}
                                                        >
                                                            {item.name}
                                                        </Text>
                                                    </HStack>


                                                    {/* Description */}
                                                    <Text
                                                        style={{
                                                            color: '#555',
                                                            fontSize: '0.8em',
                                                            marginTop: '10px',
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        {item.short_description || __('No description available', 'picker')}
                                                    </Text>
                                                </VStack>
                                            </CardBody>

                                            {/* Button Section */}
                                            <HStack justify="center" style={{ padding: '10px 0' }}>
                                                <Button
                                                    variant="secondary"
                                                    style={{
                                                        padding: '8px 16px',
                                                        borderRadius: '4px',
                                                    }}
                                                    onClick={() => {
                                                        onSelect(item.slug);
                                                        closeModal();
                                                    }}
                                                >
                                                    {__('Select', 'picker')}
                                                </Button>
                                            </HStack>
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
