<?php
defined( 'ABSPATH' ) || exit;

/**
 * This class defines a custom post type for creating and managing blueprint.
 *
 * @package visual-blueprint-builder
 */

namespace WP\Admin\VisualBlueprintBuilder;

class BlueprintPostType
{
    /**
     * Construct that hooks into WordPress to initialize the post type and add custom columns.
     */
    public function __construct()
    {
        add_action('init', [$this, 'register_blueprint_post_type']);
    }

    /**
     * Registers the 'blueprint' post type with necessary arguments and labels.
     */
    public function register_blueprint_post_type()
    {
        $labels = [
            'name' => __('Blueprints', 'visual-blueprint-builder'),
            'singular_name' => __('Blueprint', 'visual-blueprint-builder'),
            'menu_name' => __('Blueprints', 'visual-blueprint-builder'),
            'name_admin_bar' => __('Blueprint', 'visual-blueprint-builder'),
            'add_new' => __('Add New Blueprint', 'visual-blueprint-builder'),
            'add_new_item' => __('Add New Blueprint', 'visual-blueprint-builder'),
            'new_item' => __('New Blueprint', 'visual-blueprint-builder'),
            'edit_item' => __('Edit Blueprint', 'visual-blueprint-builder'),
            'view_item' => __('View Blueprint', 'visual-blueprint-builder'),
            'all_items' => __('All Blueprints', 'visual-blueprint-builder'),
            'search_items' => __('Search Blueprints', 'visual-blueprint-builder'),
            'parent_item_colon' => __('Parent Blueprints:', 'visual-blueprint-builder'),
            'not_found' => __('No blueprints found.', 'visual-blueprint-builder'),
            'not_found_in_trash' => __('No blueprints found in Trash.', 'visual-blueprint-builder')
        ];

        $args = [
            'labels' => $labels,
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'query_var' => true,
            'rewrite' => ['slug' => 'blueprint'],
            'has_archive' => false,
            'hierarchical' => false,
            'menu_icon' => 'dashicons-format-aside',
            'supports' => ['title', 'author', 'editor', 'custom-fields'],
        ];

        register_post_type('blueprint', $args);
    }
}
