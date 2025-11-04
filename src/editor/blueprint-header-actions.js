/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { downloadBlob } from '@wordpress/blob';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCopyToClipboard } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { external } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';
import { store as noticesStore } from '@wordpress/notices';

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
    const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
    const { schema, prepareSchema } = useBlueprintData();

    const sanitizedForUrl = sanitizePreparedSchemaString(prepareSchema());
    const minifiedBlueprintJson = btoa(String.fromCharCode(...new Uint8Array(new TextEncoder().encode(sanitizedForUrl))));
    const builderHref = encodeURI(PLAYGROUND_BUILDER_BASE + minifiedBlueprintJson);

    const isEditorReady = useSelect(
        (select) => {
            const ed = select('core/editor');
            const postType = ed?.getEditedPostAttribute?.('type');
            const header = document.querySelector('.editor-header__settings .interface-pinned-items');
            return !!postType && !!header;
        },
        []
    );

    // Find the header settings container and insert our mount node
    useEffect(() => {
        const header = document.querySelector('.editor-header__settings .interface-pinned-items');

        if (!header) {
            return;
        }

        const el = document.createElement('div');
        el.className = 'wp-playground-blueprint-header-dropdown';
        header.prepend(el);
        setMount(el);

        return () => {
            if (el?.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
    }, [isEditorReady]);

    const handleDownload = () => {
        try {
            const prepared = prepareSchema();
            const sanitized = sanitizePreparedSchemaString(prepared);
            downloadBlob('playground-blueprint.json', sanitized, 'application/json');
            createSuccessNotice(__('Preparing Blueprint for download!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
        } catch (e) {
            createErrorNotice(__('Failed to download Blueprint JSON.', 'wp-playground-blueprint-editor'));
        }
    };

    const handleCopy = useCopyToClipboard(() => {
        if (!schema.steps.length) {
            createErrorNotice(__('No Blueprint steps to copy!', 'wp-playground-blueprint-editor'));
            return '';
        }
        createSuccessNotice(__('Blueprint copied to clipboard!', 'wp-playground-blueprint-editor'), { type: 'snackbar' });
        return prepareSchema();
    });

    if (!mount) return null;

    return wp.element.createPortal(
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
                            {__('Playground', 'wp-playground-blueprint-editor')}
                        </MenuItem>
                    </MenuGroup>
                </>
            )}
        </DropdownMenu>,
        mount
    );
}

/**
 * Register the plugin to add the dropdown to the header.
 */
registerPlugin('blueprint-header-dropdown', {
    render: () => <HeaderBlueprintDropdown />,
});