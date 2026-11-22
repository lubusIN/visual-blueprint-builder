/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { database } from '@wordpress/icons';
import { ToggleControl } from '@wordpress/components';
import { Stack } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import { StepWrapper } from '../../components';
import metadata from './block.json';

/**
 * Edit function for reset-data block.
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Attributes updater.
 * @param {boolean} props.isSelected Whether block is selected.
 * @return {JSX.Element} Edit component.
 */
function Edit( { attributes, setAttributes, isSelected } ) {
	const { contentTypes } = attributes;

	// When contentTypes is undefined, null, or not an array, it represents "all content types"
	const isAll =
		contentTypes === undefined ||
		contentTypes === null ||
		! Array.isArray( contentTypes );

	const handleToggleAll = ( checked ) => {
		if ( checked ) {
			setAttributes( { contentTypes: undefined } );
		} else {
			setAttributes( { contentTypes: [ 'posts' ] } );
		}
	};

	const handleToggleType = ( type, checked ) => {
		const current = Array.isArray( contentTypes )
			? [ ...contentTypes ]
			: [];
		let next;
		if ( checked ) {
			next = [ ...new Set( [ ...current, type ] ) ];
		} else {
			next = current.filter( ( t ) => t !== type );
		}

		if ( next.length === 0 ) {
			return;
		}

		setAttributes( { contentTypes: next } );
	};

	let summary;
	if ( isAll ) {
		summary = __(
			'Delete all posts, pages, custom post types, and comments',
			'visual-blueprint-builder'
		);
	} else if ( contentTypes.length === 0 ) {
		summary = __(
			'Delete all content (Default)',
			'visual-blueprint-builder'
		);
	} else {
		summary = sprintf(
			/* translators: %s: Comma-separated content types */
			__( 'Delete only: %s', 'visual-blueprint-builder' ),
			contentTypes.join( ', ' )
		);
	}

	return (
		<StepWrapper
			title={ metadata.title }
			icon={ database }
			isSelected={ isSelected }
			summary={ summary }
		>
			<Stack direction="column" gap="sm">
				<ToggleControl
					label={ __(
						'Reset all content (Default)',
						'visual-blueprint-builder'
					) }
					help={ __(
						'Deletes all posts, pages, custom post types, and comments and resets ID sequences.',
						'visual-blueprint-builder'
					) }
					checked={ isAll }
					onChange={ handleToggleAll }
					__nextHasNoMarginBottom
				/>
				{ ! isAll && (
					<Stack direction="column" gap="xs">
						<ToggleControl
							label={ __( 'Posts', 'visual-blueprint-builder' ) }
							checked={ contentTypes.includes( 'posts' ) }
							onChange={ ( checked ) =>
								handleToggleType( 'posts', checked )
							}
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label={ __( 'Pages', 'visual-blueprint-builder' ) }
							checked={ contentTypes.includes( 'pages' ) }
							onChange={ ( checked ) =>
								handleToggleType( 'pages', checked )
							}
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label={ __(
								'Comments',
								'visual-blueprint-builder'
							) }
							checked={ contentTypes.includes( 'comments' ) }
							onChange={ ( checked ) =>
								handleToggleType( 'comments', checked )
							}
							__nextHasNoMarginBottom
						/>
					</Stack>
				) }
			</Stack>
		</StepWrapper>
	);
}

registerBlockType( metadata.name, {
	icon: database,
	edit: Edit,
} );
