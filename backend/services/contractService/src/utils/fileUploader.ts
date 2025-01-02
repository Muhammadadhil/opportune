import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
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

    async generatePresignedUrl(fileName: string, fileType: string): Promise<{ url: string; fileKey: string }> {
        const fileKey = `${fileName}-${uuidv4()}`;

        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
            ContentType: fileType,
        };

        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });

        return {
            url,
            fileKey,
        };
    }
}
