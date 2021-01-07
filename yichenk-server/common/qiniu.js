const qiniu = require('qiniu');
const NodeCache = require('node-cache');
const waterfall = require('async/waterfall');
const qiniu_cache = new NodeCache({stdTTL: 0, checkperiod: 0}); //1小时后过期

qiniu.conf.ACCESS_KEY = 'l1ftFn7t45fApxXFy-AFLg_1bKkc3CXprJcAMi_m';
qiniu.conf.SECRET_KEY = 'VKsnfsRU0mVKzscAvEXTsxpp40bappIMMxb_k-9h';

//七牛云
function getQiNiu(callback) {

	let accessKey = 'l1ftFn7t45fApxXFy-AFLg_1bKkc3CXprJcAMi_m';
	let secretKey = 'VKsnfsRU0mVKzscAvEXTsxpp40bappIMMxb_k-9h';
	let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	let options = {
		scope: 'yichenk',
	};
	let putPolicy = new qiniu.rs.PutPolicy(options);

	let step = [];

	//从缓存中读取token
	step.push((cb) => {
		let access_token = qiniu_cache.get('qiniu_access_token', (err, access_token) => {
			console.log(access_token);
			cb(err, access_token);
		})
	});
	//从服务器获取token
	step.push((access_token, cb) => {
		if (access_token) {
			cb(null, access_token, 'from_cache')
		} else {
			let uploadToken = putPolicy.uploadToken(mac);
			cb(null, uploadToken, 'from_server')
		}
	});

	//如果是从服务器获取就缓存起来
	step.push((access_token, from_where, cb) => {
		if (from_where === 'from_cache') {
			console.log(' === 成功从缓存中读取qiniu_access_token:' + access_token + ' ===');
			cb(null, access_token);
		} else if (from_where === 'from_server') {
			qiniu_cache.set('qiniu_access_token', access_token, (err, success) => {
				if (success && !err) {
					console.log(' === 缓存已过期，从服务器中读取qiniu_access_token: ' + access_token + ' ===');
					cb(null, access_token)
				} else {
					cb(err || 'cache设置access_token时，出现未知错误')
				}
			});
		} else {
			console.log('出错了');
		}
	});

	waterfall(step, (err, access_token) => {
		if (err) {
			console.log('err', err);
		} else {
			console.log('access_token', access_token);
			callback(access_token);
		}
	});

	//获取token
}

//上传文件
function uploadFile(readableStream,files,callback) {
	console.log(files);
	//要上传的空间
	let bucket = 'yichenk';
	//上传到七牛后保存的文件名
	let key = files.name;

	var config = new qiniu.conf.Config();
	var formUploader = new qiniu.form_up.FormUploader(config);
	var putExtra = new qiniu.form_up.PutExtra();

	getQiNiu(function(access_token){

		formUploader.putStream(access_token, key, readableStream, putExtra, function(respErr, respBody, respInfo) {
			if (respErr) {
				throw respErr;
			}
			if (respInfo.statusCode == 200) {
				console.log(respBody);
			} else {
				console.log(respInfo.statusCode);
				console.log(respBody);
			}
		});
	})

}

module.exports = {
	getQiNiu: getQiNiu,
	uploadFile:uploadFile
};