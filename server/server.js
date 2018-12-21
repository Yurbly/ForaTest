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
    socket.on('create', () => {
            const currentRoomId = uuid();
            rooms[currentRoomId]={
                messages:[],
                participants:[]
            };
            socket.emit('created', currentRoomId);
            console.log('New room created: ' + currentRoomId);
    });
    socket.on('join', (roomId, userName) => {
        if (!rooms[roomId]){
            socket.send('message', 'No such room');
            console.log('Error. No such room.');
        } else {
            socket.join(roomId, () => {
                const user = userName ? userName : 'Anonymous';
                rooms[roomId].participants.push(user);
                socket.emit('joined', rooms[roomId], user);
                io.sockets.in(roomId).emit('participantsRefresh', rooms[roomId].participants);
                console.log(`User ${user} connected to ${roomId} chatroom`);
            });
        }
        socket.on('disconnect', () => {
            if (rooms[roomId] && rooms[roomId].length > 0){
                const indexToRemove = rooms[roomId].participants.indexOf(userName);
                rooms[roomId].participants.splice(indexToRemove, 1);
                io.sockets.in(roomId).emit('participantsRefresh', rooms[roomId].participants);
                console.log(`Room disconnected`);
            }
        });
    });
    socket.on('message', (message, roomId) => {
        console.log(`To ${roomId}: ` + message.text);
        rooms[roomId].messages.push(message);
        io.to(roomId).emit('message', message);
    });
});

app.get('*', (req, res) => {
        res.render('index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}`));