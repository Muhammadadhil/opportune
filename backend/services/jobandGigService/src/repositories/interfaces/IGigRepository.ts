import { ObjectId } from "mongoose";
import { IGig } from "../../types/IGig";
import { IBaseRepository } from "./IBaseRepository";

export interface IGigRepositoy extends IBaseRepository<IGig> {
    updateGigUsingFreelancerId(id: ObjectId, data: Partial<IGig>): Promise<IGig | null>;
    updateActiveStatus(id: ObjectId): Promise<IGig | null>;
}
