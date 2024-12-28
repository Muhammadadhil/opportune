import { ISubmissionService } from "../interfaces/ISubmissionService";
import { ISubmission } from "../../schema/submisssion.schema";
import { ISubmissionRepository } from "../../repositories/interfaces/ISubmissionRepository";
import { FileUploader } from "../../utils/fileUploader";

export class SubmissionService implements ISubmissionService {
    private submissionRepository: ISubmissionRepository;
    private fileUploader: FileUploader;

    constructor(submissionRepository: ISubmissionRepository, fileUploader: FileUploader) {
        this.submissionRepository = submissionRepository;
        this.fileUploader = fileUploader;
    }

    async submitWork(data: ISubmission, file: Express.Multer.File): Promise<ISubmission> {
        const filekey = await this.fileUploader.uploadFile(file);
        const submissionData = { ...data.toObject(), attachment: filekey };
        return this.submissionRepository.create(submissionData);
    }
}
