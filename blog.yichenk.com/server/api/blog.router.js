
var express = require('express');
var router = express.Router();

var blog = require('./blog.model').blog;

router.all('/',function(req,res){
    res.jsonp({message:'hello'});
});

router.post('/createBlog',function(req,res){
    var data = req.body || demoTest;
    blog.web.create(data,function(err,ok){
        if(err){
            res.jsonp(err);
        }else{
            res.jsonp({status:'success',data:ok})
        }
    });
});

router.get('/findAll',function(req,res){
    blog.web.findAll(function(err,ok){
        if(err){
            res.jsonp(err);
        }else{
            res.jsonp(ok);
        }
    })
});

router.get('/deleteDemoById/:id',function(req,res){
    var id=req.params.id;
    blog.web.deleteById(id,function(err,ok){
        if(err){
            res.jsonp(err);
        }else{
            res.jsonp(ok);
        }
    });
});

module.exports = router;

