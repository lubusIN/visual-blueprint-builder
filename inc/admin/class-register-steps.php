<?php

/**
 * This class defines a custom blueprint steps.
 *
 * @package block-editor-for-playground-blueprint
 */

namespace Lubus\Admin\BlockEditorForPlaygroundBlueprint;

class BlueprintSteps
{
    /**
     * Construct that hooks into WordPress to initialize a blueprint steps.
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
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/login');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/install-plugin'); 
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/enable-multisite'); 
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/copy-file');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/install-plugin');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/install-theme');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/define-site-url');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/activate-theme');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/activate-plugin');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/import-wordpress-files');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/remove-dir');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/remove-file');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/reset-data');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/move');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/define-wp-config-consts');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/write-file');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/wp-cli');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/run-php');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/make-dir');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/import-wxr');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/update-user-meta');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/unzip');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/set-site-options');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/set-site-language');
        register_block_type(BEPB_PLUGIN_DIR . 'build/steps/import-theme-starter-content');
    }
}
