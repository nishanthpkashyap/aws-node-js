var aws = require("aws-sdk");
require("dotenv").config();

var tableName = "items";
var region = process.env.REGION;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;

var dynamoDb = new aws.DynamoDB.DocumentClient({
    region : region,
    accessKeyId : accessKeyId,
    secretAccessKey : secretAccessKey
});

var params = {
    TableName : tableName,
    Key : 
    {
        "id" : 1
    }
};

dynamoDb.delete(params,function(err,data){
    try{
        if(err)
            throw err;
        console.log(data);
    }
    catch(e)
    {
        console.log(err);
    }
});