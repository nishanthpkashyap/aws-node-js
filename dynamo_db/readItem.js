var aws = require("aws-sdk");
require("dotenv").config();

var region = process.env.REGION;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY; 

var tableName = "field_officer";

aws.config.update({
    region : region,
    accessKeyId :accessKeyId,
    secretAccessKey:secretAccessKey
});

var dynamoDb = new aws.DynamoDB();

var params = {
    TableName : tableName,
    Key : {
        "username" : {S: "admin#nish@gmail.com"} 
    }
};

dynamoDb.getItem(params,function(err,data){
    try{
        if(err)
            throw(err);
        if(Object.keys(data).length==0)
            return false     //user doesnt exist
        else 
            return true;
    }
    catch(e)
    {
        console.log(e);
    }
});