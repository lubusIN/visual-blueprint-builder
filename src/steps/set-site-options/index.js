/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';
import { settings } from '@wordpress/icons';
import { __experimentalText as Text } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { StepWrapper, TreeEditor } from '../../components';
import metadata from './block.json';

/**
 * Edit function for the plugin installation block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { options } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ settings }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					<pre style={ { whiteSpace: 'pre-wrap' } }>
						{ JSON.stringify( options, null, 2 ) }
					</pre>
				</Text>
			}
		>
			<TreeEditor
				data={ options }
				onChange={ ( val ) => setAttributes( { options: val } ) }
			/>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: settings,
	edit: Edit,
} );
