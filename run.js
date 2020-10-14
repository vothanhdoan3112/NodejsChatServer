const User = {};


const port = 3000;
const HOST = '0.0.0.0'
// module.exports = User;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
// const Person = require('../entities/User');

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

  socket.on('regAcc',function(user){
    console.log("co nguoi ket noi");
   // console.log(user);
    var save = function () {
      // var input = {
      //     phoneNum: phone,
      //     password: pass          
      // };
      var params = {
          TableName: "UserAccounts",
          Item:  user
      };
      docClient.put(params, function (err, data) {
          if (err) {
              console.log("UserAccounts::save::error - " + JSON.stringify(err, null, 2));                      
          } else {
              console.log("UserAccounts::save::success" );
              socket.emit('IsRegSuccess',true);                   
          }
      });
   }
   save();
  });
  /************************************************/
  socket.on('login',function(phone,pass){
    var findUser = function () {

      var params = {
        TableName : "UserAccounts",
        KeyConditionExpression: "#phone = :phone",
        ExpressionAttributeNames:{
            "#phone": "phoneNum"
           
        },
        ExpressionAttributeValues: {
            ":phone": phone
        }
    };

      docClient.query(params, function (err, data) {
          if (err) {
              console.log(JSON.stringify(err, null, 2));                      
          } else {            
            console.log("Query succeeded.");
            data.Items.forEach(function(user) {         
              console.log(user);
              if(pass==user.password){
                socket.emit('IsLoginSuccess',user);        
              }else{
                socket.emit('IsLoginSuccess',null);
              }
              });
                      
          }
      });
   }
  findUser();
  });
});


function prettyJSON(obj) {
  console.log(JSON.stringify(obj, null, 2));
}