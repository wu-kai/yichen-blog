var _ = require('lodash');
var isDev = process.env.NODE_ENV === 'dev';

var entry_dev = {
	'web/index': [
		'./web/src/script/index.js',
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:3100'
	],
};

var entry_pro = {
	'web/index': [
		'./web/src/script/index.js'
	],
};

var entry = {
	'web/vendor':['jquery','lodash','vue']
};

if(isDev){
	entry = _.assign({},entry_dev,entry);
}else{
	entry = _.assign({},entry_pro,entry);
}

module.exports = entry;