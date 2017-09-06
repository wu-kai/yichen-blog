//给客户端的接口，处理业务，调用数据库接口

var express = require('express');
var router = express.Router();

var demo = require('./demo.model').demo;

var demoTest = {
	name:'demoTest',
	age:100
};

router.all('/',function(req,res){
	res.jsonp({message:'hello'});
});

router.post('/createDemo',function(req,res){
	var data = req.body || demoTest;
	demo.create(data,function(err,ok){
		if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status:'success',data:ok})
		}
	});
});

router.get('/findAll',function(req,res){
	demo.findAll(function(err,ok){
		if(err){
			res.jsonp(err);
		}else{
			res.jsonp(ok);
		}
	})
});

router.get('/deleteDemoById/:id',function(req,res){
	var id=req.params.id;
	demo.deleteById(id,function(err,ok){
		if(err){
			res.jsonp(err);
		}else{
			res.jsonp(ok);
		}
	});
});

module.exports = router;