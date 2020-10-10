var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-1",
  endpoint: "http://dynamodb.ap-southeast-1.amazonaws.com",
  accessKeyId: "AKIAQ6HJTTXCL4KHRWOR", 
  secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function () {

    var input = {
        phoneNum: "01218369251",
        password: "0123456789",
        username: "vo thanh doan",
        email: "vothanhdoan3112@gmail.com"
        
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
        }
    });
}
save();