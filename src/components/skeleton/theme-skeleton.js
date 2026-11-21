/**
 * WordPress dependencies.
 */
import { Card, Stack } from '@wordpress/ui';

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
		<Card.Root>
			<Card.Content style={ { padding: 0, lineHeight: '0px' } }>
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
			</Card.Content>
		</Card.Root>
	);
}

export default ThemeSkeleton;
