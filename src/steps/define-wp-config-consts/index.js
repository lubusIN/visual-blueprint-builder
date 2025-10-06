/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { cog, plus, trash } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Button,
	Icon,
	__experimentalConfirmDialog as ConfirmDialog,
	__experimentalInputControl as InputControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalText as Text,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import {
	addKeyValuePair,
	updateKeyValuePair,
	removeKeyValuePair,
	filterEmptyKeyValuePairs,
	isAddButtonDisabled as checkAddButtonDisabled,
	keyValuePairsToObject
} from '../../editor/utils';

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
	const { consts } = attributes;
	const [isOpen, setIsOpen] = useState(false);
	const [configList, updateConfigList] = useState(Object.entries(consts));
	const [selectedConfig, setSelectedConfig] = useState(undefined);

	useEffect(() => {
		setAttributes({ consts: keyValuePairsToObject(configList) });

		if (!isSelected) {
			handleClose();
		}
	}, [configList, isSelected]);

	const addConfig = () => {
		addKeyValuePair(configList, updateConfigList);
	};

	const updateConfig = (index, field, fieldValue) => {
		updateKeyValuePair(configList, updateConfigList, index, field, fieldValue);
	};

	const removeConfig = () => {
		removeKeyValuePair(configList, updateConfigList, selectedConfig);
	};

	/**
	 * Remove blank option when clicking outside or closing
	 */
	const handleClose = () => {
		filterEmptyKeyValuePairs(configList, updateConfigList);
		setIsOpen(false);
	};

	// Check if Add Button should be disabled
	const isAddButtonDisabled = checkAddButtonDisabled(configList);

	return (
		<div {...useBlockProps()}>
			<Placeholder
				preview={
					<VStack style={{ width: '100%' }}>
						<HStack justify='left' align={'center'} spacing={3}>
							<Icon icon={cog} size={28} className='step-icon' />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
								{!isSelected && (
									<Text weight={600}>
										{(<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(consts, null, " ")}</pre> || __('{config consts}', 'wp-playground-blueprint-editor'))}
									</Text>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<VStack spacing={4}>
								{configList.map(([key, value], index) => {
									return (
										<HStack key={index} justify="space-between" alignment="center">
											<InputControl
												label={__('Name', 'wp-playground-blueprint-editor')}
												value={key}
												__next40pxDefaultSize
												__unstableInputWidth="200px"
												onChange={(value) => updateConfig(index, 'key', value)}
											/>
											<InputControl
												label={__('Value', 'wp-playground-blueprint-editor')}
												value={value}
												__next40pxDefaultSize
												__unstableInputWidth="200px"
												onChange={(value) => updateConfig(index, 'value', value)}
											/>
											<Button
												isDestructive
												icon={trash}
												label={__('Delete Config', 'wp-playground-blueprint-editor')}
												onClick={() => {
													setSelectedConfig(index);
													setIsOpen(true);
												}}
												style={{ width: '40px', marginTop: '24px' }}
											/>
										</HStack>
									)
								})}
								<Button
									icon={plus}
									variant="secondary"
									label={__('Add Option', 'wp-playground-blueprint-editor')}
									onClick={addConfig}
									disabled={isAddButtonDisabled}
								/>
							</VStack>
						)}
					</VStack>
				}
			/>
			<ConfirmDialog
				isOpen={isOpen}
				onConfirm={() => {
					removeConfig();
					setSelectedConfig(undefined);
					setIsOpen(false);
				}}
				onCancel={() => setIsOpen(false)}
			>
				{__('Delete Config?', 'wp-playground-blueprint-editor')}
			</ConfirmDialog>
		</div>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: cog,
	edit: Edit,
});