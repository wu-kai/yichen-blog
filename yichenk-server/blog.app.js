const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./common/db');
const demoRouter = require('./api/demo.router');
const blogRouter = require('./api/blog.router');
const commentRouter = require('./api/comment.router');
const ueditor = require('ueditor');

const qiniu = require('./common/qiniu');
const weixin = require('./common/weixin');

const app = express();

const BODY_PARSER_MAX_BYTES = 1024 * 1024 * 10; // 10MB allowed to receive body content
const isPro = process.env.NODE_ENV === 'production';
const webIndex = !isPro?'./dist/index.html':'./build/index.html';

//因为莫名其妙的请求路径是这样，所以只能进行适配
const uploadPath = isPro?'/static/js/libStatic/ueditor-utf8-php/ue':'/libStatic/ueditor-utf8-php/ue';
//本地运行用3000端口，线上环境用80端口
const port = isPro?80:3000;

db.connect();

app.use(bodyParser.json({limit: BODY_PARSER_MAX_BYTES}));
app.use(bodyParser.urlencoded({extended: true, limit: BODY_PARSER_MAX_BYTES}));

//富文本编辑器图片上传配置
app.use(uploadPath, ueditor(path.join(__dirname, '/images'), function (req, res, next) {
	var date = new Date();
	var y= date.getFullYear();
	var m= date.getMonth()+1;
	var d= date.getDate();
	// ueditor 客户发起上传图片请求
	if (req.query.action === 'uploadimage') {
		var foo = req.ueditor;
		var imgname = req.ueditor.filename;
		var img_url = '/ueditor/'+y+'/'+m+'/'+d+'/';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	}
	// 客户端发起图片列表请求
	else if (req.query.action === 'listimage') {
		var dir_url = '/ueditor/';
		res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/libStatic/ueditor-utf8-php/php/config.json')  //这里的路径要加载对否则就不能上传图片。如果你下载的是JSP那就对应jsp目录
	}
}));
//图片上传配置

//提供静态资源的访问 例如：localhost:30000/static/demo.js 会直接返回src下的demo.js文件
//使用path模块的normalize可以将window和linux的路径进行统一
app.use('/build',express.static(path.normalize(__dirname+'/../build')));
app.use('/libStatic',express.static(path.normalize(__dirname+'/lib')));
app.use('/ueditor',express.static(path.normalize(__dirname+'/images/ueditor')));
app.use('/static',express.static(path.normalize(__dirname+'/dist/static')));
app.use('/',express.static(path.normalize(__dirname+'/')));

qiniu.getQiNiu(function(d){
	console.log('d',d);
});

app.get('/wxJssdk/getJssdk', (req, res) => {
	weixin.getWeiXin(req, res)
});
app.post('/api/uploadFile_to_qiniu',(req,res) => {
	console.log(req.body);
	qiniu.uploadFile(req.body,function(data){
		console.log(data);
	});
	res.json({'status':'success'})
});

app.all('/',function(req,res){
	if(isPro){
		res.sendFile(__dirname + '/dist/index.html')
	}else{
		res.send('开发环境请启动yichenk-web');
	}
});

app.use('/api/demo',demoRouter);
app.use('/api/blog',blogRouter);
app.use('/api/comment',commentRouter);
app.use('/api',function(req,res){
	res.send('这里什么都没有');
});


app.listen(port,function(){
	console.error('> Web server listen '+port+'......');
});