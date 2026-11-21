/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import {
	Button,
	Modal,
	Card,
	CardBody,
	Spinner,
	SearchControl,
} from '@wordpress/components';
import { EmptyState, Stack } from '@wordpress/ui';

/**
 * Internal dependencies
 */
import { handleBlueprintData, useBlueprintData } from '../../editor/utils';
import {
	BLUEPRINTS_GALLERY_API_URL,
	BLUEPRINTS_GALLERY_BASE_URL,
} from '../../editor/constant';

/**
 * Blueprints Gallery component.
 *
 * @param {Object} props Component props.
 * @param {JSX.Element} [props.icon] Icon to display in the button.
 * @param {Function} [props.handleClose] Callback function to close the modal.
 * @return {JSX.Element} Gallery component.
 */
export default function Gallery( { icon = null, handleClose } ) {
	const { updateBlueprintConfig } = useBlueprintData();
	const { createNotice } = useDispatch( noticesStore );

	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ isFetchingList, setIsFetchingList ] = useState( false );
	const [ blueprintList, setBlueprintList ] = useState( null );
	const [ importingBlueprint, setImportingBlueprint ] = useState( null );
	const [ searchTerm, setSearchTerm ] = useState( '' );

	useEffect( () => {
		if ( ! isModalOpen ) {
			return;
		}

		const fetchBlueprintList = async () => {
			setIsFetchingList( true );
			try {
				const response = await fetch( BLUEPRINTS_GALLERY_API_URL );
				if ( ! response.ok ) {
					throw new Error( 'Failed to fetch blueprints' );
				}
				const data = await response.json();
				setBlueprintList( data );
			} catch ( error ) {
				createNotice(
					'error',
					`${ __(
						'Error fetching blueprint list',
						'visual-blueprint-builder'
					) }: ${ error.message }`
				);
			} finally {
				setIsFetchingList( false );
			}
		};

		fetchBlueprintList();
	}, [ isModalOpen, createNotice ] );

	const fetchBlueprintDetails = async ( blueprintName ) => {
		setImportingBlueprint( blueprintName );

		const blueprintUrl = `${ BLUEPRINTS_GALLERY_BASE_URL }${ blueprintName }`;
		try {
			const response = await fetch( blueprintUrl );
			if ( ! response.ok ) {
				throw new Error(
					`Failed to fetch blueprint details: ${ response.statusText }`
				);
			}
			const data = await response.json();

			if ( ! Array.isArray( data.steps ) || data.steps.length === 0 ) {
				createNotice(
					'warning',
					__(
						'The imported blueprint does not contain any steps. Please check the sidebar for shorthands and other settings.',
						'visual-blueprint-builder'
					)
				);
			}

			const normalizedData = {
				...data,
				steps: Array.isArray( data?.steps ) ? data.steps : [],
			};

			await handleBlueprintData(
				normalizedData,
				createNotice,
				updateBlueprintConfig
			);
		} catch ( error ) {
			createNotice(
				'error',
				`${ __(
					'Error fetching blueprint from Gallery',
					'visual-blueprint-builder'
				) }: ${ error.message }`
			);
		} finally {
			setImportingBlueprint( null );
			setModalOpen( false );
			if ( handleClose ) {
				handleClose();
			}
		}
	};

	const filteredBlueprints = useMemo( () => {
		if ( ! blueprintList ) {
			return [];
		}
		const items = Object.entries( blueprintList ).map(
			( [ fileName, meta ] ) => ( {
				fileName,
				title: meta?.title || '',
				author: meta?.author || '',
				description: meta?.description || '',
			} )
		);

		const normalizedSearch = searchTerm.trim().toLowerCase();
		if ( ! normalizedSearch ) {
			return items;
		}

		const tokens = normalizedSearch.split( /\s+/ ).filter( Boolean );
		const norm = ( s ) => ( s || '' ).toString().toLowerCase();

		return items.filter( ( item ) => {
			const haystack = `${ norm( item.title ) } ${ norm(
				item.author
			) } ${ norm( item.description ) } ${ norm( item.fileName ) }`;
			return tokens.every( ( tk ) => haystack.includes( tk ) );
		} );
	}, [ blueprintList, searchTerm ] );

	return (
		<>
			<Button
				className="blueprint_gallery_json"
				onClick={ () => setModalOpen( true ) }
				icon={ icon }
			>
				{ __( 'Gallery', 'visual-blueprint-builder' ) }
			</Button>

			{ isModalOpen && (
				<Modal
					title={ __(
						'Blueprint Gallery',
						'visual-blueprint-builder'
					) }
					onRequestClose={ () => setModalOpen( false ) }
					shouldCloseOnClickOutside
					shouldCloseOnEsc
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

						{ isFetchingList && (
							<Stack
								direction="column"
								align="center"
								gap="md"
								style={ { marginTop: 16 } }
							>
								<Spinner />
								<p>
									{ __(
										'Loading blueprints…',
										'visual-blueprint-builder'
									) }
								</p>
							</Stack>
						) }

						{ ! isFetchingList &&
							blueprintList &&
							filteredBlueprints.length > 0 && (
								<div className="vbb-cards-grid">
									{ filteredBlueprints.map(
										( blueprintDetails, index ) => (
											<Card
												key={ `${ blueprintDetails.fileName }-${ index }` }
											>
												<CardBody
													style={ {
														height: '100%',
														justifyContent:
															'space-between',
														display: 'flex',
														flexDirection: 'column',
													} }
												>
													<Stack
														direction="column"
														align="flex-start"
														gap="md"
													>
														<h4
															style={ {
																margin: 0,
															} }
														>
															{
																blueprintDetails.title
															}
														</h4>
														<span
															style={ {
																fontSize:
																	'13px',
																color: '#555',
															} }
														>
															{ __(
																'By',
																'visual-blueprint-builder'
															) }{ ' ' }
															{
																blueprintDetails.author
															}
														</span>
														<p
															style={ {
																lineHeight:
																	'1.5em',
																fontSize:
																	'14px',
																color: '#777',
																wordBreak:
																	'break-word',
																margin: 0,
															} }
														>
															{
																blueprintDetails.description
															}
														</p>
													</Stack>

													<Button
														variant="secondary"
														style={ {
															borderRadius: '4px',
															alignSelf:
																'flex-end',
															marginTop: '16px',
														} }
														onClick={ () =>
															fetchBlueprintDetails(
																blueprintDetails.fileName
															)
														}
														disabled={
															importingBlueprint ===
															blueprintDetails.fileName
														}
													>
														{ importingBlueprint ===
														blueprintDetails.fileName ? (
															<>
																<Spinner />{ ' ' }
																{ __(
																	'Importing…',
																	'visual-blueprint-builder'
																) }
															</>
														) : (
															__(
																'Import',
																'visual-blueprint-builder'
															)
														) }
													</Button>
												</CardBody>
											</Card>
										)
									) }
								</div>
							) }

						{ ! isFetchingList &&
							blueprintList &&
							filteredBlueprints.length === 0 && (
								<EmptyState.Root
									style={ {
										padding: '24px 0',
										margin: '0 auto',
									} }
								>
									<EmptyState.Title>
										{ __(
											'No blueprints found',
											'visual-blueprint-builder'
										) }
									</EmptyState.Title>
									<EmptyState.Description>
										{ __(
											'No blueprints found for your search.',
											'visual-blueprint-builder'
										) }
									</EmptyState.Description>
								</EmptyState.Root>
							) }

						{ ! isFetchingList && ! blueprintList && (
							<EmptyState.Root
								style={ {
									padding: '24px 0',
									margin: '0 auto',
								} }
							>
								<EmptyState.Title>
									{ __(
										'Unable to load blueprints',
										'visual-blueprint-builder'
									) }
								</EmptyState.Title>
								<EmptyState.Description>
									{ __(
										'Unable to load blueprints from gallery.',
										'visual-blueprint-builder'
									) }
								</EmptyState.Description>
							</EmptyState.Root>
						) }
					</Stack>
				</Modal>
			) }
		</>
	);
}
