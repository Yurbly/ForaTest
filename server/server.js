const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const uuid = require('uuid');

DIST_DIR = 'client/dist/';

const port = process.env.PORT || 9001;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('client/dist/'));
app.set('views', 'client/dist/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const server = http.createServer(app);

const io = socketIO(server);

const rooms = {};

io.on('connection', socket => {
        console.log('connected');
    socket.on('create', () => {
            const newRoomId = uuid();
            rooms[newRoomId]={
                messages:[],
                participants:[]
            };
            socket.emit('created', newRoomId);
            console.log('New room created: ' + newRoomId);
    });
    socket.on('join', (roomId, userName) => {

        let currentUser = userName;
        if (rooms[roomId]) {
            const nameExists = rooms[roomId].participants.indexOf(userName) !== -1;
            if(nameExists || !userName) {
                currentUser = currentUser + uuid();
            }
            socket.join(roomId, () => {
                rooms[roomId].participants.push(currentUser);
                socket.emit('joined', rooms[roomId], currentUser);
                io.sockets.in(roomId).emit('participantsRefresh', rooms[roomId].participants);
                console.log(`User ${currentUser} joined to ${roomId} chatroom`);
            });
            socket.on('disconnect', () => {
                if (rooms[roomId].participants.length > 0){
                    const indexToRemove = rooms[roomId].participants.indexOf(currentUser);
                    rooms[roomId].participants.splice(indexToRemove, 1);
                    io.sockets.in(roomId).emit('participantsRefresh', rooms[roomId].participants);
                    console.log(`${currentUser} disconnected`);
                }
            });
        } else {
            socket.emit('Error', 'No such room');
            console.log('Error. No such room.');
        }
    });
    socket.on('message', (message, roomId) => {
        console.log(`To ${roomId}: ` + message.text);
        rooms[roomId].messages.push(message);
        io.sockets.in(roomId).emit('message', message);
    });
});

app.get('*', (req, res) => {
        res.render('index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}`));