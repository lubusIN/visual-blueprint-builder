/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { code, gallery, plus } from '@wordpress/icons';
import { Button, Modal } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Gallery, OpenJson } from '../components/sidebar';

/**
 * OnboardingModal is displayed when a user creates a new blueprint post without blocks.
 *
 * @return {JSX.Element|null} The onboarding modal.
 */
const OnboardingModal = () => {
	const [ showModal, setShowModal ] = useState( false );

	const { isNewPost, blocks } = useSelect( ( select ) => {
		const editor = select( 'core/editor' );
		return {
			isNewPost: editor?.isCleanNewPost ? editor.isCleanNewPost() : false,
			blocks: editor?.getBlocks ? editor.getBlocks() : [],
		};
	}, [] );

	useEffect( () => {
		if ( isNewPost && blocks.length === 0 ) {
			setShowModal( true );
		}
	}, [ isNewPost, blocks ] );

	const handleClose = () => setShowModal( false );

	if ( ! showModal ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Start Blueprint From', 'visual-blueprint-builder' ) }
			className="wp-playground-onboarding-modal"
			onRequestClose={ handleClose }
			shouldCloseOnClickOutside
			shouldCloseOnEsc
			size="medium"
		>
			<div className="vbb-onboarding-grid">
				<OpenJson icon={ code } handleClose={ handleClose } />
				<Gallery icon={ gallery } handleClose={ handleClose } />
				<Button onClick={ handleClose } icon={ plus }>
					{ __( 'Blank', 'visual-blueprint-builder' ) }
				</Button>
			</div>
		</Modal>
	);
};

registerPlugin( 'wp-blueprint-onboarding', {
	render: OnboardingModal,
} );
