/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { page } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	TextControl,
	TextareaControl,
	Icon,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

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
	const { path, data } = attributes;

	// Determine the current data type
	const dataType = typeof data === 'string' ? 'string' : 'url';
	const stringValue = typeof data === 'string' ? data : '';
	const urlValue = typeof data === 'object' && data?.url ? data.url : '';

	const handleDataTypeChange = ( value ) => {
		// Only change if switching to a different type
		if ( value === dataType ) {
			return;
		}

		if ( value === 'string' ) {
			setAttributes( { data: stringValue || '' } );
		} else {
			setAttributes( {
				data: {
					resource: 'url',
					url: urlValue || '',
				},
			} );
		}
	};
	const handleUrlChange = ( value ) => {
		setAttributes( {
			data: {
				resource: 'url',
				url: value,
			},
		} );
	};

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ page }
			isSelected={ isSelected }
			summary={
				<Text weight={ 600 }>
					{ __( 'write file at', 'wp-playground-blueprint-editor' ) }{ ' ' }
					{ path }
				</Text>
			}
		>
			<VStack spacing={ 3 }>
				<TextControl
					label={ __( 'Path', 'wp-playground-blueprint-editor' ) }
					value={ path || '' }
					placeholder={ __(
						'The path of the file to write to',
						'wp-playground-blueprint-editor'
					) }
					onChange={ ( value ) => setAttributes( { path: value } ) }
				/>

				<ToggleGroupControl
					label={ __( 'Data', 'wp-playground-blueprint-editor' ) }
					value={ dataType }
					onChange={ handleDataTypeChange }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					isBlock
				>
					<ToggleGroupControlOption
						value="string"
						label={ __( 'Text', 'wp-playground-blueprint-editor' ) }
					/>
					<ToggleGroupControlOption
						value="url"
						label={ __(
							'File URL',
							'wp-playground-blueprint-editor'
						) }
					/>
				</ToggleGroupControl>

				{ dataType === 'string' ? (
					<TextareaControl
						__nextHasNoMarginBottom
						label={ __(
							'Content',
							'wp-playground-blueprint-editor'
						) }
						hideLabelFromVision
						onChange={ ( value ) =>
							setAttributes( { data: value } )
						}
						placeholder={ __(
							'The data to write',
							'wp-playground-blueprint-editor'
						) }
						value={ stringValue }
						rows={ 6 }
					/>
				) : (
					<TextControl
						label={ __(
							'File URL',
							'wp-playground-blueprint-editor'
						) }
						hideLabelFromVision
						value={ urlValue }
						placeholder={ __(
							'https://example.com/file.txt',
							'wp-playground-blueprint-editor'
						) }
						onChange={ handleUrlChange }
						type="url"
					/>
				) }
			</VStack>
		</StepWrapper>
	);
}

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType( metadata.name, {
	icon: page,
	edit: Edit,
} );
