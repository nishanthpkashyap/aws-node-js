var aws = require("aws-sdk");
require("dotenv").config();
aws.config.update({
    region :process.env.REGION,
    accessKeyId : process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.SECRET_ACCESS_KEY
});

var cognito = new aws.CognitoIdentityServiceProvider();

async function registerUser(email,name,phone)
{
    console.log(process.env.REGION);
    var params = {
        "Username" : email,
        "UserPoolId" : process.env.USER_POOL_ID,
        "UserAttributes" : [
            {
                "Name" : "name",
                "Value" : name
            },
            {
                "Name" : "email",
                "Value" : email,
            },
            {
                "Name" : "phone_number",
                "Value" : `+91${phone}`
            }
        ]
    };
    try{
    var res = await cognito.adminCreateUser(params).promise();
    return res;
    }
    catch(e)
    {
        return e;
    }
}

module.exports = {
    registerUser : registerUser
}