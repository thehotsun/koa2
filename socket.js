const io = require('socket.io')

let instance = {}


module.exports = {
  initSocket(server) {
    if (this.isInit) return
    instance = io(server)
    this.isInit = true
  },
  isInit: false,
  getSocket() {
    if (!this.isInit) console.log('未能成功初始化io')
    return instance
  }
}
