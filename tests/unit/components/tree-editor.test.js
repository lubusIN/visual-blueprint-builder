/**
 * Internal dependencies
 */
import {
	objectToTreeData,
	treeDataToObject,
	findTreeItem,
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
} );
