import { User } from "../../schema/User";
import IUser from "../../interfaces/IUser";
import { BaseRepository } from "./Repository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ObjectId, Types } from "mongoose";
import { IUserWithClientDetails, IUserWithFreelancerDetails } from "../../interfaces/IuserObj";
import { FreelancerDetails } from "../../schema/FreelancerDetails";
import { ClientDetail } from "../../schema/ClientDetails";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User);
    }

    async changeVerifiedStatus(email: string, status: boolean) {
        return await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
    }

    async toggleBlockStatus(userId: ObjectId): Promise<IUser | null> {
        const user = await User.findOne({ _id: userId });
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: { isBlocked: !user?.isBlocked } }, { new: true });

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    }

    async updateUserWallet(userId: string, amount: number, description: string, paymentId: ObjectId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.walletAmount !== undefined && user.walletHistory !== undefined) {
            user.walletAmount += amount;
            user.walletHistory.push({
                amount,
                description,
                paymentId,
                date: new Date(),
            });
        } else {
            user.walletAmount = amount;
            user.walletHistory = [
                {
                    amount,
                    description,
                    paymentId,
                    date: new Date(),
                },
            ];
        }

        await user.save();
        return user;
    }

    async findUserWithFreelancerDetails(userId: string | ObjectId) {

        const user = await User.findOne({
            _id: userId,
            role: "freelancer",
        }).lean();

        if (!user) return null;

        const freelancerDetails = await FreelancerDetails.findOne({
            userId: user._id,
        }).lean();

        return {
            ...user,
            freelancerDetails: freelancerDetails || undefined,
        };
    }

    async findUserWithClientDetails(userId: string | ObjectId) {
        
        const user = await User.findOne({
            _id: userId,
        }).lean();

        if (!user) return null;

        const clientDetails = await ClientDetail.findOne({
            userId: user._id,
        }).lean();

        console.log("user and freelancer details:", user, clientDetails);

        return {
            ...user,
            clientDetails: clientDetails || undefined,
        };

        // const user = await User.aggregate([
        //     {
        //         $match: { _id: userId, role: "client" },
        //     },
        //     {
        //         $lookup: {
        //             from: "clientdetails",
        //             localField: "_id",
        //             foreignField: "userId",
        //             as: "clientDetails",
        //         },
        //     },
        //     {
        //         $unwind: {
        //             path: "$clientDetails",
        //             preserveNullAndEmptyArrays: true,
        //         },
        //     },
        // ]);

        // return user[0];
    }
}
