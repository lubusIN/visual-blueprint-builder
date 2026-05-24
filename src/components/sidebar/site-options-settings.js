/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { cog } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { Modal, Button } from '@wordpress/components';

import TreeEditor from '../tree-editor';

/**
 * Site Options Settings Component
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.attributes - The block's attributes, containing `siteOptions`.
 * @param {Function} props.setAttributes - Function to update the block's attributes.
 *
 * @returns {JSX.Element} The SiteOptionsSettings component.
 */
function SiteOptionsSettings( { attributes = {}, setAttributes } ) {
	const { siteOptions } = attributes;
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ localOptions, setLocalOptions ] = useState( siteOptions || {} );

	const handleOpen = () => {
		setLocalOptions( siteOptions || {} );
		setModalOpen( true );
	};

	const saveOptions = () => {
		setAttributes( { siteOptions: localOptions } );
		setModalOpen( false );
	};

	return (
		<>
			{ /* Trigger Button */ }
			<Button icon={ cog } iconSize={ 30 } onClick={ handleOpen } />
			{ isModalOpen && (
				<Modal
					title={ __(
						'Site Options',
						'wp-playground-blueprint-editor'
					) }
					onRequestClose={ saveOptions }
					size="large"
				>
					<TreeEditor
						data={ localOptions }
						onChange={ setLocalOptions }
					/>
				</Modal>
			) }
		</>
	);
}

export default SiteOptionsSettings;
