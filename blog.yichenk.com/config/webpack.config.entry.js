var isDev = process.env.NODE_ENV === 'dev';

var entry_dev = {
	'web/index': [
		'./web/src/script/index.js',
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080'
	],
};

var entry_pro = {
	'web/index': [
		'./web/src/script/index.js'
	],
};

var entry = isDev === true ? entry_dev : entry_pro;

module.exports = entry;