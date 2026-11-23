/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useCallback, useState, useEffect } from '@wordpress/element';
import { dispatch, useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	PLAYGROUND_BLUEPRINT_SCHEMA_URL,
	PLAYGROUND_BLUEPRINT_SCHEMA_URL_FETCH,
} from './constant';

/**
 * External dependencies
 */
import Ajv from 'ajv';

/**
 * Utility function to convert a camelCase string to kebab-case with special handling for "WordPress".
 *
 * @param {string} str Input string.
 * @return {string} Converted kebab-case string.
 */
export const convertToKebabCase = ( str ) => {
	return str
		.replace( /WordPress/g, 'Wordpress' )
		.replace( /([a-z])([A-Z])/g, '$1-$2' )
		.replace( /Wordpress/g, 'wordpress' )
		.toLowerCase();
};

/**
 * Validates steps from a JSON schema and creates valid WordPress blocks.
 *
 * @param {Array} steps Steps array.
 * @return {Object} Valid blocks and invalid steps.
 */
export const validateBlueprintSteps = ( steps = [] ) => {
	const validBlocks = [];
	const invalidSteps = [];

	( steps || [] ).forEach( ( step, index ) => {
		if ( ! step || typeof step !== 'object' ) {
			return;
		}

		const blockType = `playground-step/${ convertToKebabCase(
			step.step || ''
		) }`;
		try {
			const block = createBlock( blockType, step || {} );
			validBlocks.push( block );
		} catch ( error ) {
			invalidSteps.push( {
				stepIndex: index + 1,
				stepData: step,
				error: error.message,
			} );
		}
	} );

	return { validBlocks, invalidSteps };
};

/**
 * Updates deprecated fields in blueprint configuration and steps before validation.
 *
 * Normalizes:
 * - `installPlugin` with `pluginZipFile` -> `pluginData`
 * - `installTheme` with `themeZipFile` -> `themeData`
 * - `unzip` with `zipPath` -> `zipFile: { resource: 'vfs', path: zipPath }`
 * - `login` with empty `password` -> stripped
 * - `defineWpConfigConsts` with `virtualize` -> stripped
 * - `importWxr` with `importer` -> stripped
 * - top-level `description` -> preserved/normalized to `meta.description`
 * - top-level `phpExtensionBundles` -> stripped
 *
 * @param {Object} jsonData Raw JSON data.
 * @return {Object} Normalized JSON data.
 */
export const updateDeprecatedFields = ( jsonData ) => {
	if ( ! jsonData || typeof jsonData !== 'object' ) {
		return jsonData;
	}

	const { phpExtensionBundles, ...restData } = jsonData;
	const normalized = { ...restData };

	if ( normalized.meta && typeof normalized.meta === 'object' ) {
		normalized.meta = {
			title: normalized.meta.title || 'Blueprint',
			author: normalized.meta.author || 'WordPress',
			...normalized.meta,
		};
		if ( normalized.description && ! normalized.meta.description ) {
			normalized.meta.description = normalized.description;
		}
	}

	if ( Array.isArray( normalized.steps ) ) {
		normalized.steps = normalized.steps.map( ( step ) => {
			if ( ! step || typeof step !== 'object' ) {
				return step;
			}

			let s = { ...step };

			if ( s.step === 'installPlugin' && s.pluginZipFile ) {
				const { pluginZipFile, ...rest } = s;
				s = {
					...rest,
					pluginData: pluginZipFile,
				};
			}

			if ( s.step === 'installTheme' && s.themeZipFile ) {
				const { themeZipFile, ...rest } = s;
				s = {
					...rest,
					themeData: themeZipFile,
				};
			}

			if ( s.step === 'unzip' && s.zipPath && ! s.zipFile ) {
				const { zipPath, ...rest } = s;
				s = {
					...rest,
					zipFile: {
						resource: 'vfs',
						path: zipPath,
					},
				};
			}

			if ( s.step === 'login' && s.password === '' ) {
				const { password, ...rest } = s;
				s = rest;
			}

			if ( s.step === 'defineWpConfigConsts' && 'virtualize' in s ) {
				const { virtualize, ...rest } = s;
				s = rest;
			}

			if ( s.step === 'importWxr' && 'importer' in s ) {
				const { importer, ...rest } = s;
				s = rest;
			}

			if ( s.step === 'runSql' && typeof s.sql === 'string' ) {
				s = {
					...s,
					sql: {
						resource: 'literal',
						name: 'query.sql',
						contents: s.sql,
					},
				};
			}

			if (
				s.step === 'writeFiles' &&
				s.filesTree &&
				typeof s.filesTree === 'object' &&
				s.filesTree.resource !== 'git:directory' &&
				! s.filesTree.name
			) {
				s = {
					...s,
					filesTree: {
						...s.filesTree,
						name: 'files',
					},
				};
			}

			return s;
		} );
	}

	return normalized;
};

