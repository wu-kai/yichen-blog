var config = require('../config');
var mongoose = require('mongoose');

var database = config.mongodb.db;
var port = config.mongodb.port;
var userID = config.mongodb.user;
var password = config.mongodb.password;
var path = 'mongodb://'+config.mongodb.host+'/'+database;

//创建客户端连接对象

function create_connection(){

	//连接到mongodb的某个数据库，拿到连接后返回的对象，并监听连接结果，打印信息
	var connection = mongoose.connect(path,{
		user:userID,
		pass:password
	}).connection;

	connection.on('connected', function () {
		console.log("on mongodb connect connected. the connection.readyState is [" +
			mongoose.connection.readyState + "]");
	});

	connection.on('close', function () {
		console.log("on mongodb connect close. the connection.readyState is [" + mongoose.connection.readyState + "]");
	});

	connection.on('reconnected', function () {
		console.log("on mongodb connect reconnected. the connection.readyState is [" +
			mongoose.connection.readyState + "]");
	});

	connection.on('disconnecting', function () {
		console.log("on mongodb connect disconnecting. the connection.readyState is [" +
			mongoose.connection.readyState + "]");
	});

	connection.on('disconnected', function () {
		console.log("on mongodb connect disconnected. the connection.readyState is [" +
			mongoose.connection.readyState + "]");
	});

	connection.on('open', function () {
		console.log("mongodb (" + path + ") connected. the connection.readyState is [" +
			mongoose.connection.readyState + "]");
	});

	connection.on('error', function (err) {
		console.error("on mongodb connect error. the connection.readyState is [" + mongoose.connection.readyState + "]");
		console.error(err);
		console.log("will close all connections... the currently connection.readyState is [" +
			mongoose.connection.readyState + "]");
	});
}
function connect(){
	if (mongoose.connection.readyState === 0) {
		// mongoose.connection.readyState
		// 0 = disconnected
		// 1 = connected
		// 2 = connecting
		// 3 = disconnecting
		create_connection();
	}
}

exports.mongoose = mongoose;
exports.connect = connect;
