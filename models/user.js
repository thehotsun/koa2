const mongoose = require('mongoose')

const Schema = mongoose.Schema

let userS = new Schema({
  userName: String,
  passwoed: String,
  user_id: Number
})

const User = mongoose.model('User', userS)

module.exports = User
