<?php

/**
 * This class defines a custom blueprint steps.
 *
 * @package visual-blueprint-builder
 */

namespace WP\Admin\VisualBlueprintBuilder;

class BlueprintSteps
{
    /**
     * Construct that hooks into WordPress to initialize blueprint steps.
     */
    public function __construct()
    {
        add_action('init', [$this, 'register_blueprint_steps']);
    }

    /**
     * Registers the 'blueprint steps' with necessary arguments and labels.
     */
    public function register_blueprint_steps()
    {
        $blueprint_steps = [
            'login',
            'install-plugin',
            'enable-multisite',
            'cp',
            'install-theme',
            'define-site-url',
            'activate-theme',
            'activate-plugin',
            'import-wordpress-files',
            'rmdir',
            'rm',
            'reset-data',
            'mv',
            'define-wp-config-consts',
            'write-file',
            'wp-cli',
            'run-php',
            'mkdir',
            'import-wxr',
            'update-user-meta',
            'unzip',
            'set-site-options',
            'set-site-language',
            'import-theme-starter-content',
        ];

        foreach ($blueprint_steps as $step) {
            register_block_type(VBB_PLUGIN_DIR . 'build/steps/' . $step);
        }
    }
}
