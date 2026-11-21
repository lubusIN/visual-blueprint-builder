/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import '../../../src/editor/steps-doc-link';

describe( 'steps-doc-link filter', () => {
	it( 'augments description with learn more link for known step blocks', () => {
		const settings = {
			name: 'playground-step/install-plugin',
			title: 'Install Plugin',
			description: 'Install a WordPress plugin',
		};

		const modified = applyFilters(
			'blocks.registerBlockType',
			settings,
			'playground-step/install-plugin'
		);

		expect( modified ).toBeDefined();
		expect( modified.description ).not.toBe( 'Install a WordPress plugin' );
	} );

	it( 'ignores non-step blocks', () => {
		const settings = {
			name: 'core/paragraph',
			title: 'Paragraph',
			description: 'Start with the building block of all narrative.',
		};

		const modified = applyFilters(
			'blocks.registerBlockType',
			settings,
			'core/paragraph'
		);

		expect( modified.description ).toBe(
			'Start with the building block of all narrative.'
		);
	} );
} );
