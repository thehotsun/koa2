const mongoose = require('mongoose')

const Schema = mongoose.Schema

let PostS = new Schema({
  title: String,
  value: String,
  date: Number,
  post_id: String,
  userName: String,
  url: String,
  comments: [
    {
      userName: String,
      comment_id: String,
      comment_value: String,
      date: Number
    }
  ]
})

const Post = mongoose.model('Post', PostS)

module.exports = Post
