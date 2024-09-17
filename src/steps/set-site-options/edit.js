/**
 * WordPress dependencies.
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { settings, plus, trash } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Button,
	__experimentalConfirmDialog as ConfirmDialog,
	__experimentalInputControl as InputControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import './editor.scss';

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const { options } = attributes;
	const [isOpen, setIsOpen] = useState(false);
	const [optionName, setOptionName] = useState('');
	const [optionValue, setOptionValue] = useState('');
	const [optionList, updateOptionList] = useState(Object.entries(options));
	const [selectedOption, setSelectedOption] = useState(undefined);

	useEffect(() => {
		setAttributes({
			options: Object.fromEntries(optionList)
		});
	}, [optionList]);

	const addOption = () => {
		// Update list
		updateOptionList([
			...optionList,
			[optionName, optionValue]
		]);

		// Clear add form
		setOptionName('');
		setOptionValue('');
	};

	const updateOption = (index, field, fieldValue) => {
		const updated = optionList.map(([key, value], i) => {
			if (i === index) {
				if ('key' === field) {
					return [fieldValue, value]
				}

				if ('value' === field) {
					return [key, fieldValue]
				}
			} else {
				return [key, value];
			}
		});

		updateOptionList(updated);
	};

	const removeOption = () => {
		updateOptionList(optionList.filter((option, index) => index !== selectedOption));
	};

	return (
		<div {...useBlockProps()}>
			<Placeholder
				icon={settings}
				label="Site Options">
				{!isSelected && (<pre>{JSON.stringify(options, null, " ")}</pre> || `{config site options}`)}
				{isSelected && (
					<VStack>
						<HStack alignment='bottom'>
							<InputControl
								label="Name"
								value={optionName}
								onChange={(value) => { setOptionName(value) }}
							/>
							<InputControl
								label="Value"
								value={optionValue}
								onChange={(value) => setOptionValue(value)}
							/>
							<Button
								icon={plus}
								label="Add Config"
								onClick={addOption}
							/>
						</HStack>
						{options && optionList.map(([key, value], index) => {
							return (
								<HStack key={index} alignment='bottom'>
									<InputControl
										label="Name"
										value={key}
										onChange={(value) => updateOption(index,'key', value)}
									/>
									<InputControl
										label="Value"
										value={value}
										onChange={(value) => updateOption(index,'value', value)}
									/>
									<Button
										isDestructive
										icon={trash}
										label="Delete Config"
										onClick={() => {
											setSelectedOption(index);
											setIsOpen(true);
										}}
									/>
								</HStack>
							)
						})}
					</VStack>
				)}
			</Placeholder>
			<ConfirmDialog
				isOpen={isOpen}
				onConfirm={() => {
					removeOption();
					setSelectedOption(undefined);
					setIsOpen(false);
				}}
				onCancel={() => setIsOpen(false)}
			>
				Delete Option?
			</ConfirmDialog>
		</div>
	);
}
