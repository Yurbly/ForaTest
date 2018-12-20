const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const uuid = require('uuid');

DIST_DIR = path.join(__dirname, 'dist');

const port = process.env.PORT || 9001;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(DIST_DIR));

const server = http.createServer(app);

const io = socketIO(server);

let roomIds = [];

app.get('/fora/', function(req, res) {
});

io.on('connection', socket => {
    console.log('Connection!!!');
    const currentRoomId = uuid();
    socket.on('join', (roomId, userName) => {
        console.log('roomId', roomId);
        console.log('userName', userName);
        if (!roomId) {
            roomIds.push(currentRoomId);
            socket.join(currentRoomId, () => {
                io.emit('joined', currentRoomId);
                console.log('New room created: ' + currentRoomId);
            });
        } else if (roomIds.indexOf(roomId) === -1){
            io.emit('error', 'No such room');
            console.log('Error. No such room.');
        } else {
            io.emit('addUser', userName);
            console.log(`User ${userName} added to ${roomId} chatroom`);
        }
    });
    socket.on('message', (message) => {
        console.log('To all: ' + message);
        io.sockets.emit('message', message);
    });
    socket.in(currentRoomId).on('message', (message) => {
        console.log('Message sent: ', message);
        io.sockets.in(currentRoomId).emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log(`Room ${currentRoomId} disconnected`)
    });
});




app.get('/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    res.render('example2-client.ejs', {layout:false});
});

server.listen(port, () => console.log(`Listening on port ${port}`));