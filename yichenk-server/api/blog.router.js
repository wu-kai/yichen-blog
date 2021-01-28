const express = require('express');
const router = express.Router();

const { blog } = require('./instance');

router.all('/', function (req, res) {
  res.jsonp({ message: 'hello' });
});

router.post('/createBlog', function (req, res) {
  const data = req.body;
  blog.create(data, function (err, ok) {
    if (err) {
      res.jsonp(err);
    } else {
      res.jsonp({ status: 'success', data: ok })
    }
  });
});

router.get('/findAll', function (req, res) {
  blog.findAll(function (err, ok) {
    if (err) {
      res.jsonp(err);
    } else {
      res.jsonp(ok);
    }
  })
});

router.get('/findByID', function (req, res) {
  const id = req.query.id;
  blog.findById(id, function (err, ok) {
    if (err) {
      res.jsonp(err);
    } else {
      res.jsonp(ok);
    }
  });
});

router.post('/deleteBlogById', function (req, res) {
  const id = req.body.id;
  blog.deleteById(id, function (err, ok) {
    if (err) {
      res.jsonp(err);
    } else {
      res.jsonp(ok);
    }
  });
});
router.post('/editBlog', function (req, res) {
  const data = req.body;
  blog.editBlog(data, function (err, ok) {
    if (err) {
      res.jsonp(err);
    } else {
      res.jsonp(ok);
    }
  });
});
router.get('/validate', function (req, res) {
  const value = req.query.validateValue;
  if (value === 'manage') {
    res.jsonp({ result: true })
  } else {
    res.jsonp({ result: false })
  }
});

module.exports = router;