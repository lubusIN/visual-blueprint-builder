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
            'lubus/import-wordpress-files',
            'lubus/remove-dir',
            'lubus/remove-file',
            'lubus/reset-data',
            'lubus/write-file',
            'lubus/move',
            'lubus/define-wp-config-consts',
            'lubus/wp-cli',
            'lubus/run-php',
            'lubus/unzip',
            'lubus/set-site-options',
            'lubus/make-dir',
            'lubus/import-wxr',
            'lubus/set-site-language',
            'lubus/import-theme-starter-content',
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
    $steps_categories = [
        [
            'slug'  => 'config',
            'title' => esc_html__('Config', 'text-domain')
        ],
        [
            'slug'  => 'extend',
            'title' => esc_html__('Extend', 'text-domain'),
        ],
        [
            'slug'  => 'file-system',
            'title' => esc_html__('File System', 'text-domain')
        ],
        [
            'slug'  => 'data',
            'title' => esc_html__('Data', 'text-domain')
        ],
        [
            'slug'  => 'scripts',
            'title' => esc_html__('Scripts', 'text-domain')
        ],
    ];


    foreach ($steps_categories as $step_category) {
        array_push($block_categories, $step_category);
    }

    return $block_categories;
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
function customize_editor_for_blueprint($settings)
{
    if (get_current_screen()->post_type === 'blueprint') {
        $settings['supportsTemplateMode'] = false;
        $settings['titlePlaceholder'] = "Add blueprint title";
    }

    return $settings;
}
add_filter('block_editor_settings_all', 'customize_editor_for_blueprint');
