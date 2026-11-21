/**
 * Internal dependencies
 */
import { getResourceSummary } from '../resource-selector';

describe( 'ResourceSelector Component Utilities', () => {
	describe( 'getResourceSummary', () => {
		it( 'handles url resource summary and fallback', () => {
			expect(
				getResourceSummary( 'plugin', {
					resource: 'url',
					url: 'https://example.com/plugin.zip',
				} )
			).toBe( 'https://example.com/plugin.zip' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'url',
					url: '',
				} )
			).toBe( '{ZIP URL}' );
		} );

		it( 'handles vfs resource summary and fallback', () => {
			expect(
				getResourceSummary( 'theme', {
					resource: 'vfs',
					path: '/wordpress/wp-content/themes/custom.zip',
				} )
			).toBe( '/wordpress/wp-content/themes/custom.zip' );

			expect(
				getResourceSummary( 'theme', {
					resource: 'vfs',
					path: '',
				} )
			).toBe( '{VFS Path}' );
		} );

		it( 'handles git:directory resource summary and fallback', () => {
			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
					path: 'plugins/my-plugin',
					ref: 'main',
				} )
			).toBe( 'plugins/my-plugin (Ref: main)' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
					path: 'plugins/my-plugin',
				} )
			).toBe( 'plugins/my-plugin' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
					ref: 'v1.0.0',
				} )
			).toBe( 'Ref: v1.0.0' );

			expect(
				getResourceSummary( 'plugin', {
					resource: 'git:directory',
				} )
			).toBe( 'Git Repository' );
		} );

		it( 'handles default (wordpress.org) resource summary and fallback', () => {
			expect(
				getResourceSummary( 'plugin', {
					resource: 'wordpress.org/plugins',
					slug: 'woocommerce',
				} )
			).toBe( 'woocommerce' );

			expect(
				getResourceSummary( 'theme', {
					resource: 'wordpress.org/themes',
					slug: '',
				} )
			).toBe( '{slug}' );
		} );
	} );
} );
