/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { login } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';
import { Stack, Text } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for login block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { username = 'admin' } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ login }
			isSelected={ isSelected }
			summary={
				<Stack direction="row" align="center" gap="xs">
					<Text variant="body-md">{ username || 'admin' }</Text>
				</Stack>
			}
		>
			<DataForm
				data={ {
					username,
				} }
				fields={ [
					{
						id: 'username',
						label: __( 'Username', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'Enter username (defaults to admin)',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'username' ],
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
