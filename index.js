const userDao = require('./user.js');

const express = require("express");
var app = express();
const server = require("http").createServer(app);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
server.listen(3000, () => {
    console.log("started on port 3000");
});

const io = require("socket.io")(server);
io.on('connection', function(socket) {
    console.log('socket '+socket.id+' connected');
    // socket.on('create-new-account', (user) => {
    //     userDao.createUser(user, (val) => {
    //         socket.emit('IsRegSuccess', val);
    //     });
    // });

    // socket.on('login', async (username, password) => {
    //     let login = await userDao.createUser(username, password, (val) => {
    //         socket.emit('IsLoginSuccess', val);
    //     });
    //     login();
    // });
    // socket.emit('Recive-Message', 'hi');
    // //
    // socket.on('find-user-by-name', async (name) => {
    //     var listUser = null;
    // });
    //<---Test---->
    socket.on('join-room',(room)=>{
        socket.join(room);
        console.log(socket.rooms);
    });
    socket.on('send_message_to_server',(room,message)=>{
        io.to(room).emit('receive-message-from-server',message);
    });
    socket.on('leave-current-room',(room)=>{
        socket.leave(room);
    });
    //chat
    socket.on('join-Room', async (roomId)=>{
        socket.join(roomId);
        console.log(socket.rooms);
    });
    socket.on('leave-room',async (roomId)=>{
        socket.leave(roomId);
    });

    //
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});