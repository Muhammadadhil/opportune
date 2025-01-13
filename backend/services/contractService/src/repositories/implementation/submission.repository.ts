import { ISubmissionRepository } from "../interfaces/ISubmissionRepository";
import { ISubmission } from "../../schema/submisssion.schema";
import { BaseRepository } from "./baseRepository";
import { Submission } from "../../schema/submisssion.schema";

export class SubmissionRepository extends BaseRepository<ISubmission> implements ISubmissionRepository {
    constructor() {
        super(Submission);
    }
}
