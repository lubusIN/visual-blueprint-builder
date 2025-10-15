/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { postAuthor, plus, trash } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Button,
	Icon,
	__experimentalGrid as Grid,
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
	const { meta, userId } = attributes;
	const [isOpen, setIsOpen] = useState(false);
	const [metaList, updateMetaList] = useState(Object.entries(meta || {}));
	const [selectedMeta, setSelectedMeta] = useState(undefined);

	useEffect(() => {
		const metaObject = keyValuePairsToObject(metaList);
		if (JSON.stringify(meta) !== JSON.stringify(metaObject)) {
			setAttributes({ meta: metaObject });
		}
	}, [metaList]);

	const addOption = () => {
		addKeyValuePair(metaList, updateMetaList);
	};

	const updateOption = (index, field, fieldValue) => {
		updateKeyValuePair(metaList, updateMetaList, index, field, fieldValue);
	};

	const removeOption = () => {
		removeKeyValuePair(metaList, updateMetaList, selectedMeta);
	};

	/**
	 * Remove blank option when clicking outside or closing
	 */
	const handleClose = () => {
		filterEmptyKeyValuePairs(metaList, updateMetaList);
		setIsOpen(false);
	};

	// Check if Add Button should be disabled
	const isAddButtonDisabled = checkAddButtonDisabled(metaList);

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
											{meta ? <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(meta, null, " ")}</pre> : <span>{__('{config user meta}', 'wp-playground-blueprint-editor')}</span>}
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
										<Grid templateColumns={'auto auto 40px'}>
											<InputControl
												label={__('Name', 'wp-playground-blueprint-editor')}
												value={key}
												__next40pxDefaultSize
												__unstableInputWidth="100%"
												onChange={(value) => updateOption(index, 'key', value)}
											/>
											<InputControl
												label={__('Value', 'wp-playground-blueprint-editor')}
												value={value}
												__next40pxDefaultSize
												__unstableInputWidth="100%"
												onChange={(value) => updateOption(index, 'value', value)}
											/>
											<Button
												isDestructive
												icon={trash}
												label={__('Delete Item', 'wp-playground-blueprint-editor')}
												onClick={() => {
													setSelectedMeta(index);
													setIsOpen(true);
												}}
												style={{ width: '40px', marginTop: '24px' }}
											/>
										</Grid>
									)
								})}
								<Button
									icon={plus}
									variant="secondary"
									label={__('Add Item', 'wp-playground-blueprint-editor')}
									onClick={addOption}
									disabled={isAddButtonDisabled}
								/>
								<InputControl
									label={__('User Id', 'wp-playground-blueprint-editor')}
									type='number'
									value={userId}
									__next40pxDefaultSize
									__unstableInputWidth="120px"
									onChange={(value) => setAttributes({ userId: Number(value) })}
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
		</div>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	icon: postAuthor,
	edit: Edit,
});