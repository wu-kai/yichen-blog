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

//提供静态资源的访问 例如：localhost:30000/static/demo.js 会直接返回src下的demo.js文件
//使用path模块的normalize可以将window和linux的路径进行统一
//app.use('/static', express.static(__dirname + '/src'));
app.use('/static',express.static(path.normalize(__dirname+'/../web/src')));
app.use('/adminStatic',express.static(path.normalize(__dirname+'/../admin/src')));

//路由,默认客户端，admin为后台，需要账号密码登录
app.all('/',function(req,res){
	res.sendfile('./web/index.html');
});
app.all('/admin',function(req,res){
	res.sendfile('./admin/index.html');
});
app.use('/demo',demoRouter);
app.all('/demo2',function(req,res){
	res.send('demo2');
});

app.listen(3000,function(){
	console.log('Example app listening on port 3000!');
});