/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { login } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Icon,
	Card,
	CardHeader,
	CardBody,
	__experimentalText as Text,
	__experimentalHStack as HStack,
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
			{!isSelected && (
				<Placeholder
					icon={login}
					label="Login"
					instructions={
						`${username} : ${password}`
					} />
			)
			}
			{isSelected && (
				<Card>
					<CardHeader>
						<HStack expanded={false} spacing={1}>
							<Icon icon={login}></Icon>
							<Text weight={600}>Login</Text>
						</HStack>
					</CardHeader>
					<CardBody>
						<CardBody size="xSmall">
							<DataForm

								data={{
									username,
									password
								}}
								fields={[
									{
										id: 'username',
										label: 'Username',
										type: 'text'
									},
									{
										id: 'password',
										label: 'Password',
										type: 'text'
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
						</CardBody>
					</CardBody>
				</Card>
			)}
		</p>
	);
}
