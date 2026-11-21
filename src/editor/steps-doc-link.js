/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createInterpolateElement } from '@wordpress/element';
import { Link, Text } from '@wordpress/ui';

/**
 * Internal dependencies
 */
import { PLAYGROUND_DOCS_BASE } from './constant';
import { getStepDocAnchor } from './utils';

/**
 * Renders a paragraph with a link to learn more about the description.
 *
 * @param {Object} props The component props.
 * @param {string} props.url The URL of the link.
 * @param {React.ReactNode} props.children The children of the component.
 * @return {JSX.Element} The component.
 */
const DescriptionSupportLink = ( { url, children } ) => (
	<>
		{ children }
		<Text variant="body-sm" render={ <p style={ { marginTop: '8px' } } /> }>
			<Link href={ url } openInNewTab>
				{ __( 'Learn more', 'visual-blueprint-builder' ) }
			</Link>
		</Text>
	</>
);

/**
 * Creates an interpolated element for a description with a learn more link.
 *
 * @param {string} title The title of the description.
 * @param {string} description The description text.
 * @param {string} url The URL of the link.
 * @return {JSX.Element} The interpolated element.
 */
const createLocalizedDescriptionWithLearnMore = ( title, description, url ) => {
	return createInterpolateElement( '<InlineSupportLink />', {
		InlineSupportLink: (
			<DescriptionSupportLink url={ url }>
				{ description }
			</DescriptionSupportLink>
		),
	} );
};

const processedSteps = {};

/**
 * Adds a "Learn more" link to the description of each step in the Visual Blueprint Builder.
 *
 * @param {Object} settings The block settings.
 * @param {string} name The name of the step.
 * @return {Object} The modified block settings.
 */
const addStepLearnMoreLink = ( settings, name ) => {
	if ( processedSteps[ name ] ) {
		return settings;
	}
	processedSteps[ name ] = true;

	const stepHash = getStepDocAnchor( name );
	if ( ! stepHash ) {
		return settings;
	}

	settings.description = createLocalizedDescriptionWithLearnMore(
		settings.title,
		settings.description,
		`${ PLAYGROUND_DOCS_BASE }#${ stepHash }`
	);

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'blueprint/add-step-learn-more-link',
	addStepLearnMoreLink
);
