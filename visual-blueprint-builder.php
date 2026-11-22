<?php
/**
 * Plugin Name: Visual Blueprint Builder
 * Description: Design playground blueprints with a specialized block editor interface in WordPress.
 * Version: 1.0.0
 * Requires at least: 6.8
 * Requires PHP: 7.4
 * Author: Lubus
 * Author URI: https://lubus.in/
 * Contributor: Lubus, https://lubus.in/
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Text Domain: visual-blueprint-builder
 * Domain Path: /languages
 *
 * @package visual-blueprint-builder
 */

namespace WP\VisualBlueprintBuilder;

use WP\Admin\VisualBlueprintBuilder\{
	BlueprintPostType,
	BlueprintSteps,
	EnqueueScripts,
	RegisterCustomMeta
};

defined( 'ABSPATH' ) || exit;

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
} else {
	require_once __DIR__ . '/inc/admin/class-enqueue-scripts.php';
	require_once __DIR__ . '/inc/admin/class-register-post-type.php';
	require_once __DIR__ . '/inc/admin/class-register-steps.php';
	require_once __DIR__ . '/inc/admin/class-register-meta.php';
}
require_once __DIR__ . '/inc/functions.php';

if ( ! class_exists( 'VisualBlueprintBuilder' ) ) {

	/**
	 * Visual blueprint builder Main Class
	 */
	class VisualBlueprintBuilder {

		/**
		 * The single instance of the class.
		 *
		 * @var VisualBlueprintBuilder|null
		 */
		protected static $instance = null;

		/**
		 * Singleton instance method.
		 *
		 * @return self
		 */
		public static function instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor to initialize the plugin.
		 */
		public function __construct() {
			$this->setup_constants();
			$this->bootstrap();
			add_action( 'init', [ $this, 'load_textdomain' ] );
		}

		/**
		 * Setup plugin constants.
		 */
		private function setup_constants() {
			// Plugin version.
			if ( ! defined( 'VBB_VERSION' ) ) {
				define( 'VBB_VERSION', '1.0.0' );
			}

			// Plugin Root File.
			if ( ! defined( 'VBB_PLUGIN_FILE' ) ) {
				define( 'VBB_PLUGIN_FILE', __FILE__ );
			}

			// Plugin Folder Path.
			if ( ! defined( 'VBB_PLUGIN_DIR' ) ) {
				define( 'VBB_PLUGIN_DIR', plugin_dir_path( VBB_PLUGIN_FILE ) );
			}

			// Plugin Folder URL.
			if ( ! defined( 'VBB_PLUGIN_URL' ) ) {
				define( 'VBB_PLUGIN_URL', plugin_dir_url( VBB_PLUGIN_FILE ) );
			}

			// Plugin Basename aka: "visual-blueprint-builder/visual-blueprint-builder.php".
			if ( ! defined( 'VBB_PLUGIN_BASENAME' ) ) {
				define( 'VBB_PLUGIN_BASENAME', plugin_basename( VBB_PLUGIN_FILE ) );
			}
		}

		/**
		 * Bootstraps the plugin.
		 */
		private function bootstrap() {
			new EnqueueScripts();
			new BlueprintPostType();
			new BlueprintSteps();
			new RegisterCustomMeta();
		}

		/**
		 * Load the plugin textdomain for translations.
		 */
		public function load_textdomain() {
			load_plugin_textdomain(
				'visual-blueprint-builder',
				false,
				dirname( plugin_basename( VBB_PLUGIN_FILE ) ) . '/languages'
			);
		}
	}
}

// Initialize the plugin.
return VisualBlueprintBuilder::instance();
