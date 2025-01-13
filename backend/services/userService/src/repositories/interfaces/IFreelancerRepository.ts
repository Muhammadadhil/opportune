import { IBaseRepository } from "./IRepository";
import IFreelancer from "../../interfaces/IFreelancer";
import IUser from "../../interfaces/IUser";

export interface IFreelancerRepository extends IBaseRepository<IFreelancer> {
    getFreelancersDatas(ids: string[]): Promise<IFreelancer[] | IUser[]>;
    saveNewCV(userId: string, cvKey: string, fileName: string, fileType: string): Promise<any>;
}
