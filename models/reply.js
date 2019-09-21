const mongoose = require('mongoose')

const Schema = mongoose.Schema

let ReplyS = new Schema({
  post_id: String,
  comment_id: String,
  lists: [
    {
      // user_id: Number,
      userName: String,
      replyName: String,
      reply: Boolean,
      value: String,
      date: Number,
      // comment_id: Number,
      // comment_value: String,
    }
  ]
})

const Reply = mongoose.model('Reply', ReplyS)

module.exports = Reply
