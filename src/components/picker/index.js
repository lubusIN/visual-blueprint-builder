/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { useState, useEffect, useRef, useCallback } from '@wordpress/element';
import { Button, Modal, SearchControl } from '@wordpress/components';
import { Badge, Card, EmptyState, Link, Stack, Text } from '@wordpress/ui';

/**
 * Internal dependencies.
 */
import { ThemeSkeleton, PluginSkeleton } from '../../components';

/**
 * Utility function to format numbers
 *
 * @param {number} num Number to format.
 * @return {string} Formatted number.
 */
const formatNumber = ( num ) => {
	if ( num >= 1000000 ) {
		return `${ ( num / 1000000 ).toFixed( 1 ) }M`;
	}
	if ( num >= 1000 ) {
		return `${ ( num / 1000 ).toFixed( 0 ) }K`;
	}
	return new Intl.NumberFormat( 'en-US' ).format( num );
};

/**
 * Common Select Button Component
 */
const SelectButton = ( { isSelected, onSelect, slug } ) => (
	<Button
		variant={ isSelected ? 'primary' : 'secondary' }
		onClick={ () => onSelect( slug ) }
		disabled={ isSelected }
	>
		{ isSelected
			? __( 'Selected', 'visual-blueprint-builder' )
			: __( 'Select', 'visual-blueprint-builder' ) }
	</Button>
);

/**
 * Theme Component
 */
const ThemeComponent = ( { item, onSelect, selectedSlug } ) => {
	const isSelected = selectedSlug === item.slug;

	return (
		<Card.Root key={ item.slug }>
			<Card.Content style={ { padding: '0' } }>
				<img
					src={ item.screenshot_url }
					alt={ item.name }
					style={ {
						display: 'block',
						width: '100%',
						height: 'auto',
					} }
				/>
				<Stack
					direction="row"
					align="center"
					justify="space-between"
					style={ { padding: '12px' } }
				>
					<Text
						variant="heading-sm"
						render={ <h5 style={ { margin: 0 } } /> }
					>
						{ item.name }
					</Text>
					<SelectButton
						isSelected={ isSelected }
						onSelect={ onSelect }
						slug={ item.slug }
					/>
				</Stack>
			</Card.Content>
		</Card.Root>
	);
};

/**
 * Plugin Component
 */
const PluginComponent = ( { item, onSelect, selectedSlug } ) => {
	const isSelected = selectedSlug === item.slug;

	return (
		<Card.Root key={ item.slug }>
			<Card.Content style={ { height: '100%' } }>
				<Stack
					direction="column"
					justify="space-between"
					gap="md"
					style={ { height: '100%' } }
				>
					<Stack direction="column" gap="md">
						<Stack
							direction="row"
							justify="flex-start"
							align="center"
							gap="md"
						>
							<img
								src={
									item.icons?.[ '1x' ] || item.icons?.default
								}
								alt={ `${ item.name } Icon` }
								style={ {
									minWidth: '70px',
									maxHeight: '70px',
									objectFit: 'contain',
									borderRadius: '4px',
								} }
							/>
							<Text
								variant="heading-sm"
								render={
									<span style={ { fontWeight: 600 } } />
								}
							>
								<Link href={ item.homepage } openInNewTab>
									{ decodeEntities( item.name ) }
								</Link>
							</Text>
						</Stack>
						<Text
							variant="body-sm"
							render={
								<p
									style={ {
										margin: 0,
										lineHeight: '1.5em',
									} }
								/>
							}
						>
							{ item.short_description ||
								__(
									'No description available',
									'visual-blueprint-builder'
								) }
						</Text>
						<Stack direction="row" gap="sm">
							<Badge intent="none">
								{ item.active_installs
									? `${ formatNumber(
											item.active_installs
									  ) }+ active installations`
									: __(
											'No data available',
											'visual-blueprint-builder'
									  ) }
							</Badge>
							<Badge intent="informational">
								{ item.tested
									? sprintf(
											/* translators: %s: WordPress version */
											__(
												'Tested with %s',
												'visual-blueprint-builder'
											),
											item.tested
									  )
									: __(
											'Tested with Unknown',
											'visual-blueprint-builder'
									  ) }
							</Badge>
						</Stack>
					</Stack>
					<Stack direction="row" justify="flex-end">
						<SelectButton
							isSelected={ isSelected }
							onSelect={ onSelect }
							slug={ item.slug }
						/>
					</Stack>
				</Stack>
			</Card.Content>
		</Card.Root>
	);
};

