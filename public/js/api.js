;(function() {
  // import axios from 'axios'
  let baseUrl = 'http://106.15.191.44:3001/api/'
  // console.log(NODE_ENV, 'NODE_ENV')

  function register(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}register`,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        success: function(res) {
          resolve(res)
          console.log('注册成功', res)
        },
        error(e) {
          reject(e)
          console.log('注册失败')
        }
      })
    })
  }

  function login(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}login`,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        success: function(res) {
          resolve(res)
          console.log('登陆成功', res)
        },
        error(e) {
          reject(e)
          console.log('登录失败')
        }
      })
    })
  }

  function isLogin() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}isLogin`,
        // data: JSON.stringify(data),
        // contentType: 'application/json; charset=utf-8',
        type: 'GET',
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('isLogin 失败')
        }
      })
    })
  }

  function logout() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}logout`,
        type: 'GET',
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('logout 失败')
        }
      })
    })
  }

  function upload(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}upload`,
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        data,
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('upload 失败')
        }
      })
    })
  }

  function getUserInfo() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}getUserInfo`,
        type: 'GET',
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('getUserInfo 失败')
        }
      })
    })
  }

  function posting(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}posting`,
        type: 'POST',
        // contentType: false,
        // processData: false,
        // cache: false,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('posting 失败')
        }
      })
    })
  }

  function postComment(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}comments`,
        type: 'GET',
        data,
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('getUserInfo 失败')
        }
      })
    })
  }

  function reply(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}reply`,
        type: 'GET',
        data,
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('getUserInfo 失败')
        }
      })
    })
  }

  function history(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}history`,
        type: 'GET',
        data,
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('history 失败')
        }
      })
    })
  }

  function care(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}care`,
        type: 'GET',
        data,
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('care 失败')
        }
      })
    })
  }

  function search(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/search`,
        type: 'GET',
        data,
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('care 失败')
        }
      })
    })
  }

  function getliveMessage(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}getLiveMessageNumb`,
        type: 'GET',
        data,
        success: function(res) {
          resolve(res)
        },
        error(e) {
          reject(e)
          console.log('getLiveMessageNumb 失败')
        }
      })
    })
  }

  window.API = {
    register,
    isLogin,
    login,
    logout,
    upload,
    getUserInfo,
    posting,
    postComment,
    reply,
    history,
    care,
    search,
    getliveMessage
  }
})(window)
