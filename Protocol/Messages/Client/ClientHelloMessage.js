const PiranhaMessage = require('../../PiranhaMessage')
const ServerHelloMessage = require('../Server/Login/ServerHelloMessage')

class ClientHelloMessage extends PiranhaMessage{
  constructor(bytes, client, player, db){
      super(bytes)
      this.client = client
      this.player = player
      this.db = db
      this.id = 10100
      this.version = 0
  }

  decode () {
    // this.readInt()
  }

  process () {
    new ServerHelloMessage(this.client).send()
  }
}

module.exports = ClientHelloMessage