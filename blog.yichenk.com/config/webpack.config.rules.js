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
	}
];

module.exports = rules;