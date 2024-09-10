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
            'lubus/activate-theme',
            'lubus/activate-plugin',
        ];

        return $allowed_block_types;
    };

    return true;
}
add_filter('allowed_block_types_all', 'example_allowed_block_types', 10000, 2);

function add_new_block_category($block_categories, $block_editor_context)
{
    // Unshift the new category to the beginning of the array
    array_unshift(
        $block_categories,
        [
            'slug'  => 'steps',
            'title' => esc_html__('Steps', 'text-domain'),
        ]
    );

    return $block_categories;
}

add_filter('block_categories_all', 'add_new_block_category', 10, 2);