let schemaCachePromise = null;

/**
 * Fetches and caches the upstream Playground Blueprint JSON schema.
 *
 * @return {Promise<Object>} The Blueprint schema object.
 */
export const fetchBlueprintSchema = async () => {
	if ( ! schemaCachePromise ) {
		schemaCachePromise = fetch( PLAYGROUND_BLUEPRINT_SCHEMA_URL_FETCH )
			.then( ( res ) => {
				if ( ! res.ok ) {
					throw new Error( 'Failed to fetch schema.' );
				}
				return res.json();
			} )
			.catch( ( err ) => {
				schemaCachePromise = null;
				throw err;
			} );
	}
	return schemaCachePromise;
};

const DEFAULT_PHP_OPTIONS = [ { label: 'Latest', value: 'latest' } ];
const DEFAULT_WP_OPTIONS = [
	{ label: 'WordPress nightly', value: 'nightly' },
	{ label: 'Latest', value: 'latest' },
	{ label: 'Beta', value: 'beta' },
];

/**
 * Extracts supported PHP versions from the Playground blueprint schema definitions.
 *
 * @param {Object} schema Blueprint schema.
 * @return {Array<{label: string, value: string}>} Array of PHP version options.
 */
export const extractPhpVersionsFromSchema = ( schema ) => {
	const supportedEnum = schema?.definitions?.SupportedPHPVersion?.enum || [];
	const legacyEnum = schema?.definitions?.LegacyPHPVersion?.enum || [];
	const hasNext = schema?.definitions?.PHPNextVersion?.const;

	if ( ! supportedEnum.length ) {
		return [ ...DEFAULT_PHP_OPTIONS ];
	}

	const versions = [ { label: 'Latest', value: 'latest' } ];

	supportedEnum.forEach( ( version ) => {
		versions.push( { label: version, value: version } );
	} );

	legacyEnum.forEach( ( version ) => {
		versions.push( { label: `${ version } (Legacy)`, value: version } );
	} );

	if ( hasNext ) {
		versions.push( { label: 'Next (Dev)', value: hasNext } );
	}

	return versions;
};

/**
 * Hook to dynamically resolve supported Playground PHP and WordPress versions.
 *
 * Uses the upstream blueprint schema definitions as source of truth for PHP versions,
 * and server-provided release catalog or localized data for WordPress versions.
 *
 * @param {Object} currentConfig Current blueprint configuration.
 * @return {{phpVersions: Array, wpVersions: Array}} Supported version options.
 */
