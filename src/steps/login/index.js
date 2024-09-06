/**
 * Wordpress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';
import { login } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {

	icon: login,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
