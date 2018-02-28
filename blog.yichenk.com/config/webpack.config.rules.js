const ExtractTextPlugin = require('extract-text-webpack-plugin');

var rules = [
	{
		test: /\.less$/i,
		use: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
	},
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: "css-loader"
		})
	},
	{
		test:/^((?!node_modules).)*\.jsx?$/, //不编译node_modules依赖中的js文件
		use:[{
			loader:"babel-loader?cacheDirectory",
			options:{presets:["es2015","react"]}
		}]
	},
	{
		test:/\.html$/,
		use:[{
			loader:"html-loader"
		}]
	},
	{
		test:/\.vue$/,
		use:[{
			loader:"vue-loader"
		}]
	},
	{
		test: /\.(eot|svg|ttf|woff|woff2)\w*/,
		loader: 'url-loader?limit=1000000'
	},
	{
		test: /\.(png|jpg)$/,
		loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
	},
	{
		test: require.resolve('jQuery'),
		use: [{
			loader: 'expose-loader',
			options: 'jquery'
		},{
			loader: 'expose-loader',
			options: 'jQuery'
		},{
			loader: 'expose-loader',
			options: '$'
		}]
	},
	{
		test: /\.json$/,
		use:[{
			loader:"json-loader"
		}]
	}
];

module.exports = rules;