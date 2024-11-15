import { IGig } from "../../interfaces/IGig";
import GigModel from "../../schema/applications.schema";
import { IGigRepositoy } from "../interfaces/IGigRepository";
import { BaseRepository } from "./baseRepository";

export class GigRepository extends BaseRepository<IGig> implements IGigRepositoy {
    constructor() {
        super(GigModel);
    }

}
