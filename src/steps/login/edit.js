/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { login } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const { username, password } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={login}
				label="Login"
				instructions={!isSelected && `${username} : ${password}`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={{
								username,
								password
							}}
							fields={[
								{
									id: 'username',
									label: 'Username',
									type: 'text',
									placeholder: 'Enter username'
								},
								{
									id: 'password',
									label: 'Password',
									type: 'text',
									placeholder: 'Enter password'
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
					</VStack>
				)}
			</Placeholder>
		</p>
	);
}
