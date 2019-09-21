function notFound() {
  return async (ctx, next) => {
    // ctx.remove('Connection')
    if (ctx.status === 404) {
      await ctx.render('error', {
        message: '页面找不到啦',
        error: {
          stack: '',
          status: 404
        }
      })
      ctx.status = 404
    }
    await next()
  }
}

module.exports = notFound
