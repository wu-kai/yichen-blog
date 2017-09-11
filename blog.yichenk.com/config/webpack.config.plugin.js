var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var isDev = process.env.NODE_ENV === 'dev';

const pathsToClean = [
	'build'
];
const cleanOptions = {
	root:     path.normalize(__dirname+'/../'),
	verbose:  true,
	dry:      false
};

var plugin = [
	// new OpenBrowserPlugin({url: 'http://localhost:8080'}),
	new ExtractTextPlugin({
		filename:  (getPath) => {
			return getPath('css/[name].css').replace('css/web', 'css'); //替换路径
		},
		allChunks: true
	}),
	//生成html模板文件
	new HtmlWebpackPlugin({
		template: 'web/index.html',
	})
];


var plugin_dev = [
	new webpack.HotModuleReplacementPlugin(),
];

var plugin_pro=[
	new CleanWebpackPlugin(pathsToClean,cleanOptions), //构建之前删除构建文件
];

if(isDev){
	plugin = plugin.concat(plugin_dev);
}else{
	plugin = plugin.concat(plugin_pro);
}

module.exports = plugin;