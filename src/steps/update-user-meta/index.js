/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { postAuthor } from '@wordpress/icons';
import { TextControl } from '@wordpress/components';
import { Stack } from '@wordpress/ui';

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
			icon={ postAuthor }
			isSelected={ isSelected }
			summary={
				<div>
					<div>
						{ meta && Object.keys( meta ).length > 0 ? (
							<pre
								style={ {
									whiteSpace: 'pre-wrap',
									margin: 0,
								} }
							>
								{ JSON.stringify( meta, null, ' ' ) }
							</pre>
						) : (
							__(
								'{config user meta}',
								'visual-blueprint-builder'
							)
						) }
					</div>
					<div>
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
					</div>
				</div>
			}
		>
			<Stack direction="column" gap="lg">
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
				<TextControl
					label={ __( 'User Id', 'visual-blueprint-builder' ) }
					type="number"
					value={ userId !== undefined ? String( userId ) : '' }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					style={ { maxWidth: '160px' } }
					onChange={ ( value ) =>
						setAttributes( {
							userId: value === '' ? undefined : Number( value ),
						} )
					}
				/>
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: postAuthor,
	edit: Edit,
} );
