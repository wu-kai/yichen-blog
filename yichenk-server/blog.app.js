const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./common/db');
var demoRouter = require('./api/demo.router');
var blogRouter = require('./api/blog.router');

const app = express();

const BODY_PARSER_MAX_BYTES = 1024 * 1024 * 10; // 10MB allowed to receive body content
const isPro = process.env.NODE_ENV === 'production';
const webIndex = !isPro?'':'./build/index.html';

db.connect();

app.use(bodyParser.json({limit: BODY_PARSER_MAX_BYTES}));
app.use(bodyParser.urlencoded({extended: true, limit: BODY_PARSER_MAX_BYTES}));

//提供静态资源的访问 例如：localhost:30000/static/demo.js 会直接返回src下的demo.js文件
//使用path模块的normalize可以将window和linux的路径进行统一
app.use('/build',express.static(path.normalize(__dirname+'/../build')));

app.all('/',function(req,res){
	if(isPro){
		res.sendfile(webIndex);
	}else{
		res.send('开发环境请启动yichenk-web');
	}
});

app.use('/api/demo',demoRouter);
app.use('/api/blog',blogRouter);

app.listen(3000,function(){
	console.error('> Web server listen 3000......');
});