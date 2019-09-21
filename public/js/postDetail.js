// import { log } from 'util'

function postComment() {
  let params = {
    value: $('.mycomment')[0].innerText,
    post_id: location.href.split('/').slice(-1)[0]
  }
  API.postComment(params).then(res => {
    console.log(res)
    alert(res.mes)
    if (res.code === 200) {
      location.reload()
      // getPostDetails()
    }
  })
}

function getPostDetails() {}

function reply(e) {
  let params = {
    post_id: $('.postDetail')[0].getAttribute('post_id'),
    comment_id: e.target.getAttribute('comment_id'),
    value: e.target.parentNode.parentNode.children[0].innerText,
    reply: e.target.parentNode.parentNode.getAttribute('replyName') !== 'null',
    replyName: e.target.parentNode.parentNode.getAttribute('replyName')
  }
  API.reply(params).then(res => {
    alert(res.mes)
    if (res.code === 200) {
      location.reload()
    }
  })
}

function init() {
  let dom = $('.bottom')
  let arrdom = $('.c_comment')
  let ssdom = $('.replys')
  dom.hide()
  // let leg = arrdom.length
  dom = Array.prototype.slice.call(dom)
  arrdom = Array.prototype.slice.call(arrdom)
  ssdom = Array.prototype.slice.call(ssdom)
  arrdom.map((item, i) => {
    item.addEventListener('click', event(i))
  })
  ssdom.map((item, i) => {
    item.addEventListener('click', event(i, true))
  })
  function event(i, bool) {
    return e => {
      if (bool) {
        if (e.target.innerText !== '回复') return
        dom[i].setAttribute(
          'replyName',
          e.target.parentNode.parentNode.children[1].innerText.replace(
            /回复.*/,
            ''
          )
        )
      } else dom[i].setAttribute('replyName', null)
      $('.bottom').hide()
      dom[i].style.display = 'block'
    }
  }
}

window.onload = function() {
  init()

  $('.publish').click(postComment)
  let dom = $('.b_publish div')
  dom = Array.prototype.slice.call(dom)
  dom.map((item, i) => {
    item.addEventListener('click', reply)
  })
  // dom = $('.r_reply')
  // dom = Array.prototype.slice.call(dom)
  // dom.map((item, i) => {
  //   item.addEventListener('click', event(i))
  // })
  // r_reply
  // r_reply
}
