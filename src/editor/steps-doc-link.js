/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { ExternalLink } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STEP_DOCS_MAP } from './constant';

/**
 * Renders a paragraph with a link to learn more about the description.
 * 
 * @param {Object} props The component props.
 * @param {string} props.title The title of the link.
 * @param {string} props.url The URL of the link.
 * @param {React.ReactNode} props.children The children of the component.
 * 
 * @return {React.ReactElement} The component.
 */
const DescriptionSupportLink = ({ title, url, children }) => (
    <>
        {children}
        <p style={{ marginTop: '8px' }}>
            <ExternalLink href={url}>
                {__('Learn more', 'your-text-domain')}
            </ExternalLink>
        </p>
    </>
);

/**
 * Creates an interpolated element for a description with a learn more link.
 *
 * @param {string} title The title of the description.
 * @param {string} description The description text.
 * @param {string} url The URL of the link.
 *
 * @return {JSX.Element} The interpolated element.
 */
const createLocalizedDescriptionWithLearnMore = (title, description, url) => {
    return createInterpolateElement('<InlineSupportLink />', {
        InlineSupportLink: (
            <DescriptionSupportLink title={title} url={url}>
                {description}
            </DescriptionSupportLink>
        ),
    });
};

const processedSteps = {};

/**
 * Adds a "Learn more" link to the description of each step in the Visual Blueprint Builder.
 * 
 * @param {Object} settings - The block settings.
 * @param {string} name - The name of the step.
 * 
 * @return {Object} The modified block settings.
 */
const addStepLearnMoreLink = (settings, name) => {
    // Avoid duplicate injection
    if (processedSteps[name]) {
        return settings;
    }
    processedSteps[name] = true;

    const stepInfo = STEP_DOCS_MAP[name];

    if (!stepInfo) return settings;

    settings.description = createLocalizedDescriptionWithLearnMore(
        settings.title,
        settings.description,
        stepInfo.link
    );

    return settings;
};

addFilter(
    'blocks.registerBlockType',
    'blueprint/add-step-learn-more-link',
    addStepLearnMoreLink
);
