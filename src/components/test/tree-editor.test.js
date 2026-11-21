/**
 * Internal dependencies
 */
import { objectToTreeData, treeDataToObject } from '../tree-editor';

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
} );
