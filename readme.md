<p align="center"><img width="300" src=".github/vbb-logo.svg"></p>

![Visual Blueprint Builder](.github/visual-blueprint-builder.jpg)

[![Playground Demo Link](https://img.shields.io/badge/Playground_Demo-blue?logo=wordpress&logoColor=%23fff&labelColor=%233858e9&color=%233858e9)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/lubusIN/visual-blueprint-builder/playground/_playground/blueprint-github.json)

### Overview
Playground Blueprint Editor is block based editing experience for building blueprint.json

### Features

- UI based json generation
- blocks to build steps
- Preview blueprint in playground 
- download blueprint.json
- copy json code

## Requirements

- WordPress 6.4+
- PHP 7.4+

## Installation

1. Download latest release from GitHub
2. Visit `Plugins > Add New`
3. Upload `visual-blueprint-builder.zip`  file
4. Activate `Visual Blueprint Builder` from plugins page

## Development

### 1. Clone the Repository
Clone the repository to your local system:

```bash
git clone git@github.com:lubusIN/visual-blueprint-builder.git 
```

### 2. Go to package folder

```bash
cd visual-blueprint-builder
```

### 3. Install Dependencies

```bash
npm install
composer install
```

### 4. Build Plugin
Build or start the development environment:

```bash
npm run build       # Compile the source files
# OR
npm run start       # Watch for changes and auto-compile
```

### 5. Launch Playground
Start a local WordPress playground using wp-now:

```bash
npx @wp-now/wp-now start
```
> [!NOTE]
> Refer to `package.json` for additional available npm commands.

## Meet Your Artisans

[LUBUS](http://lubus.in) is a web design agency based in Mumbai, India.

<a href="https://cal.com/lubus">
<img src="https://raw.githubusercontent.com/lubusIN/.github/refs/heads/main/profile/banner.png" />
</a>

## Credits

<a href="https://github.com/lubusIN/visual-blueprint-builder/graphs/contributors">
  <img height="36px" src="https://contrib.rocks/image?repo=lubusIN/visual-blueprint-builder" />
</a>

## License

Visual Blueprint Builder is open-sourced plugin licensed under the [GPL-3.0 license](LICENSE)
