const router = require('koa-router')()
const post = require('../controller/postAndReply')
const index = require('../controller/index')
// const post = require('../controller/postAndReply')

router.get(['/', '/test'], async (ctx, next) => {
  let listsdata = await post.getPostLists()
  // console.log(listsdata)
  await ctx.render('index', {
    listsdata
  })
})

router.get('/search', async (ctx, next) => {
  let listsdata = await post.getSearchPostLists(ctx)
  // console.log(listsdata)
  await ctx.render('index', {
    listsdata
  })
})

router.get('/login', async (ctx, next) => {
  await ctx.render('loginAndRegister', {
    buttonText: '登录'
  })
})

// register

router.get('/register', async (ctx, next) => {
  await ctx.render('loginAndRegister', {
    buttonText: '注册'
  })
})

router.get('/history', async (ctx, next) => {
  let listsdata = await index
    .getUserInfo(ctx, ctx.session.userName)
    .then(res => res && res.history)
  await ctx.render('history', {
    listsdata
  })
})

router.get('/message', async (ctx, next) => {
  let listsdata = await index.getliveMessage(ctx, ctx.session.userName)
  await ctx.render('message', {
    listsdata: listsdata.reverse()
  })
})

module.exports = router
