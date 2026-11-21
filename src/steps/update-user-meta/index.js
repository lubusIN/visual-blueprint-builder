/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { people } from '@wordpress/icons';
import { TextControl } from '@wordpress/components';
import { Stack, Text } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, KeyValueEditor } from '../../components';

/**
 * Edit function for update-user-meta block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { meta, userId } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ people }
			isSelected={ isSelected }
			summary={
				<Stack direction="column" gap="xs">
					<div>
						{ meta && Object.keys( meta ).length > 0 ? (
							<pre className="vbb-code-summary">
								{ JSON.stringify( meta, null, ' ' ) }
							</pre>
						) : (
							__(
								'{config user meta}',
								'visual-blueprint-builder'
							)
						) }
					</div>
					<Text variant="body-sm">
						{ userId
							? sprintf(
									/* translators: %d: user id */
									__(
										'for UserId %d',
										'visual-blueprint-builder'
									),
									userId
							  )
							: __( '{user Id}', 'visual-blueprint-builder' ) }
					</Text>
				</Stack>
			}
		>
			<Stack direction="column" gap="lg">
				<TextControl
					label={ __( 'User Id', 'visual-blueprint-builder' ) }
					type="number"
					value={ userId !== undefined ? String( userId ) : '' }
					__next40pxDefaultSize
					style={ { maxWidth: '160px' } }
					onChange={ ( value ) =>
						setAttributes( {
							userId: value === '' ? undefined : Number( value ),
						} )
					}
				/>

				<KeyValueEditor
					data={ meta }
					onChange={ ( val ) => setAttributes( { meta: val } ) }
					addButtonLabel={ __(
						'Add Item',
						'visual-blueprint-builder'
					) }
					deleteButtonLabel={ __(
						'Delete Item',
						'visual-blueprint-builder'
					) }
				/>
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: people,
	edit: Edit,
} );
