<?php
defined( 'ABSPATH' ) || exit;

/**
 * Retrieves the canonical list of blueprint step slugs.
 *
 * @return array Array of step slugs.
 */
function vbb_get_blueprint_steps()
{
    return [
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
}

/**
 * Filters the list of allowed block types in the block editor.
 *
 * This function restricts blueprint steps to only be available for the 'blueprint' post type.
 * Core blocks are allowed for all post types except blueprint.
 *
 * @param array|bool $allowed_block_types Array of block type slugs, or boolean to enable/disable all.
 * @param object     $block_editor_context The current block editor context.
 *
 * @return array The array of allowed block types.
 */
function vbb_filter_allowed_block_types($allowed_block_types, $block_editor_context)
{
    // Get all registered block types
    $all_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

    // Dynamically prefix the step slugs
    $blueprint_steps = array_map(function($step) {
        return 'playground-step/' . $step;
    }, vbb_get_blueprint_steps());

    if (isset($block_editor_context->post->post_type) && $block_editor_context->post->post_type === 'blueprint') {
        // Allow only blueprint steps for 'blueprint' post type
        return $blueprint_steps;
    }

    // Allow all blocks except blueprint steps for other post types
    return array_values(array_diff(array_keys($all_blocks), $blueprint_steps));
}
add_filter('allowed_block_types_all', 'vbb_filter_allowed_block_types', 10000, 2);

/**
 * Adds a custom block category 'Steps' to the block editor.
 *
 * @param array $block_categories Array of block categories.
 * @param WP_Block_Editor_Context $block_editor_context The current block editor context.
 *
 * @return array Modified array of block categories with the 'Steps' category added.
 */
function add_new_block_category($block_categories, $block_editor_context)
{
    if (!isset($block_editor_context->post->post_type) || $block_editor_context->post->post_type !== 'blueprint') {
        return $block_categories;
    }

    $steps_categories = [
        [
            'slug'  => 'config',
            'title' => esc_html__('Config', 'visual-blueprint-builder')
        ],
        [
            'slug'  => 'extend',
            'title' => esc_html__('Extend', 'visual-blueprint-builder'),
        ],
        [
            'slug'  => 'file-system',
            'title' => esc_html__('File System', 'visual-blueprint-builder')
        ],
        [
            'slug'  => 'data',
            'title' => esc_html__('Data', 'visual-blueprint-builder')
        ],
        [
            'slug'  => 'scripts',
            'title' => esc_html__('Scripts', 'visual-blueprint-builder')
        ],
    ];


    return array_merge($block_categories, $steps_categories);
}
add_filter('block_categories_all', 'add_new_block_category', 10, 2);

/**
 * Customizes the block editor settings for the 'blueprint' post type.
 * Disables template mode and changes the title placeholder.
 *
 * @param array $settings The block editor settings.
 *
 * @return array Modified block editor settings.
 */
function customize_editor_for_blueprint($settings, $block_editor_context)
{
    if (isset($block_editor_context->post->post_type) && $block_editor_context->post->post_type === 'blueprint') {
        $settings['supportsTemplateMode'] = false;
        $settings['titlePlaceholder'] = __('Add blueprint title', 'visual-blueprint-builder');
    }

    return $settings;
}
add_filter('block_editor_settings_all', 'customize_editor_for_blueprint', 10, 2);
