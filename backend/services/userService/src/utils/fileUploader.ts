import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;


if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials are not set");
}

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});


export class FileUploader {
    private s3Client: S3Client; 
    private bucketName: string;

    constructor() {
        this.s3Client = s3Client;
        this.bucketName = bucketName!;
    }

    async generateUploadPresignedUrl(fileName: string, fileType: string): Promise<{ url: string; fileKey: string }> {

        const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

        const fileKey= randomFileName();

        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
            ContentType: fileType,
        };

        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

        return { url, fileKey };
    }


    async generateDownloadPresignedUrl(fileKey: string): Promise<string> {
        const command = new GetObjectCommand({ Bucket: this.bucketName, Key: fileKey });
        const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
        return url;
    }




}



// export const getSignedImageURL = async (image: string): Promise<string> => {
//     const command = new GetObjectCommand({ Bucket: bucketName, Key: image });
//     const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
//     return signedUrl;
// };





// export const uploadTosS3 = async (fileBuffer: Buffer, mimeType: string): Promise<string> => {
//     try {
//         const fileName = randomFileName();

//         const newMimeType='image/jpeg';
//         const uploadParams = {
//             Bucket: bucketName,
//             Key: fileName,
//             Body: fileBuffer,
//             contentType: newMimeType,
//         };

//         const command = new PutObjectCommand(uploadParams);
//         await s3Client.send(command);
//         return fileName;
//     } catch (error) {
//         console.log("error while uploading image to s3: ", error);
//         return "error";
//     }
// };



