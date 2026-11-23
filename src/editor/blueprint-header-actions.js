/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { downloadBlob } from '@wordpress/blob';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCopyToClipboard } from '@wordpress/compose';
import { useEffect, useState, useMemo, createPortal } from '@wordpress/element';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { external } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { sanitizePreparedSchemaString, useBlueprintData } from './utils';
import { PLAYGROUND_BASE, PLAYGROUND_BUILDER_BASE } from './constant';
import playgroundLogo from '../components/playground-logo';

/**
 * Component to add a dropdown in the editor header with Blueprint actions.
 *
 * @return {JSX.Element|null} The header dropdown component or null if not mounted.
 */
function HeaderBlueprintDropdown() {
	const [ mount, setMount ] = useState( null );
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );
	const { prepareSchema } = useBlueprintData();

	const isEditorReady = useSelect( ( select ) => {
		const ed = select( 'core/editor' );
		const postType = ed?.getEditedPostAttribute?.( 'type' );
		return !! postType;
	}, [] );

	useEffect( () => {
		if ( ! isEditorReady ) {
			return;
		}

		let currentEl = null;

		const updateMount = () => {
			const header = document.querySelector(
				'.editor-header__settings .interface-pinned-items'
			);

			if ( ! header ) {
				if ( currentEl?.parentNode ) {
					currentEl.parentNode.removeChild( currentEl );
				}
				currentEl = null;
				setMount( null );
				return;
			}

			// If currentEl is already mounted inside the current live header, nothing to do.
			if ( currentEl && header.contains( currentEl ) ) {
				return;
			}

			// Clean up previous element if it exists.
			if ( currentEl?.parentNode ) {
				currentEl.parentNode.removeChild( currentEl );
			}

			// Clean up any stale dropdown element in header.
			const staleEl = header.querySelector(
				'.wp-playground-blueprint-header-dropdown'
			);
			if ( staleEl ) {
				staleEl.remove();
			}

			const el = document.createElement( 'div' );
			el.className = 'wp-playground-blueprint-header-dropdown';
			header.prepend( el );
			currentEl = el;
			setMount( el );
		};

		updateMount();

		if ( typeof MutationObserver !== 'undefined' ) {
			const observer = new MutationObserver( () => {
				updateMount();
			} );

			observer.observe( document.body, {
				childList: true,
				subtree: true,
			} );

			return () => {
				observer.disconnect();
				if ( currentEl?.parentNode ) {
					currentEl.parentNode.removeChild( currentEl );
				}
				setMount( null );
			};
		}

		return () => {
			if ( currentEl?.parentNode ) {
				currentEl.parentNode.removeChild( currentEl );
			}
			setMount( null );
		};
	}, [ isEditorReady ] );

	const minifiedBlueprintJson = useMemo( () => {
		try {
			const prepared = prepareSchema();
			const sanitized = sanitizePreparedSchemaString( prepared );
			return btoa(
				String.fromCharCode(
					...new Uint8Array( new TextEncoder().encode( sanitized ) )
				)
			);
		} catch {
			return '';
		}
	}, [ prepareSchema ] );

	const builderHref = useMemo( () => {
		return encodeURI( PLAYGROUND_BUILDER_BASE + minifiedBlueprintJson );
	}, [ minifiedBlueprintJson ] );

	const handleDownload = () => {
		try {
			const prepared = prepareSchema();
			const sanitized = sanitizePreparedSchemaString( prepared );
			downloadBlob(
				'playground-blueprint.json',
				sanitized,
				'application/json'
			);
			createSuccessNotice(
				__(
					'Preparing Blueprint for download!',
					'visual-blueprint-builder'
				),
				{ type: 'snackbar' }
			);
		} catch {
			createErrorNotice(
				__(
					'Failed to download Blueprint JSON.',
					'visual-blueprint-builder'
				)
			);
		}
	};

	const handleCopy = useCopyToClipboard( () => {
		const prepared = prepareSchema();
		createSuccessNotice(
			__( 'Blueprint copied to clipboard!', 'visual-blueprint-builder' ),
			{ type: 'snackbar' }
		);
		return prepared;
	} );

	if ( ! mount ) {
		return null;
	}

	return createPortal(
		<DropdownMenu
			icon={ playgroundLogo }
			label={ __( 'Blueprint actions', 'visual-blueprint-builder' ) }
			toggleProps={ {
				'aria-label': __(
					'Blueprint actions',
					'visual-blueprint-builder'
				),
			} }
			popoverProps={ { placement: 'bottom-start' } }
		>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								handleDownload();
								onClose();
							} }
						>
							{ __(
								'Download JSON',
								'visual-blueprint-builder'
							) }
						</MenuItem>
						<MenuItem ref={ handleCopy }>
							{ __( 'Copy JSON', 'visual-blueprint-builder' ) }
						</MenuItem>
						<MenuItem
							href={ builderHref }
							target="_blank"
							onClick={ onClose }
						>
							{ __(
								'Open in Builder',
								'visual-blueprint-builder'
							) }
						</MenuItem>
					</MenuGroup>
					<MenuGroup>
						<MenuItem
							icon={ external }
							href={ PLAYGROUND_BASE + minifiedBlueprintJson }
							target="_blank"
							onClick={ onClose }
						>
							{ __( 'Playground', 'visual-blueprint-builder' ) }
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>,
		mount
	);
}

/**
 * Register the plugin to add the dropdown to the header.
 */
registerPlugin( 'blueprint-header-dropdown', {
	render: HeaderBlueprintDropdown,
} );
