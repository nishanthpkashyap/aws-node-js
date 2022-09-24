var express = require("express");
var upload = require("express-fileupload");
require("dotenv").config();
var uploads = require("./upload");
var download = require("./download");
var delet = require("./deleteFile");

var app = express();

app.use(upload());





app.get("/upload",function(req,res){
    res.sendFile(__dirname+"/uploadFile.html");
});
app.post("/upload",async function(req,res)
{
    var file = req.files.file;
    console.log(req.files);
    var result = await uploads.uploadFileToS3(file);
    res.send(result);
    /*res.send(`The file uploaded is : ${file.name}`);
    console.log(process.env.ACCESS_KEY_ID+"\n"+process.env.SECRET_ACCESS_KEY)*/
});



app.get("/download",function(req,res){
    res.sendFile(__dirname+"/downloadFile.html");
});
app.post("/download",async function(req,res){
    var fname = req.body.fname;
    var read = await download.downloadFileFromS3(fname);
    read.pipe(res);
});



app.get("/delete",function(req,res){
    res.sendFile(__dirname+"/deleteFile.html");
});
app.post("/delete",async function(req,res){
    var fname = req.body.fname;
    var result = await delet.deleteFileFromS3(fname);
    res.send(result);
});


app.listen(8080,()=>console.log("Server started at localhosr 8080..."));