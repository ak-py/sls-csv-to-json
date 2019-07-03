const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const s3 = new AWS.S3();


const s3CreateFile = async (fileName, data, s3Bucket) => {
  const params = {
    Bucket: s3Bucket,
    Key: fileName,
    ContentType: `text/plain; charset=utf-8`,
    Body: data
  };
  const s3Response = await s3.upload(params).promise();
  // console.log(s3Response);
  return (`Success. File uploaded to S3 at ${s3Response.Bucket} bucket. File location: ${s3Response.Location}`);
};

const s3ReadFile = async (fileName, s3Bucket) => {
  const params = {
    Bucket: s3Bucket,
    Key: fileName
  };
  const s3Response = await s3.getObject(params).promise();
  const s3ResponseString = s3Response.Body.toString();
  // console.log(s3ResponseString)
  return s3ResponseString;
};

module.exports.s3CreateFile = s3CreateFile;
module.exports.s3ReadFile = s3ReadFile;
