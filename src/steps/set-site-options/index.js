/**
 * WordPress dependencies.
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { settings, plus, trash } from '@wordpress/icons';
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

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
	const { options } = attributes;
	const [isOpen, setIsOpen] = useState(false);
	const [optionList, updateOptionList] = useState(Object.entries(options));
	const [selectedOption, setSelectedOption] = useState(undefined);

	useEffect(() => {
		const filteredOptions = optionList.filter(([key, value]) => key.trim() !== '' && value.trim() !== '');
		setAttributes({ options: Object.fromEntries(filteredOptions) });

		if (!isSelected) {
			handleClose();
		}
	}, [optionList, isSelected]);

	/**
	 * Add a new option.
	 */
	const addOption = () => {
		if (optionList.some(([key, value]) => key === '' && value === '')) {
			return;
		}
		updateOptionList([...optionList, ['', '']]);
	};

	/**
	 * Update an option.
	 */
	const updateOption = (index, field, fieldValue) => {
		const updatedList = optionList.map(([key, value], i) => {
			if (i === index) {
				return field === 'key' ? [fieldValue, value] : [key, fieldValue];
			}
			return [key, value];
		});
		updateOptionList(updatedList);
	};

	/**
	 * Remove blank option when clicking outside or closing
	 */
	const handleClose = () => {
		updateOptionList(optionList.filter(([key, value]) => key.trim() && value.trim()));
		setIsOpen(false);
	};

	/**
	 * Delete an option by index.
	 */
	const deleteOption = () => {
		updateOptionList(optionList.filter((option, index) => index !== selectedOption));
		setIsOpen(false);
	};

	// Disable Add Button if the last entry has an empty key or value
	const isAddButtonDisabled =
		optionList.length > 0 &&
		(optionList[optionList.length - 1][0] === '' || optionList[optionList.length - 1][1] === '');

	return (
		<div {...useBlockProps()}>
			<Placeholder
				preview={
					<VStack style={{ width: '100%' }}>
						<HStack justify="left" align="center" spacing={3}>
							<Icon icon={settings} size={28} className="step-icon" />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color="#949494">
									{metadata.title}
								</Text>
								{!isSelected && (
									<Text weight={600}>
										{(
											<pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(options, null, ' ')}</pre> || __('{config site options}', 'wp-playground-blueprint-editor')
										)}
									</Text>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<VStack spacing={4}>
								{optionList.map(([key, value], index) => {
									return (
										<HStack key={index} justify="space-between" alignment="center">
											<InputControl
												label={__('Name', 'wp-playground-blueprint-editor')}
												value={key}
												__next40pxDefaultSize
												__unstableInputWidth="200px"
												onChange={(value) => updateOption(index, 'key', value)}
											/>
											<InputControl
												label={__('Value', 'wp-playground-blueprint-editor')}
												value={value}
												__next40pxDefaultSize
												__unstableInputWidth="200px"
												onChange={(value) => updateOption(index, 'value', value)}
											/>
											<Button
												isDestructive
												icon={trash}
												label={__('Delete Config', 'wp-playground-blueprint-editor')}
												onClick={() => {
													setSelectedOption(index);
													setIsOpen(true);
												}}
												style={{ width: '40px', marginTop: '24px' }}
											/>
										</HStack>
									);
								})}
								<Button
									icon={plus}
									variant="secondary"
									label={__('Add Option', 'wp-playground-blueprint-editor')}
									onClick={addOption}
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
					deleteOption();
					setSelectedOption(undefined);
					setIsOpen(false);
				}}
				onCancel={() => { setIsOpen(false) }}
			>
				{__('Delete Option?', 'wp-playground-blueprint-editor')}
			</ConfirmDialog>
		</div>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: settings,
	edit: Edit,
});
