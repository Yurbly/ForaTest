const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 9001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.get('/', function(req, res) {
    res.sendfile('bundle.js', 'index.html');
});

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('change color', (color) => {
        console.log('Color Changed to: ', color);
        io.sockets.emit('change color', color);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`));