<?php

/**
 * Filters the list of allowed block types in the block editor.
 *
 * This function restricts the available block types to Heading, List, Image, and Paragraph only.
 *
 * @param array|bool $allowed_block_types Array of block type slugs, or boolean to enable/disable all.
 * @param object     $block_editor_context The current block editor context.
 *
 * @return array The array of allowed block types.
 */
function example_allowed_block_types($allowed_block_types, $block_editor_context)
{

    if (get_current_screen()->post_type == 'blueprint') {
        $allowed_block_types = [
            'lubus/login',
            'lubus/install-plugin',
            'lubus/install-theme',
            'lubus/enable-multisite',
            'lubus/define-site-url',
            'lubus/copy-file',
            'lubus/activate-theme',
            'lubus/activate-plugin',
        ];

        return $allowed_block_types;
    };

    return true;
}
add_filter('allowed_block_types_all', 'example_allowed_block_types', 10000, 2);

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
    $new_category = [
        'slug'  => 'steps',
        'title' => esc_html__('Steps', 'text-domain'),
    ];

    // Add the new category at the beginning of the list.
    array_unshift($block_categories, $new_category);

    return $block_categories;
}
add_filter('block_categories_all', 'add_new_block_category', 10, 2);

/**
 * Disables the template mode for the block editor if the post type is 'blueprint'.
 *
 * @param array $settings The block editor settings.
 *
 * @return array Modified block editor settings.
 */
function disable_template_mode($settings)
{
    if (get_current_screen()->post_type === 'blueprint') {
        $settings['supportsTemplateMode'] = false;
    }

    return $settings;
}
add_filter('block_editor_settings_all', 'disable_template_mode');
