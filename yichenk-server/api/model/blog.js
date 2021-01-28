const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,		//题目
  author: String,		//作者
  body: String,   	//内容
  label: Array,		//标签
  image: String,		//文章顶部图片
  img: String,		//列表缩略图
  info: String,		//简介
  createTime: { type: Date, default: Date.now },
  comments: [{ body: String, date: Date }],		//评论{内容，日期}
  hidden: Boolean,		//是否隐藏
  meta: {
    votes: Number,		//投票
    favs: Number		//收藏ps暂时没什么用
  },
  category: String   //分类
}, { timestamps: { updatedAt: 'updated' } });

const blog = mongoose.model('blog', blogSchema);
module.exports = blog;