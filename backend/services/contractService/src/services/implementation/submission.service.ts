import { ISubmissionService } from "../interfaces/ISubmissionService";
import { ISubmission } from "../../schema/submisssion.schema";
import { ISubmissionRepository } from "../../repositories/interfaces/ISubmissionRepository";
import { FileUploader } from "../../utils/fileUploader";
import { IContractService } from "../interfaces/IContractService";
import { MilestoneStatus } from "../../enums/MIlestoneStatus";

export class SubmissionService implements ISubmissionService {

    private submissionRepository: ISubmissionRepository;
    private contractService: IContractService;
    private fileUploader: FileUploader;

    constructor(submissionRepository: ISubmissionRepository,contractService:IContractService, fileUploader: FileUploader) {
        this.submissionRepository = submissionRepository;
        this.contractService = contractService;
        this.fileUploader = fileUploader;
    }

    async submitWork(data: ISubmission, file: Express.Multer.File): Promise<ISubmission> {
        
        const filekey = await this.fileUploader.uploadFile(file);
        const submissionData = { ...data, attachment: filekey };
        const submission = await this.submissionRepository.create(submissionData as ISubmission);

        await this.contractService.updateMilestoneStatus(submission.contractId, submission.milestoneId, MilestoneStatus.SUBMITTED);
        
        return submission;

    }
}
