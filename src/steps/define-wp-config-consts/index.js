/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { cog } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, KeyValueEditor } from '../../components';

/**
 * Edit function for define-wp-config-consts block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { consts } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ cog }
			isSelected={ isSelected }
			summary={
				consts && Object.keys( consts ).length > 0 ? (
					<pre className="vbb-code-summary">
						{ JSON.stringify( consts, null, ' ' ) }
					</pre>
				) : (
					__( '{config consts}', 'visual-blueprint-builder' )
				)
			}
		>
			<KeyValueEditor
				data={ consts }
				onChange={ ( val ) => setAttributes( { consts: val } ) }
				addButtonLabel={ __(
					'Add Option',
					'visual-blueprint-builder'
				) }
				deleteButtonLabel={ __(
					'Delete Config',
					'visual-blueprint-builder'
				) }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: cog,
	edit: Edit,
} );
