/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { plus, trash, cog } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import { Modal, Button, TextControl } from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Plugin Settings Component
 *
 * @param {Object} props Component properties.
 * @param {Object} props.attributes The block's attributes, containing `plugins`.
 * @param {Function} props.setAttributes Function to update the block's attributes.
 * @return {JSX.Element} The PluginSettings component.
 */
function PluginSettings( { attributes = {}, setAttributes } ) {
	const { plugins } = attributes;
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ pluginList, setPluginList ] = useState( plugins || [] );

	useEffect( () => {
		setPluginList( plugins || [] );
	}, [ plugins ] );

	const addPlugin = () => {
		if ( pluginList.some( ( plugin ) => plugin === '' ) ) {
			return;
		}
		setPluginList( [ ...pluginList, '' ] );
	};

	const updatePlugin = ( index, value ) => {
		const updatedList = pluginList.map( ( plugin, i ) =>
			i === index ? value : plugin
		);
		setPluginList( updatedList );
	};

	const deletePlugin = ( index ) => {
		setPluginList( pluginList.filter( ( _, i ) => i !== index ) );
	};

	const savePlugins = () => {
		const filteredList = pluginList.filter(
			( plugin ) => plugin.trim() !== ''
		);
		setAttributes( { plugins: filteredList } );
		setPluginList( filteredList );
		setModalOpen( false );
	};

	const isAddButtonDisabled = pluginList.some(
		( plugin ) => plugin.trim() === ''
	);

	return (
		<>
			<Button
				icon={ cog }
				iconSize={ 30 }
				onClick={ () => setModalOpen( true ) }
				label={ __( 'Configure Plugins', 'visual-blueprint-builder' ) }
			/>
			{ isModalOpen && (
				<Modal
					title={ __( 'Plugins', 'visual-blueprint-builder' ) }
					onRequestClose={ savePlugins }
					size="medium"
				>
					<Stack direction="column" gap="lg">
						{ pluginList.map( ( plugin, index ) => (
							<Stack
								key={ index }
								direction="row"
								justify="space-between"
								align="center"
								gap="sm"
							>
								<TextControl
									label={ __(
										'Plugin',
										'visual-blueprint-builder'
									) }
									hideLabelFromVision
									value={ plugin }
									placeholder={ __(
										'Enter plugin slug or URL',
										'visual-blueprint-builder'
									) }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									style={ { flex: 1 } }
									onChange={ ( value ) =>
										updatePlugin( index, value )
									}
								/>
								<Button
									isDestructive
									icon={ trash }
									label={ __(
										'Delete Plugin',
										'visual-blueprint-builder'
									) }
									onClick={ () => deletePlugin( index ) }
									style={ { width: '40px' } }
								/>
							</Stack>
						) ) }

						<Button
							icon={ plus }
							variant="secondary"
							label={ __(
								'Add Plugin',
								'visual-blueprint-builder'
							) }
							onClick={ addPlugin }
							disabled={ isAddButtonDisabled }
						/>
					</Stack>
				</Modal>
			) }
		</>
	);
}

export default PluginSettings;
