import { IBaseRepository } from "./IRepository";
import IFreelancer from "../../interfaces/IFreelancer";
import IUser from "../../interfaces/IUser";

export interface IFreelancerRepository extends IBaseRepository<IFreelancer> {
    getFreelancersDatas(ids: string[]): Promise<IFreelancer[] | IUser[]>;
}
