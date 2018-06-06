var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	title: String,		//题目
	author: String,		//作者
	body: String,   	//内容
	label: Array,		//标签
	image: String,		//文章顶部图片
	img: String,		//列表缩略图
	info:String,		//简介
	comments: [{body: String, date: Date}],		//评论{内容，日期}
	createTime: {type: Date, default: Date.now},		//创建时间，默认
	hidden: Boolean,		//是否隐藏
	meta: {
		votes: Number,		//投票
		favs: Number		//收藏ps暂时没什么用
	},
	category: String   //分类
});

var blog = mongoose.model('blog', blogSchema);
var instance = {
	web: {},
	admin: {}
};

//common
instance.findAll = function (callback) {
	blog.find(callback);
};

//admin
instance.web.create = function (data, callback) {
	blog.create(data, callback);
};
instance.web.findById = function (id, callback) {
	blog.findById({_id: id}, callback);
};
instance.web.deleteById = function (id, callback) {
	blog.findOneAndRemove({_id: id}, callback);
};
instance.web.editBlog = function (data, callback) {
	blog.findById(data.id, function (err, blogDoc) {
		if (err) {
			callback(err)
		} else {
			blogDoc.title = data.title;
			blogDoc.label = (data.label || data.labels).split(',');
			blogDoc.body = data.body;
			blogDoc.author = data.author;
			blogDoc.category = data.category;
			blogDoc.image = data.image;
			blogDoc.img = data.img;
			blogDoc.info = data.info;
			blogDoc.save(function (err, blogDoc) {
				if (err) {
					callback(err)
				} else {
					callback(err, blogDoc)
				}
			})
		}
	});
};

//web

exports.blog = instance;
exports.model = blog;