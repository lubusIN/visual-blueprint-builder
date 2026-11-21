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
 * Plugin Skeleton
 */
function PluginSkeleton() {
	return (
		<Card size="small">
			<CardBody>
				<Stack
					direction="column"
					justify="space-between"
					gap="md"
					style={ { height: '100%' } }
				>
					<Stack direction="row" gap="md" style={ { width: '100%' } }>
						<Skeleton
							width={ 70 }
							height={ 70 }
							style={ { borderRadius: '4px' } }
						/>
						<Stack direction="column" style={ { width: '100%' } }>
							<Skeleton height={ 20 } width="60%" />
						</Stack>
					</Stack>
					<Skeleton height={ 16 } width="90%" />
					<Stack direction="row" justify="space-between">
						<Skeleton
							containerClassName={ 'custom-skeleton' }
							height={ 10 }
							width="80%"
						/>
						<Skeleton
							containerClassName={ 'custom-skeleton' }
							height={ 10 }
							width="100%"
						/>
					</Stack>
					<Stack direction="row" justify="flex-end">
						<Skeleton
							width={ 80 }
							height={ 32 }
							style={ { borderRadius: '4px' } }
						/>
					</Stack>
				</Stack>
			</CardBody>
		</Card>
	);
}

export default PluginSkeleton;
