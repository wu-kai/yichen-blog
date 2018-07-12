const request = require('request');
const wx = require('wechat-jssdk');
const qs = require('qs');
const sha1 = require('sha1');
const waterfall = require('async/waterfall');
const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 3600, checkperiod: 3600}); //3600秒后过过期

const TOKEN = 'qwesadsftrheytrufghdfsbhmyte';

function checkSignature(params, token) {
	var key = [token, params.timestamp, params.nonce].sort().join('');
	//将token （自己设置的） 、timestamp（时间戳）、nonce（随机数）三个参数进行字典排序
	var sha1 = require('crypto').createHash('sha1');
	//将上面三个字符串拼接成一个字符串再进行sha1加密
	sha1.update(key);
	return sha1.digest('hex') == params.signature;
	//将加密后的字符串与signature进行对比，若成功，返回echostr
}

function getWeiXin(req, res) {
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
					if(JSON.parse(body).errmsg){
						console.log(' === 从服务器获取access_token出错: ' + JSON.parse(body).errmsg + ' ===')
					}else{
						cb1(err, JSON.parse(body).access_token, 'from_server')
					}
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
		let url = decodeURIComponent(req.query.url)

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
}

module.exports = {
	getWeiXin: getWeiXin
};
