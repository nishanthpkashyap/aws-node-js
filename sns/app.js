const express = require('express');
const app = express();
const bp = require("body-parser")
var aws = require("aws-sdk");
aws.config.update({"region":"ap-south-1"});
const sns = new aws.SNS();
app.use(bp.text());
app.use(express.urlencoded());



app.get('/index', (req,res) => {

    res.sendFile(__dirname+"/index.html");
});

app.post("/sendMessage", (req, res)=>{
    console.log(message);
    console.log(subject)
    console.log(phno);

    var params = {
        Message: message,
        PhoneNumber: `+91${phno}`,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': "SB-NOTIFY" //type your senderID
            }
        }
    };
    var publishTextPromise = sns.publish(params).promise();
    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                console.log("Error!!");
                res.end(JSON.stringify({ Error: err }));
            });
});



app.listen(5500, () => console.log('SMS Service Listening on PORT 5500'))