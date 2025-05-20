const { ButtonBlockAppender } = wp.blockEditor;
const { useSelect } = wp.data;

wp.hooks.addFilter(
    'editor.BlockEdit',
    'block-editor-for-playground-blueprint/default-block-appender',
    (BlockEdit) => (props) => {

        const lastBlockClientId = useSelect((select) => {
            const blockOrder = select('core/block-editor').getBlockOrder();
            return blockOrder[blockOrder.length - 1]; // Get the last block's clientId
        }, []);

        const rootClientId = useSelect((select) =>
            select('core/block-editor').getBlockRootClientId(props.clientId),
            [props.clientId]
        );
        // Only show if it's the last root-level block (not inside reusable or inner blocks)
        const shouldShowAppender = props.clientId === lastBlockClientId && rootClientId === null;

        return (
            <>
                <BlockEdit {...props} />
                {shouldShowAppender && (
                    <div className={'block-list-appender wp-block'}>
                        <ButtonBlockAppender
                            rootClientId={null} // Since we don't have nested blocks
                        />
                    </div>
                )}
            </>
        );
    }
);
