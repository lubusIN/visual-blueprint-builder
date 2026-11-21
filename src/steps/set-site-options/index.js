/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { settings } from '@wordpress/icons';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { StepWrapper, TreeEditor } from '../../components';
import metadata from './block.json';

/**
 * Edit function for set-site-options block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { options } = attributes;

	const handleOptionsChange = useCallback(
		( val ) => {
			setAttributes( { options: val } );
		},
		[ setAttributes ]
	);

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ settings }
			isSelected={ isSelected }
			summary={
				options && Object.keys( options ).length > 0 ? (
					<pre className="vbb-code-summary">
						{ JSON.stringify( options, null, 2 ) }
					</pre>
				) : (
					__( '{site options}', 'visual-blueprint-builder' )
				)
			}
		>
			<TreeEditor data={ options } onChange={ handleOptionsChange } />
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: settings,
	edit: Edit,
} );