export const usePlaygroundVersions = ( currentConfig = {} ) => {
	const [ phpVersions, setPhpVersions ] = useState( () => {
		if (
			currentConfig.php_version &&
			currentConfig.php_version !== 'latest'
		) {
			return [
				...DEFAULT_PHP_OPTIONS,
				{
					label: currentConfig.php_version,
					value: currentConfig.php_version,
				},
			];
		}
		return [ ...DEFAULT_PHP_OPTIONS ];
	} );

	const [ wpVersions, setWpVersions ] = useState( () => {
		if ( window?.vbbSettings?.wpVersions?.length ) {
			return window.vbbSettings.wpVersions;
		}
		if (
			currentConfig.wp_version &&
			! DEFAULT_WP_OPTIONS.some(
				( opt ) => opt.value === currentConfig.wp_version
			)
		) {
			return [
				...DEFAULT_WP_OPTIONS,
				{
					label: currentConfig.wp_version,
					value: currentConfig.wp_version,
				},
			];
		}
		return DEFAULT_WP_OPTIONS;
	} );

	useEffect( () => {
		let isMounted = true;

		fetchBlueprintSchema()
			.then( ( schema ) => {
				if ( ! isMounted ) {
					return;
				}
				const dynamicPhpVersions =
					extractPhpVersionsFromSchema( schema );
				if ( dynamicPhpVersions.length > 0 ) {
					if (
						currentConfig.php_version &&
						! dynamicPhpVersions.some(
							( opt ) => opt.value === currentConfig.php_version
						)
					) {
						dynamicPhpVersions.push( {
							label: currentConfig.php_version,
							value: currentConfig.php_version,
						} );
					}
					setPhpVersions( dynamicPhpVersions );
				}
			} )
			.catch( () => {
				if ( ! isMounted ) {
					return;
				}
				if (
					currentConfig.php_version &&
					currentConfig.php_version !== 'latest'
				) {
					setPhpVersions( ( prev ) => {
						if (
							prev.some(
								( opt ) =>
									opt.value === currentConfig.php_version
							)
						) {
							return prev;
						}
						return [
							...prev,
							{
								label: currentConfig.php_version,
								value: currentConfig.php_version,
							},
						];
					} );
				}
			} );

		return () => {
			isMounted = false;
		};
	}, [ currentConfig.php_version ] );

	useEffect( () => {
		if (
			currentConfig.wp_version &&
			! wpVersions.some(
				( opt ) => opt.value === currentConfig.wp_version
			)
		) {
			setWpVersions( ( prev ) => [
				...prev,
				{
					label: currentConfig.wp_version,
					value: currentConfig.wp_version,
				},
			] );
		}
	}, [ currentConfig.wp_version, wpVersions ] );

	return {
		phpVersions,
		wpVersions,
	};
};

/**
 * Validates a JSON blueprint against a schema.
 *
 * @param {Object} data Blueprint data.
 * @param {Function} createNotice Notice creation function.
 * @return {Promise<boolean>} True if valid, false otherwise.
 */
export const validateAgainstSchema = async ( data, createNotice ) => {
	try {
		const schema = await fetchBlueprintSchema();

		const ajv = new Ajv( {
			allErrors: true,
			strict: false,
			allowMatchingProperties: true,
		} );

		const validate = ajv.compile( schema );
		const valid = validate( data );

		if ( ! valid ) {
			const errors = validate.errors
				.map( ( err ) => `${ err.instancePath } ${ err.message }` )
				.join( ', ' );
			createNotice(
				'error',
				`${ __(
					'Schema validation failed:',
					'visual-blueprint-builder'
				) } ${ errors }`,
				{
					id: 'visual-blueprint-builder',
				}
			);
			return false;
		}

		return true;
	} catch ( error ) {
		createNotice(
			'error',
			`${ __(
				'Error validating against schema:',
				'visual-blueprint-builder'
			) } ${ error.message }`,
			{
				id: 'visual-blueprint-builder',
			}
		);
		return false;
	}
};

/**
 * Updates the post meta with data from parsed JSON and triggers notices.
 *
 * @param {Object} data Parsed JSON data.
 * @param {Function} updateBlueprintConfig Config updater.
 * @param {Function} createNotice Notice callback.
 */
