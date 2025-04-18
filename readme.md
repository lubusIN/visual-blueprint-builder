# Playground Blueprint Editor

[![Try in WordPress Playground](https://img.shields.io/badge/Try%20in%20WordPress%20Playground-blue?style=for-the-badge)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/lubusIN/block-editor-for-playground-blueprint/demo/_playground/blueprint-github.json)

<video src="https://github.com/lubusIN/block-editor-for-playground-blueprint/raw/refs/heads/main/.github/builder-demo.mp4" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px; width: 100%"></video>

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

1. Clone `git clone git@github.com:lubusIN/block-editor-for-playground-blueprint.git`.
2. Navigate to Folder `cd block-editor-for-playground-blueprint`.
3. Run `npm install` to install the plugin's dependencies within a `/node_modules/` folder.
4. Run `composer install` to install the additional WordPress composer tools within a `/vendor/` folder.
5. Run `npm run build` or `npm run start` to compile and watch source files for changes while developing.
6. Launch local playground using wp-now `npx @wp-now/wp-now start`

Refer to `package.json` for additional npm commands.