/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
    Card,
    CardBody,
    __experimentalHStack as HStack,
} from '@wordpress/components';

/**
 * Skeleton dependencies.
 */
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Theme Skeleton
 */
function ThemeSkeleton() {
    return (
        <Card style={{ borderRadius: '4px' }}>
            <CardBody style={{ padding: 0, lineHeight: '0px' }}>
                <Skeleton width={'100%'} height={200} style={{ borderRadius: '0px' }} />
                <HStack spacing={2} align="center" justify='space-between' style={{ padding: '12px' }}>
                    <Skeleton height={16} width={180} />
                    <Skeleton width={80} height={32} />
                </HStack>
            </CardBody>
        </Card>
    );
};

export default ThemeSkeleton;