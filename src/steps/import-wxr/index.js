/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { details } from '@wordpress/icons';
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
 * Edit function for the plugin installation block.
 *
 * @param {Object} props Component properties.
 * @return {Element} Element to render.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { file } = attributes;
	const { url } = file;

	const handleInputChange = ( value ) => {
		setAttributes( {
			file: {
				...file,
				...value,
			},
		} );
	};

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ details }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ __(
						`from ${ url || '{wxr url}' }`,
						'wp-playground-blueprint-editor'
					) }
				</Text>
			}
		>
			<DataForm
				data={ {
					url,
				} }
				fields={ [
					{
						id: 'url',
						label: __( 'Url', 'wp-playground-blueprint-editor' ),
						type: 'text',
						placeholder: __(
							'e.g, https://your-site.com/starter-content.wxr',
							'wp-playground-blueprint-editor'
						),
					},
				] }
				form={ {
					fields: [ 'url' ],
				} }
				onChange={ handleInputChange }
			/>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: details,
	edit: Edit,
} );
