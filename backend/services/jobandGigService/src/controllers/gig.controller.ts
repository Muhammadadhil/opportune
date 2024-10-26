import { GigService } from "../services/gig.services";


export class GigController {
    private gigService: GigService;

    constructor() {
        this.gigService = new GigService();
    }
}
