const express = require('express');
const mongoose = require('mongoose');

const path = 'mongodb://119.27.186.54:27017/Blog';

mongoose.connect(path);

const connection = mongoose.connection;

connection.on('connected', function () {
	console.log("on mongodb connect connected. the connection.readyState is [" +
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


const Schema = mongoose.Schema;
const blogSchema = new Schema({
	name:String,
	age:Number,
},{timestamps: true});
blogSchema.add({
	color:String
});

var blog = mongoose.model('blog', blogSchema);



const app = express();

app.use('/api',function(req,res){
	res.json({
		"test":"success"
	});
});

app.listen(8000,function(){
	console.error('> Web server listen 8000......');
});