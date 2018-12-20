const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 9001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

let roomno = 1;

app.get('/fora/', function(req, res) {
});

io.on('connection', socket => {

    console.log('New room connected');

    if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) {
        roomno++;
    }
    socket.join("room-"+roomno);
    io.sockets.in("room-"+roomno).emit('connectToRoom', roomno);
    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);

    socket.in("room-"+roomno).on('message', (message) => {
        console.log('Message sent: ', message);
        io.sockets.in("room-"+roomno).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('room disconnected')
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`));