export const handleJsonDataSubmit = (
	data,
	updateBlueprintConfig,
	createNotice
) => {
	if ( ! data ) {
		createNotice(
			'error',
			__(
				'Failed to update Blueprint configuration.',
				'visual-blueprint-builder'
			)
		);
		return;
	}

	const preferredVersions = data.preferredVersions || {};
	const features = data.features || {};

	let meta = data.meta;
	if ( ! meta && data.description ) {
		meta = { description: data.description };
	}

	updateBlueprintConfig( {
		landing_page: data.landingPage,
		php_version: preferredVersions.php || 'latest',
		wp_version: preferredVersions.wp ?? 'latest',
		networking:
			features.networking !== undefined
				? Boolean( features.networking )
				: undefined,
		intl: Boolean( features.intl ),
		login: data.login || false,
		siteOptions: data.siteOptions || undefined,
		extraLibraries: data.extraLibraries || false,
		plugins: data.plugins || undefined,
		constants: data.constants || undefined,
		meta: meta || undefined,
	} );
};

/**
 * Processes JSON blueprint data, validates it, and inserts valid blocks into the editor.
 *
 * @param {Object} jsonData Parsed JSON data.
 * @param {Function} createNotice Notice callback.
 * @param {Function} updateBlueprintConfig Config updater callback.
 */
export const handleBlueprintData = async (
	jsonData,
	createNotice,
	updateBlueprintConfig
) => {
	if ( ! jsonData ) {
		createNotice(
			'error',
			__( 'Invalid blueprint schema.', 'visual-blueprint-builder' )
		);
		return;
	}

	try {
		const updatedData = updateDeprecatedFields( jsonData );

		const isValid = await validateAgainstSchema(
			updatedData,
			createNotice
		);
		if ( ! isValid ) {
			return;
		}

		const steps = Array.isArray( updatedData.steps )
			? updatedData.steps
			: [];

		const { validBlocks, invalidSteps } = validateBlueprintSteps( steps );

		if ( validBlocks.length > 0 ) {
			dispatch( 'core/block-editor' ).insertBlocks(
				validBlocks,
				undefined,
				undefined,
				false,
				null
			);
			createNotice(
				'success',
				__(
					'Blueprint imported successfully.',
					'visual-blueprint-builder'
				),
				{
					type: 'snackbar',
				}
			);
		}

		if ( invalidSteps.length > 0 ) {
			const errorDetails = invalidSteps
				.map(
					( { stepIndex, stepData, error } ) =>
						`Step ${ stepIndex }: ${ stepData.step } (${ error })`
				)
				.join( ', ' );
			createNotice(
				'warning',
				`${ __(
					'Some steps are invalid:',
					'visual-blueprint-builder'
				) } ${ errorDetails }.`
			);
		}

		handleJsonDataSubmit(
			updatedData,
			updateBlueprintConfig,
			createNotice
		);
	} catch ( err ) {
		return err;
	}
};

/**
 * Constructs a valid Blueprint JSON string from blocks and configuration.
 *
 * @param {Object} [params] Parameters.
 * @param {Array}  [params.blocks] Array of block objects from editor canvas.
 * @param {Object} [params.blueprintConfig] Stored configuration from post meta.
 * @param {string} [params.postTitle] Post title.
 * @param {string} [params.postAuthor] Post author username or slug.
 * @return {string} Formatted JSON blueprint string.
 */
