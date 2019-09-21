const mongoose = require('mongoose')

// const Schema = mongoose.Schema

const conf = require('../config')

mongoose.connect(conf.url, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', () => {
  console.log('连接数据库成功')
})

db.on('error', e => {
  console.error('Error in MongoDb connection: ' + e)
  mongoose.disconnect()
})

db.on('close', () => {
  console.log('数据库断开，重新连接数据库')
  mongoose.connect(config.url, { server: { auto_reconnect: true } })
})

module.exports = db
