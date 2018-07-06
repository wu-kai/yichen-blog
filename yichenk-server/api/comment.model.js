var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	email:String,
	name:String,
	comment:String,
	address:String,
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
	comment.find({},callback).sort({'updated':-1,'created':-1,'createTime':-1})
};

exports.comment = instance;
exports.model = comment;