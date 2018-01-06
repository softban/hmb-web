
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = express()
  .set('view engine', 'pug')
  .use(express.static(__dirname + '/public'))
  .use((req, res) => res.render(path.join(__dirname, 'index.pug'), {
      title: "nodejs-website-template"
    }))
  .listen(PORT, () => console.log(`{!} listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`{+} ${socket.handshake.headers.cookie}`);
  socket.on('disconnect', () => console.log(`{-} ${socket.handshake.headers.cookie}`));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
