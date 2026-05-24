<?php

/**
 * This class defines a custom blueprint steps.
 *
 * @package visual-blueprint-builder
 */

namespace WP\Admin\VisualBlueprintBuilder;

defined('ABSPATH') || exit;

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
        $blueprint_steps = vbb_get_blueprint_steps();

        foreach ($blueprint_steps as $step) {
            register_block_type(VBB_PLUGIN_DIR . 'build/steps/' . $step);
        }
    }
}
