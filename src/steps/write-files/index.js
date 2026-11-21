/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { folder } from '@wordpress/icons';
import {
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import { StepWrapper, TreeEditor } from '../../components';

/**
 * Edit function for write-files block.
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Attributes updater.
 * @param {boolean} props.isSelected Whether block is selected.
 * @return {JSX.Element} Edit component.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { writeToPath = '', filesTree = {} } = attributes;

	const isGit = filesTree?.resource === 'git:directory';
	const treeType = isGit ? 'git' : 'inline';

	const handleTreeTypeChange = ( newType ) => {
		if ( newType === treeType ) {
			return;
		}

		if ( newType === 'git' ) {
			setAttributes( {
				filesTree: {
					resource: 'git:directory',
					url: '',
					ref: 'trunk',
					path: '',
				},
			} );
		} else {
			setAttributes( {
				filesTree: {
					name: 'files',
					files: {},
				},
			} );
		}
	};

	const handleFilesChange = ( newFiles ) => {
		setAttributes( {
			filesTree: {
				...filesTree,
				name: filesTree?.name || 'files',
				files: newFiles,
			},
		} );
	};

	const handleNameChange = ( newName ) => {
		setAttributes( {
			filesTree: {
				...filesTree,
				name: newName,
			},
		} );
	};

	const handleGitChange = ( field, val ) => {
		setAttributes( {
			filesTree: {
				...filesTree,
				resource: 'git:directory',
				[ field ]: val,
			},
		} );
	};

	const summary = writeToPath
		? sprintf(
				/* translators: %s: target directory path */
				__( 'write files to %s', 'visual-blueprint-builder' ),
				writeToPath
		  )
		: __( '{write to path}', 'visual-blueprint-builder' );

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ folder }
			isSelected={ isSelected }
			summary={ summary }
		>
			<Stack direction="column" gap="md">
				<TextControl
					__nextHasNoMarginBottom
					label={ __( 'Write To Path', 'visual-blueprint-builder' ) }
					help={ __(
						'The directory path where files should be written.',
						'visual-blueprint-builder'
					) }
					placeholder="/wordpress/wp-content/plugins/my-plugin"
					value={ writeToPath }
					onChange={ ( val ) =>
						setAttributes( { writeToPath: val } )
					}
				/>

				<ToggleGroupControl
					__nextHasNoMarginBottom
					isBlock
					label={ __( 'Source Type', 'visual-blueprint-builder' ) }
					value={ treeType }
					onChange={ handleTreeTypeChange }
				>
					<ToggleGroupControlOption
						value="inline"
						label={ __(
							'Inline Tree',
							'visual-blueprint-builder'
						) }
					/>
					<ToggleGroupControlOption
						value="git"
						label={ __(
							'Git Repository',
							'visual-blueprint-builder'
						) }
					/>
				</ToggleGroupControl>

				{ treeType === 'inline' && (
					<>
						<TextControl
							__nextHasNoMarginBottom
							label={ __(
								'Root Directory Name',
								'visual-blueprint-builder'
							) }
							placeholder="my-plugin"
							value={ filesTree?.name || '' }
							onChange={ handleNameChange }
						/>
						<TreeEditor
							data={ filesTree?.files || {} }
							onChange={ handleFilesChange }
						/>
					</>
				) }

				{ treeType === 'git' && (
					<>
						<TextControl
							__nextHasNoMarginBottom
							label={ __(
								'Git Repository URL',
								'visual-blueprint-builder'
							) }
							placeholder="https://github.com/WordPress/theme-experiments.git"
							value={ filesTree?.url || '' }
							onChange={ ( val ) =>
								handleGitChange( 'url', val )
							}
						/>
						<TextControl
							__nextHasNoMarginBottom
							label={ __(
								'Branch, Tag, or Commit',
								'visual-blueprint-builder'
							) }
							placeholder="trunk"
							value={ filesTree?.ref || '' }
							onChange={ ( val ) =>
								handleGitChange( 'ref', val )
							}
						/>
						<TextControl
							__nextHasNoMarginBottom
							label={ __(
								'Path in Repository (Optional)',
								'visual-blueprint-builder'
							) }
							placeholder="plugins/my-plugin"
							value={ filesTree?.path || '' }
							onChange={ ( val ) =>
								handleGitChange( 'path', val )
							}
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
