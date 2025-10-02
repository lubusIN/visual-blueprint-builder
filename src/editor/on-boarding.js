/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { code, gallery, plus } from '@wordpress/icons';
import {
    Button,
    Modal,
    __experimentalGrid as Grid,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Gallery, OpenJson } from '../components/sidebar';

/**
 * OnboardingModal is a modal that is displayed when a user creates a new post and adds no blocks.
 * It gives the user the option to start from a JSON file, a gallery, or a blank post.
 * @returns {JSX.Element} The onboarding modal.
 */
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
            title={__('Start Blueprint From', 'wp-playground-blueprint-editor')}
            className='wp-playground-onboarding-modal'
            onRequestClose={handleClose}
            shouldCloseOnClickOutside
            shouldCloseOnEsc
            size="medium"
        >
            <Grid columns={3} spacing={4}>
                <OpenJson icon={code} handleClose={handleClose} />
                <Gallery icon={gallery} handleClose={handleClose} />
                <Button
                    onClick={handleClose}
                    icon={plus}
                >
                    {__('Blank', 'wp-playground-blueprint-editor')}
                </Button>
            </Grid>
        </Modal>
    );
};

registerPlugin('wp-blueprint-onboarding', {
    render: OnboardingModal,
});