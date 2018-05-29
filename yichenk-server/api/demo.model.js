// 定义Schema,定义调用数据库的方法

var mongoose = require('../common/db').mongoose;
var Schema = mongoose.Schema;

var demoSchema = new Schema({
	name:String,
	age:Number
});

var Demo = mongoose.model('demo',demoSchema);
var instance = {};

instance.create = function(demo,callback){
	Demo.create(demo,callback);
};

instance.findById = function(id,callback){
	Demo.findById({id:id},callback);
};

instance.deleteById = function(id,callback){
	Demo.remove({_id:id},callback);
};

instance.findAll = function(callback){
	Demo.find(callback);
};

exports.demo = instance;
exports.model = Demo;
