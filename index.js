const OSC = require('osc-js')

const plugin = new OSC.WebsocketServerPlugin({ port: 9912 })
const osc = new OSC({ plugin: plugin })
osc.open()