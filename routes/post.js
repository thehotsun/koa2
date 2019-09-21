const router = require('koa-router')()
const post = require('../controller/postAndReply')

router.prefix('/post')

router.get('/:id', async function(ctx) {
  let postDetail = await post.getPostDetail(ctx)
  await ctx.render('postDetail', {
    postData: postDetail
  })
})
module.exports = router
