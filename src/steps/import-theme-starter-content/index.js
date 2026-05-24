/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { receipt } from '@wordpress/icons';
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
function Edit({ attributes, setAttributes, isSelected }) {
	const { themeSlug } = attributes;

	return (
		<StepWrapper 
			title={metadata.title} 
			icon={receipt} 
			isSelected={isSelected} 
			summary={
				<Text weight={600}>
										{__(
											`for ${themeSlug || '{THEME SLUG}'}`,
											'wp-playground-blueprint-editor'
										)}
									</Text>
			}
		>
			<DataForm
								data={attributes}
								fields={[
									{
										id: 'themeSlug',
										label: __('Theme Slug', 'wp-playground-blueprint-editor'),
										type: 'text',
										placeholder: __('e.g., twentytwentyfour', 'wp-playground-blueprint-editor'),
									},
								]}
								form={{
									fields: [
										'themeSlug'
									]
								}}
								onChange={setAttributes}
							/>
		</StepWrapper>
);