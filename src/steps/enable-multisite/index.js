/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { sites } from '@wordpress/icons';
import { TextControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { StepWrapper } from '../../components';
import metadata from './block.json';

/**
 * Edit function for enable-multisite block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { wpCliPath = '' } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ sites }
			isSelected={ isSelected }
			summary={ __(
				'Activate Multisite Network',
				'visual-blueprint-builder'
			) }
		>
			<TextControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={ __(
					'Custom WP-CLI Path (Optional)',
					'visual-blueprint-builder'
				) }
				value={ wpCliPath }
				placeholder={ __(
					'Optional custom wp-cli.phar path',
					'visual-blueprint-builder'
				) }
				onChange={ ( value ) =>
					setAttributes( { wpCliPath: value || undefined } )
				}
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: sites,
	edit: Edit,
} );
