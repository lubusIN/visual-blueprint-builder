/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { settings } from '@wordpress/icons';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, KeyValueEditor } from '../../components';

/**
 * Edit function for define-wp-config-consts block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { consts, method = 'rewrite-wp-config' } = attributes;

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ settings }
			isSelected={ isSelected }
			summary={
				consts && Object.keys( consts ).length > 0 ? (
					<pre className="vbb-code-summary">
						{ JSON.stringify( consts, null, ' ' ) }
					</pre>
				) : (
					__( '{config consts}', 'visual-blueprint-builder' )
				)
			}
		>
			<ToggleGroupControl
				__nextHasNoMarginBottom
				isBlock
				label={ __( 'Method', 'visual-blueprint-builder' ) }
				value={ method }
				onChange={ ( val ) => setAttributes( { method: val } ) }
				help={
					method === 'rewrite-wp-config'
						? __(
								'Rewrite: Updates define() calls directly in wp-config.php on disk.',
								'visual-blueprint-builder'
						  )
						: __(
								'Prepend: Injects constants before scripts run via auto_prepend_file without altering wp-config.php.',
								'visual-blueprint-builder'
						  )
				}
			>
				<ToggleGroupControlOption
					value="rewrite-wp-config"
					label={ __( 'Rewrite', 'visual-blueprint-builder' ) }
				/>
				<ToggleGroupControlOption
					value="define-before-run"
					label={ __( 'Prepend', 'visual-blueprint-builder' ) }
				/>
			</ToggleGroupControl>
			<KeyValueEditor
				data={ consts }
				onChange={ ( val ) => setAttributes( { consts: val } ) }
				addButtonLabel={ __(
					'Add Option',
					'visual-blueprint-builder'
				) }
				deleteButtonLabel={ __(
					'Delete Config',
					'visual-blueprint-builder'
				) }
			/>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: settings,
	edit: Edit,
} );
