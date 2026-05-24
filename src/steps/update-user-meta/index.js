/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { postAuthor, plus, trash } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	__experimentalInputControl as InputControl,
	__experimentalVStack as VStack,
	__experimentalText as Text,
} from '@wordpress/components';

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
	const { meta, userId } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ postAuthor }
			isSelected={ isSelected }
			summary={
				<VStack>
					<Text weight={ 600 }>
						{ meta ? (
							<pre style={ { whiteSpace: 'pre-wrap' } }>
								{ JSON.stringify( meta, null, ' ' ) }
							</pre>
						) : (
							<span>
								{ __(
									'{config user meta}',
									'wp-playground-blueprint-editor'
								) }
							</span>
						) }
					</Text>
					<Text weight={ 600 }>
						{ userId
							? `${ __(
									'for UserId',
									'wp-playground-blueprint-editor'
							  ) } ${ userId }`
							: __(
									'{user Id}',
									'wp-playground-blueprint-editor'
							  ) }
					</Text>
				</VStack>
			}
		>
			<VStack spacing={ 4 }>
				<KeyValueEditor
					data={ meta }
					onChange={ ( val ) => setAttributes( { meta: val } ) }
					addButtonLabel={ __(
						'Add Item',
						'wp-playground-blueprint-editor'
					) }
					deleteButtonLabel={ __(
						'Delete Item',
						'wp-playground-blueprint-editor'
					) }
				/>
				<InputControl
					label={ __( 'User Id', 'wp-playground-blueprint-editor' ) }
					type="number"
					value={ userId }
					__next40pxDefaultSize
					__unstableInputWidth="120px"
					onChange={ ( value ) =>
						setAttributes( { userId: Number( value ) } )
					}
				/>
			</VStack>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: postAuthor,
	edit: Edit,
} );
