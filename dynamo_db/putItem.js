var aws = require("aws-sdk");
require("dotenv").config();
var region = process.env.REGION;
var accessIdKey = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var tablename = "sample";

var dynamoDb = new aws.DynamoDB.DocumentClient({
    region:region,
    accessKeyId:accessIdKey,
    secretAccessKey:secretAccessKey
});

var params = {
    TableName : tablename,
    Item : {
        "id" : 5,
        "name" : "Nishanth",
        "city" : "Bengaluru",
        "state" : "Karnataka"
    }
};
try{
dynamoDb.put(params,function(err,data){
    if(err)
        throw err;
    console.log("Data inserted");
});
}
catch(e)
{
    console.log(e);
}