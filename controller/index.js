// const session = require('koa-session')
// const formidable = require('formidable')
// const fs = require('fs')
// const path = require('path')
// const UserM = require('../models/user')

const UserInfoM = require('../models/userInfo')
const io = require('../socket')

const control = {
  register: async (ctx, data) => {
    data.registe_time = +new Date()
    const user = new UserInfoM(data)
    let already = await UserInfoM.findOne({ userName: data.userName }).then(
      res => {
        console.log(res, 'find')
        if (res) return true
        else false
      }
    )
    if (already) {
      ctx.body = {
        info: '用户名已存在',
        code: 400
      }
    } else {
      return await user.save().then(res => {
        ctx.session.userName = ctx.request.body.userName
        ctx.session.isLogin = true
        ctx.body = {
          info: '注册成功',
          code: 200
        }
        console.log('注册成功', data)
      })
    }
  },

  login: async (ctx, data) => {
    return await UserInfoM.findOne({ userName: data.userName }).then(
      (res = {}) => {
        // console.log(res)
        res = res || {}
        if (res.userName === data.userName && res.password === data.password) {
          ctx.session.userName = ctx.request.body.userName
          ctx.session.isLogin = true
          ctx.body = {
            info: '登录成功',
            code: 200
          }
        } else {
          ctx.body = {
            info: '用户名和密码不匹配',
            code: 400
          }
        }
        // res.console.log()
      }
    )
  },

  logout: async ctx => {
    ctx.session.isLogin = false
    ctx.session.userName = null
    ctx.body = {
      info: '已登出',
      code: 200
    }
  },

  isLogin: async ctx => {
    // console.log(ctx.session)
    if (ctx.session.isLogin) {
      ctx.body = {
        info: '已登录',
        userName: ctx.session.userName,
        code: 200
      }
    } else {
      ctx.body = {
        info: '未登录',
        code: 400
      }
    }
  },

  setUserInfo: async ctx => {
    let img = ctx.request.body
    console.log(img)

    // return await UserInfoM.update(data).then(res => {
    //   return res
    // })
  },

  getUserInfo: async (ctx, userName) => {
    if (!userName) userName = ctx.session.userName
    return await UserInfoM.findOne({ userName }).then(res => {
      if (userName && res) {
        ctx.body = {
          info: res,
          code: 200
        }
        return res
      } else if (userName && !res) {
        ctx.body = {
          info: '未找到该用户',
          code: 500
        }
        return console.log('查询此用户失败')
      }
      if (res)
        ctx.body = {
          info: res,
          code: 200
        }
      else
        ctx.body = {
          info: '未找到该用户',
          code: 500
        }
    })
  },

  history: async ctx => {
    try {
      let params = ctx.request.query
      await UserInfoM.findOne({ userName: ctx.session.userName }).then(
        async res => {
          if (res.history.find(res => res.url === params.url)) {
          } else {
            res.history.push(params)
            await res.save()
          }
          ctx.body = {
            info: 'success',
            code: 200
          }
        }
      )
    } catch (e) {
      console.log(e)
      ctx.body = {
        info: '添加历史记录失败',
        code: 200
      }
    }
  },

  care: async ctx => {
    try {
      let params = ctx.request.query
      params.care = params.care === 'true'
      function utils_removeArr(from, arr) {
        if (!Array.isArray(arr)) return arr
        let len = arr.length
        from =
          from >= 0
            ? from + 1 > len
              ? len - 1
              : from
            : len + from < 0
            ? 0
            : len + from
        return [...arr.slice(0, from), ...arr.slice(from + 1)]
      }
      await UserInfoM.findOne({ userName: ctx.session.userName }).then(
        async res => {
          if (!res) {
            return (ctx.body = {
              info: '未找到该用户',
              code: 500
            })
          }
          let arr = (res.myCare = res.myCare || [])
          if (params.care) {
            res.myCare.push({
              userName: params.userName
            })
          } else {
            res.myCare = utils_removeArr(
              res.myCare.indexOf(params.userName),
              res.myCare
            )
          }
          await UserInfoM.findOne({ userName: params.userName }).then(
            async res => {
              res.careMe = res.careMe || []
              if (params.care) {
                res.careMe.push({
                  userName: ctx.session.userName
                })
              } else {
                res.careMe = utils_removeArr(
                  res.careMe.indexOf(ctx.session.userName),
                  res.careMe
                )
              }
              await res.save().then(res => {
                if (!res) {
                  return (ctx.body = {
                    info: '未找到该用户',
                    code: 500
                  })
                }
              })
            }
          )
          await res.save().then(res => {
            if (res) {
              ctx.body = {
                info: params.care ? '关注成功' : '取关成功',
                code: 200
              }
              console.log('保存成功', res)
            } else {
              ctx.body = {
                info: params.care ? '关注失败' : '取关失败',
                code: 200
              }
              console.log('保存失败')
            }
          })
          // arr.map(res)
        }
      )
    } catch (e) {
      console.log(e)
    }
  },

  getliveMessage: async ctx => {
    try {
      return await UserInfoM.findOne({ userName: ctx.session.userName }).then(
        res => {
          if (!res) {
            console.log('未找到该用户')
          }
          // let listsdata = res.message
          // async () => {}
          setTimeout(() => {
            res.message = res.message.map(item => {
              item.isFresh = false
              return item
            })
            res.save().then(res => {
              console.log(res)
            })
          }, 300)
          return res.message
        }
      )
    } catch (e) {
      console.log(e, 'getliveMessafe获取失败')
    }
  },
  getLiveMessageNumb: async ctx => {
    try {
      return await UserInfoM.findOne({ userName: ctx.session.userName }).then(
        res => {
          if (!res) {
            console.log('未找到该用户')
          }
          let numb = res.message.filter(res => res.isFresh).length
          ctx.body = {
            info: numb,
            code: 200
          }
          // let listsdata = res.message
          // // async () => {}
          // setTimeout(() => {
          //   res.message = res.message.map(item => {
          //     item.isFresh = false
          //     return item
          //   })
          //   res.save().then(res => {
          //     console.log(res)
          //   })
          // }, 100)
          // return listsdata
        }
      )
    } catch (e) {
      console.log(e, 'getliveMessafe获取失败')
    }
  }
}

module.exports = control
