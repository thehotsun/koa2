const router = require('koa-router')()
const index = require('../controller/index')

router.prefix('/space')

router.get('/:userName', async (ctx, next) => {
  // let userName = ctx.request.query.my ? null : ctx.params.userName
  // ctx.session.userName = 'qqq'
  let userInfo = await index.getUserInfo(ctx, ctx.params.userName)
  let myCare = await index.getUserInfo(ctx, ctx.session.userName).then(res => {
    return res.myCare
  })
  // myCare = myCare
  await ctx.render('my', {
    userInfo,
    userName: ctx.session.userName,
    myCare
  })
})

module.exports = router
