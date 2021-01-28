const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  email: String,
  name: String,
  comment: String,
  province: String,
  city: String
}, {
  timestamps: true
});
const comment = mongoose.model('comments', commentSchema);
module.exports = comment;