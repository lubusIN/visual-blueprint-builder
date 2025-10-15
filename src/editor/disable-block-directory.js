/**
 * Disable Block Directory plugin for 'blueprint' post type.
 */
wp.domReady(() => {
    const select = wp.data?.select;
    const getPostType = () => select?.('core/editor')?.getCurrentPostType?.();

    const tryUnregister = () => {
        const postType = getPostType();
        if (!postType) return;

        if (postType === 'blueprint' && wp.plugins.getPlugin?.('block-directory')) {
            wp.plugins.unregisterPlugin('block-directory');
        }
        // We only need to run this once.
        unsubscribe?.();
    };

    const unsubscribe = wp.data?.subscribe(tryUnregister);
    tryUnregister();
});