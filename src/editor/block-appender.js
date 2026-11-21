/**
 * WordPress dependencies
 */
import { ButtonBlockAppender } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';

addFilter(
	'editor.BlockEdit',
	'visual-blueprint-builder/default-block-appender',
	( BlockEdit ) => ( props ) => {
		const lastBlockClientId = useSelect( ( select ) => {
			const blockOrder = select( 'core/block-editor' ).getBlockOrder();
			return blockOrder[ blockOrder.length - 1 ];
		}, [] );

		const rootClientId = useSelect(
			( select ) =>
				select( 'core/block-editor' ).getBlockRootClientId(
					props.clientId
				),
			[ props.clientId ]
		);

		// Only show if it's the last root-level block (not inside reusable or inner blocks)
		const shouldShowAppender =
			props.clientId === lastBlockClientId && rootClientId === null;

		return (
			<>
				<BlockEdit { ...props } />
				{ shouldShowAppender && (
					<div className="block-list-appender wp-block">
						<ButtonBlockAppender rootClientId={ null } />
					</div>
				) }
			</>
		);
	}
);
