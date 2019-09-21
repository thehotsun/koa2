;(function() {
  // const { isLogin, logout } = api

  // const isLogin = api.isLogin
  let userName = null
  async function checkLogin() {
    let result = await API.isLogin().then(res => {
      return res
    })
    console.log(result)
    userName = result.userName
    return result.code === 200
  }

  async function logout() {
    await API.logout().then(res => {
      if (res.code === 200) alert('登出成功')
      init()
      // return res.isLogin
    })
  }
  function mine() {
    location.href = 'http://106.15.191.44:3001/space/' + userName
  }

  function login() {
    location.href = 'http://106.15.191.44:3001/login'
  }

  function register() {
    location.href = 'http://106.15.191.44:3001/register'
  }

  function publish() {
    let params = {
      title: $('.f_title input')[0].value.trim(),
      value: $('.value')[0].innerText.trim(),
      date: +new Date()
    }
    API.posting(params).then(res => {
      if (res.code === 200) alert('发帖成功')
      location.reload()
    })
  }

  function history(e) {
    // e.preventDefault()
    let params = {
      url: e.target.parentNode.href,
      postTitle: e.target.innerText
    }
    // let a = e.target.innerText
    // let b = e.target.parentNode.href
    console.log()

    // alert('ss')
    API.history(params)
    // return false
  }

  function initSocket() {
    var socket = io.connect('http://106.15.191.44:3001')
    socket.emit('setUserName', userName)
    socket.on('message', function(data) {
      // let html = document.createElement('p')
      // html.innerHTML = `系统消息：<span>${data.hello}</span>`
      // document.getElementById('content').appendChild(html)
      console.log(data)
      API.getliveMessage().then(res => {
        let num = res.info
        let text = document
          .querySelector('.message')
          .innerText.replace(/\d*/gi, '')
        document.querySelector('.message').innerText = `${text} ${num}`
      })
    })
  }

  function message() {
    location.href = 'http://106.15.191.44:3001/message'
  }

  function history() {
    location.href = 'http://106.15.191.44:3001/history'
  }

  function search() {
    // let params = {
    //   value: $('.searchInput')[0].value
    // }
    // API.search(params).then(res => {
    //   // docume
    //   // if (res.code === 200)
    // })
    let value = $('.searchInput')[0].value
    location.href = `http://106.15.191.44:3001/search?value=${value}`
  }

  async function init() {
    // debugger
    // initSocket()
    let isLogin = await checkLogin()
    console.log($('.login')[0], isLogin)
    isLogin
      ? (($('.loginAndRegister').hide(), $('.my').show()), initSocket())
      : ($('.my').hide(), $('.loginAndRegister').show())
  }
  $(document).ready(function() {
    $('.logout').click(logout)
    $('.userInfo').click(mine)
    $('.login').click(login)
    $('.register').click(register)
    $('.message').click(message)
    $('.history').click(history)
    $('.search').click(search)
    $('.publish div').click(publish)
    init()
    $('.item > a').click(history)
  })
})()
