var aws = require("aws-sdk");
var fs = require("fs")
aws.config.update({
    region : process.env.REGION,
    accessKeyId : process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.SECRET_ACCESS_KEY
});

var s3 = new aws.S3();

async function downloadFileFromS3(fname)
{
    try{
        var params = {
            Bucket : process.env.BUCKET,
            Key : fname
        }
            /*var read = s3.getObject(params,function(err,data)
            {
                if(err)
                    reject(err);
                else
                    resolve(data);
            });*/
        return new Promise(function(resolve,reject){
            var read = s3.getObject(params).createReadStream();
            console.log(read);
            resolve(read);
        });
   }
    catch(e)
    {
        return e;
    }
}


module.exports={
    downloadFileFromS3:downloadFileFromS3
};