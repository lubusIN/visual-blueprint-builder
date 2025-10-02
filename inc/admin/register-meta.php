<?php

/**
 * This class for registering a custom meta fields for block editor for playground blueprint.
 *
 * @package wp-playground-blueprint-editor
 */

namespace WP\Admin\PlaygroundBlueprintEditor;

class RegisterCustomMeta
{
    /**
     * The post type to which these meta fields will be attached.
     * 
     * @var string
     */
    private const POST_TYPE = 'blueprint';

    /**
     * Constructor to initialize meta configurations and hook into WordPress.
     */
    public function __construct()
    {
        add_action('init', [$this, 'registerCustomMeta']);
    }

    /**
     * Registers custom meta fields using WordPress API.
     */
    public function registerCustomMeta()
    {
        register_post_meta(self::POST_TYPE, '_blueprint_config', [
            'type' => 'object',
            'single' => true,
            'default' => [
                'php_version'           => 'latest',
                'wp_version'            => 'nightly',
                'landing_page'          => '/wp-admin/',
                'networking'            => true,
                'login'                 => false,
                'extraLibraries'        => false,
                'siteOptions'           => [],
                'plugins'               => [],
                'constants'             => [],
            ],
            'show_in_rest' => [
                'schema' => [
                    'type'        => 'object',
                    'properties'  => [
                        'php_version'           => ['type' => 'string'],
                        'wp_version'            => ['type' => 'string'],
                        'landing_page'          => ['type' => 'string'],
                        'networking'            => ['type' => 'boolean'],
                        'login'                 => ['type' => 'boolean'],
                        'extraLibraries'        => ['type' => 'boolean'],
                        'siteOptions'           => ['type' => 'object', 'additionalProperties' => true],
                        'plugins'               => ['type' => 'array'],
                        'constants'             => ['type' => 'object', 'additionalProperties' => true],
                    ],
                ],
            ],
            'auth_callback' => '__return_true',
        ]);
    }
}
