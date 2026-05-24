/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	Icon,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';

/**
 * StepWrapper component to standardize the UI of all blueprint steps.
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
					<VStack style={ { width: '100%' } }>
						<HStack justify="left" align={ 'center' } spacing={ 3 }>
							<Icon
								icon={ icon }
								size={ 28 }
								className="step-icon"
							/>
							<VStack spacing={ 1 }>
								<Text
									upperCase
									size={ 12 }
									weight={ 500 }
									color="#949494"
								>
									{ title }
								</Text>
								{ ! isSelected &&
									summary &&
									( typeof summary === 'string' ? (
										<Text weight={ 600 }>{ summary }</Text>
									) : (
										summary
									) ) }
							</VStack>
						</HStack>
						{ isSelected && children }
					</VStack>
				}
			/>
		</div>
	);
}