/**
 * Theme & Plugin Picker Modal
 *
 * @param {Object} props Component properties.
 * @param {string} props.type 'plugins' or 'themes'.
 * @param {Function} props.onSelect Selection callback.
 * @param {string} [props.selectedSlug] Currently selected slug.
 * @return {JSX.Element} Picker component.
 */
export default function Picker( { type, onSelect, selectedSlug } ) {
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ results, setResults ] = useState( [] );
	const [ popularItems, setPopularItems ] = useState( [] );
	const [ isLoading, setLoading ] = useState( false );
	const activeRequestRef = useRef( 0 );

	const fetchItems = useCallback(
		async ( query = '' ) => {
			const requestId = ++activeRequestRef.current;
			setLoading( true );
			const isSearch = Boolean( query.trim() );
			const url = `https://api.wordpress.org/${ type }/info/1.2/?action=query_${ type }${
				isSearch
					? `&request[search]=${ encodeURIComponent( query ) }`
					: '&request[popular]=1'
			}`;

			try {
				const response = await fetch( url );
				const data = await response.json();
				if ( requestId === activeRequestRef.current ) {
					if ( isSearch ) {
						setResults( data[ type ] || [] );
					} else {
						setPopularItems( data[ type ] || [] );
					}
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( `Error fetching ${ type }:`, error );
			} finally {
				if ( requestId === activeRequestRef.current ) {
					setLoading( false );
				}
			}
		},
		[ type ]
	);

	useEffect( () => {
		if ( isModalOpen && ! searchTerm ) {
			fetchItems();
		}
	}, [ isModalOpen, searchTerm, fetchItems ] );

	useEffect( () => {
		if ( ! isModalOpen || ! searchTerm ) {
			return;
		}
		const timer = setTimeout( () => {
			fetchItems( searchTerm );
		}, 300 );
		return () => clearTimeout( timer );
	}, [ searchTerm, isModalOpen, fetchItems ] );

	const handleSelectItem = ( slug ) => {
		onSelect( slug );
		setModalOpen( false );
	};

	const itemsToDisplay = searchTerm ? results : popularItems;

	const modalTitle =
		type === 'themes'
			? __( 'Browse Themes', 'visual-blueprint-builder' )
			: __( 'Browse Plugins', 'visual-blueprint-builder' );

	return (
		<>
			<Button
				__next40pxDefaultSize
				variant="secondary"
				size="default"
				onClick={ () => setModalOpen( true ) }
			>
				{ __( 'Browse', 'visual-blueprint-builder' ) }
			</Button>
			{ isModalOpen && (
				<Modal
					title={ modalTitle }
					onRequestClose={ () => setModalOpen( false ) }
					shouldCloseOnClickOutside={ false }
					size="large"
				>
					<Stack direction="column" gap="xl" justify="space-between">
						<SearchControl
							__nextHasNoMarginBottom
							placeholder={ __(
								'Search by name or author',
								'visual-blueprint-builder'
							) }
							value={ searchTerm }
							onChange={ setSearchTerm }
						/>
						<Stack direction="column" gap="md">
							{ isLoading ? (
								<div className="vbb-cards-grid">
									{ Array.from( { length: 4 } ).map(
										( _, index ) =>
											type === 'themes' ? (
												<ThemeSkeleton key={ index } />
											) : (
												<PluginSkeleton key={ index } />
											)
									) }
								</div>
							) : (
								<>
									{ itemsToDisplay.length > 0 ? (
										<div className="vbb-cards-grid">
											{ itemsToDisplay.map( ( item ) => {
												const ItemComponent =
													type === 'themes'
														? ThemeComponent
														: PluginComponent;
												return (
													<ItemComponent
														key={ item.slug }
														item={ item }
														onSelect={
															handleSelectItem
														}
														selectedSlug={
															selectedSlug
														}
													/>
												);
											} ) }
										</div>
									) : (
										<EmptyState.Root>
											<EmptyState.Title>
												{ __(
													'No results found',
													'visual-blueprint-builder'
												) }
											</EmptyState.Title>
											<EmptyState.Description>
												{ searchTerm
													? sprintf(
															/* translators: %s: resource type */
															__(
																'No %s found matching your search.',
																'visual-blueprint-builder'
															),
															type
													  )
													: sprintf(
															/* translators: %s: resource type */
															__(
																'No %s available.',
																'visual-blueprint-builder'
															),
															type
													  ) }
											</EmptyState.Description>
										</EmptyState.Root>
									) }
								</>
							) }
						</Stack>
					</Stack>
				</Modal>
			) }
		</>
	);
}
