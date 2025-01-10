import { ObjectId } from "mongoose";
import { IPortfolio } from "../../types/IPortfolio";
import { IBaseRepository } from "./IBaseRepository";

export interface IPortfolioRepository extends IBaseRepository<IPortfolio> {
    findByFreelancerId(freelancerId: string): Promise<IPortfolio[] | null>;
    updatePortfolio(id: ObjectId, data: Partial<IPortfolio>): Promise<IPortfolio | null>;
}
