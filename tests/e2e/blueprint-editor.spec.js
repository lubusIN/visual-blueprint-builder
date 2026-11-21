/**
 * WordPress dependencies
 */
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Visual Blueprint Builder', () => {
	test.beforeEach( async ( { admin } ) => {
		// Create a new Blueprint post
		await admin.createNewPost( { postType: 'blueprint' } );
	} );

	test( 'loads the blueprint editor canvas without errors', async ( {
		page,
		editor,
	} ) => {
		// Ensure editor canvas body is visible
		await expect( editor.canvas.locator( 'body' ) ).toBeVisible();

		// Blueprint header actions should be present
		await expect(
			page.locator( '.vbb-header-actions, .edit-post-header' )
		).toBeVisible();
	} );

	test( 'can insert a playground step block into the canvas', async ( {
		editor,
	} ) => {
		// Insert a playground step block
		await editor.insertBlock( { name: 'playground-step/wp-cli' } );

		// Verify the step block is rendered in canvas
		const stepBlock = editor.canvas.locator(
			'[data-type="playground-step/wp-cli"]'
		);
		await expect( stepBlock ).toBeVisible();
	} );
} );
