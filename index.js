const OSC = require('osc-js')
const express = require('express')

const plugin = new OSC.WebsocketServerPlugin({ port: 9912 })
const osc = new OSC({ plugin: plugin })

// Send messages on regulat intervals to keep alive
osc.on('open', () => {
    setInterval(() => {
        osc.send(new OSC.Message('/response', 'ping'))
    }, 5000)
})

osc.open()

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})