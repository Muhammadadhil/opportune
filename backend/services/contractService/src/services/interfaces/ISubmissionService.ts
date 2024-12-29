import { ISubmission } from "../../schema/submisssion.schema";

export interface ISubmissionService {
    submitWork(data: ISubmission): Promise<ISubmission>;
    generatePresignedUrl(fileName: string, fileType: string): Promise<{ url: string; fileKey: string }>;
}
