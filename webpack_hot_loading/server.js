var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpacoHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');

var app = express();

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/demo',function(res,req){
	req.json('demo');
});

app.listen(3333,function(){
	console.log('Listen on 3333');
});