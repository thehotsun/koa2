const router = require('koa-router')()

const index = require('../controller/index')
const update = require('../controller/update')
const postAndReply = require('../controller/postAndReply')

router.prefix('/api')

router.post(
  '/login',
  async (ctx, next) => await index.login(ctx, ctx.request.body)
)

router.get('/logout', async ctx => await index.logout(ctx))

router.post(
  '/register',
  async (ctx, next) => await index.register(ctx, ctx.request.body)
)

router.get('/isLogin', async (ctx, next) => await index.isLogin(ctx))

router.get('/getUserInfo', async ctx => await index.getUserInfo(ctx))

router.post('/upload', async ctx => await update.upload(ctx))

router.post('/posting', async ctx => await postAndReply.posting(ctx))

router.get('/getPostLists', async ctx => await postAndReply.getPostLists(ctx))

router.get('/getPostDetail', async ctx => await postAndReply.getPostDetail(ctx))

router.get('/comments', async ctx => await postAndReply.comments(ctx))

router.get('/reply', async ctx => await postAndReply.replay(ctx))

router.get('/history', async ctx => await index.history(ctx))

router.get('/care', async ctx => await index.care(ctx))

router.get('/search', async ctx => await postAndReply.search(ctx))

router.get('/getLiveMessageNumb', async ctx => await index.getLiveMessageNumb(ctx))

module.exports = router
