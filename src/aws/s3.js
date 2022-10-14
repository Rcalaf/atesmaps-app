import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { S3 } from "@aws-sdk/client-s3";


import {ENDPOINT, ACCESS_KEY, ACCESS_SECRET} from '../config'
const s3Client = new S3({
    endpoint: ENDPOINT,
    region: "us-east-1",
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: ACCESS_SECRET
    }
});

export { s3Client };