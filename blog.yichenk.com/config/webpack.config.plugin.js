var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
	}),
];


var plugin_dev = [
	new webpack.HotModuleReplacementPlugin(),
];

var plugin_pro=[
	new CleanWebpackPlugin(pathsToClean,cleanOptions), //构建之前删除构建文件
	new OptimizeCssAssetsPlugin({		//压缩css
		cssProcessorOptions: { discardComments: {removeAll: true } },
		canPrint: true
	}),
	new webpack.optimize.UglifyJsPlugin({ //压缩js
		// 最紧凑的输出
		beautify: false,
		// 删除所有的注释
		comments: false,
		compress: {
			// 在UglifyJs删除没有用到的代码时不输出警告
			warnings: false,
			// 删除所有的 `console` 语句
			// 还可以兼容ie浏览器
			drop_console: true,
			// 内嵌定义了但是只用到一次的变量
			collapse_vars: true,
			// 提取出出现多次但是没有定义成变量去引用的静态值
			reduce_vars: true,
		}
	})
];

if(isDev){
	plugin = plugin.concat(plugin_dev);
}else{
	plugin = plugin.concat(plugin_pro);
}

module.exports = plugin;