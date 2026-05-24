/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { file } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Icon,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { path } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ file }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ __( 'at', 'wp-playground-blueprint-editor' ) }{ ' ' }
					{ ` ${ path || '{directory path}' }` }
				</Text>
			}
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'path',
						label: __(
							'Directory Path',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							'e.g., /wp-content/plugins/new-directory',
							'wp-playground-blueprint-editor'
						),
					},
				] }
				form={ {
					fields: [ 'path' ],
				} }
				onChange={ setAttributes }
			/>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: file,
	edit: Edit,
} );
