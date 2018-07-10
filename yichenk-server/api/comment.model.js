var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	email:String,
	name:String,
	comment:String,
	province:String,
	city:String
},{
	timestamps: true
});

var comment = mongoose.model('comments',commentSchema);

var instance = {

};

instance.create = function(data,callback){
	comment.create(data,callback);
};

instance.findAll = function(callback){
	var showKeys = {name:'',comment:'',city:'',createdAt:''};
	comment.find({},showKeys,callback).sort({'createdAt':-1})
};

exports.comment = instance;
exports.model = comment;