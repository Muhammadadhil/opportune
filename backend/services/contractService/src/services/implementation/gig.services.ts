import { IGig } from "../../interfaces/IGig";
import { GigRepository } from "../../repositories/implementation/gig.repository";
import { IGigRepositoy } from "../../repositories/interfaces/IGigRepository";
import { IGigService } from "../interfaces/IGigService";


export class GigService implements IGigService {
    private gigRepository: IGigRepositoy;

    constructor() {
        this.gigRepository = new GigRepository();
    }

    async getAllGigs(): Promise<IGig[] | null> {
        const gigDatas = await this.gigRepository.find();
        return gigDatas;
    }
}
