<?php
/**
 * This class defines custom blueprint steps.
 *
 * @package visual-blueprint-builder
 */

namespace WP\Admin\VisualBlueprintBuilder;

defined( 'ABSPATH' ) || exit;

/**
 * BlueprintSteps class.
 */
class BlueprintSteps {

	/**
	 * Construct that hooks into WordPress to initialize blueprint steps.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'register_blueprint_steps' ] );
	}

	/**
	 * Registers the 'blueprint steps' using metadata collection.
	 */
	public function register_blueprint_steps() {
		wp_register_block_types_from_metadata_collection(
			VBB_PLUGIN_DIR . 'build/steps',
			VBB_PLUGIN_DIR . 'build/blocks-manifest.php'
		);
	}
}
