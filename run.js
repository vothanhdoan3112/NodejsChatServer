const port = 3000;
const HOST = '18.139.222.43'

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');


var AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-southeast-1",
  endpoint: "http://dynamodb.ap-southeast-1.amazonaws.com",
  accessKeyId: "AKIAQ6HJTTXCL4KHRWOR", 
  secretAccessKey: "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" ///
});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


/*************************************** */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
  
/*************************************** */
server.listen(process.env.PORT || port);
console.log(`Server run on http://${HOST}:${port}`);
io.sockets.on('connection', function(socket){
 
  console.log('a user connected');
  /********************* Đăng ký tài khoản *************************/
  socket.on('regAcc',function(phone,pass){
    let save = function () {
      var input = {
          phoneNum: phone,
          password: pass          
      };
      var params = {
          TableName: "UserAccounts",
          Item:  input
      };
      docClient.put(params, function (err, data) {
          if (err) {
              console.log("UserAccounts::save::error - " + JSON.stringify(err, null, 2));                      
          } else {
              console.log("UserAccounts::save::success" );
              socket.emit('IsRegSuccess',true)                   
          }
      });
   }
   save();
  });
  /************************************************/
  socket.on('login',function(phone,pass){
    let findUser = function () {

      var key = {
          phoneNum: phone,
          password: pass      
      };
      var params = {
          TableName: "UserAccounts",
          Item:  input
      };
      docClient.query(params, function (err, data) {
          if (err) {
              console.log(JSON.stringify(err, null, 2));                      
          } else {            
              socket.emit('IsLoginSuccess',true)                   
          }
      });
   }
 //  findUser();
  });
});


