const PostM = require('../models/post')
const ReplyM = require('../models/reply')
const _ = require('underscore')
const io = require('../socket')
const UserInfoM = require('../models/userInfo')

module.exports = {
  posting: async ctx => {
    try {
      let data = ctx.request.body
      let id = +new Date() + (Math.random() + '').slice(-5)
      let params = {
        title: data.title,
        value: data.value,
        date: data.date,
        url: '/post/' + id,
        userName: ctx.session.userName,
        post_id: id,
        comments: []
      }
      // params.avatar = await UserInfoM.findOne({
      //   userName: params.userName
      // }).then(res => {
      //   if (res) return res.avatar
      //   else return 'default.jpg'
      // })
      let post = new PostM(params)
      await post.save().then(res => {
        console.log(res)
        ctx.body = {
          code: 200,
          mes: '发帖成功'
        }
      })
    } catch (e) {
      console.log(ctx.session, 'posting')
      ctx.body = {
        code: 500,
        mes: '服务器错误'
      }
    }
  },

  comments: async ctx => {
    try {
      let data = ctx.request.query
      await PostM.findOne({ post_id: data.post_id }).then(async doc => {
        if (!doc) throw new Error('没找到相应帖子')
        doc.comments.push({
          userName: ctx.session.userName,
          comment_id: +new Date() + (Math.random() + '').slice(-5),
          comment_value: data.value,
          date: +new Date()
        })
        doc.save()
        await UserInfoM.findOne({ userName: doc.userName }).then(async res => {
          let info = {
            userName: ctx.session.userName,
            isFresh: true,
            isReply: false,
            post_id: data.post_id,
            value: data.value,
            postTitle: doc.title,
            replyName: null
          }
          res.message.push(info)
          res.save()
        })
        var socket = io.getSocket()
        var toSocket
        if (
          (toSocket = _.findWhere(socket.sockets.sockets, {
            userName: doc.userName
          }))
        ) {
          toSocket.emit('message', '1')
        }
        console.log('增添评论成功')
        // io.
      })
      ctx.body = {
        code: 200,
        mes: '评论成功'
      }
      // })
    } catch (e) {
      console.log(e, 'posting')
      ctx.body = {
        code: 500,
        mes: '服务器错误'
      }
    }
  },

  getSearchPostLists: async ctx => {
    try {
      let value = ctx.request.query.value
      return await PostM.find(
        { title: { $regex: value } },
        { comments: 0 }
      ).then(res => {
        return res
        // ctx.body = {
        //   code: 200,
        //   mes: res
        // }
      })
    } catch (e) {
      console.log(e, 'posting')
      // ctx.body = {
      //   code: 500,
      //   mes: '服务器错误'
      // }
    }
  },

  getPostLists: async ctx => {
    try {
      return await PostM.find(undefined, { comments: 0 }).then(res => {
        return res
        // ctx.body = {
        //   code: 200,
        //   mes: res
        // }
      })
    } catch (e) {
      console.log(e, 'posting')
      // ctx.body = {
      //   code: 500,
      //   mes: '服务器错误'
      // }
    }
  },

  getPostDetail: async ctx => {
    try {
      let post = await PostM.findOne({ post_id: ctx.params.id })
      let comments = await ReplyM.find({ post_id: post.post_id })
      // if (comments)
      post.comments.map(async item => {
        comments.map(i => {
          if (item.comment_id === i.comment_id) item.reply = i.lists
        })
      })
      // console.log(post, 'post')
      return post
      // ctx.body = {
      //   code: 200,
      //   mes: post
      // }
    } catch (e) {
      console.log(e, 'posting')
      // ctx.body = {
      //   code: 500,
      //   mes: '服务器错误'
      // }
    }
  },

  // try {
  // } catch (e) {
  //   console.log(e, 'posting')
  //   ctx.body = {
  //     code: 500,
  //     mes: '服务器错误'
  //   }
  // }

  replay: async ctx => {
    try {
      let data = ctx.request.query
      await ReplyM.findOne({
        post_id: data.post_id,
        comment_id: data.comment_id
      }).then(async doc => {
        if (doc) {
          doc.lists.push({
            userName: ctx.session.userName,
            replyName: data.replyName,
            reply: data.reply,
            value: data.value,
            date: +new Date()
          })
          await doc.save()
        } else {
          let params = {
            post_id: data.post_id,
            comment_id: data.comment_id,
            lists: [
              {
                userName: ctx.session.userName,
                replyName: data.replyName,
                reply: data.reply,
                value: data.value,
                date: +new Date()
              }
            ]
          }
          let doc = new ReplyM(params)
          await doc.save().then(res => {
            if (res) console.log('success')
          })
        }
        var socket = io.getSocket()
        var toSocket
        await PostM.findOne({ post_id: data.post_id }).then(async doc => {
          let commentUserName = doc.comments.find(
            res => res.comment_id === data.comment_id
          ).userName
          await UserInfoM.findOne({ userName: doc.userName }).then(
            async res => {
              let info = {
                userName: ctx.session.userName,
                isFresh: true,
                isReply: true,
                post_id: data.post_id,
                value: data.value,
                postTitle: doc.title,
                replyName: data.replyName || commentUserName
              }
              res.message.push(info)
              res.save()
              if (
                (toSocket = _.findWhere(socket.sockets.sockets, {
                  userName: doc.userName
                }))
              ) {
                toSocket.emit('message', '1')
              }
            }
          )
          await UserInfoM.findOne({ userName: commentUserName }).then(
            async res => {
              let info = {
                userName: ctx.session.userName,
                isFresh: true,
                isReply: true,
                post_id: data.post_id,
                value: data.value,
                postTitle: doc.title,
                replyName: data.replyName || commentUserName
              }
              res.message.push(info)
              res.save()
              if (
                (toSocket = _.findWhere(socket.sockets.sockets, {
                  userName: commentUserName
                }))
              ) {
                toSocket.emit('message', '1')
              }
            }
          )
          if (data.replyName !== 'null') {
            await UserInfoM.findOne({ userName: data.replyName }).then(
              async res => {
                let info = {
                  userName: ctx.session.userName,
                  isFresh: true,
                  isReply: true,
                  post_id: data.post_id,
                  value: data.value,
                  postTitle: doc.title,
                  replyName: data.replyName || commentUserName
                }
                res.message.push(info)
                res.save()
                if (
                  (toSocket = _.findWhere(socket.sockets.sockets, {
                    userName: data.replyNamen
                  }))
                ) {
                  toSocket.emit('message', '1')
                }
              }
            )
          }
        })

        ctx.body = {
          code: 200,
          mes: '回复成功'
        }
      })
    } catch (e) {
      console.log(e, 'posting')
      ctx.body = {
        code: 500,
        mes: '服务器错误'
      }
    }
  },

  search: async ctx => {
    try {
      let data = ctx.request.query.search
      PostM.find({ title: data }).then(res => {
        if (!res.length || res) {
          console.log('搜索帖子列表错误')
          ctx.body = {
            code: 500,
            mes: '服务器错误'
          }
          return
        }
      })
    } catch (e) {
      console.log(e, 'search')
      ctx.body = {
        code: 500,
        mes: '服务器错误'
      }
    }
  }
}
