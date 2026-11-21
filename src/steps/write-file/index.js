/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { file } from '@wordpress/icons';
import {
	TextControl,
	TextareaControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for write-file block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { path, data } = attributes;

	const dataType = typeof data === 'string' ? 'string' : 'url';
	const stringValue = typeof data === 'string' ? data : '';
	const urlValue = typeof data === 'object' && data?.url ? data.url : '';

	const handleDataTypeChange = ( value ) => {
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

	const summary = path
		? sprintf(
				/* translators: %s: file path */
				__( 'write file at %s', 'visual-blueprint-builder' ),
				path
		  )
		: __( 'write file', 'visual-blueprint-builder' );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ file }
			isSelected={ isSelected }
			summary={ summary }
		>
			<Stack direction="column" gap="md">
				<TextControl
					label={ __( 'Path', 'visual-blueprint-builder' ) }
					value={ path || '' }
					placeholder={ __(
						'The path of the file to write to',
						'visual-blueprint-builder'
					) }
					onChange={ ( value ) => setAttributes( { path: value } ) }
				/>

				<ToggleGroupControl
					label={ __( 'Data', 'visual-blueprint-builder' ) }
					value={ dataType }
					onChange={ handleDataTypeChange }
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					isBlock
				>
					<ToggleGroupControlOption
						value="string"
						label={ __( 'Text', 'visual-blueprint-builder' ) }
					/>
					<ToggleGroupControlOption
						value="url"
						label={ __( 'File URL', 'visual-blueprint-builder' ) }
					/>
				</ToggleGroupControl>

				{ dataType === 'string' ? (
					<TextareaControl
						__nextHasNoMarginBottom
						label={ __( 'Content', 'visual-blueprint-builder' ) }
						hideLabelFromVision
						onChange={ ( value ) =>
							setAttributes( { data: value } )
						}
						placeholder={ __(
							'The data to write',
							'visual-blueprint-builder'
						) }
						value={ stringValue }
						rows={ 6 }
					/>
				) : (
					<TextControl
						label={ __( 'File URL', 'visual-blueprint-builder' ) }
						hideLabelFromVision
						value={ urlValue }
						placeholder={ __(
							'https://example.com/file.txt',
							'visual-blueprint-builder'
						) }
						onChange={ handleUrlChange }
						type="url"
					/>
				) }
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: file,
	edit: Edit,
} );
