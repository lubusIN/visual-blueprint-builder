/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { cog } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import {
    Modal,
    Button,
    FormTokenField,
    Spinner,
    __experimentalVStack as VStack,
    __experimentalText as Text,
} from '@wordpress/components';


/**
 * Plugin Settings Component
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.attributes - The block's attributes, containing `plugins`.
 * @param {Function} props.setAttributes - Function to update the block's attributes.
 * 
 * @returns {JSX.Element} The PluginSettings component.
 */
function PluginSettings({ attributes = {}, setAttributes }) {
    const { plugins = [] } = attributes;
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setLoading] = useState(false);

    /**
     * Fetch plugin suggestions from WordPress.org API
     */
    const fetchPluginSuggestions = async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        const url = `https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[search]=${encodeURIComponent(query)}&request[per_page]=10`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Extract plugin slugs from the response
            const pluginSlugs = (data.plugins || []).map(plugin => plugin.slug);
            setSuggestions(pluginSlugs);
        } catch (error) {
            console.error('Error fetching plugins:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle search input change with debouncing
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm) {
                fetchPluginSuggestions(searchTerm);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    /**
     * Handle plugin tokens change
     */
    const handleTokensChange = (tokens) => {
        setAttributes({ plugins: tokens });
    };

    /**
     * Close modal
     */
    const closeModal = () => {
        setModalOpen(false);
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <>
            {/* Trigger Button */}
            <Button icon={cog} iconSize={30} onClick={() => setModalOpen(true)} />
            {isModalOpen && (
                <Modal
                    title={__('Plugins', 'wp-playground-blueprint-editor')}
                    onRequestClose={closeModal}
                    size="medium"
                >
                    <VStack spacing={4} className={'vpb-plugin-token-field'}>
                        <Text>
                            {__('Enter plugin slugs or URLs. Start typing to search WordPress.org plugins.', 'wp-playground-blueprint-editor')}
                        </Text>

                        <FormTokenField
                            value={plugins}
                            suggestions={suggestions}
                            onChange={handleTokensChange}
                            onInputChange={setSearchTerm}
                            placeholder={__('Type to search or enter plugin slug/URL', 'wp-playground-blueprint-editor')}
                            __experimentalShowHowTo={false}
                        />

                        {isLoading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Spinner />
                                <Text>{__('Searching plugins...', 'wp-playground-blueprint-editor')}</Text>
                            </div>
                        )}

                        {plugins.length > 0 && (
                            <Text variant="muted">
                                {__(`${plugins.length} plugin(s) added`, 'wp-playground-blueprint-editor')}
                            </Text>
                        )}
                    </VStack>
                </Modal>
            )}
        </>
    );
}

export default PluginSettings;
