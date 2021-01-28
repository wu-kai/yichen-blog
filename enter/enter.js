const request = require('request');
const express = require('express');
const URL = require('url');
const _ = require('lodash');
const app = express();

const www = {
	requestUrl: 'http://www.yichenk.com',
	outUrl: 'http://www.yichenk.com:3000'
};
const test = {
	requestUrl: 'http://test.yichenk.com',
	outUrl: 'http://www.yichenk.com:3001'
};
const admin = {
	requestUrl: 'http://admin.yichenk.com',
	outUrl: 'http://www.yichenk.com:8000'
};

app.use('/', function (req, res) {
	let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(fullUrl);
	if (fullUrl.indexOf(www.requestUrl) === 0) {
		let url = www.outUrl + req.url;
		req.pipe(request(url)).pipe(res);
	}else if (fullUrl.indexOf(test.requestUrl) === 0) {
		let url = test.outUrl + req.url;
		req.pipe(request(url)).pipe(res);
	} else if (fullUrl.indexOf(admin.requestUrl) === 0) {
		let url = admin.outUrl + req.url;
		req.pipe(request(url)).pipe(res);
	} else {
		res.json({"result": "no thing"})
	}
});

app.listen(80, function () {
	console.log('enter server start at 80 port ......');
});