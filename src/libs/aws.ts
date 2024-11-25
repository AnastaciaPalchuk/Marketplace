import AWS from "aws-sdk";
import config from "../config";

const options = {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
}

AWS.config.update(options);
export { AWS };