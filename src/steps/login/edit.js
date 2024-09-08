/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { login } from '@wordpress/icons';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	PanelBody,
	TextControl,
	Icon,
	Button,
	Card,
	CardHeader,
	CardBody,
	__experimentalText as Text,
	__experimentalHeading as Heading,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
} from '@wordpress/components';

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
		<>
			<InspectorControls>
				<PanelBody title={__('Login Step', 'login')}>
					<TextControl
						label={__(
							'Username',
							'login'
						)}
						value={username || ''}
						onChange={(value) =>
							setAttributes({ username: value })
						}
					/>
					<TextControl
						label={__(
							'Password',
							'login'
						)}
						value={password || ''}
						onChange={(value) =>
							setAttributes({ password: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

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
								<TextControl
									label={__(
										'Username',
										'login'
									)}
									value={username || ''}
									onChange={(value) =>
										setAttributes({ username: value })
									}
								/>
								<TextControl
									label={__(
										'Password',
										'login'
									)}
									value={password || ''}
									onChange={(value) =>
										setAttributes({ password: value })
									}
								/>
							</CardBody>
						</CardBody>
					</Card>
				)}
			</p>
		</>
	);
}
