<?php
/**
 * This class handles registering and enqueueing scripts and styles.
 *
 * @package visual-blueprint-builder
 */

namespace WP\Admin\VisualBlueprintBuilder;

defined( 'ABSPATH' ) || exit;

/**
 * EnqueueScripts class.
 */
class EnqueueScripts {

	/**
	 * Constructor to initialize WordPress hooks.
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_scripts' ] );
		add_action( 'init', [ $this, 'set_script_translations' ] );
	}

	/**
	 * Enqueues scripts and styles for the block editor based on a specific post type.
	 */
	public function enqueue_editor_scripts() {
		$screen = get_current_screen();

		// Only enqueue scripts/styles for the 'blueprint' post type in the editor.
		if ( ! $screen || 'blueprint' !== $screen->post_type ) {
			return;
		}

		$this->enqueue_editor_assets();
	}

	/**
	 * Enqueues the editor-specific assets.
	 */
	private function enqueue_editor_assets() {
		$asset_file = $this->get_asset_file();
		$version    = ! empty( $asset_file['version'] ) ? $asset_file['version'] : VBB_VERSION;
		$deps       = ! empty( $asset_file['dependencies'] ) ? $asset_file['dependencies'] : [];

		wp_enqueue_script(
			'blueprint-editor',
			VBB_PLUGIN_URL . 'build/editor.js',
			$deps,
			$version,
			true
		);

		wp_localize_script(
			'blueprint-editor',
			'vbbSettings',
			[
				'wpVersions' => vbb_get_wordpress_versions(),
			]
		);

		wp_enqueue_style(
			'blueprint-editor',
			VBB_PLUGIN_URL . 'build/editor.css',
			[],
			$version
		);

		wp_style_add_data( 'blueprint-editor', 'rtl', 'replace' );
	}

	/**
	 * Retrieves the asset file containing dependencies and version information.
	 *
	 * @return array|false The asset file array or false on failure.
	 */
	private function get_asset_file() {
		$asset_file_path = VBB_PLUGIN_DIR . 'build/editor.asset.php';

		if ( file_exists( $asset_file_path ) ) {
			return require $asset_file_path;
		}

		return false;
	}

	/**
	 * Set script translations.
	 */
	public function set_script_translations() {
		wp_set_script_translations(
			'blueprint-editor', // Script handle.
			'visual-blueprint-builder', // Text domain for translations.
			VBB_PLUGIN_DIR . 'languages' // Path to the language files.
		);
	}
}
