/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { code } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { Modal, Button, Notice } from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies
 */
import KeyValueEditor from '../key-value-editor';

/**
 * Constants Settings Component
 *
 * Configures top-level blueprint constants shorthand.
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes The attributes object containing `constants`.
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
					<Stack direction="column" gap="md">
						<Notice status="info" isDismissible={ false }>
							{ __(
								'Top-level constants are a shorthand that defines constants before runtime (define-before-run). If you need to specify the method (such as rewriting wp-config.php) or control execution order, add an explicit "Define WP Config Consts" step in your blueprint instead.',
								'visual-blueprint-builder'
							) }
						</Notice>
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
					</Stack>
				</Modal>
			) }
		</>
	);
}

export default ConstantsSettings;
