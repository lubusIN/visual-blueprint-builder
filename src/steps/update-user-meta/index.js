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
	const [metaName, setMetaName] = useState('');
	const [metaValue, setMetaValue] = useState('');
	const [metaList, updateMetaList] = useState(Object.entries(meta));
	const [selectedMeta, setSelectedMeta] = useState(undefined);

	useEffect(() => {
		setAttributes({
			meta: Object.fromEntries(metaList)
		});
	}, [metaList]);

	const addOption = () => {
		// Update list
		updateMetaList([
			...metaList,
			[metaName, metaValue]
		]);

		// Clear add form
		setMetaName('');
		setMetaValue('');
	};

	const updateOption = (index, field, fieldValue) => {
		const updated = metaList.map(([key, value], i) => {
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

		updateMetaList(updated);
	};

	const removeOption = () => {
		updateMetaList(metaList.filter((meta, index) => index !== selectedMeta));
	};

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
											{meta ? <pre>{JSON.stringify(meta, null, " ")}</pre> : <span>{__('{config user meta}', 'wp-playground-blueprint-editor')}</span>}
										</Text>
										<Text weight={600}>
											{userId ? `${__('for UserId', 'wp-playground-blueprint-editor')} ${userId}` : __('{user Id}', 'wp-playground-blueprint-editor')}
										</Text>
									</VStack>
								)}
							</VStack>
						</HStack>
						{isSelected && (
							<VStack>

								<HStack justify='left' alignment='bottom'>
									<InputControl
										label={__('Name', 'wp-playground-blueprint-editor')}
										value={metaName}
										onChange={(value) => { setMetaName(value) }}
									/>
									<InputControl
										label={__('Value', 'wp-playground-blueprint-editor')}
										value={metaValue}
										onChange={(value) => setMetaValue(value)}
									/>
									<Button
										icon={plus}
										label={__('Add Config', 'wp-playground-blueprint-editor')}
										onClick={addOption}
									/>
								</HStack>
								{meta && metaList.map(([key, value], index) => {
									return (
										<HStack justify='left' key={index} alignment='bottom'>
											<InputControl
												label={__('Name', 'wp-playground-blueprint-editor')}
												value={key}
												onChange={(value) => updateOption(index, 'key', value)}
											/>
											<InputControl
												label={__('Value', 'wp-playground-blueprint-editor')}
												value={value}
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