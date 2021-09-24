const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const bucketName = process.env.bucketName;
const region = process.env.region;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

const S3 = new AWS.S3({
    secretAccessKey,
    accessKeyId,
    region,
    bucketName
})

//   const checkFileUploadType = (file, cb)=>{
//     const myfile= file.split(".");
//     const fileType = myfile[myfile.length-1];
//     if(fileType === ("jpeg"||"png"||"gif"||"jpg")){
//         return cb(null, true)
//     }else{
//         cb('Must upload valid image.');
//     }
//   };

//credit: traversey media youtube
const checkFileUploadType = (file, cb) => {
    // regex for extenstion types
    const filetypes = /jpeg|jpg|png|gif/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};



function uploadFile(input) {
        //threw an error on split
    // const myfile = input.split(".");
    // const fileType = myfile[myfile.length - 1];

    //the three buckets we need to upload the file
    const params = {
        Bucket: bucketName,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: file.buffer
    }
    return S3.upload(params).promise()
}


module.exports = { uploadFile, checkFileUploadType }