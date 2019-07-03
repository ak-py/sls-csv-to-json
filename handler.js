'use strict';

const csv = require('csvtojson');
const {generateResponse, generateError} = require("./libs/response-lib");
const {s3CreateFile, s3ReadFile} = require("./libs/s3-lib");

// POST Method for Writing CSV file to S3 Bucket
module.exports.createCsv = async (event) => {
    const fileType = 'csv';
    console.log(`Trying to add ${fileType} file`);
    try {
        const name = event.pathParameters && event.pathParameters.name;
        if(name==null){
            console.log(event.pathParameters);
            return generateError(400, new Error('Invalid Name.'))
        }
        const s3Bucket = process.env.BUCKET;
        // fileName acts as s3 bucket key
        const fileName = `${fileType}/${name}.${fileType}`;
        const data = event.body;
        // (force) write a file with requested data
        const msg = await s3CreateFile(fileType, fileName, data, s3Bucket);
        return generateResponse(200, {message: msg, data: data});
    } catch(err) {
        console.error(err);
        return generateError(500, new Error('Couldn\'t add the csv file due to an internal error.'));
    }
};

// Lambda Triggered when CSV file is uploaded to the S3 bucket
module.exports.jsonTransformer = async (event) => {
    const fileType = 'json';
    console.log(`Trying to add ${fileType} file`);
    try {
        const bucket = event.Records[0].s3.bucket.name;
        const key = event.Records[0].s3.object.key;
        console.log(`A new file ${key} was created in the bucket ${bucket}`);

        // get csv file and create string
        const csvString = await s3ReadFile(key);

        // convert csv file (string) to JSON format data
        const jsonObj = await csv().fromString(csvString);

        // replace 'csv' with 'json' in bucket key
        const fileName = key.replace(/csv/g, fileType);

        const data = JSON.stringify(jsonObj);

        // add json file to s3 bucket
        const msg = await s3CreateFile(fileType, fileName, data);

        return generateResponse(200, {message: msg});

    } catch(err) {
        console.error(err);
        return generateError(500, new Error('Couldn\'t transform the csv to json due to an internal error.'));
    }
};

// GET Method for reading CSV files and JSON files from S3 Bucket
module.exports.readFile = async (event) => {
    try {
        const fileType = event.pathParameters && event.pathParameters.fileType;
        const name = event.pathParameters && event.pathParameters.name;
        if(fileType==null || name==null) return generateError(400, new Error('Invalid name given in the url path.'))

        const fileName = `${fileType}/${name}.${fileType}`;
        console.log(`Trying to read file - ${fileName}`);

        try{
            const s3Bucket = process.env.BUCKET;
            const data = await s3ReadFile(fileName, s3Bucket);
            const headers = { "Content-Type": `text/${fileType}` };
            return {
                statusCode: 200,
                headers: headers,
                body: data
            };
        } catch (e) {
            return generateError(404, new Error('Not Found'));
        }
    } catch(err) {
        console.error(err);
        return generateError(500, new Error('Couldn\'t read the csv file due to an internal error.'));
    }
};

