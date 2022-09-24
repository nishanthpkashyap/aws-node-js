var aws = require("aws-sdk");
require("dotenv").config();

var region = process.env.REGION;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var tablename = "simple"


aws.config.update({
    region : region,
    accessKeyId : accessKeyId,
    secretAccessKey : secretAccessKey
});

var dynamdb = new aws.DynamoDB();

var params = {
    TableName : tablename,
    AttributeDefinitions : [
        {
            AttributeName : "id",
            AttributeType : "N"
        }
    ],
    KeySchema : [
        {
            AttributeName : "id",
            KeyType : "HASH"
        }
    ],
    ProvisionedThroughput : 
    {
        ReadCapacityUnits : "1",
        WriteCapacityUnits : "1"
    }
};



dynamdb.createTable(params,function(err,data){
    try
    {
        if(err)
            throw err;
    }
    catch(e)
    {
        console.log(e);
    }
});