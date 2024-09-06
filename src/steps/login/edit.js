/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl} from '@wordpress/components';

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
export default function Edit({ attributes, setAttributes }) {
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
				{__('Login Step', 'login')}
			</p>
		</>
	);
}
