function upload() {
  let data = $('.upload')[0].files[0]
  let fromdata = new FormData()
  let inputV = { userName: $('.text')[0].value, email: $('.text')[1].value }
  console.log(inputV)

  fromdata.append('avatar', data)
  fromdata.append('inputV', JSON.stringify(inputV))
  API.upload(fromdata).then(res => {
    if (res.code === 200) {
      console.log('上传成功')
      location.href = location.origin + '/space/' + res.userName
      // getUserInfo().then(() => {
      //   alert('修改成功')
      //   // location.reload()
      // })
      // $('.avatar')[0].src = res.url
    } else {
      alert('修改失败')
      console.log('上传失败')
    }
  })
}

function care(e) {
  let params = {
    care: e.target.innerText !== '取消关注',
    userName: location.pathname.split('/').slice(-1)[0]
  }
  API.care(params).then(res => {
    if (res.code === 200) {
      // console.log('上传成功')
      alert('care成功')
      location.reload()
      // getUserInfo().then(() => {
      // })
      // $('.avatar')[0].src = res.url
    } else {
      alert('care失败')
      // console.log('上传失败')
    }
  })
}

function initSocket() {
  var socket = io.connect('http://106.15.191.44:3001')
  socket.on('message', function(data) {
    // let html = document.createElement('p')
    // html.innerHTML = `系统消息：<span>${data.hello}</span>`
    // document.getElementById('content').appendChild(html)
    console.log(data)
  })
}

window.onload = function() {
  // API.getUserInfo().then(res => {
  //   if (res.code === 200) {
  //     res = res.info
  //     setTimeout(() => {
  //       $('.avatar')[0].src = '/' + res.avatar
  //     })
  //     $('.text')[0].value = res.userName
  //     $('.text')[1].value = res.email
  //     // $('.avatar')[0].src = res.url
  //     console.log(res, location.origin + res.avatar)
  //   } else {
  //     console.log('上传失败')
  //   }
  // })

  $('.save').click(upload)
  $('.caseHim div').click(care)
}
