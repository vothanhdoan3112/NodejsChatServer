const port = 3000;
const HOST = '18.139.222.43'

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
  
/*************************************** */
server.listen(process.env.PORT || port);
console.log(`Server run on http://${HOST}:${port}`);
io.sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('mess',function(mess){
    console.log(mess);
  });
  socket.on('regAcc',function(phone,pass){
    console.log('a mobile user connected');
    socket.emit('IsRegSuccess',true)
  });
});


