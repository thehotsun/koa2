// import { log } from 'util'
$('.button').click(send)

function send() {
  let userInfo = {
    password: '',
    userName: ''
  }
  userInfo.password = $('.password')[0].value
  userInfo.userName = $('.userName')[0].value
  console.log(userInfo)
  $('.button').text() === '登录'
    ? API.login(userInfo).then(res => {
        console.log(res)
        if (res.code === 200) {
          window.location.href = 'http://106.15.191.44:3001'
        } else {
          alert(res.info)
        }
      })
    : API.register(userInfo).then(res => {
        console.log(res)
        if (res.code === 200) {
          window.location.href = 'http://106.15.191.44:3001'
        } else {
          alert(res.info)
        }
      })
}
