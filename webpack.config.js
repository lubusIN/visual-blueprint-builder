const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const glob = require( 'glob' );

const entries = {
	editor: path.resolve( __dirname, 'src/editor/index.js' ),
};

glob.sync( './src/steps/**/index.js' ).forEach( ( filePath ) => {
	const name = path.relative( './src', filePath ).replace( /\.js$/, '' );
	entries[ name ] = path.resolve( __dirname, filePath );
} );

module.exports = {
	...defaultConfig,
	entry: entries,
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js',
	},
};
