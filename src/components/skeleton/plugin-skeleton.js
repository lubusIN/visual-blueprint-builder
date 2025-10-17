/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
    Card,
    CardBody,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
} from '@wordpress/components';

/**
 * Skeleton dependencies.
 */
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Plugin Skeleton
 */
function PluginSkeleton() {
    return (
        <Card size="small">
            <CardBody>
                <VStack justify={'space-between'} spacing={4} style={{ height: '100%' }}>
                    <HStack expanded spacing={8}>
                        <Skeleton width={70} height={70} style={{ borderRadius: '4px' }} />
                        <VStack style={{ width: '100%' }}>
                            <Skeleton height={20} width="60%" />
                        </VStack>
                    </HStack>
                    <Skeleton height={16} width="90%" />
                    <HStack justify='space-between'>
                        <Skeleton containerClassName={'custom-skeleton'} height={10} width="80%" />
                        <Skeleton containerClassName={'custom-skeleton'} height={10} width="100%" />
                    </HStack>
                    <HStack justify='right'>
                        <Skeleton width={80} height={32} style={{ borderRadius: '4px' }} />
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
};

export default PluginSkeleton;