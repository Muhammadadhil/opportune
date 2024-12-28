import { ISubmission } from "../../schema/submisssion.schema";

export interface ISubmissionService {
    submitWork(data: ISubmission, file: Express.Multer.File): Promise<ISubmission>;
}
