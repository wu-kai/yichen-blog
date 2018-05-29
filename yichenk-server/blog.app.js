const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const BODY_PARSER_MAX_BYTES = 1024 * 1024 * 10; // 10MB allowed to receive body content
const isPro = process.env.NODE_ENV === 'production';
const webIndex = !isPro?'':'./build/index.html';
app.use(bodyParser.json({limit: BODY_PARSER_MAX_BYTES}));
app.use(bodyParser.urlencoded({extended: true, limit: BODY_PARSER_MAX_BYTES}));

//如果是测试环境就使用webpack热加载服务器
// if (!isPro) {
// 	require('../webpack.dev.server.js')(app);
// }

app.all('/',function(req,res){
	if(isPro){
		res.sendfile(webIndex);
	}else{
		res.send('welcome yichen blog');
	}
});

app.listen(3000,function(){
	console.error('> Web server listen 3000......');
});