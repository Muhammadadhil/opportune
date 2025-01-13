
import IFreelancer from "../../interfaces/IFreelancer";
import { BaseRepository } from "./Repository";
import { FreelancerDetails } from "../../schema/FreelancerDetails";
import { IFreelancerRepository } from "../interfaces/IFreelancerRepository";
import { User } from "../../schema/User";

export class FreelancerRepository extends BaseRepository<IFreelancer> implements IFreelancerRepository {
    constructor() {
        super(FreelancerDetails);
    }

    // async saveFreelancerData(details: IFreelancer) {
    //     const newFreelancer = new FreelancerDetails(details);
    //     return await newFreelancer.save();
    // }

    // async getFreelancerDetails(userId: string): Promise<IFreelancer | null> {
    //     const freelancerData = await FreelancerDetails.findOne({ userId }).lean();

    //     if (!freelancerData) {
    //         return null;
    //     }

    //     const freelancer = {
    //         userId: freelancerData.userId as string,
    //         title: freelancerData.title as string,
    //         skills: freelancerData.skills as string[],
    //         accounts: freelancerData.accounts as { linkedin: string; github: string; other: string },
    //         image: freelancerData.image as string,
    //     } as IFreelancer;

    //     return freelancer;
    // }

    async getFreelancersDatas(ids: string[]) {
        // return await User.aggregate([
        //     {
        //         $match: { _id: { $in: ids } },
        //     },
        //     {
        //         $lookup: {
        //             from: "FreelancerDetails",
        //             localField: "_id",
        //             foreignField: "userId",
        //             as: "freelancerDetails",
        //         },
        //     },
        //     {
        //         $unwind: "$freelancerDetails",
        //     },
        // ]);
        return await User.find({ _id: { $in: ids } }, { _id: 1, firstname: 1, lastname: 1, email: 1, country: 1 });
    }


    async saveNewCV(userId: string, cvKey: string, fileName: string, fileType: string) {
        return await FreelancerDetails.updateOne({ userId }, { $push: { cvs: { cvKey, fileName, fileType } } });
    }
}
