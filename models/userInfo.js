const mongoose = require('mongoose')

const Schema = mongoose.Schema

let userInfoS = new Schema({
  avatar: { type: String, default: 'default.jpg' },
  email: { type: String, default: '' },
  registe_time: String,
  id: Number,
  userName: String,
  password: String,
  user_id: String,
  vip: Boolean,
  message: [
    {
      userName: String,
      isFresh: Boolean,
      isReply: Boolean,
      post_id: Number,
      postTitle: String,
      value: String,
      replyName: String
    }
  ],
  history: [
    {
      url: String,
      postTitle: String
    }
  ],
  myCare: [
    {
      userName: String
    }
  ],
  careMe: [
    {
      userName: String
    }
  ]
})

var UserInfo = mongoose.model('UserInfo', userInfoS)

module.exports = UserInfo
