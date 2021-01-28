const { comment } = require('../model');

const instance = {};

instance.create = function (data, callback) {
  comment.create(data, callback);
};

instance.findAll = function (callback) {
  const showKeys = { name: '', comment: '', city: '', createdAt: '' };
  comment.find({}, showKeys, callback).sort({ 'createdAt': -1 })
};

module.exports = instance;