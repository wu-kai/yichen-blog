var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var proxy = require('proxy-middleware');
var url = require('url');

module.exports = function (app) {
	// 使用8082端口
	app.use('/web', proxy(url.parse('http://localhost:8082/')));

	var server = new WebpackDevServer(webpack(config), {
		contentBase: __dirname,
		hot: true, //开启热加载
		quiet: false,
		noInfo: false, //开启不显示webpack打包过程信息
		publicPath: '/',
		stats: {colors: true}
	}).listen(8082, 'localhost', function () {
		console.error('> hot server listen 8082......');
		setTimeout(function(){
			console.log('Webpack is packing, please wait');
		},100)
	});
};