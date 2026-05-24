/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { cog, plus, trash } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder, __experimentalText as Text } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, KeyValueEditor } from '../../components';

/**
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { consts } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ cog }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ (
						<pre style={ { whiteSpace: 'pre-wrap' } }>
							{ JSON.stringify( consts, null, ' ' ) }
						</pre>
					) ||
						__(
							'{config consts}',
							'wp-playground-blueprint-editor'
						) }
				</Text>
			}
		>
			<KeyValueEditor
				data={ consts }
				onChange={ ( val ) => setAttributes( { consts: val } ) }
				addButtonLabel={ __(
					'Add Option',
					'wp-playground-blueprint-editor'
				) }
				deleteButtonLabel={ __(
					'Delete Config',
					'wp-playground-blueprint-editor'
				) }
			/>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: cog,
	edit: Edit,
} );
