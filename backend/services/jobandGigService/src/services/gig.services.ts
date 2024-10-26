import { GigRepository } from "../repositories/gig.repository";


export class GigService {
    private gigRepository;

    constructor() {
        this.gigRepository = new GigRepository();
    }

    
}
