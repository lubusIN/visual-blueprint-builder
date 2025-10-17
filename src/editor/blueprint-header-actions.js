/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { downloadBlob } from '@wordpress/blob';
import { useDispatch } from '@wordpress/data';
import { useCopyToClipboard } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { external } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';
import { store as noticesStore } from '@wordpress/notices';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import { sanitizePreparedSchemaString, useBlueprintData } from './utils';
import { PLAYGROUND_BASE, PLAYGROUND_BUILDER_BASE } from './constant';
import playgroundLogo from '../components/playground-logo';

/**
 * Component to add a dropdown in the editor header with Blueprint actions.
 * 
 * @returns {JSX.Element|null} The header dropdown component or null if not mounted.
 */
function HeaderBlueprintDropdown() {
    const [mount, setMount] = useState(null);

    // Find the header settings container and insert our mount node
    useEffect(() => {
        // Retry logic with multiple attempts
        let attempts = 0;
        const maxAttempts = 50;

        const findAndMountHeader = () => {
            attempts++;

            let header = null;
            const found = document.querySelector('.editor-header__settings .interface-pinned-items');
            if (found) {
                header = found;
            }

            if (!header && attempts < maxAttempts) {
                // Header not found yet, retry after a short delay
                setTimeout(findAndMountHeader, 100);
                return;
            }

            if (!header) {
                console.warn('Could not find header element after multiple attempts');
                return;
            }

            const el = document.createElement('div');
            el.className = 'wp-playground-blueprint-header-dropdown';
            header.prepend(el);
            setMount(el);
        };

        findAndMountHeader();

        return () => {
            // Cleanup
            const el = document.querySelector('.wp-playground-blueprint-header-dropdown');
            if (el) {
                el.remove();
            }
        };
    }, []);

    const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
    const { schema, prepareSchema } = useBlueprintData();

    const handleDownload = () => {
        try {
            const prepared = prepareSchema();
            const sanitized = sanitizePreparedSchemaString(prepared);
            downloadBlob('playground-blueprint.json', sanitized, 'application/json');
            createSuccessNotice(__('Blueprint downloaded successfully!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
        } catch (e) {
            createErrorNotice(__('Failed to download Blueprint JSON.', 'wp-playground-blueprint-editor'));
        }
    };

    const handleCopy = useCopyToClipboard(() => {
        if (!schema.steps.length) {
            createErrorNotice(__('No Blueprint steps to copy!', 'wp-playground-blueprint-editor'));
            return '';
        }
        createSuccessNotice(__('Blueprint schema copied to clipboard!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
        return prepareSchema();
    });

    const sanitizedForUrl = sanitizePreparedSchemaString(prepareSchema());
    const minifiedBlueprintJson = btoa(String.fromCharCode(...new Uint8Array(new TextEncoder().encode(sanitizedForUrl))));
    const builderHref = encodeURI(PLAYGROUND_BUILDER_BASE + minifiedBlueprintJson);

    if (!mount) return null;

    return wp.element.createPortal(
        <>
            <DropdownMenu
                icon={playgroundLogo}
                label={__('Blueprint actions', 'wp-playground-blueprint-editor')}
                toggleProps={{ 'aria-label': __('Blueprint actions', 'wp-playground-blueprint-editor') }}
                popoverProps={{ placement: 'bottom-start' }}
            >
                {({ onClose }) => (
                    <>
                        <MenuGroup>
                            <MenuItem onClick={() => { handleDownload(); onClose(); }}>
                                {__('Download JSON', 'wp-playground-blueprint-editor')}
                            </MenuItem>
                            <MenuItem ref={handleCopy}>
                                {__('Copy JSON', 'wp-playground-blueprint-editor')}
                            </MenuItem>
                            <MenuItem href={builderHref} target="_blank" onClick={onClose}>
                                {__('Open in Builder', 'wp-playground-blueprint-editor')}
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup>
                            <MenuItem icon={external} href={PLAYGROUND_BASE + minifiedBlueprintJson} target="_blank" onClick={onClose}>
                                {__('Preview', 'wp-playground-blueprint-editor')}
                            </MenuItem>
                        </MenuGroup>
                    </>
                )}
            </DropdownMenu>
        </>,
        mount
    );
}

/**
 * Register the plugin to add the dropdown to the header.
 */
domReady(() => {
    registerPlugin('blueprint-header-dropdown', {
        render: () => <HeaderBlueprintDropdown />,
    });
});