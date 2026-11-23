/**
 * External dependencies
 */
import { act } from 'react';

/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TreeEditor, {
	objectToTreeData,
	treeDataToObject,
	findTreeItem,
	hasDuplicateSiblingKeys,
} from '../../../src/components/tree-editor';

describe( 'TreeEditor Component Utilities', () => {
	describe( 'objectToTreeData', () => {
		it( 'converts flat objects into tree nodes', () => {
			const input = {
				blogname: 'Test Site',
				posts_per_page: 5,
			};

			const tree = objectToTreeData( input );

			expect( tree ).toHaveLength( 2 );
			expect( tree[ 0 ].key ).toBe( 'blogname' );
			expect( tree[ 0 ].value ).toBe( 'Test Site' );
			expect( tree[ 0 ].type ).toBe( 'string' );
			expect( tree[ 0 ].hasChildren ).toBe( false );
			expect( tree[ 0 ].path ).toBe( 'blogname' );

			expect( tree[ 1 ].key ).toBe( 'posts_per_page' );
			expect( tree[ 1 ].value ).toBe( 5 );
			expect( tree[ 1 ].path ).toBe( 'posts_per_page' );
		} );

		it( 'converts nested objects into hierarchical tree nodes with correct paths', () => {
			const input = {
				options: {
					site: {
						title: 'Nested Title',
					},
				},
			};

			const tree = objectToTreeData( input );

			expect( tree ).toHaveLength( 1 );
			expect( tree[ 0 ].key ).toBe( 'options' );
			expect( tree[ 0 ].type ).toBe( 'object' );
			expect( tree[ 0 ].hasChildren ).toBe( true );
			expect( tree[ 0 ].path ).toBe( 'options' );

			const siteNode = tree[ 0 ].children[ 0 ];
			expect( siteNode.key ).toBe( 'site' );
			expect( siteNode.type ).toBe( 'object' );
			expect( siteNode.hasChildren ).toBe( true );
			expect( siteNode.path ).toBe( 'options.site' );

			const titleNode = siteNode.children[ 0 ];
			expect( titleNode.key ).toBe( 'title' );
			expect( titleNode.value ).toBe( 'Nested Title' );
			expect( titleNode.type ).toBe( 'string' );
			expect( titleNode.hasChildren ).toBe( false );
			expect( titleNode.path ).toBe( 'options.site.title' );
		} );
	} );

	describe( 'treeDataToObject & Roundtrip Fidelity', () => {
		it( 'reconstructs original flat object from tree nodes', () => {
			const original = {
				blogname: 'Test Site',
				admin_email: 'admin@example.com',
			};

			const tree = objectToTreeData( original );
			const result = treeDataToObject( tree );

			expect( result ).toEqual( original );
		} );

		it( 'reconstructs complex nested object from hierarchical tree nodes', () => {
			const complexData = {
				features: {
					networking: true,
					debug: {
						log: true,
						display: false,
					},
				},
				theme: 'twentytwentyfour',
			};

			const tree = objectToTreeData( complexData );
			const result = treeDataToObject( tree );

			expect( result ).toEqual( complexData );
		} );

		it( 'handles empty objects gracefully', () => {
			expect( objectToTreeData( {} ) ).toEqual( [] );
			expect( treeDataToObject( [] ) ).toEqual( {} );
		} );

		it( 'returns null when duplicate sibling keys exist at root level', () => {
			const tree = [
				{
					id: '1',
					key: 'sameKey',
					value: 'first',
					hasChildren: false,
					children: [],
				},
				{
					id: '2',
					key: 'sameKey',
					value: 'second',
					hasChildren: false,
					children: [],
				},
			];

			expect( treeDataToObject( tree ) ).toBeNull();
		} );

		it( 'returns null when duplicate sibling keys exist in nested children', () => {
			const tree = [
				{
					id: '1',
					key: 'folder',
					hasChildren: true,
					children: [
						{
							id: '2',
							key: 'file.txt',
							value: 'a',
							hasChildren: false,
							children: [],
						},
						{
							id: '3',
							key: 'file.txt',
							value: 'b',
							hasChildren: false,
							children: [],
						},
					],
				},
			];

			expect( treeDataToObject( tree ) ).toBeNull();
		} );

		it( 'allows equal names under different parents', () => {
			const tree = [
				{
					id: '1',
					key: 'folderA',
					hasChildren: true,
					children: [
						{
							id: '2',
							key: 'file.txt',
							value: 'from A',
							hasChildren: false,
							children: [],
						},
					],
				},
				{
					id: '3',
					key: 'folderB',
					hasChildren: true,
					children: [
						{
							id: '4',
							key: 'file.txt',
							value: 'from B',
							hasChildren: false,
							children: [],
						},
					],
				},
			];

			expect( treeDataToObject( tree ) ).toEqual( {
				folderA: { 'file.txt': 'from A' },
				folderB: { 'file.txt': 'from B' },
			} );
		} );
	} );

	describe( 'hasDuplicateSiblingKeys', () => {
		it( 'returns false for unique sibling keys or empty items', () => {
			expect( hasDuplicateSiblingKeys( [] ) ).toBe( false );
			expect(
				hasDuplicateSiblingKeys( [
					{ key: 'a', children: [] },
					{ key: 'b', children: [] },
				] )
			).toBe( false );
		} );

		it( 'returns false for multiple blank/whitespace keys', () => {
			expect(
				hasDuplicateSiblingKeys( [
					{ key: '', children: [] },
					{ key: '  ', children: [] },
				] )
			).toBe( false );
		} );

		it( 'returns true for duplicate sibling keys', () => {
			expect(
				hasDuplicateSiblingKeys( [
					{ key: 'dup', children: [] },
					{ key: 'dup', children: [] },
				] )
			).toBe( true );
			expect(
				hasDuplicateSiblingKeys( [
					{ key: 'dup', children: [] },
					{ key: ' dup ', children: [] },
				] )
			).toBe( true );
		} );

		it( 'returns true for nested duplicate sibling keys', () => {
			expect(
				hasDuplicateSiblingKeys( [
					{
						key: 'parent',
						children: [
							{ key: 'child', children: [] },
							{ key: 'child', children: [] },
						],
					},
				] )
			).toBe( true );
		} );

		it( 'returns false for equal keys under different parents', () => {
			expect(
				hasDuplicateSiblingKeys( [
					{
						key: 'dir1',
						children: [ { key: 'index.js', children: [] } ],
					},
					{
						key: 'dir2',
						children: [ { key: 'index.js', children: [] } ],
					},
				] )
			).toBe( false );
		} );
	} );

	describe( 'findTreeItem', () => {
		it( 'finds an item by id', () => {
			const tree = objectToTreeData( { site: { title: 'Test' } } );
			const target = tree[ 0 ].children[ 0 ];

			expect( findTreeItem( tree, target ) ).toBe( target );
		} );

		it( 'searches entire tree for matching ID first', () => {
			const tree = objectToTreeData( {
				parent: { child: 'test' },
				other: 'val',
			} );
			const targetChild = tree[ 0 ].children[ 0 ];
			// Pass matching id with a stale/different path
			const resolved = findTreeItem( tree, {
				id: targetChild.id,
				path: 'nonexistent.path',
				pathSegments: [ 'nonexistent', 'path' ],
			} );

			expect( resolved ).toBe( targetChild );
		} );

		it( 'resolves collision-free by key segments when IDs are regenerated and keys have dots', () => {
			const data = {
				'a.b': { c: 'first' },
				a: { 'b.c': 'second' },
			};
			const tree1 = objectToTreeData( data );
			const target1 = tree1[ 0 ].children[ 0 ]; // 'a.b' -> 'c'
			const target2 = tree1[ 1 ].children[ 0 ]; // 'a' -> 'b.c'

			const tree2 = objectToTreeData( data );
			const resolved1 = findTreeItem( tree2, target1 );
			const resolved2 = findTreeItem( tree2, target2 );

			expect( resolved1 ).toBeDefined();
			expect( resolved1.value ).toBe( 'first' );
			expect( resolved1.pathSegments ).toEqual( [ 'a.b', 'c' ] );

			expect( resolved2 ).toBeDefined();
			expect( resolved2.value ).toBe( 'second' );
			expect( resolved2.pathSegments ).toEqual( [ 'a', 'b.c' ] );
		} );

		it( 'finds an item by path when tree is regenerated with different ids', () => {
			const tree1 = objectToTreeData( { site: { title: 'Test' } } );
			const originalTarget = tree1[ 0 ].children[ 0 ];

			const tree2 = objectToTreeData( {
				site: { title: 'Test Updated' },
			} );
			const resolved = findTreeItem( tree2, originalTarget );

			expect( resolved ).toBeDefined();
			expect( resolved.path ).toBe( originalTarget.path );
			expect( resolved.id ).not.toBe( originalTarget.id );
		} );

		it( 'returns null when target item no longer exists in tree', () => {
			const tree1 = objectToTreeData( { site: { title: 'Test' } } );
			const originalTarget = tree1[ 0 ].children[ 0 ];

			const tree2 = objectToTreeData( { other: 'Value' } );
			expect( findTreeItem( tree2, originalTarget ) ).toBeNull();
		} );

		it( 'returns null when a dotted-key target is removed, without falling back to a surviving item with the same string path', () => {
			// Both targets produce the string path 'a.b.c'
			const originalData = {
				'a.b': { c: 'first' },
				a: { 'b.c': 'second' },
			};
			const tree1 = objectToTreeData( originalData );
			// Target is 'a.b' -> 'c' (path: 'a.b.c', pathSegments: ['a.b', 'c'])
			const target1 = tree1[ 0 ].children[ 0 ];

			// Remove 'a.b' so only 'a' -> 'b.c' survives in the regenerated tree
			const updatedData = {
				a: { 'b.c': 'second' },
			};
			const tree2 = objectToTreeData( updatedData );

			// ID was regenerated, and target1 has structural identity ('pathSegments')
			// Lookup for target1 must return null, NOT the surviving node with string path 'a.b.c'
			const resolved = findTreeItem( tree2, target1 );
			expect( resolved ).toBeNull();
		} );
	} );

	describe( 'TreeEditor Component Duplicate Conflict Flow', () => {
		let container;
		let root;

		beforeEach( () => {
			container = document.createElement( 'div' );
			document.body.appendChild( container );
			root = createRoot( container );
		} );

		afterEach( () => {
			act( () => {
				root.unmount();
			} );
			container.remove();
		} );

		it( 'shows conflict and prevents lossy emission when sibling node is renamed to an existing sibling name', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<TreeEditor
						data={ { item1: 'val1', item2: 'val2' } }
						onChange={ onChangeMock }
					/>
				);
			} );

			onChangeMock.mockClear();

			// First column TextControl inputs for the names
			const inputs = container.querySelectorAll(
				'.vpb-tree-children-key input[type="text"]'
			);
			expect( inputs.length ).toBe( 2 );

			// Rename second item to 'item1' (creating a sibling collision)
			act( () => {
				const item2Input = inputs[ 1 ];
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( item2Input, 'item1' );
				item2Input.dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			// Conflict error notice should be displayed
			expect(
				container.textContent.includes(
					'Duplicate names are not allowed'
				)
			).toBe( true );

			// onChange must NOT be called with a lossy object while conflict exists
			expect( onChangeMock ).not.toHaveBeenCalled();

			// Rename second item to unique 'item3'
			const updatedInputs = container.querySelectorAll(
				'.vpb-tree-children-key input[type="text"]'
			);
			act( () => {
				const item2Input = updatedInputs[ 1 ];
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetter.call( item2Input, 'item3' );
				item2Input.dispatchEvent(
					new Event( 'input', { bubbles: true } )
				);
			} );

			// Conflict notice disappears
			expect(
				container.textContent.includes(
					'Duplicate names are not allowed'
				)
			).toBe( false );

			// Normal conversion resumes and emits the complete unique object
			expect( onChangeMock ).toHaveBeenCalledWith( {
				item1: 'val1',
				item3: 'val2',
			} );
		} );

		it( 'allows equal names under different parents without conflict', () => {
			const onChangeMock = jest.fn();

			act( () => {
				root.render(
					<TreeEditor
						data={ {
							dir1: { file: 'content1' },
							dir2: { file: 'content2' },
						} }
						onChange={ onChangeMock }
					/>
				);
			} );

			// No conflict notice should be visible
			expect(
				container.textContent.includes(
					'Duplicate names are not allowed'
				)
			).toBe( false );
		} );
	} );
} );
