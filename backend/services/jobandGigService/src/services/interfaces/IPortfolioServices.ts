import { ObjectId } from "mongoose";
import { IPortfolio } from "../../types/IPortfolio";

export interface IPortfolioService {
    savePortfolio(data: IPortfolio): Promise<IPortfolio | null>;
    updatePortfolio(id: ObjectId, data: IPortfolio): Promise<IPortfolio | null>;
    getPortfolios(freelancerId: string): Promise<IPortfolio[] | null>;
    deletePortfolio(id: ObjectId): Promise<boolean>;
    getAllPortfolios(): Promise<IPortfolio[] | null>;
}
