/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { folder } from '@wordpress/icons';
import {
	TextControl,
	TextareaControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper } from '../../components';

/**
 * Edit function for write-files block.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { writeToPath = '', filesTree = { name: 'directory', files: {} } } =
		attributes;

	const isGit = filesTree.resource === 'git:directory';
	const [ rawFilesJson, setRawFilesJson ] = useState( () => {
		try {
			return JSON.stringify( filesTree.files || {}, null, 2 );
		} catch {
			return '{}';
		}
	} );

	const handleSourceChange = ( newSource ) => {
		if ( newSource === 'git:directory' ) {
			setAttributes( {
				filesTree: {
					resource: 'git:directory',
					url: filesTree.url || '',
					ref: filesTree.ref || 'HEAD',
					path: filesTree.path || '',
				},
			} );
		} else {
			let parsedFiles = {};
			try {
				parsedFiles = JSON.parse( rawFilesJson );
			} catch {
				parsedFiles = {};
			}

			setAttributes( {
				filesTree: {
					name: filesTree.name || 'directory',
					files: parsedFiles,
				},
			} );
		}
	};

	const handleFilesJsonChange = ( value ) => {
		setRawFilesJson( value );
		try {
			const parsed = JSON.parse( value );
			setAttributes( {
				filesTree: {
					...filesTree,
					name: filesTree.name || 'directory',
					files: parsed,
				},
			} );
		} catch {
			// Leave invalid JSON in rawFilesJson without corrupting filesTree
		}
	};

	const summary = writeToPath
		? sprintf(
				/* translators: %s: target directory path */
				__( 'write directory tree to %s', 'visual-blueprint-builder' ),
				writeToPath
		  )
		: __( 'Write Directory Tree', 'visual-blueprint-builder' );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ folder }
			isSelected={ isSelected }
			summary={ summary }
		>
			<Stack direction="column" gap="md">
				<TextControl
					label={ __(
						'Destination Path',
						'visual-blueprint-builder'
					) }
					value={ writeToPath }
					placeholder="/wordpress/wp-content/plugins/my-plugin"
					help={ __(
						'The directory inside Playground to write the files to.',
						'visual-blueprint-builder'
					) }
					onChange={ ( val ) =>
						setAttributes( { writeToPath: val } )
					}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>

				<ToggleGroupControl
					label={ __( 'Source', 'visual-blueprint-builder' ) }
					value={ isGit ? 'git:directory' : 'inline' }
					isBlock
					onChange={ handleSourceChange }
					__nextHasNoMarginBottom
				>
					<ToggleGroupControlOption
						value="inline"
						label={ __(
							'Inline Directory Tree',
							'visual-blueprint-builder'
						) }
					/>
					<ToggleGroupControlOption
						value="git:directory"
						label={ __(
							'Git Directory',
							'visual-blueprint-builder'
						) }
					/>
				</ToggleGroupControl>

				{ ! isGit && (
					<>
						<TextControl
							label={ __(
								'Root Directory Name',
								'visual-blueprint-builder'
							) }
							value={ filesTree.name || '' }
							placeholder="my-plugin"
							onChange={ ( val ) =>
								setAttributes( {
									filesTree: {
										...filesTree,
										name: val,
									},
								} )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextareaControl
							label={ __(
								'Files Mapping (JSON format)',
								'visual-blueprint-builder'
							) }
							value={ rawFilesJson }
							placeholder={
								'{\n  "index.php": "<?php echo \\"Hello World!\\"; ?>",\n  "public": {\n    "style.css": "body { color: red; }"\n  }\n}'
							}
							help={ __(
								'Maps file names to string content or nested subdirectory objects.',
								'visual-blueprint-builder'
							) }
							onChange={ handleFilesJsonChange }
							rows={ 8 }
							__nextHasNoMarginBottom
						/>
					</>
				) }

				{ isGit && (
					<>
						<TextControl
							label={ __(
								'Git Repository URL',
								'visual-blueprint-builder'
							) }
							value={ filesTree.url || '' }
							placeholder="https://github.com/WordPress/wordpress-playground.git"
							onChange={ ( val ) =>
								setAttributes( {
									filesTree: {
										...filesTree,
										url: val,
									},
								} )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __(
								'Git Ref (Branch, tag, or commit)',
								'visual-blueprint-builder'
							) }
							value={ filesTree.ref || '' }
							placeholder="HEAD"
							onChange={ ( val ) =>
								setAttributes( {
									filesTree: {
										...filesTree,
										ref: val,
									},
								} )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __(
								'Subdirectory in Repo (Optional)',
								'visual-blueprint-builder'
							) }
							value={ filesTree.path || '' }
							placeholder="wp-content/plugins/hello-dolly"
							onChange={ ( val ) =>
								setAttributes( {
									filesTree: {
										...filesTree,
										path: val,
									},
								} )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</>
				) }
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: folder,
	edit: Edit,
} );
