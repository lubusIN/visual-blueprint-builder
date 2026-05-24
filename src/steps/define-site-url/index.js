/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { globe } from '@wordpress/icons';
import { __experimentalText as Text } from '@wordpress/components';
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
	const { siteUrl } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ globe }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ `${
						siteUrl ||
						__( 'Site Url', 'wp-playground-blueprint-editor' )
					}` }
				</Text>
			}
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'siteUrl',
						label: __(
							'Site Url',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							'e.g., https://example.com',
							'wp-playground-blueprint-editor'
						),
					},
				] }
				form={ {
					fields: [ 'siteUrl' ],
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
	icon: globe,
	edit: Edit,
} );
