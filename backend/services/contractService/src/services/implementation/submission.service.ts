import { ISubmissionService } from "../interfaces/ISubmissionService";
import { ISubmission } from "../../schema/submisssion.schema";
import { ISubmissionRepository } from "../../repositories/interfaces/ISubmissionRepository";
import { FileUploader } from "../../utils/fileUploader";
import { IContractService } from "../interfaces/IContractService";
import { MilestoneStatus } from "../../enums/MIlestoneStatus";
import { ObjectId } from "mongoose";

export class SubmissionService implements ISubmissionService {
    private submissionRepository: ISubmissionRepository;
    private contractService: IContractService;
    private fileUploader: FileUploader;

    constructor(submissionRepository: ISubmissionRepository, contractService: IContractService, fileUploader: FileUploader) {
        this.submissionRepository = submissionRepository;
        this.contractService = contractService;
        this.fileUploader = fileUploader;
    }

    async submitWork(data: ISubmission): Promise<ISubmission> {
        const submission = await this.submissionRepository.create(data as ISubmission);
        await this.contractService.updateMilestoneStatus(submission.contractId, submission.milestoneId, MilestoneStatus.SUBMITTED);
        return submission;
    }

    generatePresignedUrl(fileName: string, fileType: string): Promise<{ url: string; fileKey: string }> {
        console.log("generating presigned url for upload");
        return this.fileUploader.generatePresignedUrl(fileName, fileType);
    }

    async getSubmissions(contractId: string, milestoneId: string): Promise<ISubmission | null> {
        console.log("getting submissions for contractId and milestoneId:", contractId, milestoneId);
        return this.submissionRepository.findOne({ contractId, milestoneId });
    }

    async acceptSubmission(submissionId: string): Promise<ISubmission | null> {
        
        const submission = await this.submissionRepository.update(submissionId as unknown as ObjectId,{isAccepted: true});
        
        // update milestone status
        if(submission){
            await this.contractService.updateMilestoneStatus(submission.contractId, submission.milestoneId, MilestoneStatus.COMPLETED);

            // release payment to the freeelancer , publish event to payment service, 
        }


        return submission;
    }
}
