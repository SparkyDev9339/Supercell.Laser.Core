const PiranhaMessage = require('../../../PiranhaMessage')

class LoginOkMessage extends PiranhaMessage {
  constructor (client,player,bytes) {
    super(bytes)
    this.id = 20104
    this.player = player
    this.client = client
  }

  encode () {
    this.writeInt(this.player.id)
    this.writeInt(this.player.id)

    this.writeInt(this.player.id)
    this.writeInt(this.player.id)


    this.writeString(this.player.token)//Token
    this.writeString()
    this.writeString()

    this.writeInt(29)
    this.writeInt(1)
    this.writeInt(1)

    this.writeString("prod")

    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)

    this.writeString()
    this.writeString()
    this.writeString()

    this.writeInt(0)

    this.writeString()
    this.writeString("TR")
    this.writeString()

    this.writeInt(1)
    this.writeString()

    this.writeInt(2)
    this.writeString()
    this.writeString()

    this.writeInt(1)
    this.writeString()
  }
}

module.exports = LoginOkMessage