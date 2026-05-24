/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { cog } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { Modal, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import KeyValueEditor from '../key-value-editor';

/**
 * Constants Settings Component
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.attributes - The block's attributes, containing `constants.
 * @param {Function} props.setAttributes - Function to update the block's attributes.
 *
 * @returns {JSX.Element} The ConstantsSettings component.
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
			{ /* Trigger Button */ }
			<Button icon={ cog } iconSize={ 30 } onClick={ handleOpen } />
			{ isModalOpen && (
				<Modal
					title={ __(
						'WP Config Constants',
						'wp-playground-blueprint-editor'
					) }
					onRequestClose={ saveOptions }
					size="medium"
				>
					<KeyValueEditor
						data={ localConstants }
						onChange={ setLocalConstants }
						addButtonLabel={ __(
							'Add Constant',
							'wp-playground-blueprint-editor'
						) }
						deleteButtonLabel={ __(
							'Delete Constant',
							'wp-playground-blueprint-editor'
						) }
					/>
				</Modal>
			) }
		</>
	);
}

export default ConstantsSettings;
