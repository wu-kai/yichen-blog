var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	title:  String,		//题目
	author: String,		//作者
	body:   String,   	//内容
	label:	Array,		//标签
	image: String,		//文章顶部图片
	img: String,		//列表缩略图
	comments: [{ body: String, date: Date }],		//评论{内容，日期}
	createTime: { type: Date, default: Date.now },		//创建时间，默认
	hidden: Boolean,		//是否隐藏
	meta: {
		votes: Number,		//投票
		favs:  Number		//收藏ps暂时没什么用
	}
});

var blog = mongoose.model('blog',blogSchema);
var instance = {
	web:{},
	admin:{}
};


//common
instance.findAll = function(callback){
	blog.find(callback);
};

//admin
instance.web.create = function(data,callback){
	blog.create(data,callback);
};
instance.web.findById = function(id,callback){
	blog.findById({id:id},callback);
};
instance.web.deleteById = function(id,callback){
	blog.remove({_id:id},callback);
};

//web

exports.blog = instance;
exports.model = blog;