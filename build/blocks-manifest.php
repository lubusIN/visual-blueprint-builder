<?php
// This file is generated. Do not modify it manually.
return array(
	'activate-plugin' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/activate-plugin',
		'version' => '0.1.0',
		'title' => 'Activate plugin',
		'category' => 'extend',
		'description' => 'Activates a WordPress plugin (if it\'s installed).',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'activatePlugin'
			),
			'pluginName' => array(
				'type' => 'string',
				'default' => ''
			),
			'pluginPath' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'activate-theme' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/activate-theme',
		'version' => '0.1.0',
		'title' => 'Activate Theme',
		'category' => 'extend',
		'description' => 'Activates a WordPress theme (if it\'s installed).',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'activateTheme'
			),
			'themeFolderName' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'cp' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/cp',
		'version' => '0.1.0',
		'title' => 'Copy',
		'category' => 'file-system',
		'description' => 'Copies a file from one path to another.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'cp'
			),
			'fromPath' => array(
				'type' => 'string',
				'default' => ''
			),
			'toPath' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'define-site-url' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/define-site-url',
		'version' => '0.1.0',
		'title' => 'Define Site Url',
		'category' => 'config',
		'description' => 'Sets WP_HOME and WP_SITEURL constants for the WordPress installation. 
 Using this step on playground.wordpress.net is moot. It is useful when building a custom Playground-based tool, like wp-now, or deploying Playground on a custom domain.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'defineSiteUrl'
			),
			'siteUrl' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'define-wp-config-consts' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/define-wp-config-consts',
		'version' => '0.1.0',
		'title' => 'WP Config',
		'category' => 'config',
		'description' => 'Defines constants in a wp-config.php file. This step can be called multiple times, and the constants will be merged.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'defineWpConfigConsts'
			),
			'consts' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'method' => array(
				'type' => 'string',
				'default' => 'rewrite-wp-config',
				'enum' => array(
					'rewrite-wp-config',
					'define-before-run'
				)
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'enable-multisite' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/enable-multisite',
		'version' => '0.1.0',
		'title' => 'Enable Multisite',
		'category' => 'config',
		'description' => 'Defines the Multisite constants in a wp-config.php file.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'enableMultisite'
			),
			'wpCliPath' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'import-theme-starter-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/import-theme-starter-content',
		'version' => '0.1.0',
		'title' => 'Import theme starter content',
		'category' => 'data',
		'description' => 'Imports a theme Starter Content into WordPress.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'importThemeStarterContent'
			),
			'themeSlug' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'import-wordpress-files' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/import-wordpress-files',
		'version' => '0.1.0',
		'title' => 'Import WordPress files',
		'category' => 'data',
		'description' => 'Imports top-level WordPress files from a given zip file into the documentRoot. For example, if a zip file contains the wp-content and wp-includes directories, they will replace the corresponding directories in Playground\'s documentRoot.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'importWordPressFiles'
			),
			'wordPressFilesZip' => array(
				'type' => 'object',
				'default' => array(
					'resource' => 'url',
					'url' => ''
				),
				'properties' => array(
					'resource' => array(
						'type' => 'string'
					),
					'url' => array(
						'type' => 'string'
					)
				)
			),
			'pathInZip' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'import-wxr' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/import-wxr',
		'version' => '0.1.0',
		'title' => 'Import Wxr',
		'category' => 'data',
		'description' => 'Imports a WXR file into WordPress.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'importWxr'
			),
			'file' => array(
				'type' => 'object',
				'default' => array(
					'resource' => 'url',
					'url' => ''
				),
				'properties' => array(
					'resource' => array(
						'type' => 'string'
					),
					'url' => array(
						'type' => 'string'
					),
					'path' => array(
						'type' => 'string'
					)
				)
			),
			'fetchAttachments' => array(
				'type' => 'boolean',
				'default' => true
			),
			'rewriteUrls' => array(
				'type' => 'boolean',
				'default' => true
			),
			'importComments' => array(
				'type' => 'boolean',
				'default' => true
			),
			'defaultAuthorUsername' => array(
				'type' => 'string',
				'default' => 'admin'
			),
			'authorsMode' => array(
				'type' => 'string',
				'default' => 'default-author',
				'enum' => array(
					'default-author',
					'create',
					'map'
				)
			),
			'authorsMap' => array(
				'type' => 'object'
			),
			'importUsers' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'install-plugin' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/install-plugin',
		'version' => '0.1.0',
		'title' => 'Install Plugin',
		'category' => 'extend',
		'description' => 'Installs a WordPress plugin in the Playground',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'installPlugin'
			),
			'pluginData' => array(
				'type' => 'object',
				'default' => array(
					'resource' => 'url',
					'url' => ''
				),
				'properties' => array(
					'resource' => array(
						'type' => 'string',
						'enum' => array(
							'url',
							'wordpress.org/plugins',
							'vfs',
							'git:directory'
						)
					)
				)
			),
			'ifAlreadyInstalled' => array(
				'type' => 'string',
				'enum' => array(
					'overwrite',
					'skip',
					'error'
				)
			),
			'options' => array(
				'type' => 'object',
				'default' => array(
					'activate' => true
				),
				'properties' => array(
					'activate' => array(
						'type' => 'boolean'
					),
					'onError' => array(
						'type' => 'string',
						'enum' => array(
							'skip-plugin',
							'throw'
						)
					),
					'targetFolderName' => array(
						'type' => 'string'
					)
				)
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css'
	),
	'install-theme' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/install-theme',
		'version' => '0.1.0',
		'title' => 'Install Theme',
		'category' => 'extend',
		'description' => 'Installs a WordPress theme in the Playground',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'installTheme'
			),
			'themeData' => array(
				'type' => 'object',
				'default' => array(
					'resource' => 'url',
					'url' => ''
				),
				'properties' => array(
					'resource' => array(
						'type' => 'string',
						'enum' => array(
							'url',
							'wordpress.org/themes',
							'vfs',
							'git:directory'
						)
					)
				)
			),
			'ifAlreadyInstalled' => array(
				'type' => 'string',
				'enum' => array(
					'overwrite',
					'skip',
					'error'
				)
			),
			'options' => array(
				'type' => 'object',
				'default' => array(
					'activate' => true,
					'importStarterContent' => false
				),
				'properties' => array(
					'activate' => array(
						'type' => 'boolean'
					),
					'importStarterContent' => array(
						'type' => 'boolean'
					),
					'onError' => array(
						'type' => 'string',
						'enum' => array(
							'skip-theme',
							'throw'
						)
					),
					'targetFolderName' => array(
						'type' => 'string'
					)
				)
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css'
	),
	'login' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/login',
		'version' => '0.1.0',
		'title' => 'Login',
		'category' => 'config',
		'description' => 'Logs in to Playground. Under the hood, this sets the PLAYGROUND_AUTO_LOGIN_AS_USER constant to authenticate the user on the first load.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'login'
			),
			'username' => array(
				'type' => 'string',
				'default' => 'admin'
			),
			'password' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'mkdir' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/mkdir',
		'version' => '0.1.0',
		'title' => 'Make Directory',
		'category' => 'file-system',
		'description' => 'Creates a directory at the specified path.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'mkdir'
			),
			'path' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'mv' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/mv',
		'version' => '0.1.0',
		'title' => 'Move File/Dir',
		'category' => 'file-system',
		'description' => 'Moves a file or directory from one path to another.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'mv'
			),
			'fromPath' => array(
				'type' => 'string',
				'default' => ''
			),
			'toPath' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'reset-data' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/reset-data',
		'version' => '0.1.0',
		'title' => 'Reset Data',
		'category' => 'data',
		'description' => 'Deletes WordPress posts and comments and sets the auto increment sequence for the posts and comments tables to 0.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'resetData'
			),
			'contentTypes' => array(
				'type' => 'array',
				'items' => array(
					'type' => 'string'
				)
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'rm' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/rm',
		'version' => '0.1.0',
		'title' => 'Remove File',
		'category' => 'file-system',
		'description' => 'Removes a file at the specified path.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'rm'
			),
			'path' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'rmdir' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/rmdir',
		'version' => '0.1.0',
		'title' => 'Remove Directory',
		'category' => 'file-system',
		'description' => 'Removes a directory at the specified path.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'rmdir'
			),
			'path' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'run-php' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/run-php',
		'version' => '0.1.0',
		'title' => 'Run PHP',
		'category' => 'scripts',
		'description' => 'Runs PHP code. When running WordPress functions, the code key must first load wp-load.php and start with "<?php require_once \'wordpress/wp-load.php\'; ".',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'runPHP'
			),
			'code' => array(
				'type' => 'string',
				'default' => '<?php require_once \'wordpress/wp-load.php\'; 
 // Add You Code ?>'
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'run-sql' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/run-sql',
		'version' => '0.1.0',
		'title' => 'Run SQL',
		'category' => 'scripts',
		'description' => 'Run one or more SQL queries using WP_MySQL_Naive_Query_Stream and $wpdb.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'runSql'
			),
			'sql' => array(
				'type' => 'object',
				'default' => array(
					'resource' => 'literal',
					'name' => 'schema.sql',
					'contents' => ''
				)
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'set-site-language' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/set-site-language',
		'version' => '0.1.0',
		'title' => 'Set Site Language',
		'category' => 'config',
		'description' => 'Sets the site language and download translations.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'setSiteLanguage'
			),
			'language' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'set-site-options' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/set-site-options',
		'version' => '0.1.0',
		'title' => 'Set Site Options',
		'category' => 'config',
		'description' => 'Sets site options. This is equivalent to calling update_option for each option in the options object.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'setSiteOptions'
			),
			'options' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'unzip' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/unzip',
		'version' => '0.1.0',
		'title' => 'Unzip',
		'category' => 'file-system',
		'description' => 'Unzip a zip file.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'unzip'
			),
			'zipFile' => array(
				'type' => 'object',
				'default' => array(
					'resource' => 'vfs',
					'path' => ''
				),
				'properties' => array(
					'resource' => array(
						'type' => 'string'
					),
					'path' => array(
						'type' => 'string'
					)
				)
			),
			'extractToPath' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'update-user-meta' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/update-user-meta',
		'version' => '0.1.0',
		'title' => 'Update User Meta',
		'category' => 'config',
		'description' => 'Updates user meta. This is equivalent to calling update_user_meta for each meta value in the meta object.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'updateUserMeta'
			),
			'meta' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'userId' => array(
				'type' => 'number',
				'default' => 1
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'wp-cli' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/wp-cli',
		'version' => '0.1.0',
		'title' => 'wp-cli',
		'category' => 'scripts',
		'description' => 'Runs PHP code using WP-CLI.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'wp-cli'
			),
			'command' => array(
				'type' => 'string'
			),
			'wpCliPath' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'write-file' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/write-file',
		'version' => '0.1.0',
		'title' => 'Write File',
		'category' => 'file-system',
		'description' => 'Writes data to a file at the specified path.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'writeFile'
			),
			'path' => array(
				'type' => 'string'
			),
			'data' => array(
				'type' => array(
					'string',
					'object'
				),
				'default' => '',
				'properties' => array(
					'resource' => array(
						'type' => 'string',
						'default' => 'url'
					),
					'url' => array(
						'type' => 'string',
						'default' => ''
					)
				),
				'additionalProperties' => false
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	),
	'write-files' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'playground-step/write-files',
		'version' => '0.1.0',
		'title' => 'Write Files',
		'category' => 'file-system',
		'description' => 'Writes multiple files or directory structures to a specified directory in the Playground filesystem.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'customClassName' => false
		),
		'attributes' => array(
			'step' => array(
				'type' => 'string',
				'default' => 'writeFiles'
			),
			'writeToPath' => array(
				'type' => 'string',
				'default' => ''
			),
			'filesTree' => array(
				'type' => 'object',
				'default' => array(
					'name' => 'directory',
					'files' => array(
						
					)
				)
			)
		),
		'textdomain' => 'visual-blueprint-builder',
		'editorScript' => 'file:./index.js'
	)
);
