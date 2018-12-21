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
    const currentRoomId = uuid();
    socket.on('create', () => {
            rooms[currentRoomId]={...roomTemplate};
            io.emit('created', currentRoomId);
            console.log('New room created: ' + currentRoomId);
    });
    socket.on('join', (roomId, userName) => {
        if (!rooms[roomId]){
            io.emit('error', 'No such room');
            console.log('Error. No such room.');
        } else {
            socket.join(roomId, () => {
                const user = userName ? userName : 'Anonymous';
                rooms[roomId].users.push(user);
                io.emit('joined', rooms[roomId], user);
                console.log(`User ${user} connected to ${roomId} chatroom`);
            });
        }
    });
    socket.on('message', (message) => {
        // io.sockets.to(currentRoomId).emit('messageText', messageText);
    });
    socket.on('message', (message, roomId) => {
        console.log(`To ${roomId}: ` + message);
        console.log('Message sent: ', message.text);
        rooms[roomId].messages.push(message);
        io.emit('message', message);
        // io.sockets.in(roomId).emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log(`Room ${currentRoomId} disconnected`)
    });
});




app.get('/chat/', (req, res) => {
    res.render('index.html');
});

app.get('/chat/:roomId', (req, res) => {
    console.log('get with id worked!!');
    if (rooms.indexOf(roomId) === -1){
        res.status(404).send('<h1>Sorry! No such chatroom!</h1>')
    } else {
        res.render('index.html');
    }
});

server.listen(port, () => console.log(`Listening on port ${port}`));