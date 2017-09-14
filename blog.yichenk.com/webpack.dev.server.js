var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var proxy = require('proxy-middleware');
var url = require('url');

module.exports = function (app) {
	// 使用8080端口
	var server = new WebpackDevServer(webpack(config), {
		contentBase: __dirname,
		hot: true, //开启热加载
		quiet: false,
		noInfo: true, //开启不显示webpack打包过程信息
		publicPath: '/',
		stats: {colors: true},
		proxy: { //代理api到本地3000端口
			'/demo': {
				target:'http://localhost:3000/',
				host: 'localhost:3000',
				secure: false,
			},
			'/blog': {
				target:'http://localhost:3000/',
				host: 'localhost:3000',
				secure: false,
			},
			'/ueditor': {
				target:'http://47.94.201.47:3000/',
				host: 'localhost:3000',
				secure: false,
			}
		}
	}).listen(3100, 'localhost', function () {
		console.error('> hot server listen 3100......');
		setTimeout(function(){
			console.log('Webpack is packing, please wait');
		},100)
	});
};