require("dotenv").config();
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3uploader = async (params) => {
  return await new Promise((res, rej) => {
    s3.upload(params, (err, data) => {
      if (err) rej(err);
      else console.log(`File uploaded successfully. ${data.Location}`);
      res({
        body: data,
      });
    });
  });
};

module.exports = s3uploader;
