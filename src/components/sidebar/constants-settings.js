/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { code } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { Modal, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import KeyValueEditor from '../key-value-editor';

/**
 * Constants Settings Component
 *
 * @param {Object} props The props for the component.
 * @param {Object} props.attributes The block attributes, containing `constants`.
 * @param {Function} props.setAttributes Function to update the attributes.
 * @return {JSX.Element} The ConstantsSettings component.
 */
function ConstantsSettings( { attributes = {}, setAttributes } ) {
	const { constants } = attributes;
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ localConstants, setLocalConstants ] = useState( constants || {} );

	const handleOpen = () => {
		setLocalConstants( constants || {} );
		setModalOpen( true );
	};

	const saveOptions = () => {
		setAttributes( { constants: localConstants } );
		setModalOpen( false );
	};

	return (
		<>
			<Button
				size="compact"
				icon={ code }
				onClick={ handleOpen }
				label={ __(
					'Configure Constants',
					'visual-blueprint-builder'
				) }
			/>
			{ isModalOpen && (
				<Modal
					title={ __(
						'WP Config Constants',
						'visual-blueprint-builder'
					) }
					onRequestClose={ saveOptions }
					size="medium"
				>
					<KeyValueEditor
						data={ localConstants }
						onChange={ setLocalConstants }
						addButtonLabel={ __(
							'Add Constant',
							'visual-blueprint-builder'
						) }
						deleteButtonLabel={ __(
							'Delete Constant',
							'visual-blueprint-builder'
						) }
					/>
				</Modal>
			) }
		</>
	);
}

export default ConstantsSettings;
