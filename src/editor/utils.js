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
	PHP_VERSIONS,
	WP_VERSIONS,
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
 * Updates deprecated fields in blueprint steps before validation.
 * Replaces `pluginZipFile` with `pluginData` and `themeZipFile` with `themeData`.
 *
 * @param {Object} jsonData Raw JSON data.
 * @return {Object} Normalized JSON data.
 */
const updateDeprecatedFields = ( jsonData ) => {
	if ( ! jsonData || ! jsonData.steps ) {
		return jsonData;
	}

	const updatedSteps = jsonData.steps.map( ( step ) => {
		if ( step.step === 'installPlugin' && step.pluginZipFile ) {
			const { pluginZipFile, ...rest } = step;
			return {
				...rest,
				pluginData: pluginZipFile,
			};
		}

		if ( step.step === 'installTheme' && step.themeZipFile ) {
			const { themeZipFile, ...rest } = step;
			return {
				...rest,
				themeData: themeZipFile,
			};
		}

		return step;
	} );

	return {
		...jsonData,
		steps: updatedSteps,
	};
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
		return PHP_VERSIONS;
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
 * and server-provided release catalog or localized data for WordPress versions,
 * falling back gracefully to curated constants.
 *
 * @param {Object} currentConfig Current blueprint configuration.
 * @return {{phpVersions: Array, wpVersions: Array}} Supported version options.
 */
export const usePlaygroundVersions = ( currentConfig = {} ) => {
	const [ phpVersions, setPhpVersions ] = useState( PHP_VERSIONS );
	const [ wpVersions, setWpVersions ] = useState( () => {
		if ( window?.vbbSettings?.wpVersions?.length ) {
			return window.vbbSettings.wpVersions;
		}
		return WP_VERSIONS;
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
				// Keep fallback PHP_VERSIONS on error or offline
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
const validateAgainstSchema = async ( data, createNotice ) => {
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
const handleJsonDataSubmit = ( data, updateBlueprintConfig, createNotice ) => {
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

	updateBlueprintConfig( {
		landing_page: data.landingPage,
		php_version: preferredVersions.php || 'latest',
		wp_version: preferredVersions.wp ?? 'latest',
		networking: features.networking || false,
		login: data.login || false,
		siteOptions: data.siteOptions || undefined,
		extraLibraries: data.extraLibraries || false,
		plugins: data.plugins || undefined,
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

		const { meta, ...filteredData } = updatedData;
		const steps = Array.isArray( filteredData.steps )
			? filteredData.steps
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
			filteredData,
			updateBlueprintConfig,
			createNotice
		);
	} catch ( err ) {
		return err;
	}
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
	const blueprintConfig = useSelect( ( select ) => {
		return (
			select( 'core/editor' ).getEditedPostAttribute( 'meta' )
				?._blueprint_config || {}
		);
	}, [] );

	const prepareSchema = useCallback( () => {
		const blockAttributes = ( blocks || [] ).map( ( block ) => {
			const { metadata, ...rest } = block.attributes;
			return rest;
		} );

		const steps = [ ...blockAttributes ];

		let extraLibraries;
		if ( Array.isArray( blueprintConfig.extraLibraries ) ) {
			extraLibraries = blueprintConfig.extraLibraries;
		} else if ( blueprintConfig.extraLibraries ) {
			extraLibraries = [ 'wp-cli' ];
		}

		const fullSchema = {
			$schema: PLAYGROUND_BLUEPRINT_SCHEMA_URL,
			landingPage: blueprintConfig.landing_page,
			preferredVersions: {
				php: blueprintConfig.php_version,
				wp: blueprintConfig.wp_version,
			},
			features: blueprintConfig.networking ? { networking: true } : {},
			login: blueprintConfig.login,
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
			steps,
		};

		return JSON.stringify( fullSchema, null, 2 );
	}, [ blocks, blueprintConfig ] );

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
