/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { useState, useEffect } from '@wordpress/element';
import {
	Button,
	Modal,
	Card,
	CardBody,
	CardMedia,
	ExternalLink,
	__experimentalText as Text,
	__experimentalHeading as Heading,
	__experimentalGrid as Grid,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';
import { search } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import { ThemeSkeleton, PluginSkeleton } from '../../components';

/**
 * Utility function to format numbers
 */
const formatNumber = (num) => {
	if (num >= 1000000) return `${(num / 1000000)}M`;
	if (num >= 1000) return `${(num / 1000)}K`;
	return new Intl.NumberFormat("en-IN").format(num);
};

/**
 * Theme Component
 */
const ThemeComponent = ({ item, onSelect }) => {
	return (
		<Card key={item.slug} size="small">
			<CardBody style={{ padding: '0' }}>
				<CardMedia>
					<img src={item.screenshot_url} />
				</CardMedia>
				<CardBody>
					<HStack align="center">
						<Heading level={5}>{item.name}</Heading>
						<Button
							variant="secondary"
							style={{ borderRadius: '4px' }}
							onClick={() => onSelect(item.slug)}>
							{__('Select', 'wp-playground-blueprint-editor')}
						</Button>
					</HStack>
				</CardBody>
			</CardBody>
		</Card>
	);
};

/**
 * Plugin Component
 */
const PluginComponent = ({ item, onSelect }) => {
	return (
		<Card key={item.slug} size="small">
			<CardBody style={{ height: '100%' }}>
				<VStack justify={'space-between'} spacing={4} style={{ height: '100%' }}>
					<VStack spacing={4}>
						<HStack
							justify="start"
							spacing={4}>
							<img
								src={item.icons['1x'] || item.icons.default}
								alt={`${item.name} Icon`}
								style={{
									minWidth: '70px',
									maxHeight: '70px',
									objectFit: 'contain',
									borderRadius: '4px',
								}} />
							<ExternalLink
								href={item.homepage}
								style={{
									fontWeight: 'bold',
									color: '#0073aa',
								}}>
								{decodeEntities(item.name)}
							</ExternalLink>
						</HStack>
						<Text lineHeight={'1.5em'}>
							{item.short_description || __('No description available', 'wp-playground-blueprint-editor')}
						</Text>
						<HStack spacing={10}>
							<Text color='#666'>
								{item.active_installs
									? `${formatNumber(item.active_installs)}+ active installations`
									: __('No data available', 'wp-playground-blueprint-editor')}
							</Text>
							<Text color='#666'>
								{__('Tested with', 'wp-playground-blueprint-editor')} {item.tested || __('Unknown', 'wp-playground-blueprint-editor')}
							</Text>
						</HStack>
					</VStack>
					<HStack justify='right'>
						<Button
							variant="secondary"
							style={{ borderRadius: '4px' }}
							onClick={() => onSelect(item.slug)} >
							{__('Select', 'wp-playground-blueprint-editor')}
						</Button>
					</HStack>
				</VStack>
			</CardBody>
		</Card>
	);
};

/**
 * Theme & Plugin Picker
 */
function Picker({ type, onSelect }) {
	const [isModalOpen, setModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);
	const [popularItems, setPopularItems] = useState([]);
	const [isLoading, setLoading] = useState(false);

	// API endpoint based on type
	const fetchItems = async (query = '') => {
		setLoading(true);
		const isSearch = !!query.trim();
		const url = `https://api.wordpress.org/${type}/info/1.2/?action=query_${type}${isSearch ? `&request[search]=${query}` : `&request[popular]=1`}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			if (isSearch) {
				setResults(data[type] || []);
			} else {
				setPopularItems(data[type] || []);
			}
		} catch (error) {
			console.error(`Error fetching ${type}:`, error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isModalOpen && !searchTerm) {
			fetchItems();
		}
	}, [isModalOpen, searchTerm]);

	const handleSelectItem = (slug) => {
		onSelect(slug);
		setModalOpen(false);
	}

	return (
		<>
			<Button
				variant="secondary"
				onClick={() => setModalOpen(true)}
				style={{
					boxShadow: 'none'
				}}
			>
				{__('Browse', 'wp-playground-blueprint-editor')}
			</Button>
			{isModalOpen && (
				<Modal
					title={__(`Browse ${type[0].toUpperCase()}${type.slice(1)}`, 'wp-playground-blueprint-editor')}
					onRequestClose={() => setModalOpen(false)}
					shouldCloseOnClickOutside={false}
					size='large'
					style={{ height: '70%' }}
				>
					<VStack spacing={6} justify='space-between'>
						<InputControl
							__next40pxDefaultSize
							placeholder={__('Search by name or author', 'wp-playground-blueprint-editor')}
							value={searchTerm}
							onChange={(value) => {
								setSearchTerm(value);
								fetchItems(value);
							}}
							suffix={
								<Button
									variant="link"
									onClick={() => fetchItems(searchTerm)}
									disabled={isLoading}
									style={{
										textDecoration: 'none', // Removes underline
										color: '#0073aa', // Matches theme
									}}
									icon={search}
								/>
							}
						/>
						<VStack>
							{isLoading ? (
								<Grid columns={2} gap={5}>
									{Array.from({ length: 4 }).map((_, index) =>
										type === 'themes' ? <ThemeSkeleton key={index} /> : <PluginSkeleton key={index} />
									)}
								</Grid>
							) : (
								<Grid columns={2} gap={5}>
									{(searchTerm ? results : popularItems).map((item) =>
										type === 'themes' ? (
											<ThemeComponent key={item.slug} item={item} onSelect={handleSelectItem} />
										) : (
											<PluginComponent key={item.slug} item={item} onSelect={handleSelectItem} />
										)
									)}
								</Grid>
							)}
						</VStack>
					</VStack>
				</Modal>
			)}
		</>
	);
};

export default Picker;
