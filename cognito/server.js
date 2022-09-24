var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var registerUser = require("./registerUser");
app.use(express.urlencoded());
app.use(bodyparser.text());

app.get("/register",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/register",async function(req,res){
    var email = req.body.email;
    var name = req.body.name;
    var phone = req.body.phone;
    var result = await registerUser.registerUser(email,name,phone);
    res.send(result);
});

app.listen(8000,function(){console.log("Server started at localhost 8000")});