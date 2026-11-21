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
 * Retrieves the list of available WordPress versions.
 *
 * Checks a transient cache before querying api.wordpress.org.
 * Falls back to curated list if unreachable.
 *
 * @return array Array of WordPress version options with 'label' and 'value'.
 */
function vbb_get_wordpress_versions()
{
    $transient_key = 'vbb_wp_versions';
    $cached = get_transient($transient_key);

    if (false !== $cached && is_array($cached)) {
        return $cached;
    }

    $default_versions = [
        ['label' => esc_html__('WordPress nightly', 'visual-blueprint-builder'), 'value' => 'nightly'],
        ['label' => esc_html__('Latest', 'visual-blueprint-builder'), 'value' => 'latest'],
        ['label' => esc_html__('Beta', 'visual-blueprint-builder'), 'value' => 'beta'],
        ['label' => '6.8', 'value' => '6.8'],
        ['label' => '6.7', 'value' => '6.7'],
        ['label' => '6.6', 'value' => '6.6'],
        ['label' => '6.5', 'value' => '6.5'],
        ['label' => '6.4', 'value' => '6.4'],
        ['label' => '6.3', 'value' => '6.3'],
    ];

    $response = wp_remote_get('https://api.wordpress.org/core/stable-check/1.0/', [
        'timeout'    => 3,
        'user-agent' => 'WordPress/' . get_bloginfo('version') . '; ' . home_url(),
    ]);

    if (is_wp_error($response) || 200 !== (int) wp_remote_retrieve_response_code($response)) {
        set_transient($transient_key, $default_versions, DAY_IN_SECONDS);
        return $default_versions;
    }

    $releases = json_decode(wp_remote_retrieve_body($response), true);
    if (!is_array($releases)) {
        set_transient($transient_key, $default_versions, DAY_IN_SECONDS);
        return $default_versions;
    }

    $major_versions = [];
    foreach (array_keys($releases) as $version) {
        $parts = explode('.', $version);
        if (count($parts) >= 2) {
            $major = $parts[0] . '.' . $parts[1];
            if ((float) $major >= 6.0) {
                $major_versions[$major] = true;
            }
        }
    }

    uksort($major_versions, 'version_compare');
    $sorted_majors = array_reverse(array_keys($major_versions));

    $versions = [
        ['label' => esc_html__('WordPress nightly', 'visual-blueprint-builder'), 'value' => 'nightly'],
        ['label' => esc_html__('Latest', 'visual-blueprint-builder'), 'value' => 'latest'],
        ['label' => esc_html__('Beta', 'visual-blueprint-builder'), 'value' => 'beta'],
    ];

    foreach ($sorted_majors as $major) {
        $versions[] = [
            'label' => $major,
            'value' => $major,
        ];
    }

    set_transient($transient_key, $versions, WEEK_IN_SECONDS);

    return $versions;
}

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
