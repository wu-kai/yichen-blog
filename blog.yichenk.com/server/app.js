var express = require('express');
var path = require('path');
var demoRouter = require('./api/demo.router');

var app = express();

//提供静态资源的访问 例如：localhost:30000/static/demo.js 会直接返回src下的demo.js文件
//使用path模块的normalize可以将window和linux的路径进行统一
//app.use('/static', express.static(__dirname + '/src'));
app.use('/static',express.static(path.normalize(__dirname+'/../public/src')));


//路由
app.all('/',function(req,res){
	console.log(req.path);
	console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
	res.sendfile('./public/index.html');
});
app.use('/demo',demoRouter);
app.all('/demo2',function(req,res){
	console.log(req.path);
	console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
	res.send('demo2');
});

app.listen(3000,function(){
	console.log('Example app listening on port 3000!');
});