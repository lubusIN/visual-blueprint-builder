/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { tool } from '@wordpress/icons';
import { TextareaControl, TextControl } from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for wp-cli block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { command, wpCliPath = '' } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ tool }
			isSelected={ isSelected }
			summary={
				command || __( '{command to run}', 'visual-blueprint-builder' )
			}
		>
			<Stack direction="column" gap="md">
				<TextareaControl
					__nextHasNoMarginBottom
					label={ __( 'Command', 'visual-blueprint-builder' ) }
					onChange={ ( value ) =>
						setAttributes( { command: value } )
					}
					placeholder="wp post create --post_title='Hello World'"
					value={ command }
				/>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __(
						'Custom WP-CLI Path (Optional)',
						'visual-blueprint-builder'
					) }
					value={ wpCliPath }
					placeholder={ __(
						'Path to custom wp-cli.phar',
						'visual-blueprint-builder'
					) }
					onChange={ ( value ) =>
						setAttributes( { wpCliPath: value || undefined } )
					}
				/>
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: tool,
	edit: Edit,
} );
