var express = require('express');
var router = express.Router();
const request = require('request');

const { comment } = require('./instance');

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

router.post('/createComment', function (req, res) {
  let data = req.body;
  let ipStr = getClientIp(req);
  let arr = ipStr.split(':');
  let ip = arr[arr.length - 1];
  if (ip === 1 || ip === '1' || ip === '127.0.0.1') {
    data.city = '天上';
    comment.create(data, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json({ status: 'success', data: result })
      }
    })
  } else {
    let apiPath = 'http://api.map.baidu.com/location/ip?ip=' + ip + '&ak=Q8TuGc4hjSnH9hBKUzZGS8qtWqM4Simh&coor=bd09ll';
    request(apiPath, (err, response, body) => {
      let content = JSON.parse(body).content.address_detail;
      let province = content.province;
      let city = content.city;
      if (city.substr(city.length - 1, 1) === '市') {
        city = city.substr(0, city.length - 1)
      }
      data.city = city;
      data.province = province;
      comment.create(data, function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json({ status: 'success', data: result })
        }
      })
    });
  }
});

router.get('/findAll', function (req, res) {
  comment.findAll(function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: 'success', data: result });
    }
  })
});

module.exports = router;