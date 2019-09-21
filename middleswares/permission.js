module.exports = function() {
  return async (ctx, next) => {
    let path = ctx.request.path
    if (
      !/^(\/|\/register|\/login|\/post\/\d*|\/stylesheets.*|.*\.js|\/js.*|\/images.*|\/api\/(login|register|isLogin|getPostLists|getPostDetail))$/.test(
        path
      )
    ) {
      if (!ctx.session.userName)
        ctx.body = {
          mes: '需要登录',
          code: 500
        }
      else await next()
    } else await next()
  }
}
