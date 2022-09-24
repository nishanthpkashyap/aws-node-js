var aws = require("aws-sdk");

aws.config.update({
    region : process.env.REGION,
    accessKeyId : process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.SECRET_ACCESS_KEY
});

var s3 = new aws.S3();

async function uploadFileToS3(file)
{
    console.log(file.data);
    try{
        var params = {
            Bucket : process.env.BUCKET,
            Key : file.name,
            Body : file.data
        }
        return new Promise(function(resolve,reject){
            s3.putObject(params,function(err,data)
            {
                if(err)
                    reject(err);
                else
                    resolve(data);
            });
        });
        /*await s3.putObject({
            Body : file.data.toString(),
            Key : file.name,
            Bucket : "nishsamplebucket1"
        }).promise();
        console.log(file.data.toString());
        return `file ${file.name} successfully uploaded to s3 bucket 'nishsamplebucket1'`*/

    }
    catch(e)
    {
        console.log(e);
        return `file uploaded failed...`
    }
}

module.exports = {
    uploadFileToS3 : uploadFileToS3
};