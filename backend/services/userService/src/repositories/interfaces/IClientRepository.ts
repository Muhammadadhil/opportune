import { ObjectId } from "mongoose";
import IClientDetail from "../../interfaces/IClientDetail";
import { IBaseRepository } from "./IRepository";

export interface IClientRepository extends IBaseRepository<IClientDetail> {
    
}
