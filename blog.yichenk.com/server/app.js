var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var demoRouter = require('./api/demo.router');
var db = require('./common/db');

var app = express();

var BODY_PARSER_MAX_BYTES = 1024 * 1024 * 10; // 10MB allowed to receive body content

db.connect();

app.use(bodyParser.json({limit: BODY_PARSER_MAX_BYTES}));
app.use(bodyParser.urlencoded({extended: true, limit: BODY_PARSER_MAX_BYTES}));

var isDev = process.env.NODE_ENV === 'dev';

//如果是测试环境就使用webpack热加载服务器
if (isDev) {
	require('../webpack.dev.server.js')(app);
}

//提供静态资源的访问 例如：localhost:30000/static/demo.js 会直接返回src下的demo.js文件
//使用path模块的normalize可以将window和linux的路径进行统一
//app.use('/static', express.static(__dirname + '/src'));
app.use('/static',express.static(path.normalize(__dirname+'/../web/src')));
app.use('/build',express.static(path.normalize(__dirname+'/../build')));
app.use('/adminStatic',express.static(path.normalize(__dirname+'/../admin/src')));

var webIndex = isDev === true ?'':'./build/index.html';

//路由,默认客户端，admin为后台，需要账号密码登录
app.all('/',function(req,res){
	if(isDev){
		res.send('开发环境请访问http://localhost:8080')
	}else{
		res.sendfile(webIndex);
	}
});
app.all('/admin',function(req,res){
	res.sendfile('./admin/index.html');
});
app.use('/demo',demoRouter);
app.all('/demo2',function(req,res){
	res.send('demo2');
});

app.listen(3000,function(){
	console.error('> Web server listen 3000......');
});