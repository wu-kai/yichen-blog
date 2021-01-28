const { blog } = require('../model');

const instance = {};

instance.findAll = function (callback) {
  blog.find({}, callback).sort({ 'updated': -1, 'created': -1, 'createTime': -1 })
};

instance.create = function (data, callback) {
  blog.create(data, callback);
};

instance.findById = function (id, callback) {
  blog.findById({ _id: id }, callback);
};

instance.deleteById = function (id, callback) {
  blog.findOneAndRemove({ _id: id }, callback);
};

instance.editBlog = function (data, callback) {
  blog.findById(data.id, function (err, blogDoc) {
    if (err) {
      callback(err)
    } else {
      blogDoc.title = data.title;
      blogDoc.label = (data.label || data.labels).split(',');
      blogDoc.body = data.body;
      blogDoc.author = data.author;
      blogDoc.category = data.category;
      blogDoc.image = data.image;
      blogDoc.img = data.img;
      blogDoc.info = data.info;
      blogDoc.save(function (err, blogDoc) {
        if (err) {
          callback(err)
        } else {
          callback(err, blogDoc)
        }
      })
    }
  });
};

module.exports = instance;
