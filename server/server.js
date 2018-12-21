const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const uuid = require('uuid');

DIST_DIR = 'client/dist/';

const port =  9001;

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

const roomTemplate = {
  messages:[],
  users:[]
};

io.on('connection', socket => {
    console.log('Connection!!!');
    socket.on('create', () => {
            const currentRoomId = uuid();
            rooms[currentRoomId]={...roomTemplate};
            socket.emit('created', currentRoomId);
            console.log('New room created: ' + currentRoomId);
    });
    socket.on('join', (roomId, userName) => {
        console.log(userName);
        if (!rooms[roomId]){
            socket.emit('error', 'No such room');
            console.log('Error. No such room.');
        } else {
            socket.join(roomId, () => {
                console.log(rooms);
                const user = userName ? userName : 'Anonymous';
                rooms[roomId].users.push(user);
                socket.emit('joined', rooms[roomId], user);
                console.log(`User ${user} connected to ${roomId} chatroom`);
            });
        }
    });
    socket.on('message', (message, roomId) => {
        console.log(`To ${roomId}: ` + message.text);
        console.log('Message sent: ', message.text);
        rooms[roomId].messages.push(message);
        io.to(roomId).emit('message', message);
        // io.sockets.in(roomId).emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log(`Room disconnected`)
    });
});

app.get('*', (req, res) => {
        res.render('index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}`));