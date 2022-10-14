import AWS from 'aws-sdk';
import Base64Binary from 'base64-arraybuffer';
//import fs from 'react-native-fs';
import fs from 'react-native-file-selector';
import * as mime from 'react-native-mime-types';
import { ENDPOINT, ACCESS_KEY, ACCESS_SECRET } from './config';


const uploadImageOnS3 = async (file: any) => {
    return new Promise(async (resolve, reject) => {
        const s3bucket = new AWS.S3({
            accessKeyId: ACCESS_KEY,
            secretAccessKey: ACCESS_SECRET,
            Bucket: ENDPOINT,
            signatureVersion: 'v4',
        });

        const base64 = await fs.readFile(file.path, 'base64');
        const contentType = file.mime;
        const fileName = file.fileName;
        const contentDeposition = 'inline;filename="' + fileName + '"';

        const arrayBuffer = Base64Binary.decode(base64);
        s3bucket.createBucket(()=>{
            const params = {
                Bucket: ENDPOINT,
                Key: fileName,
                Body: arrayBuffer,
                ContentDisposition: contentDeposition,
                ContentType: contentType
            };
            s3bucket.upload(params, (err: any, data: any) =>{
                if(err){
                    reject(err);
                }else{
                    console.log(data);
                    resolve(data.Location)
                }
            });
        });
    }) ; 
};

export default uploadImageOnS3;