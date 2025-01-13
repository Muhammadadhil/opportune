import { ObjectId } from "mongoose";
import { IGig } from "../../types/IGig";
import GigModel from "../../schema/gig.schema";
import { IGigRepositoy } from "../interfaces/IGigRepository";
import { BaseRepository } from "./baseRepository";
import { injectable } from "inversify";

@injectable()
export class GigRepository extends BaseRepository<IGig> implements IGigRepositoy {
    constructor() {
        super(GigModel);
    }

    async updateGigUsingFreelancerId(id: ObjectId, data: Partial<IGig>): Promise<IGig | null> {
        return await GigModel.findOneAndUpdate({ freelancerId: id }, { $set: data }, { new: true });
    }

    //change active status
    async updateActiveStatus(id: ObjectId): Promise<IGig | null> {
        const gig = await GigModel.findById(id);
        if (!gig) {
            return null;
        }
        gig.isActive = !gig.isActive;
        return await gig.save();
    }
}
