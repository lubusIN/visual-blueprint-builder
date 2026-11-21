<?php
/**
 * PHPStan bootstrap file.
 *
 * @package visual-blueprint-builder
 */

if ( ! defined( 'VBB_VERSION' ) ) {
	define( 'VBB_VERSION', '1.0.0' );
}

if ( ! defined( 'VBB_PLUGIN_FILE' ) ) {
	define( 'VBB_PLUGIN_FILE', dirname( __DIR__, 2 ) . '/visual-blueprint-builder.php' );
}

if ( ! defined( 'VBB_PLUGIN_DIR' ) ) {
	define( 'VBB_PLUGIN_DIR', dirname( __DIR__, 2 ) . '/' );
}

if ( ! defined( 'VBB_PLUGIN_URL' ) ) {
	define( 'VBB_PLUGIN_URL', 'http://example.com/wp-content/plugins/visual-blueprint-builder/' );
}

if ( ! defined( 'VBB_PLUGIN_BASENAME' ) ) {
	define( 'VBB_PLUGIN_BASENAME', 'visual-blueprint-builder/visual-blueprint-builder.php' );
}
