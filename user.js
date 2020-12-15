const config = require('./config.json');
const AWS = require('aws-sdk');
const table = "User";
AWS.config.update({
    region: config.REGION,
    accessKeyId: config.ACCESS_KEY,
    secretAccessKey: config.SECRET_KEY
});
const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.createUser = async (data) => {
    var max = 999999;
    var min = 100000;
    var id = Math.floor(Math.random() * (max - min)) + min;
    var input = {
        id: id,
        'username': data.phoneNum,
        'password': password,
        'fullname': data.name,
        'nickname': data.name, //Mặc định lúc đầu nick = fullname
        'isAdministrator': 0, //Người dùng bình thường
        'status': 'Đang hoạt động',
        'phone': data.phoneNum,
        'email': '',
        'sex': 'Không xác định', //Mặc định
        'birthday': '',
        'address': ' ',
        'status_message': ' ',
        'url_avatar': 'assets/images/users/default.png', //avatar mặc định
    };
    let user = {
        Item: data
    }

    try {
        let params = {
            TableName: table,
            Item: data
        }

        let result = await docClient.put(params).promise();
        if (result) {
            console.log(">>>>>>>>>", result);
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Function executed successfully!",
                data: result
            }),
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports.getAllUser = async () => {
    try {
        let params = {
            TableName: table
        }
        let result = await docClient.scan(params).promise();
        if (result) {
            console.log(result.Items);
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Function executed successfully!",
                data: result
            }),
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports.getUserByUsername = async (username) => {
    try {
        let params = {
            TableName: table,
            FilterExpression: "#un = :username",
            ExpressionAttributeNames: {
                "#un": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            }
        }
        let result = await docClient.scan(params).promise();
        if (result) {
            console.log(result.Items);
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Function executed successfully!",
                data: result
            }),
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports.getUserById = async (id) => {
    try {
        let params = {
            TableName: table,
            FilterExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        }
        let result = await docClient.scan(params).promise();
        if (result) {
            console.log(result.Items);
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Function executed successfully!",
                data: result
            }),
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports.isUserExists = async (username) => {
    try {
        let params = {
            TableName: table,
            FilterExpression: "#un = :username",
            ExpressionAttributeNames: {
                "#un": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            }
        }
        let result = await docClient.scan(params).promise();
        //console.log(result.Count);
        // if (result) {
        //     console.log(result.Items);
        // }
        return result.Count;
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports.userLogin = async (username, password) => {
    try {
        let params = {
            TableName: table,
            FilterExpression: "#un = :username and #pw = :password ",
            ExpressionAttributeNames: {
                "#un": "username",
                "#pw": "password"
            },
            ExpressionAttributeValues: {
                ":username": username,
                ":password": password
            }
        }
        let result = await docClient.scan(params).promise();
        //console.log(result.Count);
        // if (result) {
        //     console.log(result.Items);
        // }
        return result.Items;
    } catch (error) {
        console.log(error);
        return error;
    }
};
module.exports.findUserByName = async (name) => {
    try {
        let params = {
            TableName: table,
            FilterExpression: "#un = :username",
            ExpressionAttributeNames: {
                "#un": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            }
        }
        let result = await docClient.scan(params).promise();
        //console.log(result.Count);
        // if (result) {
        //     console.log(result.Items);
        // }
        return result.Count;
    } catch (error) {
        console.log(error);
        return error;
    }
};