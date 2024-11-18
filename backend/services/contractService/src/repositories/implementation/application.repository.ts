import { IApplication } from "../../interfaces/IApplication";
import GigModel from "../../schema/applications.schema";
import { IApplicationRepository } from "../interfaces/IApplicationRepository";
import { BaseRepository } from "./baseRepository";

export class ApplicationRepository extends BaseRepository<IApplication> implements IApplicationRepository {

    constructor() {
        super(GigModel);
    }
    











}