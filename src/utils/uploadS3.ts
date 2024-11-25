import config from "../config/index";
import { AWS } from "../libs/aws";

 export class AWSS3 {
  private readonly s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3();
  }

  async uploadS3(base64: string, folder: string, subfolder: string): Promise<string> {
    const base64Data = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const ext = base64.split(';')[0].split('/')[1];
   

    const timestamp = +new Date();
    const fileName = `${folder}/${
      subfolder ? `${subfolder}/` : ""
    }${timestamp}.${ext}`;

    if (subfolder) {
      const params = {
        Bucket: config.aws.bucketName!,
        Prefix: `${folder}/${subfolder}`,
      };

      this.s3
        .listObjects(params)
        .promise()
        .then(async (data) => {
          const listedObjects = data.Contents;

          const deleteParams: { Bucket: string, Delete: { Objects: Array<{ Key: string }> } } = {
            Bucket: config.aws.bucketName!,
            Delete: { Objects: [] },
          };

          listedObjects!.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key: Key! });
          });

          if(deleteParams.Delete.Objects.length > 0){
            await this.s3.deleteObjects(deleteParams).promise();
          }
        });
    }
    
    return new Promise((resolve, reject) => {
        this.s3.upload(
            {
                Bucket: config.aws.bucketName!,
                Key: fileName,
                // @ts-ignore
                Prefix: `${folder}/${subfolder}`,
                Body: base64Data,
                ContentEncoding: 'base64',
                ContentType: `image/${ext}`,
                ACL: 'public-read',
            },
            (err, data) => {
                if(err){
                    return reject(err);
                }
                return resolve(data.Location);
            }
        )
    })
  }
}

export default new AWSS3();
