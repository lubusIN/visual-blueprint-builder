/**
 * Playground base url
 */
export const PLAYGROUND_BASE = "https://href.li/?https://playground.wordpress.net/#";

/**
 * Playground blueprint builder base url
 */
export const PLAYGROUND_BUILDER_BASE = "https://href.li/?https://playground.wordpress.net/builder/builder.html#";

/**
 * Playground blueprint schema url
 */
export const PLAYGROUND_BLUEPRINT_SCHEMA_URL = "https://playground.wordpress.net/blueprint-schema.json";
export const PLAYGROUND_BLUEPRINT_SCHEMA_URL_FETCH = "https://raw.githubusercontent.com/WordPress/wordpress-playground/refs/heads/trunk/packages/playground/blueprints/public/blueprint-schema.json";

/**
 * PHP versions.
 */
export const PHP_VERSIONS = [
    { label: 'Latest', value: 'latest' },
    { label: '8.3', value: '8.3' },
    { label: '8.2', value: '8.2' },
    { label: '8.1', value: '8.1' },
    { label: '8.0', value: '8.0' },
    { label: '7.4', value: '7.4' },
    { label: '7.3', value: '7.3' },
    { label: '7.2', value: '7.2' },
    { label: '7.1', value: '7.1' },
    { label: '7.0', value: '7.0' },
];

/**
 * Wordpress versions.
 */
export const WP_VERSIONS = [
    { label: 'Wordpress nightly', value: 'nightly' },
    { label: 'Latest', value: 'latest' },
    { label: '6.7', value: '6.7' },
    { label: '6.6', value: '6.6' },
    { label: '6.5', value: '6.5' },
    { label: '6.4', value: '6.4' },
    { label: '6.3', value: '6.3' },
];

/**
 * Step documentation links.
 */
export const STEP_DOCS_MAP = {
    'playground-step/login': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#LoginStep',
    },
    'playground-step/install-plugin': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#InstallPluginStep',
    },
    'playground-step/enable-multisite': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#EnableMultisiteStep',
    },
    'playground-step/install-theme': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#InstallThemeStep',
    },
    'playground-step/activate-theme': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#ActivateThemeStep',
    },
    'playground-step/cp': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#CpStep',
    },
    'playground-step/define-site-url': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#DefineSiteUrlStep',
    },
    'playground-step/activate-plugin': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#ActivatePluginStep',
    },
    'playground-step/import-wordpress-files': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#ImportWordPressFilesStep',
    },
    'playground-step/rmdir': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#RmdirStep',
    },
    'playground-step/rm': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#RmStep',
    },
    'playground-step/reset-data': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#ResetDataStep',
    },
    'playground-step/mv': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#MvStep',
    },
    'playground-step/define-wp-config-consts': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#DefineWpConfigConstsStep',
    },
    'playground-step/write-file': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#WriteFileStep',
    },
    'playground-step/wp-cli': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#WpCliStep',
    },
    'playground-step/run-php': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#RunPhpStep',
    },
    'playground-step/mkdir': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#MkdirStep',
    },
    'playground-step/import-wxr': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#ImportWxrStep',
    },
    'playground-step/update-user-meta': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#UpdateUserMeta',
    },
    'playground-step/unzip': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#UnzipStep',
    },
    'playground-step/set-site-options': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#SetSiteOptionsStep',
    },
    'playground-step/set-site-language': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#SetSiteLanguageStep',
    },
    'playground-step/import-theme-starter-content': {
        link: 'https://wordpress.github.io/wordpress-playground/blueprints/steps/#ImportThemeStarterContent',
    },
};