export const buildBlueprintJson = ( {
	blocks = [],
	blueprintConfig = {},
	postTitle = '',
	postAuthor = '',
} = {} ) => {
	const blockAttributes = ( blocks || [] ).map( ( block ) => {
		const { metadata, ...rest } = block.attributes || {};
		const cleanStep = { ...rest };

		// Clean deprecated/empty fields per step
		if ( cleanStep.step === 'login' && ! cleanStep.password ) {
			delete cleanStep.password;
		}
		if ( cleanStep.step === 'defineWpConfigConsts' ) {
			delete cleanStep.virtualize;
		}
		if ( cleanStep.step === 'importWxr' ) {
			delete cleanStep.importer;
			if (
				cleanStep.authorsMode !== 'map' ||
				! cleanStep.authorsMap ||
				Object.keys( cleanStep.authorsMap ).length === 0
			) {
				delete cleanStep.authorsMap;
			}
		}
		if ( cleanStep.step === 'unzip' ) {
			delete cleanStep.zipPath;
		}
		if (
			cleanStep.step === 'resetData' &&
			( ! cleanStep.contentTypes || cleanStep.contentTypes.length === 0 )
		) {
			delete cleanStep.contentTypes;
		}
		if (
			( cleanStep.step === 'installPlugin' ||
				cleanStep.step === 'installTheme' ) &&
			! cleanStep.ifAlreadyInstalled
		) {
			delete cleanStep.ifAlreadyInstalled;
		}
		if ( cleanStep.options && typeof cleanStep.options === 'object' ) {
			cleanStep.options = { ...cleanStep.options };
			if ( ! cleanStep.options.onError ) {
				delete cleanStep.options.onError;
			}
			if ( ! cleanStep.options.targetFolderName ) {
				delete cleanStep.options.targetFolderName;
			}
		}
		if (
			cleanStep.step === 'importWordPressFiles' &&
			! cleanStep.pathInZip
		) {
			delete cleanStep.pathInZip;
		}
		if (
			( cleanStep.step === 'wp-cli' ||
				cleanStep.step === 'enableMultisite' ) &&
			! cleanStep.wpCliPath
		) {
			delete cleanStep.wpCliPath;
		}
		if ( cleanStep.step === 'runSql' ) {
			if ( typeof cleanStep.sql === 'string' ) {
				cleanStep.sql = {
					resource: 'literal',
					name: 'query.sql',
					contents: cleanStep.sql,
				};
			} else if ( ! cleanStep.sql || typeof cleanStep.sql !== 'object' ) {
				cleanStep.sql = {
					resource: 'literal',
					name: 'query.sql',
					contents: '',
				};
			}
		}
		if ( cleanStep.step === 'writeFiles' ) {
			if ( ! cleanStep.writeToPath ) {
				cleanStep.writeToPath = '/wordpress';
			}
			if (
				! cleanStep.filesTree ||
				typeof cleanStep.filesTree !== 'object'
			) {
				cleanStep.filesTree = {
					name: 'files',
					files: {},
				};
			} else if (
				cleanStep.filesTree.resource !== 'git:directory' &&
				! cleanStep.filesTree.name
			) {
				cleanStep.filesTree = {
					...cleanStep.filesTree,
					name: 'files',
					files: cleanStep.filesTree.files || {},
				};
			}
		}

		return cleanStep;
	} );

	const steps = [ ...blockAttributes ];

	let extraLibraries;
	if ( Array.isArray( blueprintConfig.extraLibraries ) ) {
		extraLibraries = blueprintConfig.extraLibraries;
	} else if ( blueprintConfig.extraLibraries ) {
		extraLibraries = [ 'wp-cli' ];
	}

	const features = {};
	if (
		blueprintConfig.networking !== undefined &&
		blueprintConfig.networking !== null
	) {
		features.networking = Boolean( blueprintConfig.networking );
	}
	if ( blueprintConfig.intl ) {
		features.intl = true;
	}

	let meta;
	if (
		blueprintConfig.meta &&
		typeof blueprintConfig.meta === 'object' &&
		Object.keys( blueprintConfig.meta ).length > 0
	) {
		const candidateTitle =
			blueprintConfig.meta.title || postTitle || 'Blueprint';
		const candidateAuthor =
			blueprintConfig.meta.author || postAuthor || 'WordPress';
		meta = {
			title: candidateTitle,
			author: candidateAuthor,
		};
		if ( blueprintConfig.meta.description ) {
			meta.description = blueprintConfig.meta.description;
		}
		if (
			Array.isArray( blueprintConfig.meta.categories ) &&
			blueprintConfig.meta.categories.length > 0
		) {
			meta.categories = blueprintConfig.meta.categories;
		}
	}

	const fullSchema = {
		$schema: PLAYGROUND_BLUEPRINT_SCHEMA_URL,
		landingPage: blueprintConfig.landing_page,
		preferredVersions: {
			php: blueprintConfig.php_version || 'latest',
			wp: blueprintConfig.wp_version ?? 'latest',
		},
		features: Object.keys( features ).length > 0 ? features : undefined,
		login: blueprintConfig.login || undefined,
		constants:
			blueprintConfig.constants &&
			Object.keys( blueprintConfig.constants ).length > 0
				? blueprintConfig.constants
				: undefined,
		siteOptions:
			blueprintConfig.siteOptions &&
			Object.keys( blueprintConfig.siteOptions ).length > 0
				? blueprintConfig.siteOptions
				: undefined,
		extraLibraries,
		plugins:
			blueprintConfig.plugins &&
			Object.keys( blueprintConfig.plugins ).length > 0
				? blueprintConfig.plugins
				: undefined,
		meta,
		steps,
	};

	// Remove undefined keys from fullSchema
	Object.keys( fullSchema ).forEach( ( key ) => {
		if ( fullSchema[ key ] === undefined ) {
			delete fullSchema[ key ];
		}
	} );

	return JSON.stringify( fullSchema, null, 2 );
};

