import { useState, useEffect } from '@wordpress/element';
import {
	TextControl,
	Button,
	Modal,
	Spinner,
	Card,
	CardBody,
	Flex,
	FlexItem,
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
		const url = isSearch
			? `https://api.wordpress.org/${type}/info/1.2/?action=query_${type}&request[search]=${query}`
			: `https://api.wordpress.org/${type}/info/1.2/?action=query_${type}&request[popular]=1`;

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
			<Button variant="secondary" onClick={openModal}>
				{__('Browse', 'picker')}
			</Button>
			{isModalOpen && (
				<Modal
					title={__('Browse Items', 'picker')}
					onRequestClose={closeModal}
					shouldCloseOnClickOutside={false}
					style={{ width: "70%" }}
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
					>
						{__('Search', 'picker')}
					</Button>

					{isLoading && <Spinner />}
					{!isLoading && (
						<div>
							<h3>{searchTerm ? __('Search Results', 'picker') : __('Popular Items', 'picker')}</h3>
							<div className="wp-block-editor__block-card-container">
								{(searchTerm ? results : popularItems).map((item) => (
									<Card key={item.slug} style={{ marginBottom: '20px' }}>
										<CardBody>
											<Flex>
												<FlexItem>
													<img
														src={type === 'plugins' ? item.icons['1x'] || item.icons.default : item.author.avatar}
														alt={type === 'plugins' ? `${item.name} Icon` : `${item.author.display_name} Avatar`}
														style={{ width: '50px', height: '50px', borderRadius: '50%' }}
													/>
												</FlexItem>
												<FlexItem>
													<strong>{type === 'plugins' ? item.name : item.name} </strong>
												</FlexItem>
												<FlexItem>
													<a
														href={item.author.profile}
														target="_blank"
														rel="noopener noreferrer"
													>
														{item.author.display_name}
													</a>
												</FlexItem>
												<FlexItem>
													<Button
														variant="secondary"
														onClick={() => {
															onSelect(item.slug);
															closeModal();
														}}
														style={{ marginLeft: '10px' }}
													>
														{__('Select', 'picker')}
													</Button>
												</FlexItem>
											</Flex>
											
											<a
												href={type === 'themes' ? item.preview_url : item.none}
												target="_blank"
												rel="noopener noreferrer"
											>
												{__('Preview', 'picker')}
											</a>
										</CardBody>
									</Card>
								))}
							</div>
						</div>
					)}
				</Modal>
			)}
		</div>
	);
}
