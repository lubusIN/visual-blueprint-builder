/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { key, login } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';
import { Icon, Stack, Text } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for login block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { username, password } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ login }
			isSelected={ isSelected }
			summary={
				<Stack direction="row" align="center" gap="xs">
					<Text variant="body-md">
						{ username ||
							__( 'Username', 'visual-blueprint-builder' ) }
					</Text>
					<Icon
						icon={ key }
						size={ 16 }
						style={ {
							fill: 'var(--wpds-color-fg-content-neutral-weak, #757575)',
						} }
					/>
				</Stack>
			}
		>
			<DataForm
				data={ {
					username,
					password,
				} }
				fields={ [
					{
						id: 'username',
						label: __( 'Username', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter username',
							'visual-blueprint-builder'
						),
					},
					{
						id: 'password',
						label: __( 'Password', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter password',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'username', 'password' ],
				} }
				onChange={ setAttributes }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: login,
	edit: Edit,
} );
