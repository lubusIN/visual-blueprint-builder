/**
 * External dependencies
 */
import { act } from 'react';

/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import StepWrapper from '../../../src/components/step-wrapper';

describe( 'StepWrapper Component', () => {
	let container;
	let root;

	beforeEach( () => {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		root = createRoot( container );
	} );

	afterEach( () => {
		act( () => {
			root.unmount();
		} );
		container.remove();
	} );

	it( 'renders title, icon, and summary when not selected', () => {
		act( () => {
			root.render(
				<StepWrapper
					title="Test Step Title"
					icon="admin-plugins"
					summary="Summary of step actions"
					isSelected={ false }
				>
					<div data-testid="child-content">Active Editor Child</div>
				</StepWrapper>
			);
		} );

		expect( container.textContent ).toContain( 'Test Step Title' );
		expect( container.textContent ).toContain( 'Summary of step actions' );
		// When not selected, child should not be visible in summary mode
		expect(
			container.querySelector( '[data-testid="child-content"]' )
		).toBeNull();
	} );

	it( 'renders children when isSelected is true', () => {
		act( () => {
			root.render(
				<StepWrapper
					title="Test Step Title"
					icon="admin-plugins"
					summary="Summary of step actions"
					isSelected={ true }
				>
					<div data-testid="child-content">Active Editor Child</div>
				</StepWrapper>
			);
		} );

		expect( container.textContent ).toContain( 'Test Step Title' );
		expect(
			container.querySelector( '[data-testid="child-content"]' )
		).not.toBeNull();
		expect(
			container.querySelector( '[data-testid="child-content"]' )
				.textContent
		).toBe( 'Active Editor Child' );
	} );
} );
