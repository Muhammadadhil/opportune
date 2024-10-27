import { IGig } from "../../interfaces/IGig";
import { GigRepository } from "../../repositories/implementation/gig.repository";

export class GigService {
    private gigRepository: GigRepository;

    constructor() {
        this.gigRepository = new GigRepository();
    }

    async saveGig(data: IGig): Promise<IGig> {
        return await this.gigRepository.create(data);
    }

    async editGig(userId: string, data: IGig): Promise<IGig | null> {
        return await this.gigRepository.updateGigUsingFreelancerId(userId, data);
    }

    async changeGigStatus(id: string): Promise<IGig | null> {
        return await this.gigRepository.updateActiveStatus(id);
    }
}
