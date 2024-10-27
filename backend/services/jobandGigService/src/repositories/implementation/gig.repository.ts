import { IGig } from "../../interfaces/IGig";
import GigModel from "../../schema/gig.schema";
import { BaseRepository } from "./baseRepositoty";

export class GigRepository extends BaseRepository<IGig> {
    constructor() {
        super(GigModel);
    }

    async updateGigUsingFreelancerId(id: string, data: Partial<IGig>): Promise<IGig | null> {
        return await GigModel.findOneAndUpdate({ freelancerId: id }, data, { new: true });
    }

    //change active status
    async updateActiveStatus(id: string): Promise<IGig | null>{
        const gig = await GigModel.findById(id);
        if (!gig) {
            return null; 
        }
        gig.isActive = !gig.isActive;
        return await gig.save();
    }



}
