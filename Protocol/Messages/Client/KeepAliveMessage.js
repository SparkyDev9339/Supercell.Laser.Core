const PiranhaMessage = require('../../PiranhaMessage')
const KeepAliveOkMessage = require('../Server/Login/KeepAliveOkMessage')

class KeepAliveMessage extends PiranhaMessage {
  constructor (bytes, client, player) {
    super(bytes)
    this.client = client
    this.player = player
    this.id = 10108
    this.version = 0
  }

  decode () {
  }

  process (player) {
    new KeepAliveOkMessage(this.client, player).send()
  }
}

module.exports = KeepAliveMessage