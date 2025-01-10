import { ObjectId } from "mongoose";
import { injectable } from "inversify";
import { IPortfolio } from "../../types/IPortfolio";
import { IPortfolioRepository } from "../interfaces/IPortFolioRepository";
import { BaseRepository } from "./baseRepository";
import PortfolioModel from "../../schema/portfolio.schema";

@injectable()
export class PortfolioRepository extends BaseRepository<IPortfolio> implements IPortfolioRepository {
    constructor() {
        super(PortfolioModel);
    }

    async findByFreelancerId(freelancerId: string): Promise<IPortfolio[] | null> {
        return await PortfolioModel.find({ freelancerId });
    }

    async updatePortfolio(id: ObjectId, data: Partial<IPortfolio>): Promise<IPortfolio | null> {
        return await PortfolioModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    }
}
