/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { key, login } from '@wordpress/icons';
import { Icon } from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

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
				<span
					style={ {
						display: 'inline-flex',
						alignItems: 'center',
						gap: '4px',
					} }
				>
					<span>
						{ username ||
							__( 'Username', 'visual-blueprint-builder' ) }
					</span>
					<Icon icon={ key } style={ { fill: '#949494' } } />
				</span>
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
