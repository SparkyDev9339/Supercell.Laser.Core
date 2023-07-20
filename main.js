const net = require('net')
const Packetizer = require('./ByteStream/packetizer')
const MessageFactory = require('./Protocol/MessageFactory')
const server = new net.Server()
const Messages = new MessageFactory()
const Player = require('./Logic/Player')
const DB = require('./DataBase/DataBase')
const PORT = 9339

var PlayerClass = new Player()
const dbmanager = new DB(PlayerClass)
  

server.on('connection', async (client) => {
  client.log = function (text) {
    return console.log(`[${this.remoteAddress.split(':').slice(-1)}] >> ${text}`)
  }

  client.log('[SERVER][+]: New Connection')
  client.db = dbmanager
  client.player = PlayerClass
  const packets = Messages.getPackets()
  const packetizer = new Packetizer()

  client.on('data', async (chunk) => {
    packetizer.packetize(chunk, (packet) => {
      const message = {
        id: packet.readUInt16BE(0),
        len: packet.readUIntBE(2, 3),
        version: packet.readUInt16BE(5),
        payload: packet.slice(7, this.len),
        client,
      }
      if (packets.indexOf(String(message.id)) !== -1) {
        try {
          const packet = new (Messages.handle(message.id))(message.payload, client, client.player, client.db)

          client.log(`[ClienHandle][<<]: Packet ID: ${message.id} (${packet.constructor.name})`)

          packet.decode(PlayerClass)
          packet.process(PlayerClass)

        } catch (e) {
          console.log(e)
        }
      } else {
        client.log(`[ClientHandle][<<]: Packet not handled: ${message.id}`)
      }
    })
  })

  client.on('end', async () => {
    return client.log('Client disconnected.')
  })

  client.on('error', async error => {
    try {
      client.log('A wild error!')
      console.log(error)
      client.destroy()
    } catch (e) { }
  })
})

server.once('listening', () => console.log(`Server started on ${PORT} port!`))
server.listen(PORT)