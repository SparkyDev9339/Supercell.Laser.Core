const PiranhaMessage = require('../../PiranhaMessage')
const OwnHomeDataMessage = require('../Server/Home/OwnHomeDataMessage')

class GoHomeFromOfflinePractise extends PiranhaMessage {
  constructor (bytes, client, player) {
    super(bytes)
    this.client = client
    this.player = player
    this.id = 14109
    this.version = 0
  }

  decode () {
  }

  process (player) {
    new OwnHomeDataMessage(this.client, player).send()
  }
}

module.exports = GoHomeFromOfflinePractise