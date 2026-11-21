/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { info } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import {
	Modal,
	Button,
	TextControl,
	TextareaControl,
	FormTokenField,
} from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Meta Settings Component for Blueprint metadata (title, author, description, categories).
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes The block attributes, containing `meta`.
 * @param {Function} props.setAttributes Function to update the attributes.
 * @return {JSX.Element} The MetaSettings component.
 */
function MetaSettings( { attributes = {}, setAttributes } ) {
	const { meta } = attributes;
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ localMeta, setLocalMeta ] = useState( meta || {} );

	const handleOpen = () => {
		setLocalMeta( meta || {} );
		setModalOpen( true );
	};

	const saveOptions = () => {
		const cleanMeta = {};
		if ( localMeta.title?.trim() ) {
			cleanMeta.title = localMeta.title.trim();
		}
		if ( localMeta.author?.trim() ) {
			cleanMeta.author = localMeta.author.trim();
		}
		if ( localMeta.description?.trim() ) {
			cleanMeta.description = localMeta.description.trim();
		}
		if (
			Array.isArray( localMeta.categories ) &&
			localMeta.categories.length > 0
		) {
			cleanMeta.categories = localMeta.categories;
		}

		setAttributes( {
			meta: Object.keys( cleanMeta ).length > 0 ? cleanMeta : undefined,
		} );
		setModalOpen( false );
	};

	const updateField = ( field, value ) => {
		setLocalMeta( ( prev ) => ( {
			...prev,
			[ field ]: value,
		} ) );
	};

	return (
		<>
			<Button
				size="compact"
				icon={ info }
				onClick={ handleOpen }
				label={ __(
					'Configure Blueprint Metadata',
					'visual-blueprint-builder'
				) }
			/>
			{ isModalOpen && (
				<Modal
					title={ __(
						'Blueprint Metadata',
						'visual-blueprint-builder'
					) }
					onRequestClose={ saveOptions }
					size="medium"
				>
					<Stack direction="column" gap="md">
						<TextControl
							label={ __( 'Title', 'visual-blueprint-builder' ) }
							value={ localMeta.title || '' }
							placeholder={ __(
								'A clear name for your Blueprint',
								'visual-blueprint-builder'
							) }
							onChange={ ( val ) => updateField( 'title', val ) }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Author', 'visual-blueprint-builder' ) }
							value={ localMeta.author || '' }
							placeholder={ __(
								'GitHub username of the author',
								'visual-blueprint-builder'
							) }
							onChange={ ( val ) => updateField( 'author', val ) }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextareaControl
							label={ __(
								'Description',
								'visual-blueprint-builder'
							) }
							value={ localMeta.description || '' }
							placeholder={ __(
								'A brief explanation of what your Blueprint offers',
								'visual-blueprint-builder'
							) }
							onChange={ ( val ) =>
								updateField( 'description', val )
							}
							rows={ 3 }
							__nextHasNoMarginBottom
						/>
						<FormTokenField
							label={ __(
								'Categories',
								'visual-blueprint-builder'
							) }
							value={ localMeta.categories || [] }
							suggestions={ [
								'Plugins',
								'Themes',
								'WooCommerce',
								'Testing',
								'Block Theme',
								'Demo',
							] }
							onChange={ ( tokens ) =>
								updateField( 'categories', tokens )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<Button variant="primary" onClick={ saveOptions }>
							{ __(
								'Save Metadata',
								'visual-blueprint-builder'
							) }
						</Button>
					</Stack>
				</Modal>
			) }
		</>
	);
}

export default MetaSettings;
