/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { language } from '@wordpress/icons';
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
	const { language: lang } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ language }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ __( 'to', 'wp-playground-blueprint-editor' ) }{ ' ' }
					{ ` ${
						lang ||
						__(
							'{language code}',
							'wp-playground-blueprint-editor'
						)
					}` }
				</Text>
			}
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'language',
						label: __(
							'Language',
							'wp-playground-blueprint-editor'
						),
						type: 'text',
						placeholder: __(
							"e.g. 'en_US'",
							'wp-playground-blueprint-editor'
						),
					},
				] }
				form={ {
					fields: [ 'language' ],
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
	icon: language,
	edit: Edit,
} );
