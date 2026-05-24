/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { key, login } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Icon,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
function Edit({ attributes, setAttributes, isSelected }) {
	const { username, password } = attributes;

	return (
		<StepWrapper 
			title={metadata.title} 
			icon={login} 
			isSelected={isSelected} 
			summary={
				<HStack spacing={1}>
										<Text weight={600}>{username}</Text>
										<Icon icon={key} style={{ fill: "#949494" }} />
									</HStack>
			}
		>
			<DataForm
								data={{
									username,
									password
								}}
								fields={[
									{
										id: 'username',
										label: __('Username', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('Enter username', 'wp-playground-blueprint-editor')
									},
									{
										id: 'password',
										label: __('Password', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('Enter password', 'wp-playground-blueprint-editor')
									},
								]}
								form={{
									fields: [
										'username',
										'password'
									]
								}}
								onChange={setAttributes}
							/>
		</StepWrapper>
);