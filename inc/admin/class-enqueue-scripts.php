<?php

/**
 * This class handles registering and enqueueing scripts and styles.
 *
 * @package wordpress-popup-builder
 */

namespace Lubus\Admin\BlockEditorForPlaygroundBlueprint;

class EnqueueScripts
{
    /**
     * Constructor to initialize WordPress hooks.
     */
    public function __construct()
    {
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_scripts']);
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

        $this->enqueue_editor_js_scripts();
    }

    /**
     * Enqueues the editor-specific js scripts.
     */
    private function enqueue_editor_js_scripts()
    {
        $assetFile = $this->get_asset_file();

        wp_enqueue_script(
            'blueprint-editor',
            BEPB_PLUGIN_URL . 'build/editor.js',
            $assetFile['dependencies'],
            $assetFile['version'],
            true
        );
    }

    /**
     * Retrieves the asset file containing dependencies and version information.
     *
     * @return array|false The asset file array or false on failure.
     */
    private function get_asset_file()
    {
        $assetFilePath = BEPB_PLUGIN_DIR . 'build/editor.asset.php';

        if (file_exists($assetFilePath)) {
            return require $assetFilePath;
        }

        return false;
    }
}
