const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./common/db');
const demoRouter = require('./api/demo.router');
const blogRouter = require('./api/blog.router');
const ueditor = require('ueditor');
const wx = require('wechat-jssdk');
const request = require('request');
const qs=require('qs');
const sha1 = require('sha1');
const waterfall = require('async/waterfall');
const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 3600, checkperiod: 3600}); //3600秒后过过期



const TOKEN = 'qwesadsftrheytrufghdfsbhmyte';
const wechatConfig = {
	wechatToken: TOKEN,
	appId: "wx12266588c2a4fbe3",
	appSecret: "1b8e29a105a9934a77a32aeb9ecc39fd",
};
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

function checkSignature(params,token){
	var key=[token,params.timestamp,params.nonce].sort().join('');
	//将token （自己设置的） 、timestamp（时间戳）、nonce（随机数）三个参数进行字典排序
	var sha1=require('crypto').createHash('sha1');
	//将上面三个字符串拼接成一个字符串再进行sha1加密
	sha1.update(key);
	return sha1.digest('hex') ==params.signature;
	//将加密后的字符串与signature进行对比，若成功，返回echostr
}

// app.get('/wxJssdk/getJssdk', (req, res) => {
//
// 	const grant_type = 'client_credential';
// 	const appid = 'wx12266588c2a4fbe3';
// 	const secret = '1b8e29a105a9934a77a32aeb9ecc39fd';
//
// 	request('https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grant_type + '&appid=' + appid + '&secret=' + secret, (err, response, body) => {
// 		let access_toekn = JSON.parse(body).access_token;
//
// 		request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi', (err, response, body) => {
// 			let jsapi_ticket = JSON.parse(body).ticket;
// 			let nonce_str = '123456';    // 密钥，字符串任意，可以随机生成
// 			let timestamp = new Date().getTime();  // 时间戳
// 			let url = req.query.url;   // 使用接口的url链接，不包含#后的内容
//
// 			// 将请求以上字符串，先按字典排序，再以'&'拼接，如下：其中j > n > t > u，此处直接手动排序
// 			let str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url;
//
// 			// 用sha1加密
// 			let signature = sha1(str);
//
// 			res.send({
// 				appId: appid,
// 				timestamp: timpstamp,
// 				nonceStr: nonce_str,
// 				signature: signature,
// 			})
// 		})
// 	})
// });


app.get('/wxJssdk/getJssdk', (req, res) => {
	let grant_type = 'client_credential';
	let appid = 'wx12266588c2a4fbe3';
	let secret = '1b8e29a105a9934a77a32aeb9ecc39fd'; // appscret

	let steps = [];

	// 第一步，获取access_token
	steps.push((cb) => {

		let steps1 = []

		// 第1.1步，从缓存中读取access_token
		steps1.push((cb1) => {
			let access_token = cache.get('access_token', (err, access_token) => {
				cb1(err, access_token)
			})
		})

		// 第1.2步，缓存中有access_token则直接返回，如果没有，则从服务器中读取access_token
		steps1.push((access_token, cb1) => {
			if (access_token) {
				cb1(null, access_token, 'from_cache')
			} else {
				request('https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grant_type + '&appid=' + appid + '&secret=' + secret, (err, response, body) => {
					cb1(err, JSON.parse(body).access_token, 'from_server')
				})
			}
		})

		// 第1.3步，如果是新从服务器取的access_token，则缓存起来，否则直接返回
		steps1.push((access_token, from_where, cb1) => {
			if (from_where === 'from_cache') {
				console.log(' === 成功从缓存中读取access_token: ' + access_token + ' ===')
				cb1(null, access_token)
			} else if (from_where === 'from_server') {
				cache.set('access_token', access_token, (err, success) => {
					if (!err && success) {
						console.log(' === 缓存已过期，从服务器中读取access_token: ' + access_token + ' ===')
						cb1(null, access_token)
					} else {
						cb1(err || 'cache设置access_token时，出现未知错误')
					}
				})
			} else {
				cb1('1.3获取from_where时，from_where值为空')
			}
		})



		waterfall(steps1, (err, access_token) => {
			cb(err, access_token)
		})
	});


	// 第二步，获取ticket
	steps.push((access_token, cb) => {
		let steps1 = []

		// 第2.1步，从缓存中读取ticket
		steps1.push((cb1) => {
			let ticket = cache.get('ticket', (err, ticket) => {
				cb1(err, ticket)
			})
		})

		// 第2.2步，缓存中有ticket则直接返回，如果没有，则从服务器中读取ticket
		steps1.push((ticket, cb1) => {
			if (ticket) {
				cb1(null, ticket, 'from_cache')
			} else {
				request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi', (err, response, body) => {
					cb1(err, JSON.parse(body).ticket, 'from_server')
				})
			}
		})

		// 第2.3步，如果新从服务器取的ticket，则缓存起来，否则直接返回
		steps1.push((ticket, from_where, cb1) => {
			if (from_where === 'from_cache') {
				console.log(' === 成功从缓存中读取ticket: ' + ticket + ' ===')
				cb1(null, ticket)
			} else if (from_where === 'from_server') {
				cache.set('ticket', ticket, (err, success) => {
					if (!err && success) {
						console.log(' === 缓存已过期，从服务器中读取ticket: ' + ticket + ' ===');
						cb1(null, ticket)
					} else {
						cb1(err || 'cache设置ticket时，出现未知错误')
					}
				})
			} else {
				cb1('2.3获取from_where时，from_where值为空')
			}
		})

		waterfall(steps1, (err, ticket) => {
			cb(err, ticket)
		})
	});


	// 第三步，生成签名
	steps.push((ticket, cb) => {
		let jsapi_ticket = ticket
		let nonce_str = '123456'
		let timestamp = new Date().getTime()
		let url = req.query.url

		let str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url
		let signature = sha1(str)

		cb(null, {
			appId: appid,
			timestamp: timestamp,
			nonceStr: nonce_str,
			signature: signature,
			ticket: ticket
		})
	});

	waterfall(steps, (err, data) => {
		if (err) {
			res.send({status: 'error', data: err})
		} else {
			res.send({status: 'success', data: data})
		}
	})
});

app.get('/getToken',function(req,res){
	var query=require('url').parse(req.url).query;
	var params=qs.parse(query);

	console.log(params);

	if(!checkSignature(params,TOKEN)){
		//如果签名不对，结束请求并返回
		res.end('signature fail');
	}else{
		if (req.method == "GET") {
			//如果请求是GET，返回echostr用于通过服务器有效校验
			res.end(params.echostr);
		}
	}
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
app.use('/api',function(req,res){
	res.send('这里什么都没有');
});


app.listen(port,function(){
	console.error('> Web server listen '+port+'......');
});