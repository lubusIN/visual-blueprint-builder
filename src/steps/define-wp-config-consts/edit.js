/**
 * WordPress dependencies.
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { cog, plus, trash } from '@wordpress/icons';
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
	const { consts } = attributes;
	const [isOpen, setIsOpen] = useState(false);
	const [configName, setConfigName] = useState('');
	const [configValue, setConfigValue] = useState('');

	return (
		<div {...useBlockProps()}>
			<Placeholder
				icon={cog}
				label="WP Config">
				{!isSelected && ( <pre>{JSON.stringify(consts, null, " ")}</pre> ||`{config consts}`)}
				{isSelected && (
					<VStack>
						<HStack alignment='bottom'>
							<InputControl
								label="Name"
								value={configName}
								onChange={(value) => setConfigName(value)}
							/>
							<InputControl
								label="Value"
								value={configValue}
								onChange={(value) => setConfigValue(value)}
							/>
							<Button
								icon={plus}
								label="Add Config"
								onClick={() => {
									setAttributes({
										consts: {
											...consts,
											[configName]: configValue
										}
									})
								}}
							/>
						</HStack>
						{consts && Object.entries(consts).map(([key, value]) => {
							return (
								<HStack key={key} alignment='bottom'>
									<InputControl
										label="Key"
										value={key}
										onChange={() => alert('test')}
									/>
									<InputControl
										label="Value"
										value={value}
										onChange={() => alert('test')}
									/>
									<Button
										isDestructive
										icon={trash}
										label="Delete Config"
										onClick={() => {
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
					setIsOpen(false);
				}}
				onCancel={() => setIsOpen(false)}
			>
				Delete Config?
			</ConfirmDialog>
		</div>
	);
}
