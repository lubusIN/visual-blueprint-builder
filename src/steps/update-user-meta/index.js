/**
 * WordPress dependencies.
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { postAuthor, plus, trash } from '@wordpress/icons';
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
	const { meta, userId } = attributes;
	const [isOpen, setIsOpen] = useState(false);
	const [metaList, updateMetaList] = useState(Object.entries(meta));
	const [selectedMeta, setSelectedMeta] = useState(undefined);

	useEffect(() => {
		const filteredMetaList = metaList.filter(([key, value]) => key.trim() !== '' && value.trim() !== '');
		setAttributes({ meta: Object.fromEntries(filteredMetaList)});

		if (!isSelected) {
            handleClose();
        }	
	}, [metaList, isSelected]);

	const addOption = () => {
		if (metaList.some(([key, value]) => key === '' && value === '')) {
			return;
		}
		// Update list
		updateMetaList([...metaList,['', '']]);
	};

	const updateOption = (index, field, fieldValue) => {
		const updated = metaList.map(([key, value], i) => {
			if (i === index) {
				return field === 'key' ? [fieldValue, value] : [key, fieldValue];
			}
			return [key, value];
		});
		updateMetaList(updated);
	};

	const removeOption = () => {
		updateMetaList(metaList.filter((meta, index) => index !== selectedMeta));
	};

	/**
	 * Remove blank option when clicking outside or closing
	 */
	const handleClose = () => {
		updateMetaList(metaList.filter(([key, value]) => key.trim() && value.trim()));
		setIsOpen(false);
	};

	// Disable Add Button if the last entry has an empty key or value
	const isAddButtonDisabled =
	metaList.length > 0 &&
		(metaList[metaList.length - 1][0] === '' || metaList[metaList.length - 1][1] === '');

	return (
		<div {...useBlockProps()}>
			<Placeholder
				preview={
					<VStack style={{ width: '100%' }}>
						<HStack justify='left' align={'center'} spacing={3}>
							<Icon icon={postAuthor} size={28} className='step-icon' />
							<VStack spacing={1}>
								<Text upperCase size={12} weight={500} color='#949494'>{metadata.title}</Text>
								{!isSelected && (
									<VStack>
										<Text weight={600}>
											{meta ? <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(meta, null, " ")}</pre> : <span>{__('{config user meta}', 'wp-playground-blueprint-editor')}</span>}
										</Text>
										<Text weight={600}>
											{userId ? `${__('for UserId', 'wp-playground-blueprint-editor')} ${userId}` : __('{user Id}', 'wp-playground-blueprint-editor')}
										</Text>
									</VStack>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<VStack spacing={4}>
								{metaList.map(([key, value], index) => {
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
													setSelectedMeta(index);
													setIsOpen(true);
												}}
												style={{ width: '40px', marginTop: '24px' }}
											/>
										</HStack>
									)
								})}
								<HStack justify='left'>
									<InputControl
										label={__('User Id', 'wp-playground-blueprint-editor')}
										value={userId}
										onChange={(value) => setAttributes({ userId: Number(value) })}
									/>
								</HStack>
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
					removeOption();
					setSelectedMeta(undefined);
					setIsOpen(false);
				}}
				onCancel={() => setIsOpen(false)}
			>
				{__('Delete User Meta?', 'wp-playground-blueprint-editor')}
			</ConfirmDialog>
		</div >
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: postAuthor,
	edit: Edit,
});