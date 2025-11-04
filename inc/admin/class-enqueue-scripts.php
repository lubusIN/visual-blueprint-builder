<?php

/**
 * This class handles registering and enqueueing scripts and styles.
 *
 * @package visual-blueprint-builder
 */

namespace WP\Admin\VisualBlueprintBuilder;

class EnqueueScripts
{
    /**
     * Constructor to initialize WordPress hooks.
     */
    public function __construct()
    {
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_scripts']);
        add_action('init', [$this, 'set_script_translations']);
    }

    /**
     * Enqueues scripts and styles for the block editor based on a specific post type.
     */
    public function enqueue_editor_scripts()
    {
        $screen = get_current_screen();

        // Only enqueue scripts/styles for the 'blueprint' post type in the editor
        if ('blueprint' !== $screen->post_type) {
            return;
        }

        $this->enqueue_editor_assets();
    }

    /**
     * Enqueues the editor-specific assets.
     */
    private function enqueue_editor_assets()
    {
        $assetFile = $this->get_asset_file();

        wp_enqueue_script(
            'blueprint-editor',
            VBB_PLUGIN_URL . 'build/editor.js',
            $assetFile['dependencies'],
            $assetFile['version'],
            true
        );

        wp_enqueue_style(
            'blueprint-editor',
            VBB_PLUGIN_URL . 'assets/css/editor.css',
            [],
            '1.0.0'
        );
    }

    /**
     * Retrieves the asset file containing dependencies and version information.
     *
     * @return array|false The asset file array or false on failure.
     */
    private function get_asset_file()
    {
        $assetFilePath = VBB_PLUGIN_DIR . 'build/editor.asset.php';

        if (file_exists($assetFilePath)) {
            return require $assetFilePath;
        }

        return false;
    }

    /**
     * set script translations function
     */
    public function set_script_translations()
    {
        wp_set_script_translations(
            'blueprint-editor', // script handle
            'visual-blueprint-builder', // Text domain for translations*
            plugin_dir_path(__FILE__) . 'languages'   // Path to the language files
        );
    }
}
