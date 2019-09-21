const router = require('koa-router')()

const main = require('./main')
const api = require('./api')
const users = require('./users')
const my = require('./my')
const post = require('./post')

router.use(
  main.routes(),
  api.routes(),
  users.routes(),
  my.routes(),
  post.routes()
)

module.exports = router
