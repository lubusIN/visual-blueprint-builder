<?php

/**
 * Plugin Name: Visual Blueprint Builder
 * Description: Design playground blueprints with a specialized block editor interface in WordPress.
 * Version: 1.0.0
 * Requires PHP: 7.4
 * Author: Lubus
 * Author URI: https://lubus.in/
 * Contributor: Lubus, https://lubus.in/
 * Text Domain: visual-blueprint-builder
 * Domain Path: /languages
 * 
 * @package visual-blueprint-builder
 */

namespace WP\VisualBlueprintBuilde;

use WP\Admin\VisualBlueprintBuilder\{
    BlueprintPostType,
    BlueprintSteps,
    EnqueueScripts,
    RegisterCustomMeta
};

defined('ABSPATH') || exit;

require_once 'vendor/autoload.php';
require_once 'inc/functions.php';

if (!class_exists('VisualBlueprintBuilder')) {

    /**
     * Visual blueprint builder Main Class
     */
    class VisualBlueprintBuilder
    {
        /**
         * The single instance of the class.
         *
         * @var VisualBlueprintBuilder
         */
        protected static $_instance = null;

        /**
         * Singleton instance method.
         *
         * @return self
         */
        public static function instance()
        {
            if (is_null(self::$_instance)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        /**
         * Constructor to initialize the plugin.
         */
        public function __construct()
        {
            $this->setup_constants();
            $this->bootstrap();
            $this->load_textdomain();
        }

        /**
         * Setup plugin constants.
         */
        private function setup_constants()
        {
            // Plugin version.
            if (!defined('VBB_VERSION')) {
                define('VBB_VERSION', '1.0.0');
            }

            // Plugin Root File.
            if (!defined('VBB_PLUGIN_FILE')) {
                define('VBB_PLUGIN_FILE', __FILE__);
            }

            // Plugin Folder Path.
            if (!defined('VBB_PLUGIN_DIR')) {
                define('VBB_PLUGIN_DIR', plugin_dir_path(VBB_PLUGIN_FILE));
            }

            // Plugin Folder URL.
            if (!defined('VBB_PLUGIN_URL')) {
                define('VBB_PLUGIN_URL', plugin_dir_url(VBB_PLUGIN_FILE));
            }

            // Plugin Basename aka: "visual-blueprint-builder/visual-blueprint-builder.php".
            if (!defined('VBB_PLUGIN_BASENAME')) {
                define('VBB_PLUGIN_BASENAME', plugin_basename(VBB_PLUGIN_FILE));
            }
        }

        /**
         * Bootstraps the plugin.
         */
        private function bootstrap()
        {
            new EnqueueScripts();
            new BlueprintPostType();
            new BlueprintSteps();
            new RegisterCustomMeta();
        }

        /**
         * Load the plugin textdomain for translations.
         */
        public function load_textdomain()
        {
            load_plugin_textdomain(
                'visul-blueprint-builder',
                false,
                dirname(plugin_basename(__FILE__)) . '/languages'
            );
        }
    }
}

// Initialize the plugin
return VisualBlueprintBuilder::instance();
