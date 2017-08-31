

var express = require('express');
var path = require('path');
var process = require('process');

var app = express();

//提供静态资源的访问 例如：localhost:30000/static/demo.js 会直接返回src下的demo.js文件
// app.use('/static', express.static(__dirname + '/src'));

//使用path模块的normalize可以将window和linux的路径进行统一

app.use('/',express.static(path.normalize(__dirname+'/../public')));
app.use('/static',express.static(path.normalize(__dirname+'/../public/src')));


app.listen(3000,function(){
	console.log('Example app listening on port 3000!');
});