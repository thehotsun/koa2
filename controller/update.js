const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const UserInfoM = require('../models/userInfo')

module.exports = {
  upload: async ctx => {
    // debugger
    try {
      let form = new formidable.IncomingForm()
      form.encoding = 'utf-8' // 编码
      form.keepExtensions = true // 保留扩展名
      form.maxFieldsSize = 2 * 1024 * 1024 // 文件大小
      console.log(__dirname, path.resolve('./public/images'))

      form.uploadDir = path.resolve('./public/images') // 存储路径
      await new Promise((resolve, reject) => {
        form.parse(ctx.req, async function(err, fileds, files) {
          console.log('ss', err)
          try {
            // 解析 formData数据
            if (err) {
              reject()
              return console.log(err)
            }
            let url
            if (Object.keys(files).length) {
              let imgPath = files.avatar.path // 获取文件路径
              url = imgPath
                .split('\\')
                .slice(-2)
                .join('/')
            }
            let obj = JSON.parse(fileds.inputV)
            var userInfo = {}
            Object.keys(obj).map(res => {
              if (obj[res]) userInfo[res] = obj[res]
            })
            if (url) userInfo.avatar = url
            // console.log('ppp', userInfo)
            var next = true
            if (userInfo.userName !== ctx.session.userName) {
              next = await UserInfoM.findOne({
                userName: userInfo.userName
              }).then(res => {
                if (res) {
                  console.log(!!res, '修改失败，用户名重复')
                  ctx.body = {
                    info: '修改失败，用户名重复！',
                    code: 400
                  }
                  resolve()
                  return false
                }
                return true
              })
            }
            await (next &&
              UserInfoM.findOne({ userName: ctx.session.userName }).then(
                async res => {
                  let anvtarPath = res.avatar
                  let avatar = res.avatar === 'images/default.png'
                  res = Object.assign(res, userInfo)
                  await res.save().then(res => {
                    if (!res) {
                      reject()
                      return console.log('reject')
                    }
                    ctx.session.userName = userInfo.userName
                    console.log('success', ctx.session.userName)
                    ctx.body = {
                      info: '上传成功',
                      code: 200,
                      url,
                      userName: userInfo.userName
                    }
                    if (!avatar) {
                      console.log(
                        path.resolve('../', './public', './' + anvtarPath),
                        __dirname
                      )
                      fs.unlink(
                        path.resolve('./public', './' + anvtarPath),
                        e => {
                          resolve()
                          if (e) {
                            console.log('文件删除失败', e)
                          } else console.log('文件删除成功', e)
                        }
                      )
                    }
                  })
                }
              ))
          } catch (e) {
            console.log(e, 'jiexi shibai')
          } finally {
            // console.log(files, fileds, 'files')
            // console.log(files, fileds, 'files')
          }
        })
      })
    } catch (e) {
      console.log('uploadshibai', e)
    }
    // console.log(img, 'img')
  }
}
