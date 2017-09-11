var webpack = require('webpack');

var webpackPlugin = require ('./config/webpack.config.plugin.js');
var webpackRules = require ('./config/webpack.config.rules.js');
var webpackEntry = require ('./config/webpack.config.entry.js');
var webpackResolve = require ('./config/webpack.config.resolve.js');

const isDevelop = process.env.NODE_ENV === 'dev';
const outPath = isDevelop ? __dirname : __dirname+'/build';
const publicPath = isDevelop ? 'http://localhost:8082/' : '/build/';
const sourceMap = isDevelop ? 'source-map' : '';

module.exports = {
	entry: webpackEntry,
	devtool: sourceMap,
	output: {
		path: outPath,
		filename: '[name].js',
		publicPath: publicPath
	},
	module: {
		rules: webpackRules
	},
	resolve: webpackResolve,
	plugins: webpackPlugin
};
