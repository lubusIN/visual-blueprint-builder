/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';
import {
    Dropdown,
    Button,
    SelectControl,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    __experimentalText as Text
} from '@wordpress/components';
import { copy, download, globe } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';

/**
 * PHP and WordPress version options for dropdowns.
 */
const PHP_VERSIONS = [
    { label: 'Latest', value: 'latest' },
    { label: '8.2', value: '8.2' },
    { label: '8.1', value: '8.1' },
    { label: '8.0', value: '8.0' },
    { label: '7.4', value: '7.4' },
];

const WP_VERSIONS = [
    { label: 'Latest', value: 'latest' },
    { label: '6.2', value: '6.2' },
    { label: '6.1', value: '6.1' },
    { label: '6.0', value: '6.0' },
    { label: '5.6', value: '5.6' },
];

/**
 * Reusable Dropdown component for version control.
 * @param {string} label - The label for the dropdown.
 * @param {Array} versions - List of versions for the dropdown.
 * @param {string} defaultValue - The default selected version.
 */
const DropdownVersionControl = ({ label, versions, defaultValue }) => (
    <HStack justify='left'>
        <Text style={{ width: '30%' }}>{label}</Text>
        <Dropdown
            popoverProps={{
                placement: 'left-start',
                offset: 118,
                shift: true,
            }}
            renderToggle={({ isOpen, onToggle }) => (
                <Button
                    variant="tertiary"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                >
                    {defaultValue}
                </Button>
            )}
            renderContent={({ onClose }) => (
                <VStack style={{ minWidth: '240px', margin: '8px' }} spacing={0}>
                    <InspectorPopoverHeader
                        title={__(label)}
                        onClose={onClose}
                    />
                    <SelectControl
                        label={label}
                        hideLabelFromVision
                        value={defaultValue}
                        options={versions}
                        onChange={() => { }} // Placeholder for actual change handling
                    />
                </VStack>
            )}
        />
    </HStack>
);

/**
 * Main component for displaying version control in post status info.
 */
function BlueprintVersionControl() {
    // const playgroundBase = "https://playground.wordpress.net/#";

    // const blocks = useSelect((select) => select('core/block-editor').getBlocks(), []);

    // const handleDownloadClick = () => {
    //     const blockAttributes = blocks.map(block => ({
    //         name: block.name,
    //         attributes: block.attributes,
    //     }));
    //     console.log(blockAttributes);
    // };

    return (
        <PluginDocumentSettingPanel name='playground-settings' title='Playground Settings'>
            <HStack justify='left'>
                <Button variant="secondary" icon={globe} href={''} target='_new'>
                </Button>
                <Button
                    variant="secondary"
                    icon={copy}
                    onClick={() => { }}>
                </Button>
                <Button
                    variant="secondary"
                    icon={download}
                    href={''}
                    onClick={handleDownloadClick}
                >
                </Button>
            </HStack>
            <VStack spacing={1} style={{ width: '100%' }}>
                <DropdownVersionControl
                    label="PHP version"
                    versions={PHP_VERSIONS}
                    defaultValue="8.0"
                />
                <DropdownVersionControl
                    label="WP version"
                    versions={WP_VERSIONS}
                    defaultValue="Latest"
                />
            </VStack>
        </PluginDocumentSettingPanel>
    );
};

/**
 * Registers the 'blueprint-version-control' plugin.
 */
registerPlugin('blueprint-version-control', { render: BlueprintVersionControl });