/**
 * React hook to retrieve and manage the blueprint configuration from post meta.
 *
 * @return {Object} Blueprint data helpers and state.
 */
export const useBlueprintData = () => {
	const { editPost } = useDispatch( 'core/editor' );
	const blocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks(),
		[]
	);
	const postTitle = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'title' );
	}, [] );
	const postAuthor = useSelect( ( select ) => {
		const authorId =
			select( 'core/editor' ).getEditedPostAttribute( 'author' );
		if ( authorId ) {
			const authorUser = select( 'core' )?.getUser?.( authorId );
			return authorUser?.slug || authorUser?.name || '';
		}
		return '';
	}, [] );
	const blueprintConfig = useSelect( ( select ) => {
		return (
			select( 'core/editor' ).getEditedPostAttribute( 'meta' )
				?._blueprint_config || {}
		);
	}, [] );

	const prepareSchema = useCallback( () => {
		return buildBlueprintJson( {
			blocks,
			blueprintConfig,
			postTitle,
			postAuthor,
		} );
	}, [ blocks, blueprintConfig, postTitle, postAuthor ] );

	const updateBlueprintConfig = useCallback(
		( updatedValues ) => {
			editPost( {
				meta: {
					_blueprint_config: {
						...blueprintConfig,
						...updatedValues,
					},
				},
			} );
		},
		[ editPost, blueprintConfig ]
	);

	return {
		prepareSchema,
		updateBlueprintConfig,
		blueprintConfig,
	};
};

/**
 * Remove empty steps from a prepared schema JSON string.
 *
 * @param {string} schemaStr JSON string.
 * @return {string} Sanitized JSON string.
 */
export const sanitizePreparedSchemaString = ( schemaStr ) => {
	try {
		const obj = JSON.parse( schemaStr );
		if (
			! obj?.steps ||
			( Array.isArray( obj.steps ) && obj.steps.length === 0 )
		) {
			delete obj.steps;
		}
		return JSON.stringify( obj );
	} catch {
		return schemaStr;
	}
};

/**
 * Returns the documentation anchor hash for a playground step.
 *
 * Playground doc anchors on developer.wordpress.org use the lowercase step name
 * (e.g. 'installPlugin' -> '#installplugin', 'wp-cli' -> '#wp-cli').
 *
 * @param {string} blockName Block name (e.g. 'playground-step/install-plugin').
 * @return {string|null} Documentation anchor hash or null if not a playground step.
 */
export const getStepDocAnchor = ( blockName ) => {
	if (
		typeof blockName !== 'string' ||
		! blockName.startsWith( 'playground-step/' )
	) {
		return null;
	}

	const slug = blockName.replace( 'playground-step/', '' );

	return slug === 'wp-cli' ? 'wp-cli' : slug.replaceAll( '-', '' );
};
