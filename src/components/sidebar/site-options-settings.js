/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { settings } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { Modal, Button } from '@wordpress/components';

import TreeEditor from '../tree-editor';

/**
 * Site Options Settings Component
 *
 * @param {Object} props The props for the component.
 * @param {Object} props.attributes The block attributes, containing `siteOptions`.
 * @param {Function} props.setAttributes Function to update the attributes.
 * @return {JSX.Element} The SiteOptionsSettings component.
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
			<Button
				size="compact"
				icon={ settings }
				onClick={ handleOpen }
				label={ __(
					'Configure Site Options',
					'visual-blueprint-builder'
				) }
			/>
			{ isModalOpen && (
				<Modal
					title={ __( 'Site Options', 'visual-blueprint-builder' ) }
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
