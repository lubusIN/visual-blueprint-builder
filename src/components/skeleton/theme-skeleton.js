/**
 * WordPress dependencies.
 */
import { Card, CardBody } from '@wordpress/components';
import { Stack } from '@wordpress/ui';

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
		<Card style={ { borderRadius: '4px' } }>
			<CardBody style={ { padding: 0, lineHeight: '0px' } }>
				<Skeleton
					width={ '100%' }
					height={ 200 }
					style={ { borderRadius: '0px' } }
				/>
				<Stack
					direction="row"
					gap="xs"
					align="center"
					justify="space-between"
					style={ { padding: '12px' } }
				>
					<Skeleton height={ 16 } width={ 180 } />
					<Skeleton width={ 80 } height={ 32 } />
				</Stack>
			</CardBody>
		</Card>
	);
}

export default ThemeSkeleton;
