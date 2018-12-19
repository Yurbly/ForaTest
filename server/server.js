const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 9001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
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