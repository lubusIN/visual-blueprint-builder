/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { FormFileUpload, DropZone, Spinner } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { handleBlueprintData, useBlueprintData } from '../../editor/utils';

/**
 * Renders an OpenJson component.
 *
 * @param {Object} props Component props.
 * @param {React.ReactElement} [props.icon] The icon of the component.
 * @param {Function} [props.handleClose] Callback when the modal/popover closes.
 * @return {JSX.Element} OpenJson component.
 */
const OpenJson = ( { icon = null, handleClose } ) => {
	const { createNotice } = useDispatch( noticesStore );
	const { updateBlueprintConfig } = useBlueprintData();
	const [ isUploadingJson, setIsUploadingJson ] = useState( false );

	const processJsonFile = ( file ) => {
		if ( file.type === 'application/json' ) {
			const reader = new FileReader();
			reader.onload = async () => {
				try {
					const jsonData = JSON.parse( reader.result );
					setIsUploadingJson( true );
					await handleBlueprintData(
						jsonData,
						createNotice,
						updateBlueprintConfig
					);
					if ( handleClose ) {
						handleClose();
					}
				} catch {
					createNotice(
						'error',
						__( 'Invalid JSON file.', 'visual-blueprint-builder' )
					);
				} finally {
					setIsUploadingJson( false );
				}
			};
			reader.readAsText( file );
		} else {
			createNotice(
				'error',
				__(
					'Please upload a valid JSON file.',
					'visual-blueprint-builder'
				)
			);
		}
	};

	const handleFileSelection = ( event ) => {
		const file = event.target.files?.[ 0 ];
		if ( file ) {
			processJsonFile( file );
		}
	};

	const handleFileDrop = ( files ) => {
		const file = files?.[ 0 ];
		if ( file ) {
			processJsonFile( file );
		}
	};

	return (
		<FormFileUpload
			className="upload_blueprint_json"
			accept="application/json"
			onChange={ handleFileSelection }
			icon={ null }
		>
			{ ! isUploadingJson && (
				<>
					{ icon && (
						<span
							style={ {
								width: 24,
								height: 24,
								display: 'inline-block',
							} }
						>
							{ icon }
						</span>
					) }
					{ __( 'Import JSON', 'visual-blueprint-builder' ) }
				</>
			) }
			{ isUploadingJson && <Spinner style={ { margin: 0 } } /> }
			<DropZone
				onFilesDrop={ handleFileDrop }
				accept="application/json"
			/>
		</FormFileUpload>
	);
};

export default OpenJson;
