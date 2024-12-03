import { useState, useEffect } from '@wordpress/element';
import {
	TextControl,
	Button,
	Modal,
	Spinner,
	Card,
	CardBody,
	ExternalLink,
	__experimentalText as Text,
	__experimentalGrid as Grid,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Picker({ type, onSelect }) {
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

	// Modal handlers
	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<div>
			<Button variant="secondary" onClick={openModal}
				style={{
					borderRadius: '8px'
				}}
			>
				{__('Browse', 'picker')}
			</Button>
			{isModalOpen && (
				<Modal
					title={__('Browse Items', 'picker')}
					onRequestClose={closeModal}
					shouldCloseOnClickOutside={false}
					style={{ width: '75%' }}
				>
					<TextControl
						placeholder={__('Search by name or author', 'picker')}
						value={searchTerm}
						onChange={(value) => {
							setSearchTerm(value);
							fetchItems(value);
						}}
					/>
					<Button
						variant="primary"
						onClick={() => fetchItems(searchTerm)}
						disabled={isLoading}
						style={{
							borderRadius: '8px'
						}}
					>
						{__('Search', 'picker')}
					</Button>

					{isLoading && <Spinner />}
					{!isLoading && (
						<VStack>
							<h3>{searchTerm ? __('Search Results', 'picker') : __('Popular Items', 'picker')}</h3>
							<Grid
								columns={3} 
								gap={10}   
							>
								{(searchTerm ? results : popularItems).map((item) => (
									<Card key={item.slug} size='large'>
										<CardBody>
											<VStack style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
												<img
													src={type === 'plugins' ? item.icons['1x'] || item.icons.default : item.author.avatar}
													alt={type === 'plugins' ? `${item.name} Icon` : `${item.author.display_name} Avatar`}
													style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
												/>
												<HStack>
													<strong>{item.name}</strong>
													<Text>
														<ExternalLink href={item.author.profile} target="_blank">
															{item.author.display_name}
														</ExternalLink>
													</Text>
												</HStack>
											</VStack>
											<HStack>
												<Button
													style={{
														borderRadius: '8px'
													}}
													variant="secondary"
													onClick={() => {
														onSelect(item.slug);
														closeModal();
													}}
												>
													{__('Select', 'picker')}
												</Button>
												{type === 'themes' && (
													<Button
														style={{
															borderRadius: '8px'
														}}
														variant="secondary"
														onClick={() => window.open(item.preview_url, '_blank')}
													>
														{__('Preview', 'picker')}
													</Button>
												)}
											</HStack>
										</CardBody>
									</Card>
								))}
							</Grid>
						</VStack>
					)}
				</Modal>
			)}
		</div>

	);
}
