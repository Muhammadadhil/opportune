import { IApplication } from "../../interfaces/IApplication";
import GigModel from "../../schema/applications.schema";
import { IGigRepositoy } from "../interfaces/IGigRepository";
import { BaseRepository } from "./baseRepository";

export class GigRepository extends BaseRepository<IApplication> implements IGigRepositoy {
    constructor() {
        super(GigModel);
    }
}
