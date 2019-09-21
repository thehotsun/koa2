const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const static = require('koa-static')
const session = require('koa-session')

// 引入自定义中间件
const notFound = require('./middleswares/notFound')
const permission = require('./middleswares/permission')

// 引入链接数据库
const db = require('./mongodb/connect')

const index = require('./routes/index')
// const users = require('./routes/users')
// const api = require('./routes/api')

app.keys = ['secret'] // session加密字段

// error handler
onerror(app)

// middlewares

app.use(
  session(
    {
      key: 'koa: sess', //cookie key (default is koa:sess)
      maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
      overwrite: true, //是否可以overwrite    (默认default true)
      httpOnly: false, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
      signed: true, //签名默认true
      rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
      renew: false //(boolean) renew session when session is nearly expired,
    },
    app
  )
)

app.use(permission())

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(static(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes()).use(index.allowedMethods())

app.use(notFound())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// app.listen(3100, () => {
//   console.log('asdasd')
// })

module.exports = app
