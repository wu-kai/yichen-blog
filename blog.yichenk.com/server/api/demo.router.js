var express = require('express');
var router = express.Router();


router.all('/',function(req,res){
	console.log('demo/router');
	res.send('demo/router');
});

module.exports = router;