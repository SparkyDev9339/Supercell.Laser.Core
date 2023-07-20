const PiranhaMessage = require('../../../PiranhaMessage')

class KeepAliveOkMessage extends PiranhaMessage {
  constructor (client,player,bytes) {
    super(bytes)
    this.id = 20108
    this.player = player
    this.client = client
  }

  encode () {
    //pass
  }
}

module.exports = KeepAliveOkMessage