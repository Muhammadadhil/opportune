
import IFreelancer from "../../interfaces/IFreelancer";
import { BaseRepository } from "./Repository";
import { FreelancerDetails } from "../../schema/FreelancerDetails";
import { IFreelancerRepository } from "../interfaces/IFreelancerRepository";
import { User } from "../../schema/User";

export class FreelancerRepository extends BaseRepository<IFreelancer> implements IFreelancerRepository {
    constructor() {
        super(FreelancerDetails);
    }

    async getFreelancersDatas(ids: string[]) {
        return await User.find({ _id: { $in: ids } }, { _id: 1, firstname: 1, lastname: 1, email: 1, country: 1 });
    }

    async saveNewCV(userId: string, cvKey: string, fileName: string, fileType: string) {
        return await FreelancerDetails.updateOne({ userId }, { $push: { cvs: { cvKey, fileName, fileType } } });
    }
}
