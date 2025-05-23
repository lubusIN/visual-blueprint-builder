/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
    Button,
    Modal,
    __experimentalGrid as Grid,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { code, gallery, plus } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Gallery from './blueprint-gallery';
import OpenJson from './open-json';

const OnboardingModal = () => {
    const [showModal, setShowModal] = useState(false);

    const { isNewPost, blocks } = useSelect((select) => {
        const editor = select('core/editor');
        return {
            isNewPost: editor.isCleanNewPost(),
            blocks: editor.getBlocks(),
        };
    }, []);

    useEffect(() => {
        if (isNewPost && blocks.length === 0) {
            setShowModal(true);
        }
    }, [isNewPost, blocks]);

    const handleClose = () => setShowModal(false);

    if (!showModal) return null;

    return (
        <Modal
            title={__('Start Building Your Blueprint', 'wp-playground-blueprint-editor')}
            onRequestClose={handleClose}
            shouldCloseOnClickOutside
            shouldCloseOnEsc
            size="medium"
        >
            <Grid columns={3} spacing={4}>
                <OpenJson label='Json' icon={code} onClick={handleClose} />
                <Gallery label='Gallery' icon={gallery} onClick={handleClose} />
                <Button
                    onClick={handleClose}
                    icon={plus}
                    style={{
                        boxShadow: 'inset 0 0 0 1px #ccc',
                        height: '100%',
                        flexDirection: 'column',
                        padding: '13px'
                    }}
                >
                    {__('Start Blank', 'wp-playground-blueprint-editor')}
                </Button>
                <Button variant="tertiary" onClick={handleClose}>
                    {__('Skip', 'wp-playground-blueprint-editor')}
                </Button>
            </Grid>
        </Modal>
    );
};

registerPlugin('wp-blueprint-onboarding', {
    render: OnboardingModal,
});