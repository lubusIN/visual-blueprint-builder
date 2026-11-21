/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { layout } from '@wordpress/icons';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for import-theme-starter-content block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { themeSlug } = attributes;
	const summary = themeSlug
		? sprintf(
				/* translators: %s: theme slug */
				__( 'for %s', 'visual-blueprint-builder' ),
				themeSlug
		  )
		: __( 'for {THEME SLUG}', 'visual-blueprint-builder' );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ layout }
			isSelected={ isSelected }
			summary={ summary }
		>
			<DataForm
				data={ attributes }
				fields={ [
					{
						id: 'themeSlug',
						label: __( 'Theme Slug', 'visual-blueprint-builder' ),
						type: 'text',
						placeholder: __(
							'The slug of the theme to import starter content for',
							'visual-blueprint-builder'
						),
					},
				] }
				form={ {
					fields: [ 'themeSlug' ],
				} }
				onChange={ setAttributes }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: layout,
	edit: Edit,
} );
