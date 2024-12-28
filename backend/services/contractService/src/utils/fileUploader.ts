import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;
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

    async uploadFile(file: Express.Multer.File): Promise<string> {

        const fileKey = `${file.originalname}-${uuidv4()}`;

        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await this.s3Client.send(command);

        // return `https://${this.bucketName}.s3.amazonaws.com/${fileKey}`;
        return fileKey;
    }
}