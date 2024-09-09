# Playground Blueprint Editor

[![Try in WordPress Playground](https://img.shields.io/badge/Try%20in%20WordPress%20Playground-blue?style=for-the-badge)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/lubusIN/block-editor-for-playground-blueprint/dev/_playground/blueprint.json)


Playground Blueprint Editor is block based editing experience for building blueprint.json

### Key features

- UI based json generation
- blocks to build steps
- Preview blueprint in playground 
- download blueprint.json
- copy json code

## Requirements

- WordPress 6.4+
- PHP 7.4+

## Development

1. Set up a local WordPress development environment.
2. Clone / download this repository into the `wp-content/plugins` folder.
3. Navigate to the `wp-content/plugins/icon-block` folder in the command line.
4. Run `npm install` to install the plugin's dependencies within a `/node_modules/` folder.
5. Run `composer install` to install the additional WordPress composer tools within a `/vendor/` folder.
6. Run `npm run start` to compile and watch source files for changes while developing.

Refer to `package.json` for additional commands.