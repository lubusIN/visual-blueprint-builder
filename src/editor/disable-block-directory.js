/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { select, subscribe } from '@wordpress/data';
import { getPlugin, unregisterPlugin } from '@wordpress/plugins';

/**
 * Disable Block Directory plugin for 'blueprint' post type.
 */
domReady( () => {
	const getPostType = () => select( 'core/editor' )?.getCurrentPostType?.();

	const tryUnregister = () => {
		const postType = getPostType();
		if ( ! postType ) {
			return;
		}

		if ( postType === 'blueprint' && getPlugin( 'block-directory' ) ) {
			unregisterPlugin( 'block-directory' );
		}

		if ( unsubscribe ) {
			unsubscribe();
		}
	};

	const unsubscribe = subscribe( tryUnregister );
	tryUnregister();
} );
