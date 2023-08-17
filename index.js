const WebSocket = require('ws')
const express = require('express')
const http = require("http");
const app = express()
const port = 443

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  console.log("Connection Opened");
  console.log("Client size: ", wss.clients.size);
  ws.on('message', (message) => {
    console.log('received: %s', message);
    broadcast(ws, message);
  });
});

const broadcast = (ws, message) => {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(message);
      console.log("broadcasted")
    }
  });
};

server.listen(port);
console.log(`Websocket app listening on port ${port}`)