/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder, Icon } from '@wordpress/components';
import { Stack, Text } from '@wordpress/ui';

/**
 * StepWrapper component to standardize the UI of all blueprint steps.
 *
 * @param {Object} props Component properties.
 * @param {string} props.title The title of the step.
 * @param {Object|Function} props.icon The icon representing the step.
 * @param {string|React.ReactNode} [props.summary] Summary text or element to display when not selected.
 * @param {boolean} props.isSelected Whether the block is currently selected.
 * @param {React.ReactNode} [props.children] Content displayed when the block is selected.
 * @return {JSX.Element} The rendered StepWrapper component.
 */
export default function StepWrapper( {
	title,
	icon,
	summary,
	isSelected,
	children,
} ) {
	return (
		<div { ...useBlockProps() }>
			<Placeholder
				preview={
					<Stack direction="column" style={ { width: '100%' } }>
						<Stack direction="row" align="center" gap="md">
							<Icon
								icon={ icon }
								size={ 28 }
								className="step-icon"
							/>
							<Stack direction="column" gap="xs">
								<Text
									variant="heading-sm"
									className="vbb-step-title"
								>
									{ title }
								</Text>
								{ ! isSelected &&
									summary &&
									( typeof summary === 'string' ? (
										<Text
											variant="body-md"
											className="vbb-step-summary"
										>
											{ summary }
										</Text>
									) : (
										summary
									) ) }
							</Stack>
						</Stack>
						{ isSelected && children }
					</Stack>
				}
			/>
		</div>
	);
}
