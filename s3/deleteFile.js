var aws = require('aws-sdk');
aws.config.update({
    region:process.env.REGION,
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY
});
var s3 = new aws.S3();

async function deleteFileFromS3(fname)
{
    var params = {
        Bucket : process.env.BUCKET,
        Key : fname
    }
    return new Promise(function(resolve,reject){
        s3.deleteObject(params,function(err,data)
        {
            if(err)
                reject(`Something went wrong, maybe ${fname} doesnt exists...`)
            else
            {    
                console.log(data);
                resolve(`${fname} successfully deleted...`)
            }
        });
    });
}

module.exports={
    deleteFileFromS3:deleteFileFromS3
};