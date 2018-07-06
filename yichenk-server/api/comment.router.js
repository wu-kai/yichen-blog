var express = require('express');
var router = express.Router();
const request = require('request');

var comment = require('./comment.model').comment;

function getClientIp(req) {
	return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
};

router.post('/createComment',function(req,res){
	var data = req.body;
	comment.create(data,function(err,result){
		if(err){
			res.json(err);
		}else{
			res.json({status:'success',data:result})
		}
	})
});

router.get('/findAll',function(req,res){
	var ipStr = getClientIp(req);
	var arr = ipStr.split(':');
	var ip = arr[arr.length-1];
	request('http://api.map.baidu.com/location/ip?ip='+ip+'&ak=Q8TuGc4hjSnH9hBKUzZGS8qtWqM4Simh&coor=bd09ll',(err, response, body) => {
		var content = JSON.parse(body).content.address_detail;
		var province = content.province;
		var city = content.city;
		console.log(province,city);
	});
	comment.findAll(function(err,result){
		if(err){
			res.json(err);
		}else{
			res.json({status:'success',data:result});
		}
	})
});

module.exports = router;